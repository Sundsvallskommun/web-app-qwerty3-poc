/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AcceptedFileType */
export interface AcceptedFileType {
  /** Mimetype */
  mimetype: string;
  /** Size Limit */
  size_limit: number;
}

/** AccessToken */
export interface AccessToken {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
}

/** AddSpaceMemberRequest */
export interface AddSpaceMemberRequest {
  /**
   * Id
   * @format uuid
   */
  id: string;
  role: SpaceRoleValue;
}

/** AdditionalField */
export interface AdditionalField {
  type: WizardType;
  /** Value */
  value: Record<string, string>[];
}

/** AllowedOriginCreate */
export interface AllowedOriginCreate {
  /** Url */
  url: string;
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
}

/** AllowedOriginInDB */
export interface AllowedOriginInDB {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Url */
  url: string;
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
}

/** AllowedOriginPublic */
export interface AllowedOriginPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Url */
  url: string;
}

/** ApiKey */
export interface ApiKey {
  /** Truncated Key */
  truncated_key: string;
  /** Key */
  key: string;
}

/** ApiKeyInDB */
export interface ApiKeyInDB {
  /** Truncated Key */
  truncated_key: string;
  /** Key */
  key: string;
  /** User Id */
  user_id: string | null;
  /** Assistant Id */
  assistant_id: string | null;
}

/** AppInTemplatePublic */
export interface AppInTemplatePublic {
  /** Name */
  name: string;
  completion_model: CompletionModelPublicAppTemplate | null;
  /** Completion Model Kwargs */
  completion_model_kwargs: object;
  prompt: PromptPublicAppTemplate | null;
  /** Input Description */
  input_description: string | null;
  /** Input Type */
  input_type: string;
}

/** AppPublic */
export interface AppPublic {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string | null;
  /** Input Fields */
  input_fields: InputFieldPublic[];
  /** Attachments */
  attachments: FilePublic[];
  prompt: PromptPublic | null;
  completion_model: CompletionModelSparse;
  completion_model_kwargs: ModelKwargs;
  allowed_attachments: FileRestrictions;
  /** Published */
  published: boolean;
  transcription_model: TranscriptionModelPublic;
}

/** AppRunInput */
export interface AppRunInput {
  /** Files */
  files: FilePublic[];
  /** Text */
  text: string | null;
}

/** AppRunPublic */
export interface AppRunPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  input: AppRunInput;
  status: Status;
  /** Finished At */
  finished_at: string | null;
  user: UserSparse;
  /** Output */
  output: string | null;
}

/** AppRunSparse */
export interface AppRunSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  input: AppRunInput;
  status: Status;
  /** Finished At */
  finished_at: string | null;
  user: UserSparse;
}

/** AppSparse */
export interface AppSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  /** Published */
  published: boolean;
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
}

/** AppTemplateListPublic */
export interface AppTemplateListPublic {
  /** Items */
  items: AppTemplatePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** AppTemplateOrganization */
export interface AppTemplateOrganization {
  /** Name */
  name: string;
}

/** AppTemplatePublic */
export interface AppTemplatePublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Name */
  name: string;
  /** Description */
  description: string | null;
  /** Category */
  category: string;
  app: AppInTemplatePublic;
  /** Type */
  type: "app";
  wizard: AppTemplateWizard;
  organization: AppTemplateOrganization;
}

/** AppTemplateWizard */
export interface AppTemplateWizard {
  attachments: TemplateWizard | null;
  collections: TemplateWizard | null;
}

/** Applications */
export interface Applications {
  assistants: PaginatedPermissionsAssistantSparse;
  group_chats: PaginatedPermissionsGroupChatSparse;
  services: PaginatedPermissionsServiceSparse;
  apps: PaginatedPermissionsAppSparse;
}

/** AskAnalysis */
export interface AskAnalysis {
  /** Question */
  question: string;
  /** Completion Model Id */
  completion_model_id?: string | null;
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
}

/** AskAssistant */
export interface AskAssistant {
  /** Question */
  question: string;
  /** Session Id */
  session_id?: string | null;
  /**
   * Files
   * @maxItems 5
   * @default []
   */
  files?: ModelId[];
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
  tools?: UseTools | null;
}

/** AskChatResponse */
export interface AskChatResponse {
  /**
   * Session Id
   * @format uuid
   */
  session_id: string;
  /** Question */
  question: string;
  /** Files */
  files: FilePublic[];
  /** Answer */
  answer: string;
  /** References */
  references: InfoBlobAskAssistantPublic[];
  tools: UseTools;
}

/** AskResponse */
export interface AskResponse {
  /**
   * Session Id
   * @format uuid
   */
  session_id: string;
  /** Question */
  question: string;
  /** Files */
  files: FilePublic[];
  /** Answer */
  answer: string;
  /** References */
  references: InfoBlobAskAssistantPublic[];
  model?: CompletionModelPublic | null;
  tools: UseTools;
}

/** AssistantCreatePublic */
export interface AssistantCreatePublic {
  /** Name */
  name: string;
  /** @default {} */
  completion_model_kwargs?: ModelKwargs;
  /**
   * Logging Enabled
   * @default false
   */
  logging_enabled?: boolean;
  prompt?: PromptCreate | null;
  /**
   * Space Id
   * @format uuid
   */
  space_id: string;
  /**
   * Groups
   * @default []
   */
  groups?: ModelId[];
  /**
   * Websites
   * @default []
   */
  websites?: ModelId[];
  /**
   * Integration Knowledge List
   * @default []
   */
  integration_knowledge_list?: ModelId[];
  guardrail?: AssistantGuard | null;
  completion_model: ModelId;
}

/** AssistantGuard */
export interface AssistantGuard {
  /**
   * Guardrail Active
   * @default true
   */
  guardrail_active?: boolean;
  /**
   * Guardrail String
   * @default ""
   */
  guardrail_string?: string;
  /**
   * On Fail Message
   * @default "Jag kan tyvärr inte svara på det. Fråga gärna något annat!"
   */
  on_fail_message?: string;
}

/** AssistantInTemplatePublic */
export interface AssistantInTemplatePublic {
  /** Name */
  name: string;
  completion_model: CompletionModelPublicAssistantTemplate | null;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  prompt: PromptPublicAssistantTemplate | null;
}

/** AssistantMetadata */
export interface AssistantMetadata {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** AssistantPublic */
export interface AssistantPublic {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  prompt?: PromptPublic | null;
  /**
   * Space Id
   * @format uuid
   */
  space_id: string;
  completion_model_kwargs: ModelKwargs;
  /** Logging Enabled */
  logging_enabled: boolean;
  /** Attachments */
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  /** Groups */
  groups: GroupPublicWithMetadata[];
  /** Websites */
  websites: WebsiteSparse[];
  /** Integration Knowledge List */
  integration_knowledge_list: IntegrationKnowledgePublic[];
  completion_model: CompletionModelSparse;
  /**
   * Published
   * @default false
   */
  published?: boolean;
  user: UserSparse;
  tools: Tools;
  /**
   * Description
   * A description of the assitant that will be used as default description in GroupChatAssistantPublic
   * @example "This is a helpful AI assistant"
   */
  description?: string | null;
}

/** AssistantSparse */
export interface AssistantSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** @default {} */
  completion_model_kwargs?: ModelKwargs;
  /**
   * Logging Enabled
   * @default false
   */
  logging_enabled?: boolean;
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
  /**
   * Published
   * @default false
   */
  published?: boolean;
  /** Description */
  description?: string | null;
}

/** AssistantTemplateListPublic */
export interface AssistantTemplateListPublic {
  /** Items */
  items: AssistantTemplatePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** AssistantTemplateOrganization */
export interface AssistantTemplateOrganization {
  /** Name */
  name: string;
}

/** AssistantTemplatePublic */
export interface AssistantTemplatePublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Category */
  category: string;
  assistant: AssistantInTemplatePublic;
  /** Type */
  type: "assistant";
  wizard: AssistantTemplateWizard;
  organization: AssistantTemplateOrganization;
}

