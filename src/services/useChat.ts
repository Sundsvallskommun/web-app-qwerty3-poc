import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import React from "react";
import { useAssistantStore } from "./assistant-store";
import { batchQuery } from "../services/assistant-service";
import { AssistantSettings, SkHeaders } from "../types/assistant";
import {
  ChatEntryReference,
  ChatHistory,
  ChatHistoryEntry,
  Origin,
} from "../types/history";
import { AskAssistant, AskResponse, FilePublic } from "../types";
import { useSessions } from "./session-store";

const MAX_REFERENCE_COUNT = 10;

interface useChatOptions {
  settings?: AssistantSettings;
  sessionId?: string;
  apiBaseUrl?: string;
  stream?: boolean;
}

export const useChat = (options?: useChatOptions) => {
  const sessionId = React.useMemo(
    () => options?.sessionId || "",
    [options?.sessionId]
  );
  const _incomingSettings = React.useMemo(
    () => options?.settings,
    [options?.settings]
  );

  const [currentSession, setCurrentSession] = React.useState<string>(
    sessionId || ""
  );
  const [_settings, _stream, _apiBaseUrl, _apikey] = useAssistantStore(
    (state) => [state.settings, state.stream, state.apiBaseUrl, state.apikey]
  );

  const settings = _incomingSettings || _settings;
  const {
    assistantId,
    user: _user,
    hash,
    app,
    apikey: settingsApiKey,
  } = settings;
  const user = _user || "";
  const stream = (options?.stream || _stream) ?? true;
  const apiBaseUrl = options?.apiBaseUrl || _apiBaseUrl;
  const apikey = settingsApiKey ?? _apikey;

  const [
    session,
    getSession,
    newSession,
    updateHistory,
    updateSession,
    setDone,
    changeSessionId,
  ] = useSessions((state) => [
    state.sessions?.[assistantId]?.[currentSession],
    state.getSession,
    state.newSession,
    state.updateHistory,
    state.updateSession,
    state.setDone,
    state.changeSessionId,
  ]);

  const history = session?.history || [];
  const done = session?.done;
  const isNew = session?.isNew;

  const createNewSession = React.useCallback(() => {
    const id = newSession(assistantId);
    setCurrentSession(id);
  }, [sessionId]);

  const updateSessionId = (id: string) => {
    changeSessionId(assistantId, currentSession, id);
    setCurrentSession(id);
  };

  const setSessionName = (name?: string) => {
    const _name = name || history.at(0)?.text || "";
    updateSession(assistantId, currentSession, (session) => ({
      ...session,
      name: _name,
      updated_at: new Date(),
    }));
  };

  React.useEffect(() => {
    if (currentSession !== settings?.activeSession) {
      if (!!settings?.activeSession) {
        setCurrentSession(settings.activeSession);
      } else {
        createNewSession();
      }
    }
  }, [assistantId]);

  React.useEffect(() => {
    if (sessionId) {
      if (sessionId !== currentSession)
        getSession(assistantId, sessionId).then((session) => {
          if (!session) {
            console.log("Session not available. Creating new");
            createNewSession();
          } else {
            setCurrentSession(sessionId);
          }
        });
    } else {
      createNewSession();
    }
  }, [sessionId]);

  const addHistoryEntry = (
    origin: Origin,
    text: string,
    id: string,
    done: boolean,
    references: ChatEntryReference[] = [],
    files?: FilePublic[]
  ) => {
    const historyEntry: ChatHistoryEntry = {
      origin: origin,
      text,
      id,
      done,
      ...references,
      files,
    };
    updateHistory(assistantId, currentSession, (history) => [
      ...(history || []),
      historyEntry,
    ]);
  };

  const streamQuery = (
    query: string,
    assistantId: string,
    session_id: string,
    user: string,
    hash: string,
    files?: AskAssistant["files"]
  ) => {
    const answerId = crypto.randomUUID();

    if (!session?.name) {
      setSessionName(query);
    }
    setDone(assistantId, currentSession, false);
    addHistoryEntry("assistant", "", answerId, false);
    const url = `${apiBaseUrl}/assistants/${assistantId}/sessions/${
      session_id || ""
    }?stream=true`;

    let _id = "";
    let references: ChatEntryReference[] = [];
    let incomingFiles: FilePublic[] = [];

    const skHeaders: SkHeaders = {
      _skuser: user,
      _skassistant: assistantId,
      _skhash: hash,
      _skapp: app || "",
      _apikey: apikey,
    };

    fetchEventSource(url, {
      method: "POST",
      body: JSON.stringify({ question: query, files }),
      headers: {
        Accept: "text/event-stream",
        ...skHeaders,
      },
      onopen(res: Response) {
        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          updateHistory(assistantId, currentSession, (history: ChatHistory) => {
            const newHistory = [...history];
            const index = history.findIndex((chat) => chat.id === answerId);
            if (index > -1) {
              newHistory[index] = {
                origin: "system",
                text: "Ett fel inträffade, assistenten gav inget svar.",
                id: answerId,
                done: true,
              };
            }
            return newHistory;
          });
          console.error("Client-side error ", res);
        }
        return Promise.resolve();
      },
      onmessage(event: EventSourceMessage) {
        let parsedData: AskResponse;

        try {
          parsedData = JSON.parse(event.data);
        } catch {
          console.error("Error when parsing response as json. Returning.");
          return;
        }
        if (currentSession !== parsedData.session_id && isNew) {
          _id = parsedData.session_id;
        }

        references =
          parsedData.references.length > 0
            ? parsedData.references.map((reference) => ({
                title: reference.metadata.title || reference.metadata.url || "",
                url: reference.metadata.url || "",
              }))
            : references;
        files = parsedData.files.length > 0 ? parsedData.files : files;

        updateHistory(assistantId, currentSession, (history: ChatHistory) => {
          const newHistory = [...history];
          const index = history.findIndex((chat) => chat.id === answerId);
          if (index === -1) {
            newHistory.push({
              origin: "assistant",
              text: parsedData.answer,
              id: answerId,
              done: false,
            });
          } else {
            newHistory[index] = {
              origin: "assistant",
              text: history[index]?.text + parsedData.answer,
              id: answerId,
              done: false,
            };
          }

          return newHistory;
        });
      },
      onclose() {
        if (currentSession !== _id && isNew) {
          updateSessionId(_id);
        }
        let answer = "";
        updateHistory(assistantId, currentSession, (history: ChatHistory) => {
          const newHistory = [...history];
          const index = newHistory.findIndex((chat) => chat.id === answerId);
          answer = history[index].text;

          newHistory[index] = {
            origin: history[index].origin,
            text: answer,
            id: answerId,
            done: true,
            references: references.slice(0, MAX_REFERENCE_COUNT),
            files: incomingFiles?.length > 0 ? incomingFiles : undefined,
          };
          return newHistory;
        });
        setDone(assistantId, currentSession, true);
      },
      onerror(err: unknown) {
        console.error("There was an error from server", err);
        addHistoryEntry(
          "system",
          "Ett fel inträffade, kunde inte kommunicera med assistent.",
          "0",
          true
        );
        setDone(assistantId, currentSession, true);
        throw err;
      },
    }).catch(() => setDone(assistantId, currentSession, true));
  };

  const sendQuery = (query: string, files?: FilePublic[]) => {
    if ((!assistantId || !hash) && !apikey) {
      addHistoryEntry(
        "system",
        "Ett fel inträffade, assistenten gav inget svar.",
        "0",
        true
      );
      setDone(assistantId, currentSession, true);
      return;
    }
    const questionId = crypto.randomUUID();
    addHistoryEntry("user", query, questionId, true, [], files);

    if (stream) {
      streamQuery(
        query,
        assistantId,
        isNew ? "" : currentSession,
        user,
        hash,
        files?.map((file) => ({ id: file.id }))
      );
    } else {
      setDone(assistantId, currentSession, false);
      const answerId = crypto.randomUUID();
      if (!session.name) {
        setSessionName(query);
      }
      addHistoryEntry("assistant", "", answerId, false);
      return batchQuery(
        query,
        isNew ? "" : currentSession,
        settings,
        files?.map((file) => ({ id: file.id }))
      )
        .then((res: AskResponse) => {
          updateHistory(assistantId, currentSession, (history) => {
            const newHistory = [...history];
            const index = history.findIndex((entry) => entry.id === answerId);
            newHistory[index].text = res.answer;
            newHistory[index].done = true;

            const refenrences =
              res.references
                ?.slice(0, MAX_REFERENCE_COUNT)
                .map((reference) => ({
                  title: reference.metadata.title || "",
                  url: reference.metadata.url || "",
                })) || [];
            newHistory[index].references = refenrences;
            newHistory[index].files =
              res.files.length > 0 ? res.files : undefined;

            return newHistory;
          });
          setDone(assistantId, currentSession, true);
          if (session.id !== res.session_id && isNew) {
            updateSessionId(res.session_id);
          }
          return res;
        })
        .catch((e) => {
          console.error("Error occured:", e);
          updateHistory(assistantId, currentSession, (history) => {
            const newHistory = [...history];
            const index = history.findIndex((entry) => entry.id === answerId);
            newHistory[index].origin = "system";
            newHistory[index].text =
              "Ett fel inträffade, assistenten gav inget svar";
            newHistory[index].done = true;
            return newHistory;
          });
          setDone(assistantId, currentSession, true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    newSession: createNewSession,
    done,
    session,
    sendQuery,
  };
};
