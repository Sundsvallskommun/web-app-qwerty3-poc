import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import avatar1 from "../assets/beslutscoachen.png";
import avatar2 from "../assets/datakirurgen.png";
import avatar3 from "../assets/paragrafryttaren.png";
import avatar4 from "../assets/qwerty.png";
import avatar5 from "../assets/qwerty2.png";
import avatar6 from "../assets/qwerty3.png";
import avatar7 from "../assets/user.png";
import avatar8 from "../assets/varumarkesvaktaren.png";
import { Assistant } from "../types/assistant";
import { AssistantList } from "../types/assistant-list";
import { SpaceSparse } from "../types/data-contracts";
import { getMySpace, getSpaces } from "./assistant-service";

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

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

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
            .map((assistant, index) => {
              if (assistant.name && assistant.name !== "Default") {
                const newassistant: Assistant = {
                  info: {
                    avatar: avatars[index],
                    name: assistant.name,
                    shortName: assistant.name[0],
                    title: "En kort beskrivning av assistenten.",
                    description:
                      "En lite längre beskrivning av assistenten, dess syfte och annat som är bra att veta.",
                    id: assistant.id,
                    space_id: mySpace.id,
                    permissions: assistant.permissions,
                  },
                  settings: {
                    assistantId: assistant.id,
                    pinned:
                      oldAssistants[assistant.id]?.settings?.pinned ?? true,
                  },
                };
                return newassistant;
              }
            })
            .filter((assistant) => assistant !== undefined);
          const defaultAssistant = {
            info: {
              avatar: avatars[6],
              name: `Personlig assistent`,
              shortName: "AI",
              title: "Min personliga assistent.",
              description:
                "Den personliga assistent från Intric. Denna kallas även för 'Default assistant' och kan ej tas bort.",
              id: mySpace.default_assistant.id,
              space_id: mySpace.id,
              permissions: mySpace.default_assistant.permissions,
            },
            settings: {
              assistantId: mySpace.default_assistant.id,
              pinned:
                oldAssistants[mySpace.default_assistant.id]?.settings?.pinned ??
                true,
            },
          };

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