/** AssistantTemplateWizard */
export interface AssistantTemplateWizard {
  attachments: TemplateWizard | null;
  collections: TemplateWizard | null;
}

/** AttachmentLimits */
export interface AttachmentLimits {
  /** Formats */
  formats: FormatLimit[];
  /** Max In Question */
  max_in_question: number;
}

/** AuthCallbackParams */
export interface AuthCallbackParams {
  /** Auth Code */
  auth_code: string;
  /**
   * Tenant Integration Id
   * @format uuid
   */
  tenant_integration_id: string;
}

/** AuthUrlPublic */
export interface AuthUrlPublic {
  /** Auth Url */
  auth_url: string;
}

/** Body_Login_api_v1_users_login_token__post */
export interface BodyLoginApiV1UsersLoginTokenPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
  client_secret?: string | null;
}

/** Body_upload_file_api_v1_files__post */
export interface BodyUploadFileApiV1FilesPost {
  /**
   * Upload File
   * @format binary
   */
  upload_file: File;
}

/** Body_upload_file_api_v1_groups__id__info_blobs_upload__post */
export interface BodyUploadFileApiV1GroupsIdInfoBlobsUploadPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** CompletionModel */
export interface CompletionModel {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  family: ModelFamily;
  /** Token Limit */
  token_limit: number;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Nr Billion Parameters */
  nr_billion_parameters?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Open Source */
  open_source?: boolean | null;
  /** Description */
  description?: string | null;
  /** Deployment Name */
  deployment_name?: string | null;
  org?: ModelOrg | null;
  /** Vision */
  vision: boolean;
  /** Reasoning */
  reasoning: boolean;
  /** Base Url */
  base_url?: string | null;
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean;
  /**
   * Is Org Default
   * @default false
   */
  is_org_default?: boolean;
}

/** CompletionModelPublic */
export interface CompletionModelPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  family: ModelFamily;
  /** Token Limit */
  token_limit: number;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Nr Billion Parameters */
  nr_billion_parameters?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Open Source */
  open_source?: boolean | null;
  /** Description */
  description?: string | null;
  /** Deployment Name */
  deployment_name?: string | null;
  org?: ModelOrg | null;
  /** Vision */
  vision: boolean;
  /** Reasoning */
  reasoning: boolean;
  /** Base Url */
  base_url?: string | null;
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean;
  /**
   * Is Org Default
   * @default false
   */
  is_org_default?: boolean;
  /**
   * Can Access
   * @default false
   */
  can_access?: boolean;
  /**
   * Is Locked
   * @default true
   */
  is_locked?: boolean;
}

/** CompletionModelPublicAppTemplate */
export interface CompletionModelPublicAppTemplate {
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** CompletionModelPublicAssistantTemplate */
export interface CompletionModelPublicAssistantTemplate {
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** CompletionModelSparse */
export interface CompletionModelSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  family: ModelFamily;
  /** Token Limit */
  token_limit: number;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Nr Billion Parameters */
  nr_billion_parameters?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Open Source */
  open_source?: boolean | null;
  /** Description */
  description?: string | null;
  /** Deployment Name */
  deployment_name?: string | null;
  org?: ModelOrg | null;
  /** Vision */
  vision: boolean;
  /** Reasoning */
  reasoning: boolean;
  /** Base Url */
  base_url?: string | null;
}

/** CompletionModelUpdateFlags */
export interface CompletionModelUpdateFlags {
  /** Is Org Enabled */
  is_org_enabled?: boolean | null;
  /** Is Org Default */
  is_org_default?: boolean | null;
}

/** ContentDisposition */
export enum ContentDisposition {
  Attachment = "attachment",
  Inline = "inline",
}

/**
 * ConversationRequest
 * A unified model for asking questions to either assistants or group chats.
 *
 * Either session_id, assistant_id, or group_chat_id must be provided.
 * If session_id is provided, the conversation will continue with the existing session.
 *
 * For group chats:
 * - If tools.assistants contains an assistant, that specific assistant will be targeted
 *   (requires the group chat to have allow_mentions=True).
 * - If no assistant is targeted, the most appropriate assistant will be selected.
 */
export interface ConversationRequest {
  /** Question */
  question: string;
  /** Session Id */
  session_id?: string | null;
  /** Assistant Id */
  assistant_id?: string | null;
  /** Group Chat Id */
  group_chat_id?: string | null;
  /**
   * Files
   * @maxItems 5
   * @default []
   */
  files?: ModelId[];
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
  tools?: UseTools | null;
}

/** Counts */
export interface Counts {
  /** Assistants */
  assistants: number;
  /** Sessions */
  sessions: number;
  /** Questions */
  questions: number;
}

/** CrawlRunPublic */
export interface CrawlRunPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Pages Crawled */
  pages_crawled?: number | null;
  /** Files Downloaded */
  files_downloaded?: number | null;
  /** Pages Failed */
  pages_failed?: number | null;
  /** Files Failed */
  files_failed?: number | null;
  /** @default "queued" */
  status?: Status | null;
  /** Result Location */
  result_location?: string | null;
  /** Finished At */
  finished_at?: string | null;
}

/** CrawlRunSparse */
export interface CrawlRunSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Pages Crawled */
  pages_crawled?: number | null;
  /** Files Downloaded */
  files_downloaded?: number | null;
  /** Pages Failed */
  pages_failed?: number | null;
  /** Files Failed */
  files_failed?: number | null;
  /** @default "queued" */
  status?: Status | null;
  /** Result Location */
  result_location?: string | null;
  /** Finished At */
  finished_at?: string | null;
}

/** CrawlType */
export enum CrawlType {
  Crawl = "crawl",
  Sitemap = "sitemap",
}

/** CreateAndImportSpaceRequest */
export interface CreateAndImportSpaceRequest {
  /** Name */
  name: string;
  embedding_model: ModelId;
  /**
   * Assistants
   * @default []
   */
  assistants?: ModelId[];
  /**
   * Groups
   * @default []
   */
  groups?: ModelId[];
  /**
   * Websites
   * @default []
   */
  websites?: ModelId[];
  /**
   * Members
   * @default []
   */
  members?: AddSpaceMemberRequest[];
}

/** CreateGroupRequest */
export interface CreateGroupRequest {
  /** Name */
  name: string;
  embedding_model: ModelId;
}

/** CreateSpaceAppRequest */
export interface CreateSpaceAppRequest {
  /** Name */
  name: string;
  from_template?: TemplateCreate | null;
}

/** CreateSpaceAssistantRequest */
export interface CreateSpaceAssistantRequest {
  /** Name */
  name: string;
  from_template?: TemplateCreate | null;
}

/** CreateSpaceGroupsRequest */
export interface CreateSpaceGroupsRequest {
  /** Name */
  name: string;
  embedding_model?: ModelId | null;
}

/** CreateSpaceGroupsResponse */
export interface CreateSpaceGroupsResponse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  embedding_model: EmbeddingModelSparse | null;
  metadata: GroupMetadata;
}

/** CreateSpaceIntegrationKnowledge */
export interface CreateSpaceIntegrationKnowledge {
  /** Name */
  name: string;
  embedding_model: ModelId;
  /** Url */
  url: string;
  /** Key */
  key?: string | null;
}

/** CreateSpaceRequest */
export interface CreateSpaceRequest {
  /** Name */
  name: string;
}

/** CreateSpaceServiceRequest */
export interface CreateSpaceServiceRequest {
  /** Name */
  name: string;
}

/** CreateSpaceServiceResponse */
export interface CreateSpaceServiceResponse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  completion_model_kwargs: ModelKwargs;
  /** Output Format */
  output_format?: CreateSpaceServiceResponseOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
  /** Groups */
  groups: GroupPublicWithMetadata[];
  completion_model: CompletionModelSparse | null;
  /**
   * Published
   * @default false
   */
  published?: boolean;
  user: UserSparse;
}

