import { Assistant } from "./assistant";

export type AssistantList = Assistant[];

export interface SortedAssistantList {
  label: string;
  assistants: AssistantList;
}
