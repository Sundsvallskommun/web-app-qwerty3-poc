import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Assistant } from "../types/assistant";
import { AssistantList } from "../types/assistant-list";
import { SpaceSparse } from "../types/data-contracts";
import { getMySpace, getSpaces } from "./assistant-service";
import { mapIntricAssistantToAssistant } from "../utils/map-assistant.util";

interface Data {
  assistants: Record<string, Assistant>;
  list: AssistantList;
  activeAssistantId: string | null;
  searchAssistantId: string | null;
  spaces: SpaceSparse[];
}

interface Actions {
  refreshAssistants: () => void;
  refreshSpaces: () => void;
  setAssistants: (assistants: Record<string, Assistant>) => void;
  updateAssistant: (assistantId: string, assistant: Assistant) => void;
  pinAssistant: (assistantId: string, pinned: boolean) => void;
  setActiveSession: (assistantId: string, sessionId: string) => void;
  setActiveAssistantId: (assistantId: string | null) => void;
  setSearchAssistantId: (searchAssistantId: string | null) => void;
}

export const useListStore = create(
  persist<Data & Actions>(
    (set, get) => ({
      assistants: {},
      list: [],
      activeAssistantId: null,
      spaces: [],
      refreshAssistants: async () => {
        try {
          const mySpace = await getMySpace();

          const oldAssistants = get().assistants;
          const list: Assistant[] = mySpace?.applications?.assistants?.items
            .map((assistant) => {
              if (assistant.name && assistant.name !== "Default") {
                return mapIntricAssistantToAssistant(
                  assistant,
                  mySpace.id,
                  oldAssistants[assistant.id]?.settings?.pinned ?? true
                );
              }
            })
            .filter((assistant) => assistant !== undefined);

          const defaultAssistant = mapIntricAssistantToAssistant(
            {
              ...mySpace.default_assistant,
              name: `Personlig assistent`,
              description:
                mySpace?.default_assistant?.description ??
                "Din personliga assistent från Intric. Denna kallas även för 'Default assistant' och kan ej tas bort.",
            },
            mySpace.id,
            oldAssistants[mySpace.default_assistant.id]?.settings?.pinned ??
              true
          );

          const searchAssistantId = get().searchAssistantId;

          const assistants: Record<string, Assistant> = {
            ...oldAssistants,
            ...[defaultAssistant, ...list].reduce((map, assistant) => {
              return { ...map, [assistant.info.id]: assistant };
            }, {}),
          };

          set(() => ({
            assistants,
            list: Object.values(assistants).filter((ass) => !!ass),
            searchAssistantId: searchAssistantId ?? defaultAssistant.info.id,
          }));
        } catch (e) {
          console.error("Error when fetching assistants", e);
        }
      },
      setAssistants: (assistants) =>
        set(() => ({
          assistants,
          list: Object.values(assistants).filter((ass) => !!ass),
        })),
      updateAssistant: (assistantId, assistant) =>
        set((state) => {
          const assistants = { ...state.assistants, [assistantId]: assistant };
          return {
            assistants,
            list: Object.values(assistants),
          };
        }),
      pinAssistant: (assistantId, pinned) =>
        set((state) => {
          const assistants = {
            ...state.assistants,
            [assistantId]: {
              ...state.assistants[assistantId],
              settings: { ...state.assistants[assistantId].settings, pinned },
            },
          };
          return {
            assistants,
            list: Object.values(assistants),
          };
        }),
      setActiveSession: (assistantId, sessionId) =>
        set((state) => {
          const assistants: Data["assistants"] = {
            ...state.assistants,
            [assistantId]: {
              ...state.assistants[assistantId],
              settings: {
                ...state.assistants[assistantId].settings,
                activeSession: sessionId,
              },
              lastUse: new Date(),
            },
          };
          return {
            assistants,
            list: Object.values(assistants).filter((ass) => !!ass),
          };
        }),
      setActiveAssistantId: (assistantId) =>
        set(() => ({ activeAssistantId: assistantId })),
      refreshSpaces: async () => {
        try {
          const newSpaces = await getSpaces(true);
          if (newSpaces.items) {
            set(() => ({ spaces: newSpaces.items }));
          }
        } catch (e) {
          console.log("Error fetching spaces: ", e);
        }
      },
      searchAssistantId: null,
      setSearchAssistantId: (searchAssistantId) =>
        set(() => ({ searchAssistantId })),
    }),
    { name: "assistant-list", storage: createJSONStorage(() => sessionStorage) }
  )
);
