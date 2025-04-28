import {
  SessionsResponse,
  AssistantFeedback,
  Reference,
  ChatEntryReference,
  SessionMessage,
  ChatHistory,
  ChatHistoryEntry,
} from "@sk-web-gui/ai";
import { SkHeaders, AssistantSettings } from "../types";
import { useAssistantStore } from "./assistant-store";
import {
  Applications,
  AskAssistant,
  AssistantPublic,
  CreateSpaceAssistantRequest,
  FilePublic,
  PaginatedResponseAssistantPublic,
  PaginatedResponseSpaceSparse,
  PartialAssistantUpdatePublic,
  SpacePublic,
} from "../types/data-contracts";

export const getSkHeaders = (
  options: Partial<AssistantSettings> | undefined,
  settings: AssistantSettings
): SkHeaders => {
  const assistantId = options?.assistantId || settings?.assistantId || "";
  const user = options?.user || settings?.user || "";
  const hash = options?.hash || settings?.hash || "";
  const app = options?.app || settings?.app || "";
  const apikey = useAssistantStore.getState()?.apikey;
  if (options?.apikey || settings?.apikey || apikey) {
    return { _apikey: options?.apikey ?? settings?.apikey ?? apikey };
  }

  if (!assistantId) {
    throw new Error(
      "No assistant Id. Either provide one in options, or add one to AssistantContext / Settings"
    );
  }
  if (!hash) {
    throw new Error(
      "No hash. Either provide one in options, or add one to AssistantContext / Settings"
    );
  }
  return {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: app,
  };
};

export const getAssistants: (
  options?: Partial<AssistantSettings>
) => Promise<PaginatedResponseAssistantPublic> = async (options) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }
  const url = `${apiBaseUrl}/assistants/`;
  const skHeaders = getSkHeaders(options, settings);

  return fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", ...skHeaders },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching assistants");
    });
};

export const getAssistantById = async (options?: AssistantSettings) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/assistants/${
    options?.assistantId ?? settings.assistantId
  }`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching assistant");
    });
};

export const getAssistantSessions = async (
  options?: AssistantSettings
): Promise<SessionsResponse> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/assistants/${
    options?.assistantId ?? settings.assistantId
  }/sessions/`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

export const getAssistantSessionById = async (
  sessionId: string,
  options?: AssistantSettings
) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/assistants/${
    options?.assistantId ?? settings.assistantId
  }/sessions/${sessionId}/`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching session");
    });
};

export const batchQuery = async (
  query: string,
  sessionId?: string,
  options?: AssistantSettings,
  files?: AskAssistant["files"]
) => {
  const { apiBaseUrl, settings } = useAssistantStore.getState();

  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/assistants/${
    options?.assistantId ?? settings.assistantId
  }/sessions/${sessionId || ""}?stream=false`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ body: query, files }),
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("401 Not authorized");
    }
    return res.json();
  });
};

export const giveFeedback = async (
  feedback: AssistantFeedback,
  sessionId: string,
  options?: AssistantSettings
) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/assistants/${
    options?.assistantId ?? settings?.assistantId
  }/sessions/${sessionId || ""}/feedback`;

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("401 Not authorized");
    }
    return res.json();
  });
};

export const mapReferencesToChatEntryReferences = (
  references: Reference[]
): ChatEntryReference[] => {
  return references
    ?.filter((reference) => !!reference.metadata.url)
    .map((reference) => ({
      title: reference.metadata.title || "",
      url: reference.metadata.url || "",
    }));
};
export const mapSessionMessagesToChatHistory = (
  messages: SessionMessage[]
): ChatHistory => {
  return messages?.reduce((history: ChatHistory, message) => {
    const question: ChatHistoryEntry = {
      id: `${message.id}-1`,
      text: message.question,
      origin: "user",
      done: true,
    };
    const answer: ChatHistoryEntry = {
      id: `${message.id}-2`,
      text: message.answer,
      origin: "assistant",
      done: true,
      references: mapReferencesToChatEntryReferences(message.references),
    };
    return [...history, question, answer];
  }, []);
};

export const getMySpace = async (
  options?: Partial<AssistantSettings>
): Promise<SpacePublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/spaces/personal`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

export const getSpaces = async (
  personal: boolean,
  options?: Partial<AssistantSettings>
): Promise<PaginatedResponseSpaceSparse> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/spaces${personal ? "?personal=true" : ""}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

export const getSpace = async (
  spaceId: string,
  options?: Partial<AssistantSettings>
): Promise<SpacePublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/spaces/${spaceId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

export const getSpaceApplications = async (
  space_id: string,
  options?: Partial<AssistantSettings>
): Promise<Applications> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/spaces/${space_id}/applications`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

export const getMyFiles = async (
  options?: Partial<AssistantSettings>
): Promise<PaginatedResponseAssistantPublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/files`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching files");
    });
};

export const getFile = async (
  id: string,
  options?: Partial<AssistantSettings>
): Promise<FilePublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/files/${id}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error while fetching file");
    });
};

export const uploadFile = async (
  file: File,
  options?: Partial<AssistantSettings>
): Promise<FilePublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/files`;

  const formData = new FormData();
  formData.append("upload_file", file, file.name);

  return fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "multipart/form-data",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error while uploading file");
    });
};

export const updateAssistant = async (
  assistantId: string,
  data: PartialAssistantUpdatePublic,
  options?: AssistantSettings
) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }
  const url = `${apiBaseUrl}/assistants/${assistantId}`;
  const skHeaders = getSkHeaders(options, settings);

  return fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", ...skHeaders },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when updating assistant");
    });
};

export const createAssistant = async (
  spaceId: string,
  data: CreateSpaceAssistantRequest,
  options?: AssistantSettings
): Promise<AssistantPublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }
  const url = `${apiBaseUrl}/spaces/${spaceId}/applications/assistants`;
  const skHeaders = getSkHeaders(options, settings);

  return fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", ...skHeaders },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when updating assistant");
    });
};