/** CreateSpaceWebsitesRequest */
export interface CreateSpaceWebsitesRequest {
  /** Name */
  name?: string | null;
  /** Url */
  url: string;
  /**
   * Download Files
   * @default false
   */
  download_files?: boolean;
  /** @default "crawl" */
  crawl_type?: CrawlType;
  /** @default "never" */
  update_interval?: UpdateInterval;
  embedding_model?: ModelId | null;
}

/** CreateSpaceWebsitesResponse */
export interface CreateSpaceWebsitesResponse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name?: string | null;
  /** Url */
  url: string;
  /** Download Files */
  download_files: boolean;
  crawl_type: CrawlType;
  update_interval: UpdateInterval;
  embedding_model: EmbeddingModelSparse | null;
  latest_crawl: CrawlRunPublic | null;
  metadata: WebsiteMetadata;
}

/** CursorPaginatedResponse[SessionMetadataPublic] */
export interface CursorPaginatedResponseSessionMetadataPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: SessionMetadataPublic[];
  /** Limit */
  limit?: number | null;
  /** Next Cursor */
  next_cursor?: string | null;
  /** Previous Cursor */
  previous_cursor?: string | null;
  /** Total Count */
  total_count: number;
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** CursorPaginatedResponse[UserSparse] */
export interface CursorPaginatedResponseUserSparse {
  /**
   * Items
   * List of items returned in the response
   */
  items: UserSparse[];
  /** Limit */
  limit?: number | null;
  /** Next Cursor */
  next_cursor?: string | null;
  /** Previous Cursor */
  previous_cursor?: string | null;
  /** Total Count */
  total_count: number;
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** Dashboard */
export interface Dashboard {
  spaces: PaginatedResponseSpaceDashboard;
}

/** DefaultAssistant */
export interface DefaultAssistant {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  prompt?: PromptPublic | null;
  /**
   * Space Id
   * @format uuid
   */
  space_id: string;
  completion_model_kwargs: ModelKwargs;
  /** Logging Enabled */
  logging_enabled: boolean;
  /** Attachments */
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  /** Groups */
  groups: GroupPublicWithMetadata[];
  /** Websites */
  websites: WebsiteSparse[];
  /** Integration Knowledge List */
  integration_knowledge_list: IntegrationKnowledgePublic[];
  completion_model?: CompletionModelSparse | null;
  /**
   * Published
   * @default false
   */
  published?: boolean;
  user: UserSparse;
  tools: Tools;
  /**
   * Description
   * A description of the assitant that will be used as default description in GroupChatAssistantPublic
   * @example "This is a helpful AI assistant"
   */
  description?: string | null;
}

/** DeleteGroupResponse */
export interface DeleteGroupResponse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Name */
  name: string;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  embedding_model: EmbeddingModelPublic;
  deletion_info: DeletionInfo;
}

/** DeleteResponse */
export interface DeleteResponse {
  /** Success */
  success: boolean;
}

/** DeletionInfo */
export interface DeletionInfo {
  /** Success */
  success: boolean;
}

/** EmbeddingModel */
export interface EmbeddingModel {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  family: EmbeddingModelFamily;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Open Source */
  open_source: boolean;
  /** Dimensions */
  dimensions?: number | null;
  /** Max Input */
  max_input?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Description */
  description?: string | null;
  org?: ModelOrg | null;
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean;
}

/** EmbeddingModelFamily */
export enum EmbeddingModelFamily {
  Openai = "openai",
  MiniLm = "mini_lm",
  E5 = "e5",
}

/** EmbeddingModelPublic */
export interface EmbeddingModelPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  family: EmbeddingModelFamily;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Open Source */
  open_source: boolean;
  /** Dimensions */
  dimensions?: number | null;
  /** Max Input */
  max_input?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Description */
  description?: string | null;
  org?: ModelOrg | null;
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean;
  /**
   * Can Access
   * @default false
   */
  can_access?: boolean;
  /**
   * Is Locked
   * @default true
   */
  is_locked?: boolean;
}

/** EmbeddingModelPublicBase */
export interface EmbeddingModelPublicBase {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  family: EmbeddingModelFamily;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Open Source */
  open_source: boolean;
  /** Dimensions */
  dimensions?: number | null;
  /** Max Input */
  max_input?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Description */
  description?: string | null;
  org?: ModelOrg | null;
}

/** EmbeddingModelSparse */
export interface EmbeddingModelSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  family: EmbeddingModelFamily;
  /** Is Deprecated */
  is_deprecated: boolean;
  /** Open Source */
  open_source: boolean;
  /** Dimensions */
  dimensions?: number | null;
  /** Max Input */
  max_input?: number | null;
  /** Hf Link */
  hf_link?: string | null;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Description */
  description?: string | null;
  org?: ModelOrg | null;
}

/** EmbeddingModelUpdateFlags */
export interface EmbeddingModelUpdateFlags {
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean | null;
}

/** ErrorCodes */
export enum ErrorCodes {
  Value9000 = 9000,
  Value9001 = 9001,
  Value9002 = 9002,
  Value9003 = 9003,
  Value9004 = 9004,
  Value9005 = 9005,
  Value9006 = 9006,
  Value9007 = 9007,
  Value9008 = 9008,
  Value9009 = 9009,
  Value9010 = 9010,
  Value9011 = 9011,
  Value9012 = 9012,
  Value9013 = 9013,
  Value9014 = 9014,
  Value9015 = 9015,
  Value9016 = 9016,
  Value9017 = 9017,
  Value9018 = 9018,
  Value9019 = 9019,
  Value9020 = 9020,
  Value9021 = 9021,
  Value9022 = 9022,
  Value9023 = 9023,
  Value9024 = 9024,
  Value9025 = 9025,
}

/** FilePublic */
export interface FilePublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Mimetype */
  mimetype: string;
  /** Size */
  size: number;
  /** Transcription */
  transcription?: string | null;
}

/** FileRestrictions */
export interface FileRestrictions {
  /** Accepted File Types */
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
}

/** FormatLimit */
export interface FormatLimit {
  /** Mimetype */
  mimetype: string;
  /** Size */
  size: number;
  /** Extensions */
  extensions: string[];
  /** Vision */
  vision: boolean;
}

/** GeneralError */
export interface GeneralError {
  /** Message */
  message: string;
  intric_error_code: ErrorCodes;
}

/** GetModelsResponse */
export interface GetModelsResponse {
  /** Completion Models */
  completion_models: CompletionModelPublic[];
  /** Embedding Models */
  embedding_models: EmbeddingModelPublic[];
}

/** GroupChatAssistantPublic */
export interface GroupChatAssistantPublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Handle */
  handle: string;
  /**
   * Default Description
   * The default description inherited from AssistantPublic. Cannot be null if user_description is null.
   * @example "Default AI Assistant description"
   */
  default_description?: string | null;
  /**
   * User Description
   * Custom description provided by the user. Cannot be null if default_description is null.
   * @example "My custom AI assistant description"
   */
  user_description?: string | null;
}

/** GroupChatAssistantUpdateSchema */
export interface GroupChatAssistantUpdateSchema {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * User Description
   * Custom description provided by the user. Cannot be null if 'description' of assistant is null.
   * @example "My custom AI assistant description"
   */
  user_description: string | null;
}

/**
 * GroupChatCreate
 * Attributes:
 *     name: str
 */
export interface GroupChatCreate {
  /** Name */
  name: string;
}

/**
 * GroupChatPublic
 * Represents a group chat of assistants.
 *
 * Attributes:
 *     created_at: datetime
 *     updated_at: datetime
 *     name: str
 *     id: UUID
 *     space_id: UUID
 *     allow_mentions: bool
 *     show_response_label: bool
 *     tools: GroupChatTools
 */
