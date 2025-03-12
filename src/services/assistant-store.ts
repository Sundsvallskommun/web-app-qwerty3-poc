import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import {
  AdditionalAssistantOptions,
  AssistantInfo,
  AssistantSettings,
} from "../types/assistant";
import { AssistantPublic } from "@sk-web-gui/ai";

export interface AssistantStoreInterface {
  settings: AssistantSettings;
  setSettings: (settings: AssistantSettings) => void;
  info?: AssistantInfo;
  setInfo: (settings: AssistantInfo) => void;
  assistant?: AssistantPublic;
  setAssistant: (assistant: AssistantPublic) => void;
  stream?: boolean;
  setStream: (stream: boolean) => void;
  options?: AdditionalAssistantOptions;
  setOptions: (options: AdditionalAssistantOptions) => void;
  apiBaseUrl?: string;
  setApiBaseUrl: (apiBaseUrl: string) => void;
  apikey?: string;
  setApikey: (apikey: string) => void;
}

export const useAssistantStore = createWithEqualityFn(
  persist<AssistantStoreInterface>(
    (set) => {
      return {
        settings: { assistantId: "" },
        setSettings: (settings) => set(() => ({ settings })),
        info: undefined,
        setInfo: (info) => set(() => ({ info })),
        assistant: undefined,
        setAssistant: (assistant) => set(() => ({ assistant })),
        stream: false,
        setStream: (stream) =>
          set(() => ({
            stream:
              typeof stream === "boolean"
                ? stream
                : stream === "true"
                ? true
                : false,
          })),
        options: undefined,
        setOptions: (options) => set(() => ({ options })),
        apiBaseUrl: undefined,
        setApiBaseUrl: (apiBaseUrl) => set(() => ({ apiBaseUrl })),
        apikey: undefined,
        setApikey: (apikey) => set(() => ({ apikey })),
      };
    },
    {
      name: `sk-ai-assistant`,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

/**
 * Set the name of the assistant store.
 * This should be unique.
 * Leave name empty to create an auto id name.
 * @param {string} name - Name of the assistant store
 */
export const setAssistantStoreName = (name?: string) => {
  const autoId = crypto.randomUUID();
  const id = name || `sk-ai-assistant-${autoId}`;

  useAssistantStore.persist.setOptions({ name: id });
  useAssistantStore.persist.rehydrate();
};
