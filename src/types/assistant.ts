import { ResourcePermission } from "./data-contracts";
import { ChatHistory } from "./history";

export type AdditionalAssistantOptions = Record<string, unknown>;

export interface AssistantSettings {
  assistantId: string;
  pinned?: boolean;
  activeSession?: string;
  user?: string;
  hash?: string;
  app?: string;
  //NOTE: Api key should be available on app level, not assistant level.
  apikey?: string;
}

type LanguageCode = string | "default";

export type AssistantDescriptionWithLanguage = Record<LanguageCode, string>;

export type AssistantDescription = string | AssistantDescriptionWithLanguage;
export interface AssistantInfo {
  /**
   * Image element, or url to image
   */
  avatar?: React.JSX.Element | string;
  name: string;
  shortName?: string;
  title?: string;
  description?: AssistantDescription;
  id?: string;
  space_id?: string;
  permissions?: ResourcePermission[];
}

export interface AssistantSession {
  assistantId?: string;
  name?: string;
  id: string;
  history: ChatHistory;
  feedback?: AssistantFeedback;
  updated_at: Date;
  created_at: Date;
}

export interface SkHeaders {
  _apikey?: string;
  _skuser?: string;
  _skassistant?: string;
  _skhash?: string;
  _skapp?: string;
}

export interface AssistantFeedback {
  value: -1 | 1;
  text: string | null;
}

export interface Assistant {
  info: AssistantInfo;
  settings: AssistantSettings;
  lastUse?: Date;
}

export interface Space {
  id: string;
  name?: string;
}