export interface GroupChatPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Space Id
   * @format uuid
   */
  space_id: string;
  /** Allow Mentions */
  allow_mentions: boolean;
  /** Show Response Label */
  show_response_label: boolean;
  /** Published */
  published: boolean;
  tools: GroupChatTools;
  /** Permissions */
  permissions: ResourcePermission[];
}

/** GroupChatSparse */
export interface GroupChatSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
  /** Published */
  published: boolean;
}

/** GroupChatTools */
export interface GroupChatTools {
  /** Assistants */
  assistants: GroupChatAssistantPublic[];
}

/** GroupChatUpdateSchema */
export interface GroupChatUpdateSchema {
  /**
   * Name
   * The name of the group chat.
   */
  name?: string | null;
  /** Space Id */
  space_id?: string | null;
  /** Tools available in the group chat. */
  tools?: GroupChatUpdateTools | null;
  /**
   * Allow Mentions
   * Indicates if mentions are allowed.
   */
  allow_mentions?: boolean | null;
  /**
   * Show Response Label
   * Indicates if the response label should be shown.
   */
  show_response_label?: boolean | null;
}

/** GroupChatUpdateTools */
export interface GroupChatUpdateTools {
  /** Assistants */
  assistants: GroupChatAssistantUpdateSchema[];
}

/** GroupMetadata */
export interface GroupMetadata {
  /** Num Info Blobs */
  num_info_blobs: number;
  /** Size */
  size: number;
}

/** GroupPublicBase */
export interface GroupPublicBase {
  /** Name */
  name: string;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** GroupPublicWithMetadata */
export interface GroupPublicWithMetadata {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Name */
  name: string;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  embedding_model: EmbeddingModelPublic;
  metadata: GroupMetadata;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** IdAndName */
export interface IdAndName {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
}

/** InfoBlobAddPublic */
export interface InfoBlobAddPublic {
  /** Text */
  text: string;
  metadata?: InfoBlobMetadataUpsertPublic;
}

/** InfoBlobAskAssistantPublic */
export interface InfoBlobAskAssistantPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  metadata: InfoBlobMetadata;
  /** Group Id */
  group_id?: string | null;
  /** Website Id */
  website_id?: string | null;
  /** Score */
  score: number;
}

/** InfoBlobLimits */
export interface InfoBlobLimits {
  /** Formats */
  formats: FormatLimit[];
}

/** InfoBlobMetadata */
export interface InfoBlobMetadata {
  /** Url */
  url?: string | null;
  /** Title */
  title?: string | null;
  /**
   * Embedding Model Id
   * @format uuid
   */
  embedding_model_id: string;
  /** Size */
  size: number;
}

/** InfoBlobMetadataUpsertPublic */
export interface InfoBlobMetadataUpsertPublic {
  /** Url */
  url?: string | null;
  /** Title */
  title?: string | null;
}

/** InfoBlobPublic */
export interface InfoBlobPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  metadata: InfoBlobMetadata;
  /** Group Id */
  group_id?: string | null;
  /** Website Id */
  website_id?: string | null;
  /** Text */
  text: string;
}

/** InfoBlobPublicNoText */
export interface InfoBlobPublicNoText {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  metadata: InfoBlobMetadata;
  /** Group Id */
  group_id?: string | null;
  /** Website Id */
  website_id?: string | null;
}

/** InfoBlobUpdatePublic */
export interface InfoBlobUpdatePublic {
  metadata: InfoBlobMetadataUpsertPublic;
}

/** InfoBlobUpsertRequest */
export interface InfoBlobUpsertRequest {
  /** Info Blobs */
  info_blobs: InfoBlobAddPublic[];
}

/** InputField */
export interface InputField {
  type: InputFieldType;
  /** Description */
  description?: string | null;
}

/** InputFieldPublic */
export interface InputFieldPublic {
  /** Accepted File Types */
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
  type: InputFieldType;
  /** Description */
  description?: string | null;
}

/** InputFieldType */
export enum InputFieldType {
  TextField = "text-field",
  TextUpload = "text-upload",
  AudioUpload = "audio-upload",
  AudioRecorder = "audio-recorder",
  ImageUpload = "image-upload",
}

/** Integration */
export interface Integration {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Integration Type */
  integration_type: string;
}

/** IntegrationCreate */
export interface IntegrationCreate {
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Integration Type */
  integration_type: string;
}

/** IntegrationKnowledgeMetaData */
export interface IntegrationKnowledgeMetaData {
  /** Size */
  size: number;
}

/** IntegrationKnowledgePublic */
export interface IntegrationKnowledgePublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Url */
  url: string;
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
  /**
   * Space Id
   * @format uuid
   */
  space_id: string;
  /**
   * User Integration Id
   * @format uuid
   */
  user_integration_id: string;
  embedding_model: EmbeddingModelPublic;
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  metadata: IntegrationKnowledgeMetaData;
}

/** IntegrationList */
export interface IntegrationList {
  /** Items */
  items: Integration[];
  /** Count */
  count: number;
}

/** IntegrationPreviewData */
export interface IntegrationPreviewData {
  /** Key */
  key: string;
  /** Type */
  type: string;
  /** Name */
  name: string;
  /** Url */
  url: string;
}

/** IntegrationPreviewDataList */
export interface IntegrationPreviewDataList {
  /** Items */
  items: IntegrationPreviewData[];
  /** Count */
  count: number;
}

/** JobPublic */
export interface JobPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name?: string | null;
  status: Status;
  task: Task;
  /** Result Location */
  result_location?: string | null;
  /** Finished At */
  finished_at?: string | null;
}

/** Knowledge */
export interface Knowledge {
  groups: PaginatedPermissionsGroupPublicWithMetadata;
  websites: PaginatedPermissionsWebsiteSparse;
  integration_knowledge_list: PaginatedPermissionsIntegrationKnowledgePublic;
}

/** Limit */
export interface Limit {
  /** Max Files */
  max_files: number;
  /** Max Size */
  max_size: number;
}

/** Limits */
export interface Limits {
  info_blobs: InfoBlobLimits;
  attachments: AttachmentLimits;
}

/** LoggingDetailsPublic */
export interface LoggingDetailsPublic {
  /** Context */
  context?: string | null;
  /** Model Kwargs */
  model_kwargs: object;
  /** Json Body */
  json_body: any;
}

/** Message */
export interface Message {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Question */
  question: string;
  /** Answer */
  answer: string;
  completion_model?: CompletionModel | null;
  /** References */
  references: InfoBlobPublicNoText[];
  /** Files */
  files: FilePublic[];
  tools: UseTools;
}

/** MessageLogging */
export interface MessageLogging {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Question */
  question: string;
  /** Answer */
  answer: string;
  completion_model?: CompletionModel | null;
  /** References */
  references: InfoBlobPublicNoText[];
  /** Files */
  files: FilePublic[];
  tools: UseTools;
  logging_details: LoggingDetailsPublic;
}

/** MetadataStatistics */
export interface MetadataStatistics {
  /** Assistants */
  assistants: AssistantMetadata[];
  /** Sessions */
  sessions: SessionMetadata[];
  /** Questions */
  questions: QuestionMetadata[];
}

/** ModelFamily */
export enum ModelFamily {
  Openai = "openai",
  Mistral = "mistral",
  Vllm = "vllm",
  Claude = "claude",
  Azure = "azure",
  Ovhcloud = "ovhcloud",
}

/** ModelHostingLocation */
export enum ModelHostingLocation {
  Usa = "usa",
  Eu = "eu",
  Swe = "swe",
}

