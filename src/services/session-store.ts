import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { AssistantSession, ChatHistory } from "../types";
import {
  getAssistantSessionById,
  getAssistantSessions,
  mapSessionMessagesToChatHistory,
} from "./assistant-service";
import { SessionResponse, SessionsResponse } from "../types/response";

export interface SessionStoreSession extends AssistantSession {
  /**
   * If the assistant is done or not.
   */
  done: boolean;
  /**
   * If the history has been loaded for the session.
   */
  loaded: boolean;
  /**
   * If the session is new and not saved yer
   */
  isNew?: boolean;
}

const newSession = (): SessionStoreSession => ({
  history: [],
  id: crypto.randomUUID(),
  name: "",
  updated_at: new Date(),
  created_at: new Date(),
  done: true,
  loaded: true,
  isNew: true,
});

export const mapSessionsResponseToStoreData = (
  sessions: SessionsResponse
): Record<string, SessionStoreSession> => {
  return sessions.items.reduce(
    (sessions, session) => ({
      ...sessions,
      [session.id]: {
        id: session.id,
        created_at: new Date(session.created_at),
        updated_at: new Date(session.updated_at),
        history: [],
        name: session.name,
        done: true,
        loaded: false,
      },
    }),
    {}
  );
};

export const mapSessionResponseToStoreData = (
  session: SessionResponse
): SessionStoreSession => {
  return {
    id: session.id,
    name: session.name,
    created_at: new Date(session.created_at),
    updated_at: new Date(session.updated_at),
    history: mapSessionMessagesToChatHistory(session.messages),
    feedback: session.feedback,
    done: true,
    loaded: true,
  };
};

export interface SessionStore {
  sessions: {
    [assistantId: string]: { [sessionId: string]: SessionStoreSession };
  };
  /**
   * Get a single session from ID
   * If not loaded, it will be loaded from server.
   * @param {string} id - The session Id
   * @returns a single session
   */
  getSession: (
    assistantId: string,
    id: string
  ) => Promise<SessionStoreSession | undefined>;
  /**
   * Remove all sessions
   */
  resetSessions: () => void;
  /**
   * Load sessions from server.
   */
  refreshSessions: (assistantId: string) => void;
  /**
   * Add a new empty session
   * @returns the new session Id
   */
  newSession: (assistantId: string) => string;
  /**
   * Update a single session
   * @param {string} id - Id of the session
   * @param {object} session - The data to be updated
   */
  updateSession: (
    assistantId: string,
    id: string,
    sessionHandler: (prev: SessionStoreSession) => SessionStoreSession
  ) => void;
  /**
   * Update the Chat history of a session
   * @param {string} id - Id of the session
   * @param {object} history - The chat history
   */
  updateHistory: (
    assistantId: string,
    id: string,
    historyHandler: (prev: ChatHistory) => ChatHistory
  ) => void;
  /**
   * Changes the Id of a session
   * @param {string} oldId - The old (current) session Id
   * @param {string} newId - The new session Id
   * @returns
   */
  changeSessionId: (assistantId: string, oldId: string, newId: string) => void;
  /**
   * Set if the session is done
   * @param {string} id - The session Id
   * @param {boolean} done
   */
  setDone: (assistantId: string, id: string, done: boolean) => void;
  /**
   * Set if the session is new
   * @param {string} id - The session Id
   * @param {boolean} isNew
   */
  setIsNew: (assistantId: string, id: string, isNew: boolean) => void;
}

export const createSessionStore = (storename: string) => {
  return createWithEqualityFn(
    persist<SessionStore>(
      (set, get) => {
        return {
          sessions: {},

          getSession: async (assistantId, id) => {
            const session = get().sessions[assistantId][id];
            if (session) {
              if (session.loaded || session.isNew) {
                return session;
              } else {
                const fullSession = await getAssistantSessionById(session.id, {
                  assistantId,
                });
                if (fullSession) {
                  set((state) => {
                    return {
                      sessions: {
                        ...state.sessions,
                        [assistantId]: {
                          ...state.sessions[assistantId],
                          [id]: mapSessionResponseToStoreData(fullSession),
                        },
                      },
                    };
                  });
                  return fullSession;
                }
              }
            }
            return undefined;
          },
          resetSessions: () => set(() => ({ sessions: {} })),

          refreshSessions: async (assistantId) => {
            try {
              const newSessions = await getAssistantSessions({ assistantId });
              if (newSessions) {
                return set((state) => ({
                  sessions: {
                    ...state.sessions,
                    [assistantId]: {
                      ...mapSessionsResponseToStoreData(newSessions),
                      ...state.sessions[assistantId],
                    },
                  },
                }));
              }
            } catch {
              return;
            }
          },

          newSession: (assistantId) => {
            const mySession = newSession();
            set((state) => ({
              sessions: {
                ...state.sessions,
                [assistantId]: {
                  ...state.sessions[assistantId],
                  [mySession.id]: {
                    ...mySession,
                    created_at: new Date(),
                    updated_at: new Date(),
                  },
                },
              },
            }));
            return mySession.id;
          },

          updateSession: (assistantId, id, fn) =>
            set((state) => {
              const session = fn(state.sessions[assistantId][id]);
              return {
                sessions: {
                  ...state.sessions,
                  [assistantId]: {
                    ...state.sessions[assistantId],
                    [id]: session,
                  },
                },
              };
            }),

          updateHistory: (assistantId, id, fn) =>
            set((state) => {
              const history = fn(state.sessions?.[assistantId]?.[id]?.history);
              return {
                sessions: {
                  ...state.sessions,
                  [assistantId]: {
                    ...state.sessions?.[assistantId],
                    [id]: { ...state.sessions?.[assistantId]?.[id], history },
                  },
                },
              };
            }),

          changeSessionId: (assistantId, oldId, newId) =>
            set((state) => {
              const newSession: SessionStoreSession = {
                ...state.sessions[assistantId][oldId],
                id: newId,
                isNew: false,
              };

              return {
                sessions: {
                  ...state.sessions,
                  [assistantId]: {
                    ...state.sessions[assistantId],
                    [newId]: newSession,
                  },
                },
              };
            }),

          setDone: (assistantId, id, done) =>
            set((state) => {
              return {
                sessions: {
                  ...state.sessions,
                  [assistantId]: {
                    ...state.sessions[assistantId],
                    [id]: { ...state.sessions[assistantId][id], done },
                  },
                },
              };
            }),

          setIsNew: (assistantId, id, isNew) =>
            set((state) => {
              return {
                sessions: {
                  ...state.sessions,
                  [assistantId]: {
                    ...state.sessions[assistantId],
                    [id]: { ...state.sessions[assistantId][id], isNew },
                  },
                },
              };
            }),
        };
      },
      {
        name: `${storename}-sessions`,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export const useSessions = createSessionStore("sk-qwerty-3");
