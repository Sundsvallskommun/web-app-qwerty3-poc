import { AssistantFeedback } from "./assistant";

export interface Reference {
  id: string;
  text: string | null;
  metadata: {
    url: string | null;
    title: string;
    embedding_model: string;
  };
  group_id: string;
}

interface CompletionModel {
  name: string;
  nickname: string;
  family: string;
  token_limit: number;
  selectable: boolean;
}

export interface ResponseData {
  session_id: string;
  answer: string;
  references: Reference[];
  model: CompletionModel;
}

export interface SessionSummary {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface SessionsResponse {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: SessionSummary[];
}

export interface SessionMessage {
  id: string;
  answer: string;
  question: string;
  completion_model: CompletionModel;
  references: Reference[];
  created_at: Date;
  updated_at: Date;
}

export interface SessionResponse {
  id: string;
  name: string;
  feedback?: AssistantFeedback;
  created_at: Date;
  updated_at: Date;
  messages: SessionMessage[];
}