/** ModelId */
export interface ModelId {
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** ModelKwargs */
export interface ModelKwargs {
  /** Temperature */
  temperature?: number | null;
  /** Top P */
  top_p?: number | null;
}

/** ModelOrg */
export enum ModelOrg {
  OpenAI = "OpenAI",
  Meta = "Meta",
  Microsoft = "Microsoft",
  Anthropic = "Anthropic",
  Mistral = "Mistral",
  KBLab = "KBLab",
}

/** ModelStability */
export enum ModelStability {
  Stable = "stable",
  Experimental = "experimental",
}

/** ModuleBase */
export interface ModuleBase {
  /** Name */
  name: Modules | string;
}

/** ModuleInDB */
export interface ModuleInDB {
  /** Name */
  name: Modules | string;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/**
 * Modules
 * Any change to these enums will result in database changes
 */
export enum Modules {
  EuHosting = "eu_hosting",
  IntricApplications = "intric-applications",
}

/** OpenIdConnectLogin */
export interface OpenIdConnectLogin {
  /** Code */
  code: string;
  /** Code Verifier */
  code_verifier: string;
  /** Redirect Uri */
  redirect_uri: string;
  /**
   * Client Id
   * @default "intric"
   */
  client_id?: string;
  /**
   * Grant Type
   * @default "authorization_code"
   */
  grant_type?: string;
  /**
   * Scope
   * @default "openid"
   */
  scope?: string;
  /** Nonce */
  nonce?: string;
}

/** PaginatedPermissions[AppSparse] */
export interface PaginatedPermissionsAppSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: AppSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[AssistantSparse] */
export interface PaginatedPermissionsAssistantSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: AssistantSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[GroupChatSparse] */
export interface PaginatedPermissionsGroupChatSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: GroupChatSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[GroupPublicWithMetadata] */
export interface PaginatedPermissionsGroupPublicWithMetadata {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: GroupPublicWithMetadata[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[IntegrationKnowledgePublic] */
export interface PaginatedPermissionsIntegrationKnowledgePublic {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: IntegrationKnowledgePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[ServiceSparse] */
export interface PaginatedPermissionsServiceSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: ServiceSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[SpaceMember] */
export interface PaginatedPermissionsSpaceMember {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: SpaceMember[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedPermissions[WebsiteSparse] */
export interface PaginatedPermissionsWebsiteSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * Items
   * List of items returned in the response
   */
  items: WebsiteSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[AllowedOriginInDB] */
export interface PaginatedResponseAllowedOriginInDB {
  /**
   * Items
   * List of items returned in the response
   */
  items: AllowedOriginInDB[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[AllowedOriginPublic] */
export interface PaginatedResponseAllowedOriginPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: AllowedOriginPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[AppRunSparse] */
export interface PaginatedResponseAppRunSparse {
  /**
   * Items
   * List of items returned in the response
   */
  items: AppRunSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[AssistantPublic] */
export interface PaginatedResponseAssistantPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: AssistantPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[CompletionModelPublic] */
export interface PaginatedResponseCompletionModelPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: CompletionModelPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[CrawlRunPublic] */
export interface PaginatedResponseCrawlRunPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: CrawlRunPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[EmbeddingModelPublic] */
export interface PaginatedResponseEmbeddingModelPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: EmbeddingModelPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[EmbeddingModel] */
export interface PaginatedResponseEmbeddingModel {
  /**
   * Items
   * List of items returned in the response
   */
  items: EmbeddingModel[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[FilePublic] */
export interface PaginatedResponseFilePublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: FilePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[GroupPublicWithMetadata] */
export interface PaginatedResponseGroupPublicWithMetadata {
  /**
   * Items
   * List of items returned in the response
   */
  items: GroupPublicWithMetadata[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[InfoBlobPublicNoText] */
export interface PaginatedResponseInfoBlobPublicNoText {
  /**
   * Items
   * List of items returned in the response
   */
  items: InfoBlobPublicNoText[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[InfoBlobPublic] */
export interface PaginatedResponseInfoBlobPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: InfoBlobPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[JobPublic] */
export interface PaginatedResponseJobPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: JobPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[Message] */
export interface PaginatedResponseMessage {
  /**
   * Items
   * List of items returned in the response
   */
  items: Message[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[ModuleInDB] */
export interface PaginatedResponseModuleInDB {
  /**
   * Items
   * List of items returned in the response
   */
  items: ModuleInDB[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[PredefinedRolePublic] */
export interface PaginatedResponsePredefinedRolePublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: PredefinedRolePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[PromptSparse] */
export interface PaginatedResponsePromptSparse {
  /**
   * Items
   * List of items returned in the response
   */
  items: PromptSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[RolePublic] */
export interface PaginatedResponseRolePublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: RolePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[SemanticSearchResponse] */
export interface PaginatedResponseSemanticSearchResponse {
  /**
   * Items
   * List of items returned in the response
   */
  items: SemanticSearchResponse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[ServicePublicWithUser] */
export interface PaginatedResponseServicePublicWithUser {
  /**
   * Items
   * List of items returned in the response
   */
  items: ServicePublicWithUser[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[ServiceRun] */
export interface PaginatedResponseServiceRun {
  /**
   * Items
   * List of items returned in the response
   */
  items: ServiceRun[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[SpaceDashboard] */
export interface PaginatedResponseSpaceDashboard {
  /**
   * Items
   * List of items returned in the response
   */
  items: SpaceDashboard[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[SpaceSparse] */
export interface PaginatedResponseSpaceSparse {
  /**
   * Items
   * List of items returned in the response
   */
  items: SpaceSparse[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[TenantInDB] */
export interface PaginatedResponseTenantInDB {
  /**
   * Items
   * List of items returned in the response
   */
  items: TenantInDB[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[TranscriptionModelPublic] */
export interface PaginatedResponseTranscriptionModelPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: TranscriptionModelPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[UserAdminView] */
export interface PaginatedResponseUserAdminView {
  /**
   * Items
   * List of items returned in the response
   */
  items: UserAdminView[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[UserGroupPublic] */
export interface PaginatedResponseUserGroupPublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: UserGroupPublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[UserInDB] */
export interface PaginatedResponseUserInDB {
  /**
   * Items
   * List of items returned in the response
   */
  items: UserInDB[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[WebsitePublic] */
export interface PaginatedResponseWebsitePublic {
  /**
   * Items
   * List of items returned in the response
   */
  items: WebsitePublic[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PaginatedResponse[str] */
export interface PaginatedResponseStr {
  /**
   * Items
   * List of items returned in the response
   */
  items: string[];
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
}

/** PartialAppUpdateRequest */
export interface PartialAppUpdateRequest {
  /** Name */
  name?: string | null;
  /** Description */
  description?: string | null;
  /** Input Fields */
  input_fields?: InputField[] | null;
  /** Attachments */
  attachments?: ModelId[] | null;
  prompt?: PromptCreate | null;
  completion_model?: ModelId | null;
  completion_model_kwargs?: ModelKwargs | null;
  transcription_model?: ModelId | null;
}

/** PartialAssistantUpdatePublic */
export interface PartialAssistantUpdatePublic {
  /** Name */
  name?: string | null;
  completion_model_kwargs?: ModelKwargs | null;
  /** Logging Enabled */
  logging_enabled?: boolean | null;
  prompt?: PromptCreate | null;
  /** Space Id */
  space_id?: string | null;
  /** Groups */
  groups?: ModelId[] | null;
  /** Websites */
  websites?: ModelId[] | null;
  /** Integration Knowledge List */
  integration_knowledge_list?: ModelId[] | null;
  guardrail?: AssistantGuard | null;
  completion_model?: ModelId | null;
  /** Attachments */
  attachments?: ModelId[] | null;
  /**
   * Description
   * A description of the assitant that will be used as default description in GroupChatAssistantPublic
   * @example "This is a helpful AI assistant"
   */
  description?: string | null;
}

/** PartialGroupUpdatePublic */
export interface PartialGroupUpdatePublic {
  /** Name */
  name?: string | null;
}

/** PartialPropUserUpdate */
export interface PartialPropUserUpdate {
  predefined_role?: ModelId | null;
  state?: UserState | null;
}

/** PartialServiceUpdatePublic */
export interface PartialServiceUpdatePublic {
  /** Output Format */
  output_format?: PartialServiceUpdatePublicOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
  /** Name */
  name?: string | null;
  /** Prompt */
  prompt?: string | null;
  completion_model_kwargs?: ModelKwargs | null;
  /** Groups */
  groups?: ModelId[] | null;
  completion_model?: ModelId | null;
}

/** PartialUpdateSpaceRequest */
export interface PartialUpdateSpaceRequest {
  /** Name */
  name?: string | null;
  /** Description */
  description?: string | null;
  /** Embedding Models */
  embedding_models?: ModelId[] | null;
  /** Completion Models */
  completion_models?: ModelId[] | null;
  /** Transcription Models */
  transcription_models?: ModelId[] | null;
}

/** PartialWebsiteUpdateRequest */
export interface PartialWebsiteUpdateRequest {
  /** Name */
  name?: string | null;
  /** Url */
  url?: string | null;
  /** Space Id */
  space_id?: string | null;
  /** Download Files */
  download_files?: boolean | null;
  crawl_type?: CrawlType | null;
  update_interval?: UpdateInterval | null;
  embedding_model?: ModelId | null;
}

/** Permission */
export enum Permission {
  Assistants = "assistants",
  GroupChats = "group_chats",
  Apps = "apps",
  Services = "services",
  Collections = "collections",
  Insights = "insights",
  AI = "AI",
  Editor = "editor",
  Admin = "admin",
  Websites = "websites",
  IntegrationKnowledgeList = "integration_knowledge_list",
}

/** PermissionPublic */
export interface PermissionPublic {
  name: Permission;
  /** Description */
  description: string;
}

/** PredefinedRoleInDB */
export interface PredefinedRoleInDB {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /** Permissions */
  permissions: Permission[];
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** PredefinedRolePublic */
export interface PredefinedRolePublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /** Permissions */
  permissions: Permission[];
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** PrivacyPolicy */
export interface PrivacyPolicy {
  /** Url */
  url?: string | null;
}

/** PromptCreate */
export interface PromptCreate {
  /** Text */
  text: string;
  /** Description */
  description?: string | null;
}

/** PromptPublic */
export interface PromptPublic {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Description */
  description?: string | null;
  /** Is Selected */
  is_selected?: boolean | null;
  user: UserSparse;
  /** Text */
  text: string;
}

/** PromptPublicAppTemplate */
export interface PromptPublicAppTemplate {
  /** Text */
  text: string | null;
}

/** PromptPublicAssistantTemplate */
export interface PromptPublicAssistantTemplate {
  /** Text */
  text: string | null;
}

/** PromptSparse */
export interface PromptSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Description */
  description?: string | null;
  /** Is Selected */
  is_selected: boolean;
  user: UserSparse;
}

/** PropUserInvite */
export interface PropUserInvite {
  predefined_role?: ModelId | null;
  state?: UserState | null;
  /**
   * Email
   * @format email
   */
  email: string;
}

/** QuestionMetadata */
export interface QuestionMetadata {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Assistant Id */
  assistant_id?: string | null;
  /**
   * Session Id
   * @format uuid
   */
  session_id: string;
}

/** ResourcePermission */
export enum ResourcePermission {
  Read = "read",
  Create = "create",
  Edit = "edit",
  Delete = "delete",
  Add = "add",
  Remove = "remove",
  Publish = "publish",
}

/** RoleCreateRequest */
export interface RoleCreateRequest {
  /** Name */
  name: string;
  /** Permissions */
  permissions: Permission[];
}

/** RoleInDB */
export interface RoleInDB {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Permissions */
  permissions: Permission[];
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
}

/** RolePublic */
export interface RolePublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Permissions */
  permissions: Permission[];
}

/** RoleUpdateRequest */
export interface RoleUpdateRequest {
  /** Name */
  name?: string | null;
  /** Permissions */
  permissions?: Permission[] | null;
}

/** RolesPaginatedResponse */
export interface RolesPaginatedResponse {
  roles: PaginatedResponseRolePublic;
  predefined_roles: PaginatedResponsePredefinedRolePublic;
}

/** RunAppRequest */
export interface RunAppRequest {
  /**
   * Files
   * @default []
   */
  files?: ModelId[];
  /** Text */
  text?: string | null;
}

/** RunService */
export interface RunService {
  /** Input */
  input: string;
  /**
   * Files
   * @maxItems 5
   * @default []
   */
  files?: ModelId[];
}

/** SemanticSearchRequest */
export interface SemanticSearchRequest {
  /** Search String */
  search_string: string;
  /**
   * Num Chunks
   * @default 30
   */
  num_chunks?: number;
  /**
   * Autocut Cutoff
   * Experimental feature that tries to limit the amount of chunks to only the relevant ones, based on the score. Set to null (or omit completely) to not use this feature
   */
  autocut_cutoff?: number | null;
}

/** SemanticSearchResponse */
export interface SemanticSearchResponse {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Info Blob Id
   * @format uuid
   */
  info_blob_id: string;
  /** Text */
  text: string;
  /** Score */
  score: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** ServiceCreatePublic */
export interface ServiceCreatePublic {
  /** Output Format */
  output_format?: ServiceCreatePublicOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** @default {} */
  completion_model_kwargs?: ModelKwargs | null;
  /**
   * Groups
   * @default []
   */
  groups?: ModelId[];
  completion_model: ModelId;
}

/** ServiceOutput */
export interface ServiceOutput {
  /** Output */
  output: object | any[] | string | boolean;
  /**
   * Files
   * @default []
   */
  files?: FilePublic[];
}

/** ServicePublicWithUser */
export interface ServicePublicWithUser {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Output Format */
  output_format?: ServicePublicWithUserOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  completion_model_kwargs?: ModelKwargs | null;
  /** Space Id */
  space_id?: string | null;
  /** Groups */
  groups: GroupPublicBase[];
  completion_model: CompletionModelPublic;
  user: UserPublicBase;
}

/** ServiceRun */
export interface ServiceRun {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Input */
  input: string;
  /** Output */
  output: object | any[] | string;
  completion_model: CompletionModelPublic;
  /** References */
  references: InfoBlobPublic[];
}

/** ServiceSparse */
export interface ServiceSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Output Format */
  output_format?: ServiceSparseOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** @default {} */
  completion_model_kwargs?: ModelKwargs | null;
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
}

/** SessionFeedback */
export interface SessionFeedback {
  /** Value */
  value: SessionFeedbackValueEnum;
  /** Text */
  text?: string | null;
}

/** SessionMetadata */
export interface SessionMetadata {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Assistant Id */
  assistant_id?: string | null;
  /** Group Chat Id */
  group_chat_id?: string | null;
}

/** SessionMetadataPublic */
export interface SessionMetadataPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** SessionPublic */
export interface SessionPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Messages
   * @default []
   */
  messages?: Message[];
  feedback?: SessionFeedback | null;
}

/** SettingsPublic */
export interface SettingsPublic {
  /**
   * Chatbot Widget
   * @default {}
   */
  chatbot_widget?: object;
}

/** SignUpRequest */
export interface SignUpRequest {
  /** Tenant Name */
  tenant_name: string;
  /**
   * User Email
   * @format email
   */
  user_email: string;
}

/** SignedURLRequest */
export interface SignedURLRequest {
  /**
   * Expires In
   * @default 3600
   */
  expires_in?: number;
  /** @default "attachment" */
  content_disposition?: ContentDisposition;
}

/** SignedURLResponse */
export interface SignedURLResponse {
  /** Url */
  url: string;
  /** Expires At */
  expires_at: number;
}

/** SpaceDashboard */
export interface SpaceDashboard {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string | null;
  /** Personal */
  personal: boolean;
  applications: Applications;
}

/** SpaceMember */
export interface SpaceMember {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  role: SpaceRoleValue;
}

/** SpacePublic */
export interface SpacePublic {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string | null;
  /** Personal */
  personal: boolean;
  applications: Applications;
  /** Embedding Models */
  embedding_models: EmbeddingModelSparse[];
  /** Completion Models */
  completion_models: CompletionModelSparse[];
  /** Transcription Models */
  transcription_models: TranscriptionModelPublic[];
  knowledge: Knowledge;
  members: PaginatedPermissionsSpaceMember;
  default_assistant: DefaultAssistant;
  /** Available Roles */
  available_roles: SpaceRole[];
}

/** SpaceRole */
export interface SpaceRole {
  value: SpaceRoleValue;
  /** Label */
  label: string;
}

/** SpaceRoleValue */
export enum SpaceRoleValue {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

/** SpaceSparse */
export interface SpaceSparse {
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string | null;
  /** Personal */
  personal: boolean;
}

/** Status */
export enum Status {
  InProgress = "in progress",
  Queued = "queued",
  Complete = "complete",
  Failed = "failed",
  NotFound = "not found",
}

/** StorageInfoModel */
export interface StorageInfoModel {
  /** Count */
  count: number;
  /** Items */
  items: StorageSpaceInfoModel[];
}

/** StorageModel */
export interface StorageModel {
  /** Total Used */
  total_used: number;
  /** Personal Used */
  personal_used: number;
  /** Shared Used */
  shared_used: number;
  /** Limit */
  limit: number;
}

/** StorageSpaceInfoModel */
export interface StorageSpaceInfoModel {
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Update At
   * @format date-time
   */
  update_at: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Size */
  size: number;
  /** Members */
  members: StorageSpaceMemberModel[];
}

/** StorageSpaceMemberModel */
export interface StorageSpaceMemberModel {
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Email */
  email: string;
  /** Role */
  role: string;
}

/** Task */
export enum Task {
  UploadInfoBlob = "upload_info_blob",
  Transcription = "transcription",
  Crawl = "crawl",
  EmbedGroup = "embed_group",
  CrawlAllWebsites = "crawl_all_websites",
  RunApp = "run_app",
  PullConfluenceContent = "pull_confluence_content",
}

/** TemplateCreate */
export interface TemplateCreate {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Additional Fields */
  additional_fields: AdditionalField[] | null;
}

/** TemplateListPublic */
export interface TemplateListPublic {
  /** Items */
  items: (AppTemplatePublic | AssistantTemplatePublic)[];
  /** Count */
  count: number;
}

/** TemplateWizard */
export interface TemplateWizard {
  /**
   * Required
   * @default false
   */
  required?: boolean;
  /** Title */
  title?: string | null;
  /** Description */
  description?: string | null;
}

/** TenantBase */
export interface TenantBase {
  /** Name */
  name: string;
  /** Display Name */
  display_name?: string | null;
  /**
   * Quota Limit
   * Size in bytes. Default is 10 GB
   * @default 10737418240
   */
  quota_limit?: number;
  /** Domain */
  domain?: string | null;
  /** Zitadel Org Id */
  zitadel_org_id?: string | null;
  /**
   * Provisioning
   * @default false
   */
  provisioning?: boolean;
  /** @default "active" */
  state?: TenantState;
}

/** TenantInDB */
export interface TenantInDB {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Privacy Policy */
  privacy_policy?: string | null;
  /** Name */
  name: string;
  /** Display Name */
  display_name?: string | null;
  /** Quota Limit */
  quota_limit: number;
  /** Domain */
  domain?: string | null;
  /** Zitadel Org Id */
  zitadel_org_id?: string | null;
  /**
   * Provisioning
   * @default false
   */
  provisioning?: boolean;
  /** @default "active" */
  state?: TenantState;
  /**
   * Modules
   * @default []
   */
  modules?: ModuleInDB[];
}

/** TenantIntegration */
export interface TenantIntegration {
  /** Id */
  id?: string | null;
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Integration Type */
  integration_type: string;
  /**
   * Integration Id
   * @format uuid
   */
  integration_id: string;
  /** Is Linked To Tenant */
  is_linked_to_tenant: boolean;
}

/** TenantIntegrationFilter */
export enum TenantIntegrationFilter {
  All = "all",
  TenantOnly = "tenant_only",
}

/** TenantIntegrationList */
export interface TenantIntegrationList {
  /** Items */
  items: TenantIntegration[];
  /** Count */
  count: number;
}

/** TenantPublic */
export interface TenantPublic {
  /** Name */
  name: string;
  /** Display Name */
  display_name?: string | null;
  /**
   * Quota Limit
   * Size in bytes. Default is 10 GB
   * @default 10737418240
   */
  quota_limit?: number;
  /** Domain */
  domain?: string | null;
  /** Zitadel Org Id */
  zitadel_org_id?: string | null;
  /**
   * Provisioning
   * @default false
   */
  provisioning?: boolean;
  /** @default "active" */
  state?: TenantState;
  /** Privacy Policy */
  privacy_policy?: string | null;
}

/** TenantState */
export enum TenantState {
  Active = "active",
  Suspended = "suspended",
}

/** TenantUpdatePublic */
export interface TenantUpdatePublic {
  /** Display Name */
  display_name?: string | null;
  /** Quota Limit */
  quota_limit?: number | null;
  /** Domain */
  domain?: string | null;
  /** Zitadel Org Id */
  zitadel_org_id?: string | null;
  /** Provisioning */
  provisioning?: boolean | null;
  state?: TenantState | null;
}

/** ToolAssistant */
export interface ToolAssistant {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Handle */
  handle: string;
}

/** Tools */
export interface Tools {
  /** Assistants */
  assistants: ToolAssistant[];
}

/** TranscriptionModelPublic */
export interface TranscriptionModelPublic {
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  family: ModelFamily;
  /** Is Deprecated */
  is_deprecated: boolean;
  stability: ModelStability;
  hosting: ModelHostingLocation;
  /** Open Source */
  open_source?: boolean | null;
  /** Description */
  description?: string | null;
  /** Hf Link */
  hf_link?: string | null;
  org?: ModelOrg | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /**
   * Is Org Enabled
   * @default false
   */
  is_org_enabled?: boolean;
  /**
   * Is Org Default
   * @default false
   */
  is_org_default?: boolean;
  /**
   * Can Access
   * @default false
   */
  can_access?: boolean;
  /**
   * Is Locked
   * @default true
   */
  is_locked?: boolean;
}

/** TranscriptionModelUpdateFlags */
export interface TranscriptionModelUpdateFlags {
  /** Is Org Enabled */
  is_org_enabled?: boolean | null;
  /** Is Org Default */
  is_org_default?: boolean | null;
}

/** TransferApplicationRequest */
export interface TransferApplicationRequest {
  /**
   * Target Space Id
   * @format uuid
   */
  target_space_id: string;
  /**
   * Move Resources
   * @default false
   */
  move_resources?: boolean;
}

/** TransferRequest */
export interface TransferRequest {
  /**
   * Target Space Id
   * @format uuid
   */
  target_space_id: string;
}

/** UpdateInterval */
export enum UpdateInterval {
  Never = "never",
  Weekly = "weekly",
}

/** UpdateSpaceMemberRequest */
export interface UpdateSpaceMemberRequest {
  role: SpaceRoleValue;
}

/** UseTools */
export interface UseTools {
  /** Assistants */
  assistants: ModelId[];
}

/** UserAddAdmin */
export interface UserAddAdmin {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Password */
  password?: string | null;
  /**
   * Quota Limit
   * Size in bytes
   */
  quota_limit?: number | null;
  /**
   * Roles
   * @default []
   */
  roles?: ModelId[];
  /**
   * Predefined Roles
   * @default []
   */
  predefined_roles?: ModelId[];
}

/** UserAddSuperAdmin */
export interface UserAddSuperAdmin {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Password */
  password?: string | null;
  /**
   * Quota Limit
   * Size in bytes
   */
  quota_limit?: number | null;
  /**
   * Roles
   * @default []
   */
  roles?: ModelId[];
  /**
   * Predefined Roles
   * @default []
   */
  predefined_roles?: ModelId[];
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
}

/** UserAdminView */
export interface UserAdminView {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /** Used Tokens */
  used_tokens: number;
  /** Email Verified */
  email_verified: boolean;
  /** Quota Limit */
  quota_limit: number | null;
  /** Is Active */
  is_active: boolean;
  state: UserState;
  /** Roles */
  roles: RolePublic[];
  /** Predefined Roles */
  predefined_roles: PredefinedRolePublic[];
  /** User Groups */
  user_groups: UserGroupRead[];
}

/** UserCreated */
export interface UserCreated {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Password */
  password?: string | null;
  /** Salt */
  salt?: string | null;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  state: UserState;
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
  /** Quota Limit */
  quota_limit?: number | null;
  /**
   * Roles
   * @default []
   */
  roles?: RoleInDB[];
  /**
   * Predefined Roles
   * @default []
   */
  predefined_roles?: PredefinedRoleInDB[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * User Groups
   * @default []
   */
  user_groups?: UserGroupInDBRead[];
  tenant: TenantInDB;
  api_key: ApiKey | null;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  access_token: AccessToken | null;
  /** Modules */
  modules: string[];
  /**
   * User Groups Ids
   * @uniqueItems true
   */
  user_groups_ids: number[];
  /**
   * Permissions
   * @uniqueItems true
   */
  permissions: Permission[];
}

/** UserCreatedAdminView */
export interface UserCreatedAdminView {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /** Used Tokens */
  used_tokens: number;
  /** Email Verified */
  email_verified: boolean;
  /** Quota Limit */
  quota_limit: number | null;
  /** Is Active */
  is_active: boolean;
  state: UserState;
  /** Roles */
  roles: RolePublic[];
  /** Predefined Roles */
  predefined_roles: PredefinedRolePublic[];
  /** User Groups */
  user_groups: UserGroupRead[];
  api_key: ApiKey;
}

/** UserGroupCreateRequest */
export interface UserGroupCreateRequest {
  /** Name */
  name: string;
}

/** UserGroupInDBRead */
export interface UserGroupInDBRead {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
}

/** UserGroupPublic */
export interface UserGroupPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /**
   * Users
   * @default []
   */
  users?: UserPublicBase[];
}

/** UserGroupRead */
export interface UserGroupRead {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
}

/** UserGroupUpdateRequest */
export interface UserGroupUpdateRequest {
  /** Name */
  name?: string | null;
  /**
   * Users
   * @default []
   */
  users?: ModelId[];
}

/** UserInDB */
export interface UserInDB {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Password */
  password?: string | null;
  /** Salt */
  salt?: string | null;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  state: UserState;
  /**
   * Tenant Id
   * @format uuid
   */
  tenant_id: string;
  /** Quota Limit */
  quota_limit?: number | null;
  /**
   * Roles
   * @default []
   */
  roles?: RoleInDB[];
  /**
   * Predefined Roles
   * @default []
   */
  predefined_roles?: PredefinedRoleInDB[];
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * User Groups
   * @default []
   */
  user_groups?: UserGroupInDBRead[];
  tenant: TenantInDB;
  api_key?: ApiKeyInDB | null;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /** Modules */
  modules: string[];
  /**
   * User Groups Ids
   * @uniqueItems true
   */
  user_groups_ids: number[];
  /**
   * Permissions
   * @uniqueItems true
   */
  permissions: Permission[];
}

/** UserIntegration */
export interface UserIntegration {
  /** Id */
  id?: string | null;
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Integration Type */
  integration_type: string;
  /**
   * Tenant Integration Id
   * @format uuid
   */
  tenant_integration_id: string;
  /** Connected */
  connected: boolean;
}

/** UserIntegrationList */
export interface UserIntegrationList {
  /** Items */
  items: UserIntegration[];
  /** Count */
  count: number;
}

/** UserProvision */
export interface UserProvision {
  /** Zitadel Token */
  zitadel_token: string;
}

/** UserPublic */
export interface UserPublic {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /** Truncated Api Key */
  truncated_api_key?: string | null;
  /** Quota Limit */
  quota_limit?: number | null;
  /** Roles */
  roles: RolePublic[];
  /** Predefined Roles */
  predefined_roles: PredefinedRolePublic[];
  /** User Groups */
  user_groups: UserGroupRead[];
}

/** UserPublicBase */
export interface UserPublicBase {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
}

/** UserSparse */
export interface UserSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username?: string | null;
}

/** UserState */
export enum UserState {
  Invited = "invited",
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

/** UserUpdatePublic */
export interface UserUpdatePublic {
  /** Email */
  email?: string | null;
  /** Username */
  username?: string | null;
  /** Password */
  password?: string | null;
  /**
   * Quota Limit
   * Size in bytes
   */
  quota_limit?: number | null;
  /** Roles */
  roles?: ModelId[] | null;
  /** Predefined Roles */
  predefined_roles?: ModelId[];
  state?: UserState | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** WebsiteCreateRequest */
export interface WebsiteCreateRequest {
  /** Name */
  name?: string | null;
  /**
   * Url
   * @format uri
   * @minLength 1
   * @maxLength 2083
   */
  url: string;
  /** Space Id */
  space_id?: string | null;
  /**
   * Download Files
   * @default false
   */
  download_files?: boolean;
  /** @default "crawl" */
  crawl_type?: CrawlType;
  /** @default "never" */
  update_interval?: UpdateInterval;
  embedding_model: ModelId;
}

/** WebsiteMetadata */
export interface WebsiteMetadata {
  /** Size */
  size: number;
}

/** WebsitePublic */
export interface WebsitePublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name?: string | null;
  /** Url */
  url: string;
  /** Space Id */
  space_id?: string | null;
  /**
   * Download Files
   * @default false
   */
  download_files?: boolean;
  /** @default "crawl" */
  crawl_type?: CrawlType;
  /** @default "never" */
  update_interval?: UpdateInterval;
  latest_crawl?: CrawlRunPublic | null;
  embedding_model?: EmbeddingModelPublicBase | null;
  metadata: WebsiteMetadata;
}

/** WebsiteSparse */
export interface WebsiteSparse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name?: string | null;
  /** Url */
  url: string;
  /** Space Id */
  space_id?: string | null;
  /**
   * Download Files
   * @default false
   */
  download_files?: boolean;
  /** @default "crawl" */
  crawl_type?: CrawlType;
  /** @default "never" */
  update_interval?: UpdateInterval;
  /**
   * Permissions
   * @default []
   */
  permissions?: ResourcePermission[];
  latest_crawl?: CrawlRunSparse | null;
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
  embedding_model: IdAndName;
  metadata: WebsiteMetadata;
}

/** WizardType */
export enum WizardType {
  Attachments = "attachments",
  Groups = "groups",
}

/** WsOutgoingWebSocketMessage */
export interface WsOutgoingWebSocketMessage {
  type: any;
  /** @default null */
  data?: null;
}

/** WsAppRunUpdate */
export interface WsAppRunUpdate {
  /**
   * Id
   * @format uuid
   */
  id: string;
  status: any;
  /**
   * App Id
   * @default null
   */
  app_id?: string | null;
  /** @default null */
  space?: null;
}

export enum CreateSpaceServiceResponseOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum PartialServiceUpdatePublicOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum ServiceCreatePublicOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum ServicePublicWithUserOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

export enum ServiceSparseOutputFormatEnum {
  Json = "json",
  List = "list",
  Boolean = "boolean",
}

/** Value */
export enum SessionFeedbackValueEnum {
  Value1 = -1,
  Value11 = 1,
}
