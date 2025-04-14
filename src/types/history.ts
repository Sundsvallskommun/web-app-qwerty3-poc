import { AssistantSession } from "./assistant";
import { FilePublic } from "./data-contracts";

export type Origin = "user" | "assistant" | "system";

export interface ChatEntryReference {
  title: string;
  url: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  text: string;
  references?: ChatEntryReference[];
  files?: FilePublic[];
  id: string;
  done?: boolean;
}

export type ChatHistory = ChatHistoryEntry[];

export type SessionHistory = AssistantSession[];
