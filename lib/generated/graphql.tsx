import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  GeoJSON: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

/** An enumeration. */
export enum AccountsAuthorityUserRoleChoices {
  /** Admin */
  Adm = "ADM",
  /** Officer */
  Ofc = "OFC",
  /** Reporter */
  Rep = "REP",
}

export type AdminAuthorityCreateMutation = {
  __typename?: "AdminAuthorityCreateMutation";
  result?: Maybe<AdminAuthorityCreateResult>;
};

export type AdminAuthorityCreateProblem = {
  __typename?: "AdminAuthorityCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminAuthorityCreateResult =
  | AdminAuthorityCreateProblem
  | AdminAuthorityCreateSuccess;

export type AdminAuthorityCreateSuccess = {
  __typename?: "AdminAuthorityCreateSuccess";
  area?: Maybe<Scalars["GeoJSON"]>;
  authorityBoundaryConnects: Array<AdminAuthorityCreateSuccess>;
  authorityInherits: Array<AdminAuthorityCreateSuccess>;
  authoritynotificationSet: Array<AdminAuthorityNotificationUpsertSuccess>;
  boundaryConnects: Array<AdminAuthorityCreateSuccess>;
  cases: Array<CaseType>;
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  incidents: Array<IncidentReportType>;
  inherits: Array<AdminAuthorityCreateSuccess>;
  invitations: Array<AdminInvitationCodeCreateSuccess>;
  name: Scalars["String"];
  places: Array<AdminPlaceUpdateSuccess>;
  reportTypes: Array<AdminReportTypeCreateSuccess>;
  updatedAt: Scalars["DateTime"];
  users: Array<AdminAuthorityUserCreateSuccess>;
};

export type AdminAuthorityDeleteMutation = {
  __typename?: "AdminAuthorityDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminAuthorityInheritLookupType = {
  __typename?: "AdminAuthorityInheritLookupType";
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AdminAuthorityInheritLookupTypeNodeConnection = {
  __typename?: "AdminAuthorityInheritLookupTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminAuthorityInheritLookupType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminAuthorityNotificationDeleteMutation = {
  __typename?: "AdminAuthorityNotificationDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminAuthorityNotificationUpsertMutation = {
  __typename?: "AdminAuthorityNotificationUpsertMutation";
  result?: Maybe<AdminAuthorityNotificationUpsertResult>;
};

export type AdminAuthorityNotificationUpsertProblem = {
  __typename?: "AdminAuthorityNotificationUpsertProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminAuthorityNotificationUpsertResult =
  | AdminAuthorityNotificationUpsertProblem
  | AdminAuthorityNotificationUpsertSuccess;

export type AdminAuthorityNotificationUpsertSuccess = {
  __typename?: "AdminAuthorityNotificationUpsertSuccess";
  authority: AdminAuthorityCreateSuccess;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  template: AdminNotificationTemplateCreateSuccess;
  to: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminAuthorityQueryType = {
  __typename?: "AdminAuthorityQueryType";
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AdminAuthorityQueryTypeNodeConnection = {
  __typename?: "AdminAuthorityQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminAuthorityQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminAuthorityUpdateMutation = {
  __typename?: "AdminAuthorityUpdateMutation";
  result?: Maybe<AdminAuthorityUpdateResult>;
};

export type AdminAuthorityUpdateProblem = {
  __typename?: "AdminAuthorityUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminAuthorityUpdateResult =
  | AdminAuthorityUpdateProblem
  | AdminAuthorityUpdateSuccess;

export type AdminAuthorityUpdateSuccess = {
  __typename?: "AdminAuthorityUpdateSuccess";
  authority?: Maybe<AuthorityType>;
};

export type AdminAuthorityUserCreateMutation = {
  __typename?: "AdminAuthorityUserCreateMutation";
  result?: Maybe<AdminAuthorityUserCreateResult>;
};

export type AdminAuthorityUserCreateProblem = {
  __typename?: "AdminAuthorityUserCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminAuthorityUserCreateResult =
  | AdminAuthorityUserCreateProblem
  | AdminAuthorityUserCreateSuccess;

export type AdminAuthorityUserCreateSuccess = {
  __typename?: "AdminAuthorityUserCreateSuccess";
  authority: AdminAuthorityCreateSuccess;
  avatar?: Maybe<Scalars["String"]>;
  avatarUrl?: Maybe<Scalars["String"]>;
  consent: Scalars["Boolean"];
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  fcmToken: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  lastName: Scalars["String"];
  password: Scalars["String"];
  role?: Maybe<AccountsAuthorityUserRoleChoices>;
  telephone?: Maybe<Scalars["String"]>;
  thumbnailAvatarUrl?: Maybe<Scalars["String"]>;
  userPtr: UserType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type AdminAuthorityUserDeleteMutation = {
  __typename?: "AdminAuthorityUserDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminAuthorityUserQueryType = {
  __typename?: "AdminAuthorityUserQueryType";
  authority: AdminAuthorityCreateSuccess;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  role?: Maybe<AccountsAuthorityUserRoleChoices>;
  telephone?: Maybe<Scalars["String"]>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type AdminAuthorityUserQueryTypeNodeConnection = {
  __typename?: "AdminAuthorityUserQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminAuthorityUserQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminAuthorityUserUpdateMutation = {
  __typename?: "AdminAuthorityUserUpdateMutation";
  result?: Maybe<AdminAuthorityUserUpdateResult>;
};

export type AdminAuthorityUserUpdatePasswordMutation = {
  __typename?: "AdminAuthorityUserUpdatePasswordMutation";
  result?: Maybe<AdminAuthorityUserUpdateResult>;
};

export type AdminAuthorityUserUpdateProblem = {
  __typename?: "AdminAuthorityUserUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminAuthorityUserUpdateResult =
  | AdminAuthorityUserUpdateProblem
  | AdminAuthorityUserUpdateSuccess;

export type AdminAuthorityUserUpdateSuccess = {
  __typename?: "AdminAuthorityUserUpdateSuccess";
  authorityUser?: Maybe<AuthorityUserType>;
};

export type AdminCaseDefinitionCreateMutation = {
  __typename?: "AdminCaseDefinitionCreateMutation";
  result?: Maybe<AdminCaseDefinitionCreateResult>;
};

export type AdminCaseDefinitionCreateProblem = {
  __typename?: "AdminCaseDefinitionCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminCaseDefinitionCreateResult =
  | AdminCaseDefinitionCreateProblem
  | AdminCaseDefinitionCreateSuccess;

export type AdminCaseDefinitionCreateSuccess = {
  __typename?: "AdminCaseDefinitionCreateSuccess";
  condition: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  reportType: AdminReportTypeCreateSuccess;
  updatedAt: Scalars["DateTime"];
};

export type AdminCaseDefinitionDeleteMutation = {
  __typename?: "AdminCaseDefinitionDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminCaseDefinitionQueryType = {
  __typename?: "AdminCaseDefinitionQueryType";
  condition: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  reportType: AdminReportTypeCreateSuccess;
};

export type AdminCaseDefinitionQueryTypeNodeConnection = {
  __typename?: "AdminCaseDefinitionQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminCaseDefinitionQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminCaseDefinitionUpdateMutation = {
  __typename?: "AdminCaseDefinitionUpdateMutation";
  result?: Maybe<AdminCaseDefinitionUpdateResult>;
};

export type AdminCaseDefinitionUpdateProblem = {
  __typename?: "AdminCaseDefinitionUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminCaseDefinitionUpdateResult =
  | AdminCaseDefinitionUpdateProblem
  | AdminCaseDefinitionUpdateSuccess;

export type AdminCaseDefinitionUpdateSuccess = {
  __typename?: "AdminCaseDefinitionUpdateSuccess";
  caseDefinition?: Maybe<CaseDefinitionType>;
};

export type AdminCategoryCreateMutation = {
  __typename?: "AdminCategoryCreateMutation";
  result?: Maybe<AdminCategoryCreateResult>;
};

export type AdminCategoryCreateProblem = {
  __typename?: "AdminCategoryCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminCategoryCreateResult =
  | AdminCategoryCreateProblem
  | AdminCategoryCreateSuccess;

export type AdminCategoryCreateSuccess = {
  __typename?: "AdminCategoryCreateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  reporttypeSet: Array<AdminReportTypeCreateSuccess>;
  updatedAt: Scalars["DateTime"];
};

export type AdminCategoryDeleteMutation = {
  __typename?: "AdminCategoryDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminCategoryQueryType = {
  __typename?: "AdminCategoryQueryType";
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type AdminCategoryQueryTypeNodeConnection = {
  __typename?: "AdminCategoryQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminCategoryQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminCategoryUpdateMutation = {
  __typename?: "AdminCategoryUpdateMutation";
  result?: Maybe<AdminCategoryUpdateResult>;
};

export type AdminCategoryUpdateProblem = {
  __typename?: "AdminCategoryUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminCategoryUpdateResult =
  | AdminCategoryUpdateProblem
  | AdminCategoryUpdateSuccess;

export type AdminCategoryUpdateSuccess = {
  __typename?: "AdminCategoryUpdateSuccess";
  category?: Maybe<CategoryType>;
};

export type AdminClientCreateMutation = {
  __typename?: "AdminClientCreateMutation";
  result?: Maybe<AdminClientCreateResult>;
};

export type AdminClientCreateProblem = {
  __typename?: "AdminClientCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminClientCreateResult =
  | AdminClientCreateProblem
  | AdminClientCreateSuccess;

export type AdminClientCreateSuccess = {
  __typename?: "AdminClientCreateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  domains: Array<AdminDomainUpdateSuccess>;
  id: Scalars["ID"];
  name: Scalars["String"];
  schemaName: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminClientQueryType = {
  __typename?: "AdminClientQueryType";
  id: Scalars["ID"];
  name: Scalars["String"];
  schemaName: Scalars["String"];
};

export type AdminClientQueryTypeNodeConnection = {
  __typename?: "AdminClientQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminClientQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminClientUpdateMutation = {
  __typename?: "AdminClientUpdateMutation";
  result?: Maybe<AdminClientUpdateResult>;
};

export type AdminClientUpdateProblem = {
  __typename?: "AdminClientUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminClientUpdateResult =
  | AdminClientUpdateProblem
  | AdminClientUpdateSuccess;

export type AdminClientUpdateSuccess = {
  __typename?: "AdminClientUpdateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  domains: Array<AdminDomainUpdateSuccess>;
  id: Scalars["ID"];
  name: Scalars["String"];
  schemaName: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminConfigurationCreateMutation = {
  __typename?: "AdminConfigurationCreateMutation";
  result?: Maybe<AdminConfigurationCreateResult>;
};

export type AdminConfigurationCreateProblem = {
  __typename?: "AdminConfigurationCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminConfigurationCreateResult =
  | AdminConfigurationCreateProblem
  | AdminConfigurationCreateSuccess;

export type AdminConfigurationCreateSuccess = {
  __typename?: "AdminConfigurationCreateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  key: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["String"];
};

export type AdminConfigurationDeleteMutation = {
  __typename?: "AdminConfigurationDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminConfigurationQueryType = {
  __typename?: "AdminConfigurationQueryType";
  key: Scalars["String"];
  value: Scalars["String"];
};

export type AdminConfigurationQueryTypeNodeConnection = {
  __typename?: "AdminConfigurationQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminConfigurationQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminConfigurationUpdateMutation = {
  __typename?: "AdminConfigurationUpdateMutation";
  result?: Maybe<AdminConfigurationUpdateResult>;
};

export type AdminConfigurationUpdateProblem = {
  __typename?: "AdminConfigurationUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminConfigurationUpdateResult =
  | AdminConfigurationUpdateProblem
  | AdminConfigurationUpdateSuccess;

export type AdminConfigurationUpdateSuccess = {
  __typename?: "AdminConfigurationUpdateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  key: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["String"];
};

export type AdminDefinitionQueryType = {
  __typename?: "AdminDefinitionQueryType";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  monitoringDefinitions?: Maybe<Array<Maybe<AdminMonitoringDefinitionType>>>;
  name: Scalars["String"];
  registerFormDefinition: Scalars["JSONString"];
};

export type AdminDefinitionQueryTypeNodeConnection = {
  __typename?: "AdminDefinitionQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminDefinitionQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminDomainCreateMutation = {
  __typename?: "AdminDomainCreateMutation";
  result?: Maybe<AdminDomainCreateResult>;
};

export type AdminDomainCreateProblem = {
  __typename?: "AdminDomainCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminDomainCreateResult =
  | AdminDomainCreateProblem
  | AdminDomainCreateSuccess;

export type AdminDomainCreateSuccess = {
  __typename?: "AdminDomainCreateSuccess";
  domain: Scalars["String"];
  id: Scalars["ID"];
  isPrimary: Scalars["Boolean"];
  tenant: AdminClientUpdateSuccess;
};

export type AdminDomainDeleteMutation = {
  __typename?: "AdminDomainDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminDomainUpdateMutation = {
  __typename?: "AdminDomainUpdateMutation";
  result?: Maybe<AdminDomainUpdateResult>;
};

export type AdminDomainUpdateProblem = {
  __typename?: "AdminDomainUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminDomainUpdateResult =
  | AdminDomainUpdateProblem
  | AdminDomainUpdateSuccess;

export type AdminDomainUpdateSuccess = {
  __typename?: "AdminDomainUpdateSuccess";
  domain: Scalars["String"];
  id: Scalars["ID"];
  isPrimary: Scalars["Boolean"];
  tenant: AdminClientUpdateSuccess;
};

export type AdminFieldValidationProblem = {
  __typename?: "AdminFieldValidationProblem";
  message: Scalars["String"];
  name: Scalars["String"];
};

export type AdminInvitationCodeCreateMutation = {
  __typename?: "AdminInvitationCodeCreateMutation";
  result?: Maybe<AdminInvitationCodeCreateResult>;
};

export type AdminInvitationCodeCreateProblem = {
  __typename?: "AdminInvitationCodeCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminInvitationCodeCreateResult =
  | AdminInvitationCodeCreateProblem
  | AdminInvitationCodeCreateSuccess;

export type AdminInvitationCodeCreateSuccess = {
  __typename?: "AdminInvitationCodeCreateSuccess";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  fromDate: Scalars["DateTime"];
  id: Scalars["ID"];
  role: Scalars["String"];
  throughDate: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type AdminInvitationCodeDeleteMutation = {
  __typename?: "AdminInvitationCodeDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminInvitationCodeQueryType = {
  __typename?: "AdminInvitationCodeQueryType";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
  fromDate: Scalars["DateTime"];
  id: Scalars["ID"];
  role: Scalars["String"];
  throughDate: Scalars["DateTime"];
};

export type AdminInvitationCodeQueryTypeNodeConnection = {
  __typename?: "AdminInvitationCodeQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminInvitationCodeQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminInvitationCodeUpdateMutation = {
  __typename?: "AdminInvitationCodeUpdateMutation";
  result?: Maybe<AdminInvitationCodeUpdateResult>;
};

export type AdminInvitationCodeUpdateProblem = {
  __typename?: "AdminInvitationCodeUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminInvitationCodeUpdateResult =
  | AdminInvitationCodeUpdateProblem
  | AdminInvitationCodeUpdateSuccess;

export type AdminInvitationCodeUpdateSuccess = {
  __typename?: "AdminInvitationCodeUpdateSuccess";
  invitationCode?: Maybe<InvitationCodeType>;
};

export type AdminMonitoringDefinitionQueryType = {
  __typename?: "AdminMonitoringDefinitionQueryType";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  name: Scalars["String"];
};

export type AdminMonitoringDefinitionType = {
  __typename?: "AdminMonitoringDefinitionType";
  description?: Maybe<Scalars["String"]>;
  formDefinition: Scalars["JSONString"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  name: Scalars["String"];
};

export type AdminNotificationTemplateAuthorityType = {
  __typename?: "AdminNotificationTemplateAuthorityType";
  notificationId?: Maybe<Scalars["Int"]>;
  notificationTemplateId: Scalars["ID"];
  notificationTemplateName: Scalars["String"];
  to?: Maybe<Scalars["String"]>;
};

export type AdminNotificationTemplateCreateMutation = {
  __typename?: "AdminNotificationTemplateCreateMutation";
  result?: Maybe<AdminNotificationTemplateCreateResult>;
};

export type AdminNotificationTemplateCreateProblem = {
  __typename?: "AdminNotificationTemplateCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminNotificationTemplateCreateResult =
  | AdminNotificationTemplateCreateProblem
  | AdminNotificationTemplateCreateSuccess;

export type AdminNotificationTemplateCreateSuccess = {
  __typename?: "AdminNotificationTemplateCreateSuccess";
  authoritynotificationSet: Array<AdminAuthorityNotificationUpsertSuccess>;
  bodyTemplate: Scalars["String"];
  condition?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  reportType: AdminReportTypeCreateSuccess;
  stateTransition?: Maybe<DeepStateTransitionType>;
  titleTemplate: Scalars["String"];
  type: CasesNotificationTemplateTypeChoices;
  updatedAt: Scalars["DateTime"];
};

export type AdminNotificationTemplateDeleteMutation = {
  __typename?: "AdminNotificationTemplateDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminNotificationTemplateQueryType = {
  __typename?: "AdminNotificationTemplateQueryType";
  id: Scalars["ID"];
  name: Scalars["String"];
  reportType: AdminReportTypeCreateSuccess;
};

export type AdminNotificationTemplateQueryTypeNodeConnection = {
  __typename?: "AdminNotificationTemplateQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminNotificationTemplateQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminNotificationTemplateUpdateMutation = {
  __typename?: "AdminNotificationTemplateUpdateMutation";
  result?: Maybe<AdminNotificationTemplateUpdateResult>;
};

export type AdminNotificationTemplateUpdateProblem = {
  __typename?: "AdminNotificationTemplateUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminNotificationTemplateUpdateResult =
  | AdminNotificationTemplateUpdateProblem
  | AdminNotificationTemplateUpdateSuccess;

export type AdminNotificationTemplateUpdateSuccess = {
  __typename?: "AdminNotificationTemplateUpdateSuccess";
  notificationTemplate?: Maybe<NotificationTemplateType>;
};

/** use to create a new observation definition */
export type AdminObservationDefinitionCreateMutation = {
  __typename?: "AdminObservationDefinitionCreateMutation";
  result?: Maybe<AdminObservationDefinitionCreateResult>;
};

export type AdminObservationDefinitionCreateProblem = {
  __typename?: "AdminObservationDefinitionCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminObservationDefinitionCreateResult =
  | AdminObservationDefinitionCreateProblem
  | AdminObservationDefinitionCreateSuccess;

export type AdminObservationDefinitionCreateSuccess = {
  __typename?: "AdminObservationDefinitionCreateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  id: Scalars["ID"];
  identityTemplate: Scalars["String"];
  isActive: Scalars["Boolean"];
  monitoringdefinitionSet: Array<AdminObservationMonitoringDefinitionCreateSuccess>;
  name: Scalars["String"];
  registerFormDefinition: Scalars["JSONString"];
  subjectrecordSet: Array<ObservationSubjectType>;
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminObservationDefinitionDeleteMutation = {
  __typename?: "AdminObservationDefinitionDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminObservationDefinitionUpdateMutation = {
  __typename?: "AdminObservationDefinitionUpdateMutation";
  result?: Maybe<AdminObservationDefinitionUpdateResult>;
};

export type AdminObservationDefinitionUpdateProblem = {
  __typename?: "AdminObservationDefinitionUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminObservationDefinitionUpdateResult =
  | AdminObservationDefinitionUpdateProblem
  | AdminObservationDefinitionUpdateSuccess;

export type AdminObservationDefinitionUpdateSuccess = {
  __typename?: "AdminObservationDefinitionUpdateSuccess";
  definition?: Maybe<ObservationDefinitionType>;
};

export type AdminObservationMonitoringDefinitionCreateMutation = {
  __typename?: "AdminObservationMonitoringDefinitionCreateMutation";
  result?: Maybe<AdminObservationMonitoringDefinitionCreateResult>;
};

export type AdminObservationMonitoringDefinitionCreateProblem = {
  __typename?: "AdminObservationMonitoringDefinitionCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminObservationMonitoringDefinitionCreateResult =
  | AdminObservationMonitoringDefinitionCreateProblem
  | AdminObservationMonitoringDefinitionCreateSuccess;

export type AdminObservationMonitoringDefinitionCreateSuccess = {
  __typename?: "AdminObservationMonitoringDefinitionCreateSuccess";
  createdAt: Scalars["DateTime"];
  definition: AdminObservationDefinitionCreateSuccess;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  formDefinition: Scalars["JSONString"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  monitoringrecordSet: Array<ObservationSubjectMonitoringRecordType>;
  name: Scalars["String"];
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminObservationMonitoringDefinitionDeleteMutation = {
  __typename?: "AdminObservationMonitoringDefinitionDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminObservationMonitoringDefinitionUpdateMutation = {
  __typename?: "AdminObservationMonitoringDefinitionUpdateMutation";
  result?: Maybe<AdminObservationMonitoringDefinitionUpdateResult>;
};

export type AdminObservationMonitoringDefinitionUpdateProblem = {
  __typename?: "AdminObservationMonitoringDefinitionUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminObservationMonitoringDefinitionUpdateResult =
  | AdminObservationMonitoringDefinitionUpdateProblem
  | AdminObservationMonitoringDefinitionUpdateSuccess;

export type AdminObservationMonitoringDefinitionUpdateSuccess = {
  __typename?: "AdminObservationMonitoringDefinitionUpdateSuccess";
  monitoringDefinition?: Maybe<ObservationMonitoringDefinitionType>;
};

export type AdminOutbreakPlanCreateMutation = {
  __typename?: "AdminOutbreakPlanCreateMutation";
  result?: Maybe<AdminOutbreakPlanCreateResult>;
};

export type AdminOutbreakPlanCreateProblem = {
  __typename?: "AdminOutbreakPlanCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminOutbreakPlanCreateResult =
  | AdminOutbreakPlanCreateProblem
  | AdminOutbreakPlanCreateSuccess;

export type AdminOutbreakPlanCreateSuccess = {
  __typename?: "AdminOutbreakPlanCreateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  places: Array<OutbreakPlaceType>;
  reportType: AdminReportTypeCreateSuccess;
  stateStep: DeepStateStepType;
  updatedAt: Scalars["DateTime"];
  zone1Color: Scalars["String"];
  zone1MessageBody: Scalars["String"];
  zone1MessageTitle: Scalars["String"];
  zone1Radius?: Maybe<Scalars["Float"]>;
  zone2Color: Scalars["String"];
  zone2MessageBody: Scalars["String"];
  zone2MessageTitle: Scalars["String"];
  zone2Radius?: Maybe<Scalars["Float"]>;
  zone3Color: Scalars["String"];
  zone3MessageBody: Scalars["String"];
  zone3MessageTitle: Scalars["String"];
  zone3Radius?: Maybe<Scalars["Float"]>;
};

export type AdminOutbreakPlanDeleteMutation = {
  __typename?: "AdminOutbreakPlanDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminOutbreakPlanQueryType = {
  __typename?: "AdminOutbreakPlanQueryType";
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  reportType: AdminReportTypeCreateSuccess;
};

export type AdminOutbreakPlanQueryTypeNodeConnection = {
  __typename?: "AdminOutbreakPlanQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminOutbreakPlanQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminOutbreakPlanUpdateMutation = {
  __typename?: "AdminOutbreakPlanUpdateMutation";
  result?: Maybe<AdminOutbreakPlanUpdateResult>;
};

export type AdminOutbreakPlanUpdateProblem = {
  __typename?: "AdminOutbreakPlanUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminOutbreakPlanUpdateResult =
  | AdminOutbreakPlanUpdateProblem
  | AdminOutbreakPlanUpdateSuccess;

export type AdminOutbreakPlanUpdateSuccess = {
  __typename?: "AdminOutbreakPlanUpdateSuccess";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  places: Array<OutbreakPlaceType>;
  reportType: AdminReportTypeCreateSuccess;
  stateStep: DeepStateStepType;
  updatedAt: Scalars["DateTime"];
  zone1Color: Scalars["String"];
  zone1MessageBody: Scalars["String"];
  zone1MessageTitle: Scalars["String"];
  zone1Radius?: Maybe<Scalars["Float"]>;
  zone2Color: Scalars["String"];
  zone2MessageBody: Scalars["String"];
  zone2MessageTitle: Scalars["String"];
  zone2Radius?: Maybe<Scalars["Float"]>;
  zone3Color: Scalars["String"];
  zone3MessageBody: Scalars["String"];
  zone3MessageTitle: Scalars["String"];
  zone3Radius?: Maybe<Scalars["Float"]>;
};

export type AdminPlaceCreateMutation = {
  __typename?: "AdminPlaceCreateMutation";
  result?: Maybe<AdminPlaceCreateResult>;
};

export type AdminPlaceCreateProblem = {
  __typename?: "AdminPlaceCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminPlaceCreateResult =
  | AdminPlaceCreateProblem
  | AdminPlaceCreateSuccess;

export type AdminPlaceCreateSuccess = {
  __typename?: "AdminPlaceCreateSuccess";
  authority: AdminAuthorityCreateSuccess;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  location?: Maybe<Scalars["GeoJSON"]>;
  name: Scalars["String"];
  notificationTo: Scalars["String"];
  outbreakPlaces: Array<OutbreakPlaceType>;
  updatedAt: Scalars["DateTime"];
};

export type AdminPlaceDeleteMutation = {
  __typename?: "AdminPlaceDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminPlaceQueryType = {
  __typename?: "AdminPlaceQueryType";
  authority: AdminAuthorityCreateSuccess;
  id: Scalars["ID"];
  name: Scalars["String"];
  notificationTo: Scalars["String"];
};

export type AdminPlaceQueryTypeNodeConnection = {
  __typename?: "AdminPlaceQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminPlaceQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminPlaceUpdateMutation = {
  __typename?: "AdminPlaceUpdateMutation";
  result?: Maybe<AdminPlaceUpdateResult>;
};

export type AdminPlaceUpdateProblem = {
  __typename?: "AdminPlaceUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminPlaceUpdateResult =
  | AdminPlaceUpdateProblem
  | AdminPlaceUpdateSuccess;

export type AdminPlaceUpdateSuccess = {
  __typename?: "AdminPlaceUpdateSuccess";
  authority: AdminAuthorityCreateSuccess;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  latitude?: Maybe<Scalars["Float"]>;
  location?: Maybe<Scalars["GeoJSON"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  notificationTo: Scalars["String"];
  outbreakPlaces: Array<OutbreakPlaceType>;
  updatedAt: Scalars["DateTime"];
};

export type AdminReportTypeCreateMutation = {
  __typename?: "AdminReportTypeCreateMutation";
  result?: Maybe<AdminReportTypeCreateResult>;
};

export type AdminReportTypeCreateProblem = {
  __typename?: "AdminReportTypeCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminReportTypeCreateResult =
  | AdminReportTypeCreateProblem
  | AdminReportTypeCreateSuccess;

export type AdminReportTypeCreateSuccess = {
  __typename?: "AdminReportTypeCreateSuccess";
  authorities: Array<AdminAuthorityCreateSuccess>;
  casedefinitionSet: Array<AdminCaseDefinitionCreateSuccess>;
  category: AdminCategoryCreateSuccess;
  createdAt: Scalars["DateTime"];
  definition: Scalars["JSONString"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  followupDefinition?: Maybe<Scalars["JSONString"]>;
  followupreports: Array<FollowupReportType>;
  id: Scalars["UUID"];
  incidentreports: Array<IncidentReportType>;
  isFollowable: Scalars["Boolean"];
  name: Scalars["String"];
  notificationtemplateSet: Array<AdminNotificationTemplateCreateSuccess>;
  ordering: Scalars["Int"];
  planSet: Array<AdminOutbreakPlanUpdateSuccess>;
  published: Scalars["Boolean"];
  rendererDataTemplate?: Maybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: Maybe<Scalars["String"]>;
  reporternotificationSet: Array<AdminReporterNotificationCreateSuccess>;
  stateDefinition?: Maybe<DeepStateDefinitionType>;
  updatedAt: Scalars["DateTime"];
};

export type AdminReportTypeDeleteMutation = {
  __typename?: "AdminReportTypeDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminReportTypeQueryType = {
  __typename?: "AdminReportTypeQueryType";
  authorities: Array<AdminAuthorityCreateSuccess>;
  category: AdminCategoryCreateSuccess;
  definition: Scalars["JSONString"];
  id: Scalars["UUID"];
  isFollowable: Scalars["Boolean"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  published: Scalars["Boolean"];
  rendererDataTemplate?: Maybe<Scalars["String"]>;
};

export type AdminReportTypeQueryTypeNodeConnection = {
  __typename?: "AdminReportTypeQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminReportTypeQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminReportTypeUpdateMutation = {
  __typename?: "AdminReportTypeUpdateMutation";
  result?: Maybe<AdminReportTypeUpdateResult>;
};

export type AdminReportTypeUpdateProblem = {
  __typename?: "AdminReportTypeUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminReportTypeUpdateResult =
  | AdminReportTypeUpdateProblem
  | AdminReportTypeUpdateSuccess;

export type AdminReportTypeUpdateSuccess = {
  __typename?: "AdminReportTypeUpdateSuccess";
  reportType?: Maybe<ReportTypeType>;
};

export type AdminReporterNotificationCreateMutation = {
  __typename?: "AdminReporterNotificationCreateMutation";
  result?: Maybe<AdminReporterNotificationCreateResult>;
};

export type AdminReporterNotificationCreateProblem = {
  __typename?: "AdminReporterNotificationCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminReporterNotificationCreateResult =
  | AdminReporterNotificationCreateProblem
  | AdminReporterNotificationCreateSuccess;

export type AdminReporterNotificationCreateSuccess = {
  __typename?: "AdminReporterNotificationCreateSuccess";
  condition: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  reportType?: Maybe<AdminReportTypeCreateSuccess>;
  template: Scalars["String"];
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AdminReporterNotificationDeleteMutation = {
  __typename?: "AdminReporterNotificationDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminReporterNotificationQueryType = {
  __typename?: "AdminReporterNotificationQueryType";
  condition: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  reportType?: Maybe<ReportTypeType>;
  template: Scalars["String"];
  titleTemplate: Scalars["String"];
};

export type AdminReporterNotificationQueryTypeNodeConnection = {
  __typename?: "AdminReporterNotificationQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminReporterNotificationQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminReporterNotificationUpdateMutation = {
  __typename?: "AdminReporterNotificationUpdateMutation";
  result?: Maybe<AdminReporterNotificationUpdateResult>;
};

export type AdminReporterNotificationUpdateProblem = {
  __typename?: "AdminReporterNotificationUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminReporterNotificationUpdateResult =
  | AdminReporterNotificationUpdateProblem
  | AdminReporterNotificationUpdateSuccess;

export type AdminReporterNotificationUpdateSuccess = {
  __typename?: "AdminReporterNotificationUpdateSuccess";
  reporterNotification?: Maybe<ReporterNotificationType>;
};

export type AdminStateDefinitionCreateMutation = {
  __typename?: "AdminStateDefinitionCreateMutation";
  result?: Maybe<AdminStateDefinitionCreateResult>;
};

export type AdminStateDefinitionCreateProblem = {
  __typename?: "AdminStateDefinitionCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateDefinitionCreateResult =
  | AdminStateDefinitionCreateProblem
  | AdminStateDefinitionCreateSuccess;

export type AdminStateDefinitionCreateSuccess = {
  __typename?: "AdminStateDefinitionCreateSuccess";
  caseSet: Array<CaseType>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  isDefault: Scalars["Boolean"];
  name: Scalars["String"];
  reporttypeSet: Array<AdminReportTypeCreateSuccess>;
  statestepSet: Array<DeepStateStepType>;
  updatedAt: Scalars["DateTime"];
};

export type AdminStateDefinitionDeleteMutation = {
  __typename?: "AdminStateDefinitionDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminStateDefinitionQueryType = {
  __typename?: "AdminStateDefinitionQueryType";
  id: Scalars["ID"];
  isDefault: Scalars["Boolean"];
  name: Scalars["String"];
};

export type AdminStateDefinitionQueryTypeNodeConnection = {
  __typename?: "AdminStateDefinitionQueryTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AdminStateDefinitionQueryType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AdminStateDefinitionUpdateMutation = {
  __typename?: "AdminStateDefinitionUpdateMutation";
  result?: Maybe<AdminStateDefinitionUpdateResult>;
};

export type AdminStateDefinitionUpdateProblem = {
  __typename?: "AdminStateDefinitionUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateDefinitionUpdateResult =
  | AdminStateDefinitionUpdateProblem
  | AdminStateDefinitionUpdateSuccess;

export type AdminStateDefinitionUpdateSuccess = {
  __typename?: "AdminStateDefinitionUpdateSuccess";
  stateDefinition?: Maybe<StateDefinitionType>;
};

export type AdminStateStepCreateMutation = {
  __typename?: "AdminStateStepCreateMutation";
  result?: Maybe<AdminStateStepCreateResult>;
};

export type AdminStateStepCreateProblem = {
  __typename?: "AdminStateStepCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateStepCreateResult =
  | AdminStateStepCreateProblem
  | AdminStateStepCreateSuccess;

export type AdminStateStepCreateSuccess = {
  __typename?: "AdminStateStepCreateSuccess";
  casestateSet: Array<CaseStateType>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  fromTransitions: Array<DeepStateTransitionType>;
  id: Scalars["ID"];
  isStartState: Scalars["Boolean"];
  isStopState: Scalars["Boolean"];
  name: Scalars["String"];
  planSet: Array<AdminOutbreakPlanUpdateSuccess>;
  stateDefinition: DeepStateDefinitionType;
  toTransitions: Array<DeepStateTransitionType>;
  updatedAt: Scalars["DateTime"];
};

export type AdminStateStepDeleteMutation = {
  __typename?: "AdminStateStepDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminStateStepUpdateMutation = {
  __typename?: "AdminStateStepUpdateMutation";
  result?: Maybe<AdminStateStepUpdateResult>;
};

export type AdminStateStepUpdateProblem = {
  __typename?: "AdminStateStepUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateStepUpdateResult =
  | AdminStateStepUpdateProblem
  | AdminStateStepUpdateSuccess;

export type AdminStateStepUpdateSuccess = {
  __typename?: "AdminStateStepUpdateSuccess";
  stateStep?: Maybe<StateStepType>;
};

export type AdminStateTransitionCreateMutation = {
  __typename?: "AdminStateTransitionCreateMutation";
  result?: Maybe<AdminStateTransitionCreateResult>;
};

export type AdminStateTransitionCreateProblem = {
  __typename?: "AdminStateTransitionCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateTransitionCreateResult =
  | AdminStateTransitionCreateProblem
  | AdminStateTransitionCreateSuccess;

export type AdminStateTransitionCreateSuccess = {
  __typename?: "AdminStateTransitionCreateSuccess";
  casestatetransitionSet: Array<CaseStateTransitionType>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  formDefinition?: Maybe<Scalars["JSONString"]>;
  fromStep: DeepStateStepType;
  id: Scalars["ID"];
  notificationtemplateSet: Array<AdminNotificationTemplateCreateSuccess>;
  toStep: DeepStateStepType;
  updatedAt: Scalars["DateTime"];
};

export type AdminStateTransitionDeleteMutation = {
  __typename?: "AdminStateTransitionDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminStateTransitionUpdateMutation = {
  __typename?: "AdminStateTransitionUpdateMutation";
  result?: Maybe<AdminStateTransitionUpdateResult>;
};

export type AdminStateTransitionUpdateProblem = {
  __typename?: "AdminStateTransitionUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type AdminStateTransitionUpdateResult =
  | AdminStateTransitionUpdateProblem
  | AdminStateTransitionUpdateSuccess;

export type AdminStateTransitionUpdateSuccess = {
  __typename?: "AdminStateTransitionUpdateSuccess";
  stateTransition?: Maybe<StateTransitionType>;
};

export type AdminUserChangePasswordMutation = {
  __typename?: "AdminUserChangePasswordMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminUserUpdateProfileMutation = {
  __typename?: "AdminUserUpdateProfileMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type AdminUserUploadAvatarMutation = {
  __typename?: "AdminUserUploadAvatarMutation";
  avatarUrl?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type AuthorityBoundaryConnectType = {
  __typename?: "AuthorityBoundaryConnectType";
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AuthorityInheritType = {
  __typename?: "AuthorityInheritType";
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AuthorityType = {
  __typename?: "AuthorityType";
  area?: Maybe<Scalars["GeoJSON"]>;
  boundaryConnects: Array<Maybe<AuthorityBoundaryConnectType>>;
  code: Scalars["String"];
  id: Scalars["ID"];
  inherits: Array<Maybe<AuthorityInheritType>>;
  name: Scalars["String"];
};

export type AuthorityTypeNodeConnection = {
  __typename?: "AuthorityTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<AuthorityType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AuthorityUserRegisterMutation = {
  __typename?: "AuthorityUserRegisterMutation";
  me?: Maybe<UserProfileType>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
};

export type AuthorityUserType = {
  __typename?: "AuthorityUserType";
  authority: AdminAuthorityCreateSuccess;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  role?: Maybe<AccountsAuthorityUserRoleChoices>;
  telephone?: Maybe<Scalars["String"]>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type CaseDefinitionType = {
  __typename?: "CaseDefinitionType";
  condition: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  reportType: AdminReportTypeCreateSuccess;
};

export type CaseStateTransitionType = {
  __typename?: "CaseStateTransitionType";
  createdAt: Scalars["DateTime"];
  createdBy: UserType;
  formData?: Maybe<Scalars["JSONString"]>;
  id: Scalars["ID"];
  transition: StateTransitionType;
};

export type CaseStateType = {
  __typename?: "CaseStateType";
  id: Scalars["ID"];
  state: DeepStateStepType;
  transition?: Maybe<CaseStateTransitionType>;
};

export type CaseType = {
  __typename?: "CaseType";
  authorities?: Maybe<Array<Maybe<AuthorityType>>>;
  description: Scalars["String"];
  id: Scalars["UUID"];
  isFinished: Scalars["Boolean"];
  outbreakPlanInfo?: Maybe<Scalars["JSONString"]>;
  report?: Maybe<IncidentReportType>;
  stateDefinition?: Maybe<DeepStateDefinitionType>;
  states?: Maybe<Array<Maybe<CaseStateType>>>;
  statusLabel?: Maybe<Scalars["String"]>;
  threadId?: Maybe<Scalars["Int"]>;
};

export type CaseTypeNodeConnection = {
  __typename?: "CaseTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<CaseType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

/** An enumeration. */
export enum CasesNotificationTemplateTypeChoices {
  /** Case transition */
  Cas = "CAS",
  /** Promote to case */
  Ptc = "PTC",
  /** Report */
  Rep = "REP",
}

export type CategoryType = {
  __typename?: "CategoryType";
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type CheckInvitationCodeType = {
  __typename?: "CheckInvitationCodeType";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
  generatedEmail?: Maybe<Scalars["String"]>;
  generatedUsername?: Maybe<Scalars["String"]>;
};

export type ClientType = {
  __typename?: "ClientType";
  domains?: Maybe<Array<Maybe<DomainType>>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  schemaName: Scalars["String"];
};

export type CommentAttachmentType = {
  __typename?: "CommentAttachmentType";
  comment: CommentUpdateSuccess;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  thumbnail?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type CommentCreateMutation = {
  __typename?: "CommentCreateMutation";
  result?: Maybe<CommentCreateResult>;
};

export type CommentCreateProblem = {
  __typename?: "CommentCreateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type CommentCreateResult = CommentCreateProblem | CommentCreateSuccess;

export type CommentCreateSuccess = {
  __typename?: "CommentCreateSuccess";
  attachments?: Maybe<Array<Maybe<CommentAttachmentType>>>;
  body: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy: UserType;
  id: Scalars["ID"];
  threadId?: Maybe<Scalars["Int"]>;
};

export type CommentDeleteMutation = {
  __typename?: "CommentDeleteMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type CommentType = {
  __typename?: "CommentType";
  attachments?: Maybe<Array<Maybe<CommentAttachmentType>>>;
  body: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy: UserType;
  id: Scalars["ID"];
  threadId?: Maybe<Scalars["Int"]>;
};

export type CommentUpdateMutation = {
  __typename?: "CommentUpdateMutation";
  result?: Maybe<CommentUpdateResult>;
};

export type CommentUpdateProblem = {
  __typename?: "CommentUpdateProblem";
  fields?: Maybe<Array<AdminFieldValidationProblem>>;
  message?: Maybe<Scalars["String"]>;
};

export type CommentUpdateResult = CommentUpdateProblem | CommentUpdateSuccess;

export type CommentUpdateSuccess = {
  __typename?: "CommentUpdateSuccess";
  attachments?: Maybe<Array<Maybe<CommentAttachmentType>>>;
  body: Scalars["String"];
  createdAt: Scalars["DateTime"];
  createdBy: UserType;
  id: Scalars["ID"];
  threadId?: Maybe<Scalars["Int"]>;
};

export type ConfigurationType = {
  __typename?: "ConfigurationType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  key: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["String"];
};

export type ConfirmConsentMutation = {
  __typename?: "ConfirmConsentMutation";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ConvertToTestReportMutation = {
  __typename?: "ConvertToTestReportMutation";
  report?: Maybe<IncidentReportType>;
};

export type DeepStateDefinitionType = {
  __typename?: "DeepStateDefinitionType";
  id: Scalars["ID"];
  isDefault: Scalars["Boolean"];
  name: Scalars["String"];
  statestepSet?: Maybe<Array<Maybe<DeepStateStepType>>>;
};

export type DeepStateStepType = {
  __typename?: "DeepStateStepType";
  id: Scalars["ID"];
  isStartState: Scalars["Boolean"];
  isStopState: Scalars["Boolean"];
  name: Scalars["String"];
  toTransitions?: Maybe<Array<Maybe<DeepStateTransitionType>>>;
};

export type DeepStateTransitionType = {
  __typename?: "DeepStateTransitionType";
  formDefinition?: Maybe<Scalars["JSONString"]>;
  fromStep?: Maybe<StateStepType>;
  id: Scalars["ID"];
  toStep?: Maybe<StateStepType>;
};

export type DeleteJsonWebTokenCookie = {
  __typename?: "DeleteJSONWebTokenCookie";
  deleted: Scalars["Boolean"];
};

export type DeleteRefreshTokenCookie = {
  __typename?: "DeleteRefreshTokenCookie";
  deleted: Scalars["Boolean"];
};

export type DomainType = {
  __typename?: "DomainType";
  domain: Scalars["String"];
  id: Scalars["ID"];
  isPrimary: Scalars["Boolean"];
};

export type EventType = {
  __typename?: "EventType";
  cases?: Maybe<Array<Maybe<CaseType>>>;
  reports?: Maybe<Array<Maybe<IncidentReportType>>>;
};

export type FeatureType = {
  __typename?: "FeatureType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  key: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["String"];
};

export type FollowupReportType = {
  __typename?: "FollowupReportType";
  createdAt: Scalars["DateTime"];
  data?: Maybe<Scalars["GenericScalar"]>;
  gpsLocation?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  images?: Maybe<Array<Maybe<ImageType>>>;
  incident?: Maybe<IncidentReportType>;
  rendererData: Scalars["String"];
  reportType?: Maybe<ReportTypeType>;
  reportedBy?: Maybe<UserType>;
  testFlag: Scalars["Boolean"];
  uploadFiles?: Maybe<Array<Maybe<UploadFileType>>>;
};

export type FollowupType = {
  __typename?: "FollowupType";
  createdAt: Scalars["DateTime"];
  data?: Maybe<Scalars["GenericScalar"]>;
  id: Scalars["UUID"];
  rendererData: Scalars["String"];
  reportType?: Maybe<ReportTypeType>;
  reportedBy?: Maybe<UserType>;
  testFlag: Scalars["Boolean"];
};

export type ForwardStateMutation = {
  __typename?: "ForwardStateMutation";
  result?: Maybe<CaseStateType>;
};

export type ImageType = {
  __typename?: "ImageType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file: Scalars["String"];
  followupreportSet: Array<FollowupReportType>;
  id: Scalars["UUID"];
  imageUrl?: Maybe<Scalars["String"]>;
  incidentreportSet: Array<IncidentReportType>;
  reportId: Scalars["UUID"];
  thumbnail?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type IncidentReportType = {
  __typename?: "IncidentReportType";
  authorities?: Maybe<Array<Maybe<AuthorityType>>>;
  caseId?: Maybe<Scalars["UUID"]>;
  coverImage?: Maybe<ImageType>;
  createdAt: Scalars["DateTime"];
  data?: Maybe<Scalars["GenericScalar"]>;
  definition?: Maybe<Scalars["GenericScalar"]>;
  followups?: Maybe<Array<Maybe<FollowupType>>>;
  gpsLocation?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  images?: Maybe<Array<Maybe<ImageType>>>;
  incidentDate: Scalars["Date"];
  originalData?: Maybe<Scalars["GenericScalar"]>;
  platform?: Maybe<Scalars["String"]>;
  relevantAuthorities: Array<AdminAuthorityCreateSuccess>;
  relevantAuthorityResolved: Scalars["Boolean"];
  rendererData: Scalars["String"];
  reportType?: Maybe<ReportTypeType>;
  reportedBy?: Maybe<UserType>;
  testFlag: Scalars["Boolean"];
  threadId?: Maybe<Scalars["Int"]>;
  updatedAt: Scalars["DateTime"];
  uploadFiles?: Maybe<Array<Maybe<UploadFileType>>>;
};

export type IncidentReportTypeNodeConnection = {
  __typename?: "IncidentReportTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<IncidentReportType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type InvitationCodeType = {
  __typename?: "InvitationCodeType";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
  fromDate: Scalars["DateTime"];
  id: Scalars["ID"];
  role: Scalars["String"];
  throughDate: Scalars["DateTime"];
};

export type LoginQrTokenType = {
  __typename?: "LoginQrTokenType";
  token: Scalars["String"];
};

export type MessageType = {
  __typename?: "MessageType";
  body: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  adminAuthorityCreate?: Maybe<AdminAuthorityCreateMutation>;
  adminAuthorityDelete?: Maybe<AdminAuthorityDeleteMutation>;
  adminAuthorityNotificationDelete?: Maybe<AdminAuthorityNotificationDeleteMutation>;
  adminAuthorityNotificationUpsert?: Maybe<AdminAuthorityNotificationUpsertMutation>;
  adminAuthorityUpdate?: Maybe<AdminAuthorityUpdateMutation>;
  adminAuthorityUserCreate?: Maybe<AdminAuthorityUserCreateMutation>;
  adminAuthorityUserDelete?: Maybe<AdminAuthorityUserDeleteMutation>;
  adminAuthorityUserUpdate?: Maybe<AdminAuthorityUserUpdateMutation>;
  adminAuthorityUserUpdatePassword?: Maybe<AdminAuthorityUserUpdatePasswordMutation>;
  adminCaseDefinitionCreate?: Maybe<AdminCaseDefinitionCreateMutation>;
  adminCaseDefinitionDelete?: Maybe<AdminCaseDefinitionDeleteMutation>;
  adminCaseDefinitionUpdate?: Maybe<AdminCaseDefinitionUpdateMutation>;
  adminCategoryCreate?: Maybe<AdminCategoryCreateMutation>;
  adminCategoryDelete?: Maybe<AdminCategoryDeleteMutation>;
  adminCategoryUpdate?: Maybe<AdminCategoryUpdateMutation>;
  adminClientCreate?: Maybe<AdminClientCreateMutation>;
  adminClientUpdate?: Maybe<AdminClientUpdateMutation>;
  adminConfigurationCreate?: Maybe<AdminConfigurationCreateMutation>;
  adminConfigurationDelete?: Maybe<AdminConfigurationDeleteMutation>;
  adminConfigurationUpdate?: Maybe<AdminConfigurationUpdateMutation>;
  adminDomainCreate?: Maybe<AdminDomainCreateMutation>;
  adminDomainDelete?: Maybe<AdminDomainDeleteMutation>;
  adminDomainUpdate?: Maybe<AdminDomainUpdateMutation>;
  adminInvitationCodeCreate?: Maybe<AdminInvitationCodeCreateMutation>;
  adminInvitationCodeDelete?: Maybe<AdminInvitationCodeDeleteMutation>;
  adminInvitationCodeUpdate?: Maybe<AdminInvitationCodeUpdateMutation>;
  adminNotificationTemplateCreate?: Maybe<AdminNotificationTemplateCreateMutation>;
  adminNotificationTemplateDelete?: Maybe<AdminNotificationTemplateDeleteMutation>;
  adminNotificationTemplateUpdate?: Maybe<AdminNotificationTemplateUpdateMutation>;
  /** use to create a new observation definition */
  adminObservationDefinitionCreate?: Maybe<AdminObservationDefinitionCreateMutation>;
  adminObservationDefinitionDelete?: Maybe<AdminObservationDefinitionDeleteMutation>;
  adminObservationDefinitionUpdate?: Maybe<AdminObservationDefinitionUpdateMutation>;
  adminObservationMonitoringDefinitionCreate?: Maybe<AdminObservationMonitoringDefinitionCreateMutation>;
  adminObservationMonitoringDefinitionDelete?: Maybe<AdminObservationMonitoringDefinitionDeleteMutation>;
  adminObservationMonitoringDefinitionUpdate?: Maybe<AdminObservationMonitoringDefinitionUpdateMutation>;
  adminOutbreakPlanCreate?: Maybe<AdminOutbreakPlanCreateMutation>;
  adminOutbreakPlanDelete?: Maybe<AdminOutbreakPlanDeleteMutation>;
  adminOutbreakPlanUpdate?: Maybe<AdminOutbreakPlanUpdateMutation>;
  adminPlaceCreate?: Maybe<AdminPlaceCreateMutation>;
  adminPlaceDelete?: Maybe<AdminPlaceDeleteMutation>;
  adminPlaceUpdate?: Maybe<AdminPlaceUpdateMutation>;
  adminReportTypeCreate?: Maybe<AdminReportTypeCreateMutation>;
  adminReportTypeDelete?: Maybe<AdminReportTypeDeleteMutation>;
  adminReportTypeUpdate?: Maybe<AdminReportTypeUpdateMutation>;
  adminReporterNotificationCreate?: Maybe<AdminReporterNotificationCreateMutation>;
  adminReporterNotificationDelete?: Maybe<AdminReporterNotificationDeleteMutation>;
  adminReporterNotificationUpdate?: Maybe<AdminReporterNotificationUpdateMutation>;
  adminStateDefinitionCreate?: Maybe<AdminStateDefinitionCreateMutation>;
  adminStateDefinitionDelete?: Maybe<AdminStateDefinitionDeleteMutation>;
  adminStateDefinitionUpdate?: Maybe<AdminStateDefinitionUpdateMutation>;
  adminStateStepCreate?: Maybe<AdminStateStepCreateMutation>;
  adminStateStepDelete?: Maybe<AdminStateStepDeleteMutation>;
  adminStateStepUpdate?: Maybe<AdminStateStepUpdateMutation>;
  adminStateTransitionCreate?: Maybe<AdminStateTransitionCreateMutation>;
  adminStateTransitionDelete?: Maybe<AdminStateTransitionDeleteMutation>;
  adminStateTransitionUpdate?: Maybe<AdminStateTransitionUpdateMutation>;
  adminUserChangePassword?: Maybe<AdminUserChangePasswordMutation>;
  adminUserUpdateProfile?: Maybe<AdminUserUpdateProfileMutation>;
  adminUserUploadAvatar?: Maybe<AdminUserUploadAvatarMutation>;
  authorityUserRegister?: Maybe<AuthorityUserRegisterMutation>;
  commentCreate?: Maybe<CommentCreateMutation>;
  commentDelete?: Maybe<CommentDeleteMutation>;
  commentUpdate?: Maybe<CommentUpdateMutation>;
  confirmConsent?: Maybe<ConfirmConsentMutation>;
  convertToTestReport?: Maybe<ConvertToTestReportMutation>;
  deleteRefreshTokenCookie?: Maybe<DeleteRefreshTokenCookie>;
  deleteTokenCookie?: Maybe<DeleteJsonWebTokenCookie>;
  forwardState?: Maybe<ForwardStateMutation>;
  promoteToCase?: Maybe<PromoteToCaseMutation>;
  publishReportType?: Maybe<PublishReportTypeMutation>;
  refreshToken?: Maybe<Refresh>;
  registerFcmToken?: Maybe<RegisterFcmTokenMutation>;
  resetPassword?: Maybe<ResetPasswordMutation>;
  resetPasswordRequest?: Maybe<ResetPasswordRequestMutation>;
  revokeToken?: Maybe<Revoke>;
  submitFollowupReport?: Maybe<SubmitFollowupReport>;
  submitImage?: Maybe<SubmitImage>;
  submitIncidentReport?: Maybe<SubmitIncidentReport>;
  submitObservationSubject?: Maybe<SubmitObservationSubject>;
  submitObservationSubjectMonitoring?: Maybe<SubmitObservationSubjectMonitoringRecord>;
  submitRecordImage?: Maybe<SubmitRecordImage>;
  submitRecordUploadFile?: Maybe<SubmitRecordUploadFile>;
  submitUploadFile?: Maybe<SubmitUploadFile>;
  submitZeroReport?: Maybe<SubmitZeroReportMutation>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  unpublishReportType?: Maybe<UnPublishReportTypeMutation>;
  verifyLoginQrToken?: Maybe<VerifyLoginQrTokenMutation>;
  verifyToken?: Maybe<Verify>;
};

export type MutationAdminAuthorityCreateArgs = {
  area?: InputMaybe<Scalars["String"]>;
  boundaryConnects?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  code: Scalars["String"];
  inherits?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name: Scalars["String"];
};

export type MutationAdminAuthorityDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminAuthorityNotificationDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminAuthorityNotificationUpsertArgs = {
  notificationTemplateId: Scalars["Int"];
  to: Scalars["String"];
};

export type MutationAdminAuthorityUpdateArgs = {
  area?: InputMaybe<Scalars["String"]>;
  boundaryConnects?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  code: Scalars["String"];
  id: Scalars["ID"];
  inherits?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name: Scalars["String"];
};

export type MutationAdminAuthorityUserCreateArgs = {
  authorityId?: InputMaybe<Scalars["Int"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  role?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationAdminAuthorityUserDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminAuthorityUserUpdateArgs = {
  authorityId?: InputMaybe<Scalars["Int"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  role?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationAdminAuthorityUserUpdatePasswordArgs = {
  id: Scalars["ID"];
  password: Scalars["String"];
};

export type MutationAdminCaseDefinitionCreateArgs = {
  condition: Scalars["String"];
  description: Scalars["String"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  reportTypeId: Scalars["UUID"];
};

export type MutationAdminCaseDefinitionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminCaseDefinitionUpdateArgs = {
  condition: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  reportTypeId: Scalars["UUID"];
};

export type MutationAdminCategoryCreateArgs = {
  icon?: InputMaybe<Scalars["Upload"]>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAdminCategoryDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminCategoryUpdateArgs = {
  clearIcon?: InputMaybe<Scalars["Boolean"]>;
  icon?: InputMaybe<Scalars["Upload"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAdminClientCreateArgs = {
  name: Scalars["String"];
  schemaName: Scalars["String"];
};

export type MutationAdminClientUpdateArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationAdminConfigurationCreateArgs = {
  key: Scalars["String"];
  value: Scalars["String"];
};

export type MutationAdminConfigurationDeleteArgs = {
  id: Scalars["String"];
};

export type MutationAdminConfigurationUpdateArgs = {
  id: Scalars["String"];
  key: Scalars["String"];
  value: Scalars["String"];
};

export type MutationAdminDomainCreateArgs = {
  clientId: Scalars["ID"];
  domain: Scalars["String"];
  isPrimary: Scalars["Boolean"];
};

export type MutationAdminDomainDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminDomainUpdateArgs = {
  domain: Scalars["String"];
  id: Scalars["ID"];
  isPrimary: Scalars["Boolean"];
};

export type MutationAdminInvitationCodeCreateArgs = {
  authorityId: Scalars["Int"];
  code: Scalars["String"];
  fromDate: Scalars["DateTime"];
  inherits?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  role?: InputMaybe<Scalars["String"]>;
  throughDate: Scalars["DateTime"];
};

export type MutationAdminInvitationCodeDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminInvitationCodeUpdateArgs = {
  authorityId?: InputMaybe<Scalars["Int"]>;
  code: Scalars["String"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  role?: InputMaybe<Scalars["String"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
};

export type MutationAdminNotificationTemplateCreateArgs = {
  bodyTemplate: Scalars["String"];
  condition?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateTransitionId?: InputMaybe<Scalars["Int"]>;
  titleTemplate: Scalars["String"];
  type: Scalars["String"];
};

export type MutationAdminNotificationTemplateDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminNotificationTemplateUpdateArgs = {
  bodyTemplate: Scalars["String"];
  condition?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateTransitionId?: InputMaybe<Scalars["Int"]>;
  titleTemplate: Scalars["String"];
  type: Scalars["String"];
};

export type MutationAdminObservationDefinitionCreateArgs = {
  description?: InputMaybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  identityTemplate: Scalars["String"];
  name: Scalars["String"];
  registerFormDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminObservationDefinitionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminObservationDefinitionUpdateArgs = {
  description?: InputMaybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  id: Scalars["ID"];
  identityTemplate: Scalars["String"];
  name: Scalars["String"];
  registerFormDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminObservationMonitoringDefinitionCreateArgs = {
  definitionId: Scalars["ID"];
  description: Scalars["String"];
  descriptionTemplate: Scalars["String"];
  formDefinition: Scalars["JSONString"];
  name: Scalars["String"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminObservationMonitoringDefinitionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminObservationMonitoringDefinitionUpdateArgs = {
  definitionId: Scalars["ID"];
  description: Scalars["String"];
  descriptionTemplate: Scalars["String"];
  formDefinition: Scalars["JSONString"];
  id: Scalars["ID"];
  name: Scalars["String"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminOutbreakPlanCreateArgs = {
  description: Scalars["String"];
  name: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateStepId: Scalars["Int"];
  zone1Color?: InputMaybe<Scalars["String"]>;
  zone1MessageBody?: InputMaybe<Scalars["String"]>;
  zone1MessageTitle?: InputMaybe<Scalars["String"]>;
  zone1Radius?: InputMaybe<Scalars["Float"]>;
  zone2Color?: InputMaybe<Scalars["String"]>;
  zone2MessageBody?: InputMaybe<Scalars["String"]>;
  zone2MessageTitle?: InputMaybe<Scalars["String"]>;
  zone2Radius?: InputMaybe<Scalars["Float"]>;
  zone3Color?: InputMaybe<Scalars["String"]>;
  zone3MessageBody?: InputMaybe<Scalars["String"]>;
  zone3MessageTitle?: InputMaybe<Scalars["String"]>;
  zone3Radius?: InputMaybe<Scalars["Float"]>;
};

export type MutationAdminOutbreakPlanDeleteArgs = {
  id: Scalars["Int"];
};

export type MutationAdminOutbreakPlanUpdateArgs = {
  description: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateStepId: Scalars["Int"];
  zone1Color?: InputMaybe<Scalars["String"]>;
  zone1MessageBody?: InputMaybe<Scalars["String"]>;
  zone1MessageTitle?: InputMaybe<Scalars["String"]>;
  zone1Radius?: InputMaybe<Scalars["Float"]>;
  zone2Color?: InputMaybe<Scalars["String"]>;
  zone2MessageBody?: InputMaybe<Scalars["String"]>;
  zone2MessageTitle?: InputMaybe<Scalars["String"]>;
  zone2Radius?: InputMaybe<Scalars["Float"]>;
  zone3Color?: InputMaybe<Scalars["String"]>;
  zone3MessageBody?: InputMaybe<Scalars["String"]>;
  zone3MessageTitle?: InputMaybe<Scalars["String"]>;
  zone3Radius?: InputMaybe<Scalars["Float"]>;
};

export type MutationAdminPlaceCreateArgs = {
  authorityId: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  notificationTo?: InputMaybe<Scalars["String"]>;
};

export type MutationAdminPlaceDeleteArgs = {
  id: Scalars["Int"];
};

export type MutationAdminPlaceUpdateArgs = {
  authorityId: Scalars["Int"];
  id: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  notificationTo?: InputMaybe<Scalars["String"]>;
};

export type MutationAdminReportTypeCreateArgs = {
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  followupDefinition?: InputMaybe<Scalars["String"]>;
  isFollowable?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
  rendererDataTemplate?: InputMaybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: InputMaybe<Scalars["String"]>;
  stateDefinitionId?: InputMaybe<Scalars["Int"]>;
};

export type MutationAdminReportTypeDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminReportTypeUpdateArgs = {
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  followupDefinition?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  isFollowable?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
  rendererDataTemplate?: InputMaybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: InputMaybe<Scalars["String"]>;
  stateDefinitionId?: InputMaybe<Scalars["Int"]>;
};

export type MutationAdminReporterNotificationCreateArgs = {
  condition: Scalars["String"];
  description: Scalars["String"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  reportTypeId: Scalars["UUID"];
  template: Scalars["String"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminReporterNotificationDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminReporterNotificationUpdateArgs = {
  condition: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  reportTypeId: Scalars["UUID"];
  template: Scalars["String"];
  titleTemplate: Scalars["String"];
};

export type MutationAdminStateDefinitionCreateArgs = {
  isDefault?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
};

export type MutationAdminStateDefinitionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminStateDefinitionUpdateArgs = {
  id: Scalars["ID"];
  isDefault?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
};

export type MutationAdminStateStepCreateArgs = {
  isStartState?: InputMaybe<Scalars["Boolean"]>;
  isStopState?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  stateDefinitionId: Scalars["ID"];
};

export type MutationAdminStateStepDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminStateStepUpdateArgs = {
  id: Scalars["ID"];
  isStartState?: InputMaybe<Scalars["Boolean"]>;
  isStopState?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  stateDefinitionId: Scalars["ID"];
};

export type MutationAdminStateTransitionCreateArgs = {
  formDefinition: Scalars["String"];
  fromStepId: Scalars["ID"];
  toStepId: Scalars["ID"];
};

export type MutationAdminStateTransitionDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationAdminStateTransitionUpdateArgs = {
  formDefinition: Scalars["String"];
  fromStepId: Scalars["ID"];
  id: Scalars["ID"];
  toStepId: Scalars["ID"];
};

export type MutationAdminUserChangePasswordArgs = {
  newPassword: Scalars["String"];
};

export type MutationAdminUserUpdateProfileArgs = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
};

export type MutationAdminUserUploadAvatarArgs = {
  image?: InputMaybe<Scalars["Upload"]>;
};

export type MutationAuthorityUserRegisterArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  invitationCode: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationCommentCreateArgs = {
  body: Scalars["String"];
  files?: InputMaybe<Array<InputMaybe<Scalars["Upload"]>>>;
  threadId: Scalars["Int"];
};

export type MutationCommentDeleteArgs = {
  id: Scalars["ID"];
};

export type MutationCommentUpdateArgs = {
  body: Scalars["String"];
  commentId: Scalars["Int"];
};

export type MutationConvertToTestReportArgs = {
  reportId: Scalars["UUID"];
};

export type MutationForwardStateArgs = {
  caseId: Scalars["ID"];
  formData?: InputMaybe<Scalars["GenericScalar"]>;
  transitionId: Scalars["ID"];
};

export type MutationPromoteToCaseArgs = {
  reportId: Scalars["UUID"];
};

export type MutationPublishReportTypeArgs = {
  reportTypeId: Scalars["UUID"];
};

export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

export type MutationRegisterFcmTokenArgs = {
  token: Scalars["String"];
  userId: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type MutationResetPasswordRequestArgs = {
  email: Scalars["String"];
};

export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

export type MutationSubmitFollowupReportArgs = {
  data: Scalars["GenericScalar"];
  followupId?: InputMaybe<Scalars["UUID"]>;
  incidentId: Scalars["UUID"];
};

export type MutationSubmitImageArgs = {
  image: Scalars["Upload"];
  imageId?: InputMaybe<Scalars["UUID"]>;
  isCover?: InputMaybe<Scalars["Boolean"]>;
  reportId: Scalars["UUID"];
};

export type MutationSubmitIncidentReportArgs = {
  data: Scalars["GenericScalar"];
  gpsLocation?: InputMaybe<Scalars["String"]>;
  incidentDate: Scalars["Date"];
  incidentInAuthority?: InputMaybe<Scalars["Boolean"]>;
  reportId?: InputMaybe<Scalars["UUID"]>;
  reportTypeId: Scalars["UUID"];
  testFlag?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationSubmitObservationSubjectArgs = {
  data: Scalars["GenericScalar"];
  definitionId: Scalars["Int"];
  gpsLocation?: InputMaybe<Scalars["String"]>;
};

export type MutationSubmitObservationSubjectMonitoringArgs = {
  data: Scalars["GenericScalar"];
  monitoringDefinitionId: Scalars["Int"];
  subjectId: Scalars["UUID"];
};

export type MutationSubmitRecordImageArgs = {
  image: Scalars["Upload"];
  imageId?: InputMaybe<Scalars["UUID"]>;
  isCover?: InputMaybe<Scalars["Boolean"]>;
  recordId: Scalars["UUID"];
  recordType: RecordType;
};

export type MutationSubmitRecordUploadFileArgs = {
  file: Scalars["Upload"];
  fileId?: InputMaybe<Scalars["UUID"]>;
  recordId: Scalars["UUID"];
};

export type MutationSubmitUploadFileArgs = {
  file: Scalars["Upload"];
  fileId?: InputMaybe<Scalars["UUID"]>;
  reportId: Scalars["UUID"];
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUnpublishReportTypeArgs = {
  reportTypeId: Scalars["UUID"];
};

export type MutationVerifyLoginQrTokenArgs = {
  token: Scalars["String"];
};

export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

export type NotificationTemplateType = {
  __typename?: "NotificationTemplateType";
  authoritynotificationSet: Array<AdminAuthorityNotificationUpsertSuccess>;
  bodyTemplate: Scalars["String"];
  condition?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  reportType: AdminReportTypeCreateSuccess;
  stateDefinition?: Maybe<StateDefinitionType>;
  stateTransition?: Maybe<DeepStateTransitionType>;
  titleTemplate: Scalars["String"];
  type: CasesNotificationTemplateTypeChoices;
  updatedAt: Scalars["DateTime"];
};

export type ObservationDefinitionId = {
  __typename?: "ObservationDefinitionId";
  id: Scalars["ID"];
};

export type ObservationDefinitionSyncInputType = {
  id: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
};

export type ObservationDefinitionSyncOutputType = {
  __typename?: "ObservationDefinitionSyncOutputType";
  removedList?: Maybe<Array<Maybe<ObservationDefinitionId>>>;
  updatedList?: Maybe<Array<Maybe<ObservationDefinitionType>>>;
};

export type ObservationDefinitionType = {
  __typename?: "ObservationDefinitionType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  id: Scalars["ID"];
  identityTemplate: Scalars["String"];
  isActive: Scalars["Boolean"];
  monitoringDefinitions?: Maybe<
    Array<Maybe<ObservationMonitoringDefinitionType>>
  >;
  monitoringdefinitionSet: Array<AdminObservationMonitoringDefinitionCreateSuccess>;
  name: Scalars["String"];
  registerFormDefinition?: Maybe<Scalars["GenericScalar"]>;
  subjectrecordSet: Array<ObservationSubjectType>;
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ObservationImageType = {
  __typename?: "ObservationImageType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file: Scalars["String"];
  id: Scalars["UUID"];
  imageUrl?: Maybe<Scalars["String"]>;
  monitoringrecordSet: Array<ObservationSubjectMonitoringRecordType>;
  recordId: Scalars["UUID"];
  subjectrecordSet: Array<ObservationSubjectType>;
  thumbnail?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type ObservationMonitoringDefinitionType = {
  __typename?: "ObservationMonitoringDefinitionType";
  createdAt: Scalars["DateTime"];
  definition: AdminObservationDefinitionCreateSuccess;
  definitionId?: Maybe<Scalars["Int"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  descriptionTemplate: Scalars["String"];
  formDefinition?: Maybe<Scalars["GenericScalar"]>;
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  monitoringrecordSet: Array<ObservationSubjectMonitoringRecordType>;
  name: Scalars["String"];
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ObservationSubjectMonitoringRecordType = {
  __typename?: "ObservationSubjectMonitoringRecordType";
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  formData?: Maybe<Scalars["GenericScalar"]>;
  id: Scalars["UUID"];
  images?: Maybe<Array<Maybe<ObservationImageType>>>;
  isActive: Scalars["Boolean"];
  monitoringDefinition?: Maybe<ObservationMonitoringDefinitionType>;
  monitoringDefinitionId?: Maybe<Scalars["Int"]>;
  reportedBy?: Maybe<UserType>;
  subject: ObservationSubjectType;
  subjectId?: Maybe<Scalars["UUID"]>;
  title: Scalars["String"];
  uploadFiles?: Maybe<Array<Maybe<ObservationUploadFileType>>>;
};

export type ObservationSubjectMonitoringRecordTypeNodeConnection = {
  __typename?: "ObservationSubjectMonitoringRecordTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<ObservationSubjectMonitoringRecordType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ObservationSubjectType = {
  __typename?: "ObservationSubjectType";
  createdAt: Scalars["DateTime"];
  definition?: Maybe<ObservationDefinitionType>;
  definitionId?: Maybe<Scalars["Int"]>;
  description: Scalars["String"];
  formData?: Maybe<Scalars["GenericScalar"]>;
  gpsLocation?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  identity: Scalars["String"];
  images?: Maybe<Array<Maybe<ObservationImageType>>>;
  isActive: Scalars["Boolean"];
  monitoringRecords?: Maybe<
    Array<Maybe<ObservationSubjectMonitoringRecordType>>
  >;
  reportedBy?: Maybe<UserType>;
  title: Scalars["String"];
  uploadFiles?: Maybe<Array<Maybe<ObservationUploadFileType>>>;
};

export type ObservationSubjectTypeNodeConnection = {
  __typename?: "ObservationSubjectTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<ObservationSubjectType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ObservationUploadFileType = {
  __typename?: "ObservationUploadFileType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file: Scalars["String"];
  fileType: Scalars["String"];
  fileUrl?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  recordId: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

export type OutbreakPlaceType = {
  __typename?: "OutbreakPlaceType";
  case: CaseType;
  color: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  place?: Maybe<PlaceType>;
  plan: AdminOutbreakPlanUpdateSuccess;
  updatedAt: Scalars["DateTime"];
  zone?: Maybe<Scalars["Int"]>;
};

export type OutbreakPlanType = {
  __typename?: "OutbreakPlanType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  places: Array<OutbreakPlaceType>;
  reportType: AdminReportTypeCreateSuccess;
  stateStep: DeepStateStepType;
  updatedAt: Scalars["DateTime"];
  zone1Color: Scalars["String"];
  zone1MessageBody: Scalars["String"];
  zone1MessageTitle: Scalars["String"];
  zone1Radius?: Maybe<Scalars["Float"]>;
  zone2Color: Scalars["String"];
  zone2MessageBody: Scalars["String"];
  zone2MessageTitle: Scalars["String"];
  zone2Radius?: Maybe<Scalars["Float"]>;
  zone3Color: Scalars["String"];
  zone3MessageBody: Scalars["String"];
  zone3MessageTitle: Scalars["String"];
  zone3Radius?: Maybe<Scalars["Float"]>;
};

export type PageInfoExtra = {
  __typename?: "PageInfoExtra";
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
};

export type PlaceType = {
  __typename?: "PlaceType";
  authority: AdminAuthorityCreateSuccess;
  id: Scalars["ID"];
  latitude?: Maybe<Scalars["Float"]>;
  location?: Maybe<Scalars["GeoJSON"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  notificationTo: Scalars["String"];
};

export type PromoteToCaseMutation = {
  __typename?: "PromoteToCaseMutation";
  case?: Maybe<CaseType>;
  report?: Maybe<IncidentReportType>;
};

export type PublishReportTypeMutation = {
  __typename?: "PublishReportTypeMutation";
  reportType?: Maybe<ReportTypeType>;
};

export type Query = {
  __typename?: "Query";
  adminAuthorityGet?: Maybe<AdminAuthorityQueryType>;
  adminAuthorityInheritLookup?: Maybe<AdminAuthorityInheritLookupTypeNodeConnection>;
  adminAuthorityQuery?: Maybe<AdminAuthorityQueryTypeNodeConnection>;
  adminAuthorityUserQuery?: Maybe<AdminAuthorityUserQueryTypeNodeConnection>;
  adminCaseDefinitionQuery?: Maybe<AdminCaseDefinitionQueryTypeNodeConnection>;
  adminCategoryQuery?: Maybe<AdminCategoryQueryTypeNodeConnection>;
  adminClientGet?: Maybe<ClientType>;
  adminClientQuery?: Maybe<AdminClientQueryTypeNodeConnection>;
  adminConfigurationQuery?: Maybe<AdminConfigurationQueryTypeNodeConnection>;
  adminDomainGet?: Maybe<DomainType>;
  adminInvitationCodeQuery?: Maybe<AdminInvitationCodeQueryTypeNodeConnection>;
  adminNotificationTemplateAuthorityQuery?: Maybe<
    Array<Maybe<AdminNotificationTemplateAuthorityType>>
  >;
  adminNotificationTemplateQuery?: Maybe<AdminNotificationTemplateQueryTypeNodeConnection>;
  adminObservationDefinitionQuery?: Maybe<AdminDefinitionQueryTypeNodeConnection>;
  adminObservationMonitoringDefinitionQuery?: Maybe<
    Array<Maybe<AdminMonitoringDefinitionQueryType>>
  >;
  adminOutbreakPlanQuery?: Maybe<AdminOutbreakPlanQueryTypeNodeConnection>;
  adminPlaceQuery?: Maybe<AdminPlaceQueryTypeNodeConnection>;
  adminReportTypeQuery?: Maybe<AdminReportTypeQueryTypeNodeConnection>;
  adminReporterNotificationQuery?: Maybe<AdminReporterNotificationQueryTypeNodeConnection>;
  adminStateDefinitionQuery?: Maybe<AdminStateDefinitionQueryTypeNodeConnection>;
  adminStateStepQuery?: Maybe<Array<Maybe<StateStepType>>>;
  adminStateTransitionQuery?: Maybe<Array<Maybe<StateTransitionType>>>;
  authorities?: Maybe<AuthorityTypeNodeConnection>;
  authority?: Maybe<AuthorityType>;
  authorityInheritsDown?: Maybe<Array<AuthorityType>>;
  authorityInheritsDownShallow?: Maybe<Array<AuthorityType>>;
  authorityUser?: Maybe<AuthorityUserType>;
  boundaryConnectedIncidentReports?: Maybe<IncidentReportTypeNodeConnection>;
  caseDefinitionGet?: Maybe<CaseDefinitionType>;
  caseGet?: Maybe<CaseType>;
  casesQuery?: Maybe<CaseTypeNodeConnection>;
  category?: Maybe<CategoryType>;
  checkInvitationCode?: Maybe<CheckInvitationCodeType>;
  comments?: Maybe<Array<Maybe<CommentType>>>;
  configurationGet?: Maybe<ConfigurationType>;
  configurations?: Maybe<Array<Maybe<ConfigurationType>>>;
  deepStateDefinitionGet?: Maybe<DeepStateDefinitionType>;
  eventsQuery?: Maybe<EventType>;
  features?: Maybe<Array<Maybe<FeatureType>>>;
  followupReport?: Maybe<FollowupReportType>;
  followups?: Maybe<Array<Maybe<FollowupReportType>>>;
  getLoginQrToken?: Maybe<LoginQrTokenType>;
  healthCheck?: Maybe<Scalars["String"]>;
  incidentReport?: Maybe<IncidentReportType>;
  incidentReports?: Maybe<IncidentReportTypeNodeConnection>;
  invitationCode?: Maybe<InvitationCodeType>;
  me?: Maybe<UserProfileType>;
  myIncidentReports?: Maybe<IncidentReportTypeNodeConnection>;
  myMessage?: Maybe<UserMessageType>;
  myMessages?: Maybe<UserMessageTypeNodeConnection>;
  myReportTypes?: Maybe<Array<Maybe<ReportTypeType>>>;
  notificationTemplateGet?: Maybe<NotificationTemplateType>;
  observationDefinitionGet?: Maybe<ObservationDefinitionType>;
  observationMonitoringDefinitionGet?: Maybe<ObservationMonitoringDefinitionType>;
  observationSubject?: Maybe<ObservationSubjectType>;
  observationSubjectMonitoringRecord?: Maybe<ObservationSubjectMonitoringRecordType>;
  observationSubjectMonitoringRecords?: Maybe<ObservationSubjectMonitoringRecordTypeNodeConnection>;
  observationSubjects?: Maybe<ObservationSubjectTypeNodeConnection>;
  observationSubjectsInBounded?: Maybe<Array<Maybe<ObservationSubjectType>>>;
  outbreakPlaces?: Maybe<Array<Maybe<OutbreakPlaceType>>>;
  outbreakPlanGet?: Maybe<OutbreakPlanType>;
  placeGet?: Maybe<PlaceType>;
  reportType?: Maybe<ReportTypeType>;
  reportTypeByName?: Maybe<ReportTypeType>;
  reporterNotification?: Maybe<ReporterNotificationType>;
  statQuery?: Maybe<StatType>;
  stateDefinitionGet?: Maybe<StateDefinitionType>;
  stateStepGet?: Maybe<StateStepType>;
  stateStepListByReportType?: Maybe<Array<StateStepType>>;
  stateTransitionGet?: Maybe<StateTransitionType>;
  summaryCaseByCategoryQuery?: Maybe<Array<SummaryByCategoryType>>;
  summaryContributionQuery?: Maybe<Array<SummaryContributionType>>;
  summaryReportByCategoryQuery?: Maybe<Array<SummaryByCategoryType>>;
  summaryReporterNoReport?: Maybe<Array<Maybe<ReporterNoReport>>>;
  summaryReporterReportByDay?: Maybe<Array<Maybe<ReporterReportByDate>>>;
  syncObservationDefinitions?: Maybe<ObservationDefinitionSyncOutputType>;
  syncReportTypes?: Maybe<ReportTypeSyncOutputType>;
  transitionListByReportType?: Maybe<Array<StateTransitionType>>;
};

export type QueryAdminAuthorityGetArgs = {
  id: Scalars["ID"];
};

export type QueryAdminAuthorityInheritLookupArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminAuthorityQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminAuthorityUserQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  authorities?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  before?: InputMaybe<Scalars["String"]>;
  dateJoinedGte?: InputMaybe<Scalars["DateTime"]>;
  dateJoinedLte?: InputMaybe<Scalars["DateTime"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminCaseDefinitionQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  description_Contains?: InputMaybe<Scalars["String"]>;
  description_Istartswith?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminCategoryQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_Contains?: InputMaybe<Scalars["String"]>;
  name_Istartswith?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminClientGetArgs = {
  id: Scalars["ID"];
};

export type QueryAdminClientQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminConfigurationQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminDomainGetArgs = {
  id: Scalars["ID"];
};

export type QueryAdminInvitationCodeQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
  role_Contains?: InputMaybe<Scalars["String"]>;
  role_Istartswith?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminNotificationTemplateAuthorityQueryArgs = {
  reportTypeId: Scalars["ID"];
};

export type QueryAdminNotificationTemplateQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminObservationDefinitionQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminObservationMonitoringDefinitionQueryArgs = {
  definitionId: Scalars["ID"];
};

export type QueryAdminOutbreakPlanQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminPlaceQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminReportTypeQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminReporterNotificationQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  description_Contains?: InputMaybe<Scalars["String"]>;
  description_Istartswith?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminStateDefinitionQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_Contains?: InputMaybe<Scalars["String"]>;
  name_Istartswith?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminStateStepQueryArgs = {
  definitionId: Scalars["ID"];
};

export type QueryAdminStateTransitionQueryArgs = {
  definitionId: Scalars["ID"];
};

export type QueryAuthoritiesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_Istartswith?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAuthorityArgs = {
  id: Scalars["ID"];
};

export type QueryAuthorityInheritsDownArgs = {
  authorityId: Scalars["ID"];
};

export type QueryAuthorityInheritsDownShallowArgs = {
  authorityId: Scalars["ID"];
};

export type QueryAuthorityUserArgs = {
  id: Scalars["ID"];
};

export type QueryBoundaryConnectedIncidentReportsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  createdAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  createdAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  first?: InputMaybe<Scalars["Int"]>;
  incidentDate_Gte?: InputMaybe<Scalars["Date"]>;
  incidentDate_Lte?: InputMaybe<Scalars["Date"]>;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Id_In?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  relevantAuthorities_Name?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Name_Istartswith?: InputMaybe<Scalars["String"]>;
  reportType_Id_In?: InputMaybe<Array<InputMaybe<Scalars["UUID"]>>>;
  testFlag?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryCaseDefinitionGetArgs = {
  id: Scalars["ID"];
};

export type QueryCaseGetArgs = {
  id: Scalars["UUID"];
};

export type QueryCasesQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  report_CreatedAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  report_CreatedAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  report_RelevantAuthorities_Id_In?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>>
  >;
  report_ReportType_Id_In?: InputMaybe<Array<InputMaybe<Scalars["UUID"]>>>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"];
};

export type QueryCheckInvitationCodeArgs = {
  code: Scalars["String"];
};

export type QueryCommentsArgs = {
  threadId: Scalars["ID"];
};

export type QueryConfigurationGetArgs = {
  key: Scalars["String"];
};

export type QueryDeepStateDefinitionGetArgs = {
  id: Scalars["ID"];
};

export type QueryEventsQueryArgs = {
  authorityId: Scalars["Int"];
};

export type QueryFollowupReportArgs = {
  id: Scalars["ID"];
};

export type QueryFollowupsArgs = {
  incidentId: Scalars["ID"];
};

export type QueryGetLoginQrTokenArgs = {
  userId: Scalars["ID"];
};

export type QueryIncidentReportArgs = {
  id: Scalars["ID"];
};

export type QueryIncidentReportsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  createdAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  createdAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  first?: InputMaybe<Scalars["Int"]>;
  incidentDate_Gte?: InputMaybe<Scalars["Date"]>;
  incidentDate_Lte?: InputMaybe<Scalars["Date"]>;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Id_In?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  relevantAuthorities_Name?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Name_Istartswith?: InputMaybe<Scalars["String"]>;
  reportType_Id_In?: InputMaybe<Array<InputMaybe<Scalars["UUID"]>>>;
  testFlag?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryInvitationCodeArgs = {
  id: Scalars["ID"];
};

export type QueryMyIncidentReportsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  createdAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  createdAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  first?: InputMaybe<Scalars["Int"]>;
  incidentDate_Gte?: InputMaybe<Scalars["Date"]>;
  incidentDate_Lte?: InputMaybe<Scalars["Date"]>;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Id_In?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  relevantAuthorities_Name?: InputMaybe<Scalars["String"]>;
  relevantAuthorities_Name_Istartswith?: InputMaybe<Scalars["String"]>;
  reportType_Id_In?: InputMaybe<Array<InputMaybe<Scalars["UUID"]>>>;
  testFlag?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryMyMessageArgs = {
  id: Scalars["String"];
};

export type QueryMyMessagesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryNotificationTemplateGetArgs = {
  id: Scalars["ID"];
};

export type QueryObservationDefinitionGetArgs = {
  id: Scalars["ID"];
};

export type QueryObservationMonitoringDefinitionGetArgs = {
  id: Scalars["ID"];
};

export type QueryObservationSubjectArgs = {
  id: Scalars["ID"];
};

export type QueryObservationSubjectMonitoringRecordArgs = {
  id: Scalars["ID"];
};

export type QueryObservationSubjectMonitoringRecordsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  createdAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  createdAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  subject_Id_In?: InputMaybe<Array<InputMaybe<Scalars["UUID"]>>>;
};

export type QueryObservationSubjectsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  createdAt_Gte?: InputMaybe<Scalars["DateTime"]>;
  createdAt_Lte?: InputMaybe<Scalars["DateTime"]>;
  definition_Id?: InputMaybe<Scalars["Float"]>;
  definition_Id_In?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  q?: InputMaybe<Scalars["String"]>;
};

export type QueryObservationSubjectsInBoundedArgs = {
  bottomRightX: Scalars["Float"];
  bottomRightY: Scalars["Float"];
  definitionId: Scalars["Int"];
  topLeftX: Scalars["Float"];
  topLeftY: Scalars["Float"];
};

export type QueryOutbreakPlacesArgs = {
  caseId: Scalars["UUID"];
};

export type QueryOutbreakPlanGetArgs = {
  id: Scalars["Int"];
};

export type QueryPlaceGetArgs = {
  id: Scalars["Int"];
};

export type QueryReportTypeArgs = {
  id: Scalars["ID"];
};

export type QueryReportTypeByNameArgs = {
  name: Scalars["String"];
};

export type QueryReporterNotificationArgs = {
  id: Scalars["ID"];
};

export type QueryStatQueryArgs = {
  authorityId: Scalars["Int"];
};

export type QueryStateDefinitionGetArgs = {
  id: Scalars["ID"];
};

export type QueryStateStepGetArgs = {
  id: Scalars["ID"];
};

export type QueryStateStepListByReportTypeArgs = {
  reportTypeId: Scalars["ID"];
};

export type QueryStateTransitionGetArgs = {
  id: Scalars["ID"];
};

export type QuerySummaryCaseByCategoryQueryArgs = {
  authorityId: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
};

export type QuerySummaryContributionQueryArgs = {
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
  userId: Scalars["Int"];
};

export type QuerySummaryReportByCategoryQueryArgs = {
  authorityId: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
};

export type QuerySummaryReporterNoReportArgs = {
  authorityId: Scalars["Int"];
  fromDate: Scalars["Date"];
  toDate: Scalars["Date"];
};

export type QuerySummaryReporterReportByDayArgs = {
  authorityId: Scalars["Int"];
  fromDate: Scalars["Date"];
  toDate: Scalars["Date"];
};

export type QuerySyncObservationDefinitionsArgs = {
  data: Array<ObservationDefinitionSyncInputType>;
};

export type QuerySyncReportTypesArgs = {
  data: Array<ReportTypeSyncInputType>;
};

export type QueryTransitionListByReportTypeArgs = {
  reportTypeId: Scalars["ID"];
};

export enum RecordType {
  Monitoring = "monitoring",
  Subject = "subject",
}

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

export type RegisterFcmTokenMutation = {
  __typename?: "RegisterFcmTokenMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type ReportTypeId = {
  __typename?: "ReportTypeId";
  id: Scalars["UUID"];
};

export type ReportTypeSyncInputType = {
  id: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type ReportTypeSyncOutputType = {
  __typename?: "ReportTypeSyncOutputType";
  categoryList?: Maybe<Array<Maybe<CategoryType>>>;
  removedList: Array<Maybe<ReportTypeId>>;
  updatedList: Array<Maybe<ReportTypeType>>;
};

export type ReportTypeType = {
  __typename?: "ReportTypeType";
  authorities: Array<AdminAuthorityCreateSuccess>;
  casedefinitionSet: Array<AdminCaseDefinitionCreateSuccess>;
  category?: Maybe<CategoryType>;
  createdAt: Scalars["DateTime"];
  definition?: Maybe<Scalars["GenericScalar"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  followupDefinition?: Maybe<Scalars["GenericScalar"]>;
  followupreports: Array<FollowupReportType>;
  id: Scalars["UUID"];
  incidentreports: Array<IncidentReportType>;
  isFollowable: Scalars["Boolean"];
  name: Scalars["String"];
  notificationtemplateSet: Array<AdminNotificationTemplateCreateSuccess>;
  ordering: Scalars["Int"];
  planSet: Array<AdminOutbreakPlanUpdateSuccess>;
  published: Scalars["Boolean"];
  rendererDataTemplate?: Maybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: Maybe<Scalars["String"]>;
  reporternotificationSet: Array<AdminReporterNotificationCreateSuccess>;
  stateDefinition?: Maybe<DeepStateDefinitionType>;
  updatedAt: Scalars["DateTime"];
};

export type ReporterNoReport = {
  __typename?: "ReporterNoReport";
  authorityName?: Maybe<Scalars["String"]>;
  reporterId?: Maybe<Scalars["Int"]>;
  reporterName?: Maybe<Scalars["String"]>;
};

export type ReporterNotificationType = {
  __typename?: "ReporterNotificationType";
  condition: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  reportType?: Maybe<AdminReportTypeCreateSuccess>;
  template: Scalars["String"];
  titleTemplate: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ReporterReportByDate = {
  __typename?: "ReporterReportByDate";
  authorityName?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["Date"]>;
  reportCount?: Maybe<Scalars["Int"]>;
  reporterName?: Maybe<Scalars["String"]>;
  week?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
  yearWeek?: Maybe<Scalars["String"]>;
};

export type ResetPasswordMutation = {
  __typename?: "ResetPasswordMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type ResetPasswordRequestMutation = {
  __typename?: "ResetPasswordRequestMutation";
  success?: Maybe<Scalars["Boolean"]>;
};

export type Revoke = {
  __typename?: "Revoke";
  revoked: Scalars["Int"];
};

export type StatType = {
  __typename?: "StatType";
  officialCount?: Maybe<Scalars["Int"]>;
  openCaseCount?: Maybe<Scalars["Int"]>;
  reporterCount?: Maybe<Scalars["Int"]>;
};

export type StateDefinitionType = {
  __typename?: "StateDefinitionType";
  id: Scalars["ID"];
  isDefault: Scalars["Boolean"];
  name: Scalars["String"];
};

export type StateStepType = {
  __typename?: "StateStepType";
  id: Scalars["ID"];
  isStartState: Scalars["Boolean"];
  isStopState: Scalars["Boolean"];
  name: Scalars["String"];
  stateDefinition?: Maybe<StateDefinitionType>;
};

export type StateTransitionType = {
  __typename?: "StateTransitionType";
  casestatetransitionSet: Array<CaseStateTransitionType>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  formDefinition?: Maybe<Scalars["GenericScalar"]>;
  fromStep: DeepStateStepType;
  id: Scalars["ID"];
  notificationtemplateSet: Array<AdminNotificationTemplateCreateSuccess>;
  toStep: DeepStateStepType;
  updatedAt: Scalars["DateTime"];
};

export type SubmitFollowupReport = {
  __typename?: "SubmitFollowupReport";
  result?: Maybe<FollowupReportType>;
};

export type SubmitImage = {
  __typename?: "SubmitImage";
  file?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["UUID"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type SubmitIncidentReport = {
  __typename?: "SubmitIncidentReport";
  result?: Maybe<IncidentReportType>;
};

export type SubmitObservationSubject = {
  __typename?: "SubmitObservationSubject";
  result?: Maybe<ObservationSubjectType>;
};

export type SubmitObservationSubjectMonitoringRecord = {
  __typename?: "SubmitObservationSubjectMonitoringRecord";
  result?: Maybe<ObservationSubjectMonitoringRecordType>;
};

export type SubmitRecordImage = {
  __typename?: "SubmitRecordImage";
  file?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["UUID"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type SubmitRecordUploadFile = {
  __typename?: "SubmitRecordUploadFile";
  file?: Maybe<Scalars["String"]>;
  fileType?: Maybe<Scalars["String"]>;
  fileUrl?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["UUID"]>;
};

export type SubmitUploadFile = {
  __typename?: "SubmitUploadFile";
  file?: Maybe<Scalars["String"]>;
  fileType?: Maybe<Scalars["String"]>;
  fileUrl?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["UUID"]>;
};

export type SubmitZeroReportMutation = {
  __typename?: "SubmitZeroReportMutation";
  id?: Maybe<Scalars["UUID"]>;
};

export type SummaryByCategoryType = {
  __typename?: "SummaryByCategoryType";
  category: Scalars["String"];
  day: Scalars["Date"];
  ordering?: Maybe<Scalars["Int"]>;
  total: Scalars["Int"];
};

export type SummaryContributionType = {
  __typename?: "SummaryContributionType";
  day: Scalars["Date"];
  total: Scalars["Int"];
};

export type UnPublishReportTypeMutation = {
  __typename?: "UnPublishReportTypeMutation";
  reportType?: Maybe<ReportTypeType>;
};

export type UploadFileType = {
  __typename?: "UploadFileType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file: Scalars["String"];
  fileType: Scalars["String"];
  fileUrl?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  reportId: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type UserMessageType = {
  __typename?: "UserMessageType";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  isSeen: Scalars["Boolean"];
  message?: Maybe<MessageType>;
  user?: Maybe<UserType>;
};

export type UserMessageTypeNodeConnection = {
  __typename?: "UserMessageTypeNodeConnection";
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<UserMessageType>>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UserProfileType = {
  __typename?: "UserProfileType";
  authorityId?: Maybe<Scalars["Int"]>;
  authorityName?: Maybe<Scalars["String"]>;
  avatarUrl?: Maybe<Scalars["String"]>;
  consent?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  features?: Maybe<Array<Maybe<Scalars["String"]>>>;
  firstName: Scalars["String"];
  id: Scalars["Int"];
  isStaff?: Maybe<Scalars["Boolean"]>;
  isSuperuser?: Maybe<Scalars["Boolean"]>;
  lastName: Scalars["String"];
  role?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type UserType = {
  __typename?: "UserType";
  avatarUrl?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  telephone?: Maybe<Scalars["String"]>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type Verify = {
  __typename?: "Verify";
  payload: Scalars["GenericScalar"];
};

export type VerifyLoginQrTokenMutation = {
  __typename?: "VerifyLoginQRTokenMutation";
  me?: Maybe<UserProfileType>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
};

export type DeleteTokenCookieMutationVariables = Exact<{
  [key: string]: never;
}>;

export type DeleteTokenCookieMutation = {
  __typename?: "Mutation";
  deleteTokenCookie?: {
    __typename?: "DeleteJSONWebTokenCookie";
    deleted: boolean;
  } | null;
  deleteRefreshTokenCookie?: {
    __typename?: "DeleteRefreshTokenCookie";
    deleted: boolean;
  } | null;
};

export type RefreshTokenMutationVariables = Exact<{
  refreshToken?: InputMaybe<Scalars["String"]>;
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?: { __typename?: "Refresh"; token: string; payload: any } | null;
};

export type TokenAuthMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type TokenAuthMutation = {
  __typename?: "Mutation";
  tokenAuth?: {
    __typename?: "ObtainJSONWebToken";
    refreshExpiresIn: number;
    token: string;
  } | null;
};

export type AuthoritiesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  nameStartWith?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type AuthoritiesQuery = {
  __typename?: "Query";
  authorities?: {
    __typename?: "AuthorityTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AuthorityType";
      id: string;
      name: string;
      code: string;
    } | null>;
  } | null;
};

export type AuthorityQueryQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type AuthorityQueryQuery = {
  __typename?: "Query";
  adminAuthorityQuery?: {
    __typename?: "AdminAuthorityQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminAuthorityQueryType";
      id: string;
      name: string;
      code: string;
    } | null>;
  } | null;
};

export type AuthorityInheritLookupQueryVariables = Exact<{
  limit: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
}>;

export type AuthorityInheritLookupQuery = {
  __typename?: "Query";
  adminAuthorityInheritLookup?: {
    __typename?: "AdminAuthorityInheritLookupTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminAuthorityInheritLookupType";
      id: string;
      name: string;
      code: string;
    } | null>;
  } | null;
};

export type AuthorityInheritsDownLookupQueryVariables = Exact<{
  authorityId: Scalars["ID"];
}>;

export type AuthorityInheritsDownLookupQuery = {
  __typename?: "Query";
  authorityInheritsDown?: Array<{
    __typename?: "AuthorityType";
    id: string;
    name: string;
    code: string;
  }> | null;
};

export type AuthorityInheritsDownShallowQueryVariables = Exact<{
  authorityId: Scalars["ID"];
}>;

export type AuthorityInheritsDownShallowQuery = {
  __typename?: "Query";
  authorityInheritsDownShallow?: Array<{
    __typename?: "AuthorityType";
    id: string;
    name: string;
    code: string;
  }> | null;
};

export type AuthorityCreateMutationVariables = Exact<{
  code: Scalars["String"];
  name: Scalars["String"];
  area?: InputMaybe<Scalars["String"]>;
  inherits?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  boundaryConnects?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type AuthorityCreateMutation = {
  __typename?: "Mutation";
  adminAuthorityCreate?: {
    __typename?: "AdminAuthorityCreateMutation";
    result?:
      | {
          __typename: "AdminAuthorityCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | { __typename: "AdminAuthorityCreateSuccess"; id: string; code: string }
      | null;
  } | null;
};

export type AuthorityUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  code: Scalars["String"];
  name: Scalars["String"];
  area?: InputMaybe<Scalars["String"]>;
  inherits?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  boundaryConnects?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type AuthorityUpdateMutation = {
  __typename?: "Mutation";
  adminAuthorityUpdate?: {
    __typename?: "AdminAuthorityUpdateMutation";
    result?:
      | {
          __typename: "AdminAuthorityUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminAuthorityUpdateSuccess";
          authority?: {
            __typename?: "AuthorityType";
            id: string;
            code: string;
            name: string;
            area?: any | null;
            inherits: Array<{
              __typename?: "AuthorityInheritType";
              id: string;
              code: string;
              name: string;
            } | null>;
            boundaryConnects: Array<{
              __typename?: "AuthorityBoundaryConnectType";
              id: string;
              code: string;
              name: string;
            } | null>;
          } | null;
        }
      | null;
  } | null;
};

export type AuthorityDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AuthorityDeleteMutation = {
  __typename?: "Mutation";
  adminAuthorityDelete?: {
    __typename?: "AdminAuthorityDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetAuthorityQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetAuthorityQuery = {
  __typename?: "Query";
  authority?: {
    __typename?: "AuthorityType";
    id: string;
    code: string;
    name: string;
    area?: any | null;
    inherits: Array<{
      __typename?: "AuthorityInheritType";
      id: string;
      code: string;
      name: string;
    } | null>;
    boundaryConnects: Array<{
      __typename?: "AuthorityBoundaryConnectType";
      id: string;
      code: string;
      name: string;
    } | null>;
  } | null;
};

export type CasesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
  authorities?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  reportTypes?: InputMaybe<
    Array<InputMaybe<Scalars["UUID"]>> | InputMaybe<Scalars["UUID"]>
  >;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
}>;

export type CasesQuery = {
  __typename?: "Query";
  casesQuery?: {
    __typename?: "CaseTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "CaseType";
      id: any;
      isFinished: boolean;
      statusLabel?: string | null;
      report?: {
        __typename?: "IncidentReportType";
        createdAt: any;
        incidentDate: any;
        rendererData: string;
        reportType?: {
          __typename?: "ReportTypeType";
          id: any;
          name: string;
        } | null;
        reportedBy?: {
          __typename?: "UserType";
          username: string;
          firstName: string;
          lastName: string;
          telephone?: string | null;
        } | null;
        authorities?: Array<{
          __typename?: "AuthorityType";
          name: string;
        } | null> | null;
      } | null;
    } | null>;
  } | null;
};

export type GetCaseQueryVariables = Exact<{
  id: Scalars["UUID"];
}>;

export type GetCaseQuery = {
  __typename?: "Query";
  caseGet?: {
    __typename?: "CaseType";
    id: any;
    description: string;
    isFinished: boolean;
    statusLabel?: string | null;
    threadId?: number | null;
    outbreakPlanInfo?: any | null;
    authorities?: Array<{
      __typename?: "AuthorityType";
      id: string;
      name: string;
    } | null> | null;
    report?: {
      __typename?: "IncidentReportType";
      id: any;
      createdAt: any;
      incidentDate: any;
      gpsLocation?: string | null;
      updatedAt: any;
      rendererData: string;
      data?: any | null;
      platform?: string | null;
      reportType?: {
        __typename?: "ReportTypeType";
        id: any;
        name: string;
        definition?: any | null;
      } | null;
      coverImage?: {
        __typename?: "ImageType";
        id: any;
        file: string;
        thumbnail?: string | null;
      } | null;
      images?: Array<{
        __typename?: "ImageType";
        id: any;
        file: string;
        thumbnail?: string | null;
        imageUrl?: string | null;
      } | null> | null;
      uploadFiles?: Array<{
        __typename?: "UploadFileType";
        id: any;
        file: string;
        fileType: string;
        fileUrl?: string | null;
      } | null> | null;
      reportedBy?: {
        __typename?: "UserType";
        firstName: string;
        lastName: string;
        id: string;
        telephone?: string | null;
      } | null;
      authorities?: Array<{
        __typename?: "AuthorityType";
        name: string;
      } | null> | null;
    } | null;
    stateDefinition?: {
      __typename?: "DeepStateDefinitionType";
      id: string;
      name: string;
      isDefault: boolean;
      statestepSet?: Array<{
        __typename?: "DeepStateStepType";
        id: string;
        name: string;
        isStartState: boolean;
        isStopState: boolean;
        toTransitions?: Array<{
          __typename?: "DeepStateTransitionType";
          id: string;
          formDefinition?: any | null;
          fromStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
          toStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
        } | null> | null;
      } | null> | null;
    } | null;
    states?: Array<{
      __typename?: "CaseStateType";
      id: string;
      state: {
        __typename?: "DeepStateStepType";
        id: string;
        name: string;
        isStartState: boolean;
        isStopState: boolean;
        toTransitions?: Array<{
          __typename?: "DeepStateTransitionType";
          id: string;
          formDefinition?: any | null;
          fromStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
          toStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
        } | null> | null;
      };
      transition?: {
        __typename?: "CaseStateTransitionType";
        id: string;
        createdAt: any;
        formData?: any | null;
        createdBy: {
          __typename?: "UserType";
          id: string;
          firstName: string;
          lastName: string;
        };
        transition: {
          __typename?: "StateTransitionType";
          id: string;
          formDefinition?: any | null;
          fromStep: {
            __typename?: "DeepStateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          };
          toStep: {
            __typename?: "DeepStateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          };
        };
      } | null;
    } | null> | null;
  } | null;
};

export type StateForwardMutationVariables = Exact<{
  caseId: Scalars["ID"];
  transitionId: Scalars["ID"];
  formData?: InputMaybe<Scalars["GenericScalar"]>;
}>;

export type StateForwardMutation = {
  __typename?: "Mutation";
  forwardState?: {
    __typename?: "ForwardStateMutation";
    result?: {
      __typename?: "CaseStateType";
      id: string;
      state: {
        __typename?: "DeepStateStepType";
        id: string;
        name: string;
        isStartState: boolean;
        isStopState: boolean;
        toTransitions?: Array<{
          __typename?: "DeepStateTransitionType";
          id: string;
          formDefinition?: any | null;
          fromStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
          toStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
          } | null;
        } | null> | null;
      };
    } | null;
  } | null;
};

export type CaseDefinitionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  descriptionContains?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type CaseDefinitionsQuery = {
  __typename?: "Query";
  adminCaseDefinitionQuery?: {
    __typename?: "AdminCaseDefinitionQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminCaseDefinitionQueryType";
      id: string;
      description: string;
      condition: string;
      reportType: {
        __typename?: "AdminReportTypeCreateSuccess";
        id: any;
        name: string;
      };
    } | null>;
  } | null;
};

export type CaseDefinitionCreateMutationVariables = Exact<{
  reportTypeId: Scalars["UUID"];
  description: Scalars["String"];
  condition: Scalars["String"];
}>;

export type CaseDefinitionCreateMutation = {
  __typename?: "Mutation";
  adminCaseDefinitionCreate?: {
    __typename?: "AdminCaseDefinitionCreateMutation";
    result?:
      | {
          __typename: "AdminCaseDefinitionCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminCaseDefinitionCreateSuccess";
          id: string;
          description: string;
        }
      | null;
  } | null;
};

export type CaseDefinitionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  reportTypeId: Scalars["UUID"];
  description: Scalars["String"];
  condition: Scalars["String"];
}>;

export type CaseDefinitionUpdateMutation = {
  __typename?: "Mutation";
  adminCaseDefinitionUpdate?: {
    __typename?: "AdminCaseDefinitionUpdateMutation";
    result?:
      | {
          __typename: "AdminCaseDefinitionUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminCaseDefinitionUpdateSuccess";
          caseDefinition?: {
            __typename?: "CaseDefinitionType";
            id: string;
            description: string;
            condition: string;
            reportType: {
              __typename?: "AdminReportTypeCreateSuccess";
              id: any;
              name: string;
            };
          } | null;
        }
      | null;
  } | null;
};

export type CaseDefinitionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CaseDefinitionDeleteMutation = {
  __typename?: "Mutation";
  adminCaseDefinitionDelete?: {
    __typename?: "AdminCaseDefinitionDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetCaseDefinitionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetCaseDefinitionQuery = {
  __typename?: "Query";
  caseDefinitionGet?: {
    __typename?: "CaseDefinitionType";
    id: string;
    description: string;
    condition: string;
    reportType: {
      __typename?: "AdminReportTypeCreateSuccess";
      id: any;
      name: string;
    };
  } | null;
};

export type QueryCommentsQueryVariables = Exact<{
  threadId: Scalars["ID"];
}>;

export type QueryCommentsQuery = {
  __typename?: "Query";
  comments?: Array<{
    __typename?: "CommentType";
    id: string;
    body: string;
    threadId?: number | null;
    createdAt: any;
    attachments?: Array<{
      __typename?: "CommentAttachmentType";
      id: string;
      file?: string | null;
      thumbnail?: string | null;
      createdAt: any;
    } | null> | null;
    createdBy: {
      __typename?: "UserType";
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    };
  } | null> | null;
};

export type MutationCommentCreateMutationVariables = Exact<{
  body: Scalars["String"];
  threadId: Scalars["Int"];
  files?: InputMaybe<
    Array<InputMaybe<Scalars["Upload"]>> | InputMaybe<Scalars["Upload"]>
  >;
}>;

export type MutationCommentCreateMutation = {
  __typename?: "Mutation";
  commentCreate?: {
    __typename?: "CommentCreateMutation";
    result?:
      | {
          __typename: "CommentCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "CommentCreateSuccess";
          id: string;
          body: string;
          threadId?: number | null;
          createdAt: any;
          attachments?: Array<{
            __typename?: "CommentAttachmentType";
            id: string;
            file?: string | null;
            thumbnail?: string | null;
            createdAt: any;
          } | null> | null;
          createdBy: {
            __typename?: "UserType";
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            avatarUrl?: string | null;
          };
        }
      | null;
  } | null;
};

export type ConfigurationsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ConfigurationsQuery = {
  __typename?: "Query";
  adminConfigurationQuery?: {
    __typename?: "AdminConfigurationQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminConfigurationQueryType";
      key: string;
      value: string;
    } | null>;
  } | null;
};

export type ConfigurationCreateMutationVariables = Exact<{
  key: Scalars["String"];
  value: Scalars["String"];
}>;

export type ConfigurationCreateMutation = {
  __typename?: "Mutation";
  adminConfigurationCreate?: {
    __typename?: "AdminConfigurationCreateMutation";
    result?:
      | {
          __typename: "AdminConfigurationCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminConfigurationCreateSuccess";
          key: string;
          value: string;
        }
      | null;
  } | null;
};

export type ConfigurationUpdateMutationVariables = Exact<{
  id: Scalars["String"];
  key: Scalars["String"];
  value: Scalars["String"];
}>;

export type ConfigurationUpdateMutation = {
  __typename?: "Mutation";
  adminConfigurationUpdate?: {
    __typename?: "AdminConfigurationUpdateMutation";
    result?:
      | {
          __typename: "AdminConfigurationUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminConfigurationUpdateSuccess";
          key: string;
          value: string;
        }
      | null;
  } | null;
};

export type ConfigurationDeleteMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type ConfigurationDeleteMutation = {
  __typename?: "Mutation";
  adminConfigurationDelete?: {
    __typename?: "AdminConfigurationDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetConfigurationQueryVariables = Exact<{
  key: Scalars["String"];
}>;

export type GetConfigurationQuery = {
  __typename?: "Query";
  configurationGet?: {
    __typename?: "ConfigurationType";
    key: string;
    value: string;
  } | null;
};

export type StatQueryQueryVariables = Exact<{
  authorityId: Scalars["Int"];
}>;

export type StatQueryQuery = {
  __typename?: "Query";
  statQuery?: {
    __typename?: "StatType";
    openCaseCount?: number | null;
    reporterCount?: number | null;
    officialCount?: number | null;
  } | null;
};

export type EventsQueryQueryVariables = Exact<{
  authorityId: Scalars["Int"];
}>;

export type EventsQueryQuery = {
  __typename?: "Query";
  eventsQuery?: {
    __typename?: "EventType";
    cases?: Array<{
      __typename?: "CaseType";
      id: any;
      report?: {
        __typename?: "IncidentReportType";
        id: any;
        createdAt: any;
        gpsLocation?: string | null;
        rendererData: string;
        reportType?: {
          __typename?: "ReportTypeType";
          category?: {
            __typename?: "CategoryType";
            name: string;
            icon?: string | null;
          } | null;
        } | null;
        images?: Array<{
          __typename?: "ImageType";
          thumbnail?: string | null;
        } | null> | null;
      } | null;
    } | null> | null;
    reports?: Array<{
      __typename?: "IncidentReportType";
      id: any;
      createdAt: any;
      gpsLocation?: string | null;
      rendererData: string;
      reportType?: {
        __typename?: "ReportTypeType";
        category?: {
          __typename?: "CategoryType";
          name: string;
          icon?: string | null;
        } | null;
      } | null;
      images?: Array<{
        __typename?: "ImageType";
        thumbnail?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type SummaryReportByCategoryQueryQueryVariables = Exact<{
  authorityId: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
}>;

export type SummaryReportByCategoryQueryQuery = {
  __typename?: "Query";
  summaryReportByCategoryQuery?: Array<{
    __typename?: "SummaryByCategoryType";
    category: string;
    ordering?: number | null;
    day: any;
    total: number;
  }> | null;
};

export type SummaryCaseByCategoryQueryQueryVariables = Exact<{
  authorityId: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
}>;

export type SummaryCaseByCategoryQueryQuery = {
  __typename?: "Query";
  summaryCaseByCategoryQuery?: Array<{
    __typename?: "SummaryByCategoryType";
    category: string;
    ordering?: number | null;
    day: any;
    total: number;
  }> | null;
};

export type QueryFollowupsQueryVariables = Exact<{
  incidentId: Scalars["ID"];
}>;

export type QueryFollowupsQuery = {
  __typename?: "Query";
  followups?: Array<{
    __typename?: "FollowupReportType";
    id: any;
    rendererData: string;
    createdAt: any;
    images?: Array<{
      __typename?: "ImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
    } | null> | null;
  } | null> | null;
};

export type GetFollowupReportQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetFollowupReportQuery = {
  __typename?: "Query";
  followupReport?: {
    __typename?: "FollowupReportType";
    id: any;
    data?: any | null;
    testFlag: boolean;
    rendererData: string;
    createdAt: any;
    incident?: { __typename?: "IncidentReportType"; id: any } | null;
    reportType?: {
      __typename?: "ReportTypeType";
      id: any;
      name: string;
    } | null;
    reportedBy?: {
      __typename?: "UserType";
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    } | null;
    images?: Array<{
      __typename?: "ImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
      imageUrl?: string | null;
    } | null> | null;
  } | null;
};

export type ResetPasswordRequestCreateMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ResetPasswordRequestCreateMutation = {
  __typename?: "Mutation";
  resetPasswordRequest?: {
    __typename?: "ResetPasswordRequestMutation";
    success?: boolean | null;
  } | null;
};

export type ResetPasswordCreateMutationVariables = Exact<{
  token: Scalars["String"];
  password: Scalars["String"];
}>;

export type ResetPasswordCreateMutation = {
  __typename?: "Mutation";
  resetPassword?: {
    __typename?: "ResetPasswordMutation";
    success?: boolean | null;
  } | null;
};

export type InvitationCodesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  roleContains?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type InvitationCodesQuery = {
  __typename?: "Query";
  adminInvitationCodeQuery?: {
    __typename?: "AdminInvitationCodeQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminInvitationCodeQueryType";
      id: string;
      code: string;
      fromDate: any;
      throughDate: any;
      role: string;
      authority: { __typename?: "AdminAuthorityCreateSuccess"; name: string };
    } | null>;
  } | null;
};

export type InvitationCodeCreateMutationVariables = Exact<{
  code: Scalars["String"];
  authorityId: Scalars["Int"];
  fromDate: Scalars["DateTime"];
  throughDate: Scalars["DateTime"];
  role?: InputMaybe<Scalars["String"]>;
}>;

export type InvitationCodeCreateMutation = {
  __typename?: "Mutation";
  adminInvitationCodeCreate?: {
    __typename?: "AdminInvitationCodeCreateMutation";
    result?:
      | {
          __typename: "AdminInvitationCodeCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminInvitationCodeCreateSuccess";
          id: string;
          code: string;
        }
      | null;
  } | null;
};

export type InvitationCodeUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  code: Scalars["String"];
  authorityId?: InputMaybe<Scalars["Int"]>;
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
  role?: InputMaybe<Scalars["String"]>;
}>;

export type InvitationCodeUpdateMutation = {
  __typename?: "Mutation";
  adminInvitationCodeUpdate?: {
    __typename?: "AdminInvitationCodeUpdateMutation";
    result?:
      | {
          __typename: "AdminInvitationCodeUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminInvitationCodeUpdateSuccess";
          invitationCode?: {
            __typename?: "InvitationCodeType";
            id: string;
            code: string;
            fromDate: any;
            throughDate: any;
            role: string;
            authority: {
              __typename?: "AdminAuthorityCreateSuccess";
              id: string;
              name: string;
            };
          } | null;
        }
      | null;
  } | null;
};

export type InvitationCodeDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type InvitationCodeDeleteMutation = {
  __typename?: "Mutation";
  adminInvitationCodeDelete?: {
    __typename?: "AdminInvitationCodeDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetInvitationCodeQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetInvitationCodeQuery = {
  __typename?: "Query";
  invitationCode?: {
    __typename?: "InvitationCodeType";
    id: string;
    code: string;
    fromDate: any;
    throughDate: any;
    role: string;
    authority: {
      __typename?: "AdminAuthorityCreateSuccess";
      id: string;
      name: string;
    };
  } | null;
};

export type NotificationTemplateAuthorityQueryVariables = Exact<{
  reportTypeId: Scalars["ID"];
}>;

export type NotificationTemplateAuthorityQuery = {
  __typename?: "Query";
  adminNotificationTemplateAuthorityQuery?: Array<{
    __typename?: "AdminNotificationTemplateAuthorityType";
    notificationTemplateId: string;
    notificationTemplateName: string;
    notificationId?: number | null;
    to?: string | null;
  } | null> | null;
};

export type AuthorityNotificationUpsertMutationVariables = Exact<{
  notificationTemplateId: Scalars["Int"];
  to: Scalars["String"];
}>;

export type AuthorityNotificationUpsertMutation = {
  __typename?: "Mutation";
  adminAuthorityNotificationUpsert?: {
    __typename?: "AdminAuthorityNotificationUpsertMutation";
    result?:
      | {
          __typename: "AdminAuthorityNotificationUpsertProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminAuthorityNotificationUpsertSuccess";
          id: string;
          to: string;
        }
      | null;
  } | null;
};

export type AuthorityNotificationDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AuthorityNotificationDeleteMutation = {
  __typename?: "Mutation";
  adminAuthorityNotificationDelete?: {
    __typename?: "AdminAuthorityNotificationDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type NotificationTemplatesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type NotificationTemplatesQuery = {
  __typename?: "Query";
  adminNotificationTemplateQuery?: {
    __typename?: "AdminNotificationTemplateQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminNotificationTemplateQueryType";
      id: string;
      name: string;
      reportType: {
        __typename?: "AdminReportTypeCreateSuccess";
        id: any;
        name: string;
      };
    } | null>;
  } | null;
};

export type NotificationTemplateCreateMutationVariables = Exact<{
  name: Scalars["String"];
  type: Scalars["String"];
  condition?: InputMaybe<Scalars["String"]>;
  stateTransitionId?: InputMaybe<Scalars["Int"]>;
  reportTypeId: Scalars["UUID"];
  titleTemplate: Scalars["String"];
  bodyTemplate: Scalars["String"];
}>;

export type NotificationTemplateCreateMutation = {
  __typename?: "Mutation";
  adminNotificationTemplateCreate?: {
    __typename?: "AdminNotificationTemplateCreateMutation";
    result?:
      | {
          __typename: "AdminNotificationTemplateCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminNotificationTemplateCreateSuccess";
          id: string;
          name: string;
          type: CasesNotificationTemplateTypeChoices;
          reportType: {
            __typename?: "AdminReportTypeCreateSuccess";
            id: any;
            name: string;
          };
        }
      | null;
  } | null;
};

export type NotificationTemplateUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  type: Scalars["String"];
  condition?: InputMaybe<Scalars["String"]>;
  stateTransitionId?: InputMaybe<Scalars["Int"]>;
  reportTypeId: Scalars["UUID"];
  titleTemplate: Scalars["String"];
  bodyTemplate: Scalars["String"];
}>;

export type NotificationTemplateUpdateMutation = {
  __typename?: "Mutation";
  adminNotificationTemplateUpdate?: {
    __typename?: "AdminNotificationTemplateUpdateMutation";
    result?:
      | {
          __typename: "AdminNotificationTemplateUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminNotificationTemplateUpdateSuccess";
          notificationTemplate?: {
            __typename?: "NotificationTemplateType";
            id: string;
            name: string;
            type: CasesNotificationTemplateTypeChoices;
            condition?: string | null;
            titleTemplate: string;
            bodyTemplate: string;
            reportType: {
              __typename?: "AdminReportTypeCreateSuccess";
              id: any;
              name: string;
            };
            stateTransition?: {
              __typename?: "DeepStateTransitionType";
              id: string;
            } | null;
          } | null;
        }
      | null;
  } | null;
};

export type NotificationTemplateDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type NotificationTemplateDeleteMutation = {
  __typename?: "Mutation";
  adminNotificationTemplateDelete?: {
    __typename?: "AdminNotificationTemplateDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetNotificationTemplateQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetNotificationTemplateQuery = {
  __typename?: "Query";
  notificationTemplateGet?: {
    __typename?: "NotificationTemplateType";
    id: string;
    name: string;
    type: CasesNotificationTemplateTypeChoices;
    condition?: string | null;
    titleTemplate: string;
    bodyTemplate: string;
    reportType: {
      __typename?: "AdminReportTypeCreateSuccess";
      id: any;
      name: string;
    };
    stateTransition?: {
      __typename?: "DeepStateTransitionType";
      id: string;
      fromStep?: {
        __typename?: "StateStepType";
        id: string;
        name: string;
      } | null;
      toStep?: {
        __typename?: "StateStepType";
        id: string;
        name: string;
      } | null;
    } | null;
  } | null;
};

export type ObservationSubjectsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  definitionId?: InputMaybe<Scalars["Float"]>;
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
}>;

export type ObservationSubjectsQuery = {
  __typename?: "Query";
  observationSubjects?: {
    __typename?: "ObservationSubjectTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "ObservationSubjectType";
      id: any;
      identity: string;
      title: string;
      description: string;
      gpsLocation?: string | null;
      createdAt: any;
      images?: Array<{
        __typename?: "ObservationImageType";
        id: any;
        file: string;
        thumbnail?: string | null;
      } | null> | null;
    } | null>;
  } | null;
};

export type GetObservationSubjectQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetObservationSubjectQuery = {
  __typename?: "Query";
  observationSubject?: {
    __typename?: "ObservationSubjectType";
    id: any;
    title: string;
    description: string;
    identity: string;
    formData?: any | null;
    createdAt: any;
    gpsLocation?: string | null;
    definition?: {
      __typename?: "ObservationDefinitionType";
      name: string;
      description?: string | null;
      registerFormDefinition?: any | null;
    } | null;
    monitoringRecords?: Array<{
      __typename?: "ObservationSubjectMonitoringRecordType";
      id: any;
      title: string;
      description: string;
      createdAt: any;
    } | null> | null;
    images?: Array<{
      __typename?: "ObservationImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
      imageUrl?: string | null;
    } | null> | null;
    uploadFiles?: Array<{
      __typename?: "ObservationUploadFileType";
      id: any;
      file: string;
      fileType: string;
      fileUrl?: string | null;
    } | null> | null;
  } | null;
};

export type GetObservationSubjectMonitoringQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetObservationSubjectMonitoringQuery = {
  __typename?: "Query";
  observationSubjectMonitoringRecord?: {
    __typename?: "ObservationSubjectMonitoringRecordType";
    id: any;
    title: string;
    description: string;
    formData?: any | null;
    createdAt: any;
    subject: {
      __typename?: "ObservationSubjectType";
      title: string;
      description: string;
    };
    monitoringDefinition?: {
      __typename?: "ObservationMonitoringDefinitionType";
      name: string;
      description?: string | null;
      formDefinition?: any | null;
    } | null;
    images?: Array<{
      __typename?: "ObservationImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
      imageUrl?: string | null;
    } | null> | null;
    uploadFiles?: Array<{
      __typename?: "ObservationUploadFileType";
      id: any;
      file: string;
      fileType: string;
      fileUrl?: string | null;
    } | null> | null;
  } | null;
};

export type ObservationDefinitionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ObservationDefinitionsQuery = {
  __typename?: "Query";
  adminObservationDefinitionQuery?: {
    __typename?: "AdminDefinitionQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminDefinitionQueryType";
      id: string;
      name: string;
      description?: string | null;
    } | null>;
  } | null;
};

export type ObservationDefinitionCreateMutationVariables = Exact<{
  name: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  registerFormDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
  descriptionTemplate: Scalars["String"];
  identityTemplate: Scalars["String"];
}>;

export type ObservationDefinitionCreateMutation = {
  __typename?: "Mutation";
  adminObservationDefinitionCreate?: {
    __typename?: "AdminObservationDefinitionCreateMutation";
    result?:
      | {
          __typename: "AdminObservationDefinitionCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminObservationDefinitionCreateSuccess";
          id: string;
          name: string;
        }
      | null;
  } | null;
};

export type ObservationDefinitionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  registerFormDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
  descriptionTemplate: Scalars["String"];
  identityTemplate: Scalars["String"];
}>;

export type ObservationDefinitionUpdateMutation = {
  __typename?: "Mutation";
  adminObservationDefinitionUpdate?: {
    __typename?: "AdminObservationDefinitionUpdateMutation";
    result?:
      | {
          __typename: "AdminObservationDefinitionUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminObservationDefinitionUpdateSuccess";
          definition?: {
            __typename?: "ObservationDefinitionType";
            id: string;
            name: string;
            description?: string | null;
            registerFormDefinition?: any | null;
            titleTemplate: string;
            descriptionTemplate: string;
            identityTemplate: string;
          } | null;
        }
      | null;
  } | null;
};

export type ObservationDefinitionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ObservationDefinitionDeleteMutation = {
  __typename?: "Mutation";
  adminObservationDefinitionDelete?: {
    __typename?: "AdminObservationDefinitionDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetObservationDefinitionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetObservationDefinitionQuery = {
  __typename?: "Query";
  observationDefinitionGet?: {
    __typename?: "ObservationDefinitionType";
    id: string;
    name: string;
    description?: string | null;
    registerFormDefinition?: any | null;
    titleTemplate: string;
    descriptionTemplate: string;
    identityTemplate: string;
  } | null;
  adminObservationMonitoringDefinitionQuery?: Array<{
    __typename?: "AdminMonitoringDefinitionQueryType";
    id: string;
    name: string;
    description?: string | null;
  } | null> | null;
};

export type ObservationMonitoringDefinitionCreateMutationVariables = Exact<{
  definitionId: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  formDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
  descriptionTemplate: Scalars["String"];
}>;

export type ObservationMonitoringDefinitionCreateMutation = {
  __typename?: "Mutation";
  adminObservationMonitoringDefinitionCreate?: {
    __typename?: "AdminObservationMonitoringDefinitionCreateMutation";
    result?:
      | {
          __typename: "AdminObservationMonitoringDefinitionCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminObservationMonitoringDefinitionCreateSuccess";
          id: string;
          name: string;
        }
      | null;
  } | null;
};

export type ObservationMonitoringDefinitionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  definitionId: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  formDefinition: Scalars["JSONString"];
  titleTemplate: Scalars["String"];
  descriptionTemplate: Scalars["String"];
}>;

export type ObservationMonitoringDefinitionUpdateMutation = {
  __typename?: "Mutation";
  adminObservationMonitoringDefinitionUpdate?: {
    __typename?: "AdminObservationMonitoringDefinitionUpdateMutation";
    result?:
      | {
          __typename: "AdminObservationMonitoringDefinitionUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminObservationMonitoringDefinitionUpdateSuccess";
          monitoringDefinition?: {
            __typename?: "ObservationMonitoringDefinitionType";
            id: string;
            name: string;
            description?: string | null;
            formDefinition?: any | null;
            titleTemplate: string;
            descriptionTemplate: string;
            definition: {
              __typename?: "AdminObservationDefinitionCreateSuccess";
              id: string;
            };
          } | null;
        }
      | null;
  } | null;
};

export type ObservationMonitoringDefinitionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ObservationMonitoringDefinitionDeleteMutation = {
  __typename?: "Mutation";
  adminObservationMonitoringDefinitionDelete?: {
    __typename?: "AdminObservationMonitoringDefinitionDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetObservationMonitoringDefinitionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetObservationMonitoringDefinitionQuery = {
  __typename?: "Query";
  observationMonitoringDefinitionGet?: {
    __typename?: "ObservationMonitoringDefinitionType";
    id: string;
    name: string;
    description?: string | null;
    formDefinition?: any | null;
    titleTemplate: string;
    descriptionTemplate: string;
    definition: {
      __typename?: "AdminObservationDefinitionCreateSuccess";
      id: string;
    };
  } | null;
};

export type OutbreakPlacesQueryVariables = Exact<{
  caseId: Scalars["UUID"];
}>;

export type OutbreakPlacesQuery = {
  __typename?: "Query";
  outbreakPlaces?: Array<{
    __typename?: "OutbreakPlaceType";
    zone?: number | null;
    color: string;
    place?: {
      __typename?: "PlaceType";
      name: string;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
  } | null> | null;
};

export type OutbreakPlansQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type OutbreakPlansQuery = {
  __typename?: "Query";
  adminOutbreakPlanQuery?: {
    __typename?: "AdminOutbreakPlanQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminOutbreakPlanQueryType";
      id: string;
      name: string;
      description: string;
      reportType: { __typename?: "AdminReportTypeCreateSuccess"; name: string };
    } | null>;
  } | null;
};

export type OutbreakPlanCreateMutationVariables = Exact<{
  name: Scalars["String"];
  description: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateStepId: Scalars["Int"];
  zone1Color?: InputMaybe<Scalars["String"]>;
  zone1MessageBody?: InputMaybe<Scalars["String"]>;
  zone1MessageTitle?: InputMaybe<Scalars["String"]>;
  zone1Radius?: InputMaybe<Scalars["Float"]>;
  zone2Color?: InputMaybe<Scalars["String"]>;
  zone2MessageBody?: InputMaybe<Scalars["String"]>;
  zone2MessageTitle?: InputMaybe<Scalars["String"]>;
  zone2Radius?: InputMaybe<Scalars["Float"]>;
  zone3Color?: InputMaybe<Scalars["String"]>;
  zone3MessageBody?: InputMaybe<Scalars["String"]>;
  zone3MessageTitle?: InputMaybe<Scalars["String"]>;
  zone3Radius?: InputMaybe<Scalars["Float"]>;
}>;

export type OutbreakPlanCreateMutation = {
  __typename?: "Mutation";
  adminOutbreakPlanCreate?: {
    __typename?: "AdminOutbreakPlanCreateMutation";
    result?:
      | {
          __typename: "AdminOutbreakPlanCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminOutbreakPlanCreateSuccess";
          id: string;
          name: string;
          description: string;
          reportType: {
            __typename?: "AdminReportTypeCreateSuccess";
            id: any;
            name: string;
          };
        }
      | null;
  } | null;
};

export type OutbreakPlanUpdateMutationVariables = Exact<{
  id: Scalars["Int"];
  name: Scalars["String"];
  description: Scalars["String"];
  reportTypeId: Scalars["UUID"];
  stateStepId: Scalars["Int"];
  zone1Color?: InputMaybe<Scalars["String"]>;
  zone1MessageBody?: InputMaybe<Scalars["String"]>;
  zone1MessageTitle?: InputMaybe<Scalars["String"]>;
  zone1Radius?: InputMaybe<Scalars["Float"]>;
  zone2Color?: InputMaybe<Scalars["String"]>;
  zone2MessageBody?: InputMaybe<Scalars["String"]>;
  zone2MessageTitle?: InputMaybe<Scalars["String"]>;
  zone2Radius?: InputMaybe<Scalars["Float"]>;
  zone3Color?: InputMaybe<Scalars["String"]>;
  zone3MessageBody?: InputMaybe<Scalars["String"]>;
  zone3MessageTitle?: InputMaybe<Scalars["String"]>;
  zone3Radius?: InputMaybe<Scalars["Float"]>;
}>;

export type OutbreakPlanUpdateMutation = {
  __typename?: "Mutation";
  adminOutbreakPlanUpdate?: {
    __typename?: "AdminOutbreakPlanUpdateMutation";
    result?:
      | {
          __typename: "AdminOutbreakPlanUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminOutbreakPlanUpdateSuccess";
          id: string;
          name: string;
          description: string;
          zone1Color: string;
          zone1MessageBody: string;
          zone1MessageTitle: string;
          zone1Radius?: number | null;
          zone2Color: string;
          zone2MessageBody: string;
          zone2MessageTitle: string;
          zone2Radius?: number | null;
          zone3Color: string;
          zone3MessageBody: string;
          zone3MessageTitle: string;
          zone3Radius?: number | null;
          reportType: {
            __typename?: "AdminReportTypeCreateSuccess";
            id: any;
            name: string;
          };
          stateStep: {
            __typename?: "DeepStateStepType";
            id: string;
            name: string;
          };
        }
      | null;
  } | null;
};

export type OutbreakPlanDeleteMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type OutbreakPlanDeleteMutation = {
  __typename?: "Mutation";
  adminOutbreakPlanDelete?: {
    __typename?: "AdminOutbreakPlanDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetOutbreakPlanQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GetOutbreakPlanQuery = {
  __typename?: "Query";
  outbreakPlanGet?: {
    __typename?: "OutbreakPlanType";
    id: string;
    name: string;
    description: string;
    zone1Color: string;
    zone1MessageBody: string;
    zone1MessageTitle: string;
    zone1Radius?: number | null;
    zone2Color: string;
    zone2MessageBody: string;
    zone2MessageTitle: string;
    zone2Radius?: number | null;
    zone3Color: string;
    zone3MessageBody: string;
    zone3MessageTitle: string;
    zone3Radius?: number | null;
    reportType: {
      __typename?: "AdminReportTypeCreateSuccess";
      id: any;
      name: string;
    };
    stateStep: { __typename?: "DeepStateStepType"; id: string; name: string };
  } | null;
};

export type PlacesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type PlacesQuery = {
  __typename?: "Query";
  adminPlaceQuery?: {
    __typename?: "AdminPlaceQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminPlaceQueryType";
      id: string;
      name: string;
      authority: { __typename?: "AdminAuthorityCreateSuccess"; name: string };
    } | null>;
  } | null;
};

export type PlaceCreateMutationVariables = Exact<{
  name: Scalars["String"];
  authorityId: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  notificationTo?: InputMaybe<Scalars["String"]>;
}>;

export type PlaceCreateMutation = {
  __typename?: "Mutation";
  adminPlaceCreate?: {
    __typename?: "AdminPlaceCreateMutation";
    result?:
      | {
          __typename: "AdminPlaceCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminPlaceCreateSuccess";
          id: string;
          name: string;
          notificationTo: string;
          location?: any | null;
          authority: {
            __typename?: "AdminAuthorityCreateSuccess";
            id: string;
            name: string;
          };
        }
      | null;
  } | null;
};

export type PlaceUpdateMutationVariables = Exact<{
  id: Scalars["Int"];
  name: Scalars["String"];
  authorityId: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  notificationTo?: InputMaybe<Scalars["String"]>;
}>;

export type PlaceUpdateMutation = {
  __typename?: "Mutation";
  adminPlaceUpdate?: {
    __typename?: "AdminPlaceUpdateMutation";
    result?:
      | {
          __typename: "AdminPlaceUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminPlaceUpdateSuccess";
          id: string;
          name: string;
          notificationTo: string;
          latitude?: number | null;
          longitude?: number | null;
          authority: {
            __typename?: "AdminAuthorityCreateSuccess";
            id: string;
            name: string;
          };
        }
      | null;
  } | null;
};

export type PlaceDeleteMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type PlaceDeleteMutation = {
  __typename?: "Mutation";
  adminPlaceDelete?: {
    __typename?: "AdminPlaceDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetPlaceQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GetPlaceQuery = {
  __typename?: "Query";
  placeGet?: {
    __typename?: "PlaceType";
    id: string;
    name: string;
    notificationTo: string;
    latitude?: number | null;
    longitude?: number | null;
    authority: {
      __typename?: "AdminAuthorityCreateSuccess";
      id: string;
      name: string;
    };
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "UserProfileType";
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    authorityId?: number | null;
    authorityName?: string | null;
    avatarUrl?: string | null;
    isSuperuser?: boolean | null;
    isStaff?: boolean | null;
    role?: string | null;
    email?: string | null;
    telephone?: string | null;
    features?: Array<string | null> | null;
  } | null;
};

export type UserChangePasswordMutationVariables = Exact<{
  newPassword: Scalars["String"];
}>;

export type UserChangePasswordMutation = {
  __typename?: "Mutation";
  adminUserChangePassword?: {
    __typename?: "AdminUserChangePasswordMutation";
    success?: boolean | null;
  } | null;
};

export type UserUpdateProfileMutationVariables = Exact<{
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
}>;

export type UserUpdateProfileMutation = {
  __typename?: "Mutation";
  adminUserUpdateProfile?: {
    __typename?: "AdminUserUpdateProfileMutation";
    success?: boolean | null;
  } | null;
};

export type UserUploadAvatarMutationVariables = Exact<{
  image: Scalars["Upload"];
}>;

export type UserUploadAvatarMutation = {
  __typename?: "Mutation";
  adminUserUploadAvatar?: {
    __typename?: "AdminUserUploadAvatarMutation";
    success?: boolean | null;
    avatarUrl?: string | null;
  } | null;
};

export type CheckCodeQueryVariables = Exact<{
  code: Scalars["String"];
}>;

export type CheckCodeQuery = {
  __typename?: "Query";
  checkInvitationCode?: {
    __typename?: "CheckInvitationCodeType";
    code: string;
    authority: {
      __typename?: "AdminAuthorityCreateSuccess";
      id: string;
      code: string;
      name: string;
    };
  } | null;
};

export type UserRegisterMutationVariables = Exact<{
  email: Scalars["String"];
  firstName: Scalars["String"];
  invitationCode: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
}>;

export type UserRegisterMutation = {
  __typename?: "Mutation";
  authorityUserRegister?: {
    __typename?: "AuthorityUserRegisterMutation";
    refreshToken?: string | null;
    token?: string | null;
    me?: {
      __typename?: "UserProfileType";
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      authorityName?: string | null;
      authorityId?: number | null;
      avatarUrl?: string | null;
      role?: string | null;
      isStaff?: boolean | null;
      isSuperuser?: boolean | null;
      email?: string | null;
      telephone?: string | null;
      features?: Array<string | null> | null;
    } | null;
  } | null;
};

export type ReportsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
  authorities?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  reportTypes?: InputMaybe<
    Array<InputMaybe<Scalars["UUID"]>> | InputMaybe<Scalars["UUID"]>
  >;
  testFlag?: InputMaybe<Scalars["Boolean"]>;
  includeChildAuthorities?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ReportsQuery = {
  __typename?: "Query";
  incidentReports?: {
    __typename?: "IncidentReportTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "IncidentReportType";
      id: any;
      createdAt: any;
      incidentDate: any;
      rendererData: string;
      caseId?: any | null;
      gpsLocation?: string | null;
      testFlag: boolean;
      reportType?: {
        __typename?: "ReportTypeType";
        id: any;
        name: string;
        category?: {
          __typename?: "CategoryType";
          id: string;
          name: string;
          icon?: string | null;
        } | null;
      } | null;
      reportedBy?: {
        __typename?: "UserType";
        username: string;
        firstName: string;
        lastName: string;
        telephone?: string | null;
      } | null;
      images?: Array<{
        __typename?: "ImageType";
        thumbnail?: string | null;
      } | null> | null;
      authorities?: Array<{
        __typename?: "AuthorityType";
        name: string;
      } | null> | null;
    } | null>;
  } | null;
};

export type BoundaryConnectedReportsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
  authorities?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  reportTypes?: InputMaybe<
    Array<InputMaybe<Scalars["UUID"]>> | InputMaybe<Scalars["UUID"]>
  >;
  testFlag?: InputMaybe<Scalars["Boolean"]>;
}>;

export type BoundaryConnectedReportsQuery = {
  __typename?: "Query";
  boundaryConnectedIncidentReports?: {
    __typename?: "IncidentReportTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "IncidentReportType";
      id: any;
      createdAt: any;
      incidentDate: any;
      rendererData: string;
      caseId?: any | null;
      gpsLocation?: string | null;
      testFlag: boolean;
      reportType?: {
        __typename?: "ReportTypeType";
        id: any;
        name: string;
        category?: {
          __typename?: "CategoryType";
          id: string;
          name: string;
          icon?: string | null;
        } | null;
      } | null;
      reportedBy?: {
        __typename?: "UserType";
        username: string;
        firstName: string;
        lastName: string;
        telephone?: string | null;
      } | null;
      images?: Array<{
        __typename?: "ImageType";
        thumbnail?: string | null;
      } | null> | null;
    } | null>;
  } | null;
};

export type GetReportQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetReportQuery = {
  __typename?: "Query";
  incidentReport?: {
    __typename?: "IncidentReportType";
    id: any;
    createdAt: any;
    incidentDate: any;
    gpsLocation?: string | null;
    updatedAt: any;
    rendererData: string;
    caseId?: any | null;
    threadId?: number | null;
    data?: any | null;
    platform?: string | null;
    testFlag: boolean;
    definition?: any | null;
    reportType?: {
      __typename?: "ReportTypeType";
      id: any;
      name: string;
      definition?: any | null;
    } | null;
    coverImage?: {
      __typename?: "ImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
    } | null;
    images?: Array<{
      __typename?: "ImageType";
      id: any;
      file: string;
      thumbnail?: string | null;
      imageUrl?: string | null;
    } | null> | null;
    uploadFiles?: Array<{
      __typename?: "UploadFileType";
      id: any;
      file: string;
      fileType: string;
      fileUrl?: string | null;
    } | null> | null;
    reportedBy?: {
      __typename?: "UserType";
      firstName: string;
      lastName: string;
      id: string;
      telephone?: string | null;
    } | null;
    authorities?: Array<{
      __typename?: "AuthorityType";
      name: string;
    } | null> | null;
  } | null;
};

export type PromoteReportToCaseMutationVariables = Exact<{
  reportId: Scalars["UUID"];
}>;

export type PromoteReportToCaseMutation = {
  __typename?: "Mutation";
  promoteToCase?: {
    __typename?: "PromoteToCaseMutation";
    case?: { __typename?: "CaseType"; id: any } | null;
  } | null;
};

export type ConvertReportToTestReportMutationVariables = Exact<{
  reportId: Scalars["UUID"];
}>;

export type ConvertReportToTestReportMutation = {
  __typename?: "Mutation";
  convertToTestReport?: {
    __typename?: "ConvertToTestReportMutation";
    report?: { __typename?: "IncidentReportType"; id: any } | null;
  } | null;
};

export type ReportCategoriesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  nameContains?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ReportCategoriesQuery = {
  __typename?: "Query";
  adminCategoryQuery?: {
    __typename?: "AdminCategoryQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminCategoryQueryType";
      id: string;
      name: string;
      icon?: string | null;
      ordering: number;
    } | null>;
  } | null;
};

export type ReportCategoriesByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type ReportCategoriesByNameQuery = {
  __typename?: "Query";
  adminCategoryQuery?: {
    __typename?: "AdminCategoryQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminCategoryQueryType";
      id: string;
      name: string;
      ordering: number;
    } | null>;
  } | null;
};

export type ReportCategoryCreateMutationVariables = Exact<{
  name: Scalars["String"];
  ordering: Scalars["Int"];
  icon?: InputMaybe<Scalars["Upload"]>;
}>;

export type ReportCategoryCreateMutation = {
  __typename?: "Mutation";
  adminCategoryCreate?: {
    __typename?: "AdminCategoryCreateMutation";
    result?:
      | {
          __typename: "AdminCategoryCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | { __typename: "AdminCategoryCreateSuccess"; id: string; name: string }
      | null;
  } | null;
};

export type ReportCategoryUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  icon?: InputMaybe<Scalars["Upload"]>;
  clearIcon?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ReportCategoryUpdateMutation = {
  __typename?: "Mutation";
  adminCategoryUpdate?: {
    __typename?: "AdminCategoryUpdateMutation";
    result?:
      | {
          __typename: "AdminCategoryUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminCategoryUpdateSuccess";
          category?: {
            __typename?: "CategoryType";
            id: string;
            name: string;
            ordering: number;
            icon?: string | null;
          } | null;
        }
      | null;
  } | null;
};

export type ReportCategoryDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ReportCategoryDeleteMutation = {
  __typename?: "Mutation";
  adminCategoryDelete?: {
    __typename?: "AdminCategoryDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetReportCategoryQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetReportCategoryQuery = {
  __typename?: "Query";
  category?: {
    __typename?: "CategoryType";
    id: string;
    name: string;
    ordering: number;
    icon?: string | null;
  } | null;
};

export type ReportTypesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ReportTypesQuery = {
  __typename?: "Query";
  adminReportTypeQuery?: {
    __typename?: "AdminReportTypeQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminReportTypeQueryType";
      id: any;
      name: string;
      definition: any;
      ordering: number;
      published: boolean;
      category: {
        __typename?: "AdminCategoryCreateSuccess";
        id: string;
        name: string;
      };
    } | null>;
  } | null;
};

export type ReportTypeByNameQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type ReportTypeByNameQuery = {
  __typename?: "Query";
  reportTypeByName?: {
    __typename?: "ReportTypeType";
    id: any;
    name: string;
    ordering: number;
    category?: { __typename?: "CategoryType"; id: string; name: string } | null;
  } | null;
};

export type ReportTypeSelectionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ReportTypeSelectionsQuery = {
  __typename?: "Query";
  adminReportTypeQuery?: {
    __typename?: "AdminReportTypeQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminReportTypeQueryType";
      id: any;
      name: string;
      ordering: number;
    } | null>;
  } | null;
};

export type MyReportTypesQueryVariables = Exact<{ [key: string]: never }>;

export type MyReportTypesQuery = {
  __typename?: "Query";
  myReportTypes?: Array<{
    __typename?: "ReportTypeType";
    id: any;
    name: string;
    ordering: number;
    category?: { __typename?: "CategoryType"; id: string } | null;
  } | null> | null;
};

export type ReportTypeCreateMutationVariables = Exact<{
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  stateDefinitionId?: InputMaybe<Scalars["Int"]>;
  rendererDataTemplate?: InputMaybe<Scalars["String"]>;
  followupDefinition?: InputMaybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: InputMaybe<Scalars["String"]>;
  isFollowable?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ReportTypeCreateMutation = {
  __typename?: "Mutation";
  adminReportTypeCreate?: {
    __typename?: "AdminReportTypeCreateMutation";
    result?:
      | {
          __typename: "AdminReportTypeCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | { __typename: "AdminReportTypeCreateSuccess"; id: any; name: string }
      | null;
  } | null;
};

export type ReportTypeUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  stateDefinitionId?: InputMaybe<Scalars["Int"]>;
  rendererDataTemplate?: InputMaybe<Scalars["String"]>;
  followupDefinition?: InputMaybe<Scalars["String"]>;
  rendererFollowupDataTemplate?: InputMaybe<Scalars["String"]>;
  isFollowable?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ReportTypeUpdateMutation = {
  __typename?: "Mutation";
  adminReportTypeUpdate?: {
    __typename?: "AdminReportTypeUpdateMutation";
    result?:
      | {
          __typename: "AdminReportTypeUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminReportTypeUpdateSuccess";
          reportType?: {
            __typename?: "ReportTypeType";
            id: any;
            name: string;
            definition?: any | null;
            rendererDataTemplate?: string | null;
            followupDefinition?: any | null;
            rendererFollowupDataTemplate?: string | null;
            isFollowable: boolean;
            ordering: number;
            category?: {
              __typename?: "CategoryType";
              id: string;
              name: string;
            } | null;
            stateDefinition?: {
              __typename?: "DeepStateDefinitionType";
              id: string;
              name: string;
            } | null;
          } | null;
        }
      | null;
  } | null;
};

export type ReportTypeDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ReportTypeDeleteMutation = {
  __typename?: "Mutation";
  adminReportTypeDelete?: {
    __typename?: "AdminReportTypeDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type PublicReportTypeMutationVariables = Exact<{
  reportTypeId: Scalars["UUID"];
}>;

export type PublicReportTypeMutation = {
  __typename?: "Mutation";
  publishReportType?: {
    __typename?: "PublishReportTypeMutation";
    reportType?: { __typename?: "ReportTypeType"; id: any } | null;
  } | null;
};

export type UnpublicReportTypeMutationVariables = Exact<{
  reportTypeId: Scalars["UUID"];
}>;

export type UnpublicReportTypeMutation = {
  __typename?: "Mutation";
  unpublishReportType?: {
    __typename?: "UnPublishReportTypeMutation";
    reportType?: { __typename?: "ReportTypeType"; id: any } | null;
  } | null;
};

export type GetReportTypeQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetReportTypeQuery = {
  __typename?: "Query";
  reportType?: {
    __typename?: "ReportTypeType";
    id: any;
    name: string;
    definition?: any | null;
    rendererDataTemplate?: string | null;
    followupDefinition?: any | null;
    rendererFollowupDataTemplate?: string | null;
    isFollowable: boolean;
    ordering: number;
    category?: { __typename?: "CategoryType"; id: string; name: string } | null;
    stateDefinition?: {
      __typename?: "DeepStateDefinitionType";
      id: string;
      name: string;
    } | null;
  } | null;
};

export type ReporterNotificationsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  descriptionContains?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type ReporterNotificationsQuery = {
  __typename?: "Query";
  adminReporterNotificationQuery?: {
    __typename?: "AdminReporterNotificationQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminReporterNotificationQueryType";
      id: string;
      description: string;
      condition: string;
      titleTemplate: string;
      template: string;
      reportType?: {
        __typename?: "ReportTypeType";
        id: any;
        name: string;
      } | null;
    } | null>;
  } | null;
};

export type ReporterNotificationCreateMutationVariables = Exact<{
  reportTypeId: Scalars["UUID"];
  description: Scalars["String"];
  condition: Scalars["String"];
  titleTemplate: Scalars["String"];
  template: Scalars["String"];
}>;

export type ReporterNotificationCreateMutation = {
  __typename?: "Mutation";
  adminReporterNotificationCreate?: {
    __typename?: "AdminReporterNotificationCreateMutation";
    result?:
      | {
          __typename: "AdminReporterNotificationCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | { __typename: "AdminReporterNotificationCreateSuccess"; id: string }
      | null;
  } | null;
};

export type ReporterNotificationUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  reportTypeId: Scalars["UUID"];
  description: Scalars["String"];
  condition: Scalars["String"];
  titleTemplate: Scalars["String"];
  template: Scalars["String"];
}>;

export type ReporterNotificationUpdateMutation = {
  __typename?: "Mutation";
  adminReporterNotificationUpdate?: {
    __typename?: "AdminReporterNotificationUpdateMutation";
    result?:
      | {
          __typename: "AdminReporterNotificationUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminReporterNotificationUpdateSuccess";
          reporterNotification?: {
            __typename?: "ReporterNotificationType";
            id: string;
            description: string;
            condition: string;
            titleTemplate: string;
            template: string;
            reportType?: {
              __typename?: "AdminReportTypeCreateSuccess";
              id: any;
              name: string;
            } | null;
          } | null;
        }
      | null;
  } | null;
};

export type ReporterNotificationDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ReporterNotificationDeleteMutation = {
  __typename?: "Mutation";
  adminReporterNotificationDelete?: {
    __typename?: "AdminReporterNotificationDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetReporterNotificationQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetReporterNotificationQuery = {
  __typename?: "Query";
  reporterNotification?: {
    __typename?: "ReporterNotificationType";
    id: string;
    description: string;
    condition: string;
    titleTemplate: string;
    template: string;
    reportType?: {
      __typename?: "AdminReportTypeCreateSuccess";
      id: any;
      name: string;
    } | null;
  } | null;
};

export type StateDefinitionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  nameContains?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type StateDefinitionsQuery = {
  __typename?: "Query";
  adminStateDefinitionQuery?: {
    __typename?: "AdminStateDefinitionQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminStateDefinitionQueryType";
      id: string;
      name: string;
      isDefault: boolean;
    } | null>;
  } | null;
};

export type StateDefinitionsByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type StateDefinitionsByNameQuery = {
  __typename?: "Query";
  adminStateDefinitionQuery?: {
    __typename?: "AdminStateDefinitionQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminStateDefinitionQueryType";
      id: string;
      name: string;
      isDefault: boolean;
    } | null>;
  } | null;
};

export type StateDefinitionCreateMutationVariables = Exact<{
  name: Scalars["String"];
  isDefault: Scalars["Boolean"];
}>;

export type StateDefinitionCreateMutation = {
  __typename?: "Mutation";
  adminStateDefinitionCreate?: {
    __typename?: "AdminStateDefinitionCreateMutation";
    result?:
      | {
          __typename: "AdminStateDefinitionCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminStateDefinitionCreateSuccess";
          id: string;
          name: string;
          isDefault: boolean;
        }
      | null;
  } | null;
};

export type StateDefinitionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  isDefault: Scalars["Boolean"];
}>;

export type StateDefinitionUpdateMutation = {
  __typename?: "Mutation";
  adminStateDefinitionUpdate?: {
    __typename?: "AdminStateDefinitionUpdateMutation";
    result?:
      | {
          __typename: "AdminStateDefinitionUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminStateDefinitionUpdateSuccess";
          stateDefinition?: {
            __typename?: "StateDefinitionType";
            id: string;
            name: string;
            isDefault: boolean;
          } | null;
        }
      | null;
  } | null;
};

export type StateDefinitionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type StateDefinitionDeleteMutation = {
  __typename?: "Mutation";
  adminStateDefinitionDelete?: {
    __typename?: "AdminStateDefinitionDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetStateDefinitionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetStateDefinitionQuery = {
  __typename?: "Query";
  stateDefinitionGet?: {
    __typename?: "StateDefinitionType";
    id: string;
    name: string;
    isDefault: boolean;
  } | null;
  adminStateStepQuery?: Array<{
    __typename?: "StateStepType";
    id: string;
    name: string;
    isStartState: boolean;
    isStopState: boolean;
  } | null> | null;
  adminStateTransitionQuery?: Array<{
    __typename?: "StateTransitionType";
    id: string;
    formDefinition?: any | null;
    fromStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
    toStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
  } | null> | null;
};

export type StateStepsQueryVariables = Exact<{
  definitionId: Scalars["ID"];
}>;

export type StateStepsQuery = {
  __typename?: "Query";
  adminStateStepQuery?: Array<{
    __typename?: "StateStepType";
    id: string;
    name: string;
    isStartState: boolean;
    isStopState: boolean;
  } | null> | null;
};

export type StateStepsByReportTypeQueryVariables = Exact<{
  reportTypeId: Scalars["ID"];
}>;

export type StateStepsByReportTypeQuery = {
  __typename?: "Query";
  stateStepListByReportType?: Array<{
    __typename?: "StateStepType";
    id: string;
    name: string;
    isStartState: boolean;
    isStopState: boolean;
  }> | null;
};

export type StateStepCreateMutationVariables = Exact<{
  name: Scalars["String"];
  isStartState: Scalars["Boolean"];
  isStopState: Scalars["Boolean"];
  stateDefinitionId: Scalars["ID"];
}>;

export type StateStepCreateMutation = {
  __typename?: "Mutation";
  adminStateStepCreate?: {
    __typename?: "AdminStateStepCreateMutation";
    result?:
      | {
          __typename: "AdminStateStepCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminStateStepCreateSuccess";
          id: string;
          name: string;
          isStartState: boolean;
          isStopState: boolean;
        }
      | null;
  } | null;
};

export type StateStepUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  isStartState: Scalars["Boolean"];
  isStopState: Scalars["Boolean"];
  stateDefinitionId: Scalars["ID"];
}>;

export type StateStepUpdateMutation = {
  __typename?: "Mutation";
  adminStateStepUpdate?: {
    __typename?: "AdminStateStepUpdateMutation";
    result?:
      | {
          __typename: "AdminStateStepUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminStateStepUpdateSuccess";
          stateStep?: {
            __typename?: "StateStepType";
            id: string;
            name: string;
            isStartState: boolean;
            isStopState: boolean;
            stateDefinition?: {
              __typename?: "StateDefinitionType";
              id: string;
              name: string;
            } | null;
          } | null;
        }
      | null;
  } | null;
};

export type StateStepDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type StateStepDeleteMutation = {
  __typename?: "Mutation";
  adminStateStepDelete?: {
    __typename?: "AdminStateStepDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetStateStepQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetStateStepQuery = {
  __typename?: "Query";
  stateStepGet?: {
    __typename?: "StateStepType";
    id: string;
    name: string;
    isStartState: boolean;
    isStopState: boolean;
    stateDefinition?: {
      __typename?: "StateDefinitionType";
      id: string;
      name: string;
    } | null;
  } | null;
};

export type StateTransitionsQueryVariables = Exact<{
  definitionId: Scalars["ID"];
}>;

export type StateTransitionsQuery = {
  __typename?: "Query";
  adminStateTransitionQuery?: Array<{
    __typename?: "StateTransitionType";
    id: string;
    formDefinition?: any | null;
    fromStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
    toStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
  } | null> | null;
};

export type StateTransistionListByReportTypeQueryVariables = Exact<{
  reportTypeId: Scalars["ID"];
}>;

export type StateTransistionListByReportTypeQuery = {
  __typename?: "Query";
  transitionListByReportType?: Array<{
    __typename?: "StateTransitionType";
    id: string;
    fromStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
    toStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
  }> | null;
};

export type StateTransitionCreateMutationVariables = Exact<{
  formDefinition: Scalars["String"];
  fromStepId: Scalars["ID"];
  toStepId: Scalars["ID"];
}>;

export type StateTransitionCreateMutation = {
  __typename?: "Mutation";
  adminStateTransitionCreate?: {
    __typename?: "AdminStateTransitionCreateMutation";
    result?:
      | {
          __typename: "AdminStateTransitionCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | { __typename: "AdminStateTransitionCreateSuccess"; id: string }
      | null;
  } | null;
};

export type StateTransitionUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  formDefinition: Scalars["String"];
  fromStepId: Scalars["ID"];
  toStepId: Scalars["ID"];
}>;

export type StateTransitionUpdateMutation = {
  __typename?: "Mutation";
  adminStateTransitionUpdate?: {
    __typename?: "AdminStateTransitionUpdateMutation";
    result?:
      | {
          __typename: "AdminStateTransitionUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminStateTransitionUpdateSuccess";
          stateTransition?: {
            __typename?: "StateTransitionType";
            id: string;
            formDefinition?: any | null;
            fromStep: {
              __typename?: "DeepStateStepType";
              id: string;
              name: string;
              isStartState: boolean;
              isStopState: boolean;
            };
            toStep: {
              __typename?: "DeepStateStepType";
              id: string;
              name: string;
              isStartState: boolean;
              isStopState: boolean;
            };
          } | null;
        }
      | null;
  } | null;
};

export type StateTransitionDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type StateTransitionDeleteMutation = {
  __typename?: "Mutation";
  adminStateTransitionDelete?: {
    __typename?: "AdminStateTransitionDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetStateTransitionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetStateTransitionQuery = {
  __typename?: "Query";
  stateTransitionGet?: {
    __typename?: "StateTransitionType";
    id: string;
    formDefinition?: any | null;
    fromStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
    toStep: {
      __typename?: "DeepStateStepType";
      id: string;
      name: string;
      isStartState: boolean;
      isStopState: boolean;
    };
  } | null;
};

export type UsersQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  q?: InputMaybe<Scalars["String"]>;
  authorities?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  role?: InputMaybe<Scalars["String"]>;
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
  ordering?: InputMaybe<Scalars["String"]>;
}>;

export type UsersQuery = {
  __typename?: "Query";
  adminAuthorityUserQuery?: {
    __typename?: "AdminAuthorityUserQueryTypeNodeConnection";
    totalCount?: number | null;
    results: Array<{
      __typename?: "AdminAuthorityUserQueryType";
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      role?: AccountsAuthorityUserRoleChoices | null;
      telephone?: string | null;
      authority: { __typename?: "AdminAuthorityCreateSuccess"; name: string };
    } | null>;
  } | null;
};

export type UserCreateMutationVariables = Exact<{
  authorityId: Scalars["Int"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
  role?: InputMaybe<Scalars["String"]>;
}>;

export type UserCreateMutation = {
  __typename?: "Mutation";
  adminAuthorityUserCreate?: {
    __typename?: "AdminAuthorityUserCreateMutation";
    result?:
      | {
          __typename: "AdminAuthorityUserCreateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminAuthorityUserCreateSuccess";
          id: string;
          username: string;
        }
      | null;
  } | null;
};

export type UserUpdateMutationVariables = Exact<{
  id: Scalars["ID"];
  authorityId: Scalars["Int"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
  role?: InputMaybe<Scalars["String"]>;
}>;

export type UserUpdateMutation = {
  __typename?: "Mutation";
  adminAuthorityUserUpdate?: {
    __typename?: "AdminAuthorityUserUpdateMutation";
    result?:
      | {
          __typename: "AdminAuthorityUserUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminAuthorityUserUpdateSuccess";
          authorityUser?: {
            __typename?: "AuthorityUserType";
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            telephone?: string | null;
            role?: AccountsAuthorityUserRoleChoices | null;
            authority: {
              __typename?: "AdminAuthorityCreateSuccess";
              id: string;
            };
          } | null;
        }
      | null;
  } | null;
};

export type UserUpdatePasswordMutationVariables = Exact<{
  id: Scalars["ID"];
  password: Scalars["String"];
}>;

export type UserUpdatePasswordMutation = {
  __typename?: "Mutation";
  adminAuthorityUserUpdatePassword?: {
    __typename?: "AdminAuthorityUserUpdatePasswordMutation";
    result?:
      | {
          __typename: "AdminAuthorityUserUpdateProblem";
          message?: string | null;
          fields?: Array<{
            __typename?: "AdminFieldValidationProblem";
            name: string;
            message: string;
          }> | null;
        }
      | {
          __typename: "AdminAuthorityUserUpdateSuccess";
          authorityUser?: {
            __typename?: "AuthorityUserType";
            id: string;
            username: string;
          } | null;
        }
      | null;
  } | null;
};

export type UserDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserDeleteMutation = {
  __typename?: "Mutation";
  adminAuthorityUserDelete?: {
    __typename?: "AdminAuthorityUserDeleteMutation";
    success?: boolean | null;
  } | null;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  authorityUser?: {
    __typename?: "AuthorityUserType";
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone?: string | null;
    role?: AccountsAuthorityUserRoleChoices | null;
    authority: { __typename?: "AdminAuthorityCreateSuccess"; id: string };
  } | null;
};

export type LoginQrTokenQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type LoginQrTokenQuery = {
  __typename?: "Query";
  getLoginQrToken?: { __typename?: "LoginQrTokenType"; token: string } | null;
};

export type SummaryContributionQueryQueryVariables = Exact<{
  userId: Scalars["Int"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  toDate?: InputMaybe<Scalars["DateTime"]>;
}>;

export type SummaryContributionQueryQuery = {
  __typename?: "Query";
  summaryContributionQuery?: Array<{
    __typename?: "SummaryContributionType";
    day: any;
    total: number;
  }> | null;
};

export const DeleteTokenCookieDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTokenCookie" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTokenCookie" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deleted" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRefreshTokenCookie" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deleted" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteTokenCookieMutation,
  DeleteTokenCookieMutationVariables
>;
export const RefreshTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "refreshToken" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "payload" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const TokenAuthDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TokenAuth" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tokenAuth" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshExpiresIn" },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TokenAuthMutation, TokenAuthMutationVariables>;
export const AuthoritiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Authorities" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nameStartWith" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorities" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name_Istartswith" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nameStartWith" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthoritiesQuery, AuthoritiesQueryVariables>;
export const AuthorityQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AuthorityQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthorityQueryQuery, AuthorityQueryQueryVariables>;
export const AuthorityInheritLookupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AuthorityInheritLookup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityInheritLookup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: { kind: "IntValue", value: "0" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityInheritLookupQuery,
  AuthorityInheritLookupQueryVariables
>;
export const AuthorityInheritsDownLookupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AuthorityInheritsDownLookup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorityInheritsDown" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityInheritsDownLookupQuery,
  AuthorityInheritsDownLookupQueryVariables
>;
export const AuthorityInheritsDownShallowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AuthorityInheritsDownShallow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorityInheritsDownShallow" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityInheritsDownShallowQuery,
  AuthorityInheritsDownShallowQueryVariables
>;
export const AuthorityCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorityCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "area" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "inherits" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boundaryConnects" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "area" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "area" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "inherits" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inherits" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boundaryConnects" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boundaryConnects" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityCreateMutation,
  AuthorityCreateMutationVariables
>;
export const AuthorityUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorityUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "area" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "inherits" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boundaryConnects" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "area" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "area" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "inherits" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inherits" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boundaryConnects" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boundaryConnects" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authority" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "area" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "inherits" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "code" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "boundaryConnects",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "code" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityUpdateMutation,
  AuthorityUpdateMutationVariables
>;
export const AuthorityDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorityDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityDeleteMutation,
  AuthorityDeleteMutationVariables
>;
export const GetAuthorityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAuthority" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authority" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "area" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "inherits" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "boundaryConnects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuthorityQuery, GetAuthorityQueryVariables>;
export const CasesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Cases" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorities" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypes" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeChildAuthorities" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "casesQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "report_CreatedAt_Gte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "report_CreatedAt_Lte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "report_RelevantAuthorities_Id_In",
                },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "report_ReportType_Id_In" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypes" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "includeChildAuthorities" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "includeChildAuthorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isFinished" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "statusLabel" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "report" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "incidentDate" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "rendererData" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportedBy" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "username" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "telephone" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authorities" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CasesQuery, CasesQueryVariables>;
export const GetCaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "caseGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "isFinished" } },
                { kind: "Field", name: { kind: "Name", value: "statusLabel" } },
                { kind: "Field", name: { kind: "Name", value: "threadId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "outbreakPlanInfo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authorities" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "report" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "incidentDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gpsLocation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rendererData" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "data" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "definition" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "platform" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "imageUrl" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "uploadFiles" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fileType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fileUrl" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportedBy" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "telephone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authorities" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stateDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDefault" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "statestepSet" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStartState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStopState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "toTransitions" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "toStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "states" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "state" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStartState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStopState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "toTransitions" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "toStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "transition" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "formData" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdBy" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "transition" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "toStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCaseQuery, GetCaseQueryVariables>;
export const StateForwardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateForward" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "caseId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "transitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formData" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GenericScalar" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forwardState" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "caseId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "caseId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "transitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "transitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "formData" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formData" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "state" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStartState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStopState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "toTransitions" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "toStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateForwardMutation,
  StateForwardMutationVariables
>;
export const CaseDefinitionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CaseDefinitions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionContains" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCaseDefinitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description_Contains" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionContains" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "condition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CaseDefinitionsQuery,
  CaseDefinitionsQueryVariables
>;
export const CaseDefinitionCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CaseDefinitionCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCaseDefinitionCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCaseDefinitionCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCaseDefinitionCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CaseDefinitionCreateMutation,
  CaseDefinitionCreateMutationVariables
>;
export const CaseDefinitionUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CaseDefinitionUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCaseDefinitionUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCaseDefinitionUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "caseDefinition" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "description",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "condition" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "reportType" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCaseDefinitionUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CaseDefinitionUpdateMutation,
  CaseDefinitionUpdateMutationVariables
>;
export const CaseDefinitionDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CaseDefinitionDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCaseDefinitionDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CaseDefinitionDeleteMutation,
  CaseDefinitionDeleteMutationVariables
>;
export const GetCaseDefinitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCaseDefinition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "caseDefinitionGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "condition" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCaseDefinitionQuery,
  GetCaseDefinitionQueryVariables
>;
export const QueryCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QueryComments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "threadId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "comments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "threadId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "threadId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "body" } },
                { kind: "Field", name: { kind: "Name", value: "threadId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attachments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryCommentsQuery, QueryCommentsQueryVariables>;
export const MutationCommentCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MutationCommentCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "body" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "threadId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "files" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "commentCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "body" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "body" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "threadId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "threadId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "files" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "files" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CommentCreateSuccess" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "body" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "threadId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attachments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "file" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "thumbnail" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "createdAt" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdBy" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "username" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "avatarUrl" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CommentCreateProblem" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MutationCommentCreateMutation,
  MutationCommentCreateMutationVariables
>;
export const ConfigurationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "configurations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminConfigurationQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConfigurationsQuery, ConfigurationsQueryVariables>;
export const ConfigurationCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfigurationCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "key" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "value" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminConfigurationCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "key" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "value" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "value" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminConfigurationCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminConfigurationCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfigurationCreateMutation,
  ConfigurationCreateMutationVariables
>;
export const ConfigurationUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfigurationUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "key" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "value" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminConfigurationUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "key" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "value" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "value" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminConfigurationUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminConfigurationUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfigurationUpdateMutation,
  ConfigurationUpdateMutationVariables
>;
export const ConfigurationDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfigurationDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminConfigurationDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfigurationDeleteMutation,
  ConfigurationDeleteMutationVariables
>;
export const GetConfigurationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetConfiguration" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "key" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "configurationGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "key" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "key" } },
                { kind: "Field", name: { kind: "Name", value: "value" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetConfigurationQuery,
  GetConfigurationQueryVariables
>;
export const StatQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StatQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "statQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openCaseCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reporterCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "officialCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StatQueryQuery, StatQueryQueryVariables>;
export const EventsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EventsQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventsQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "report" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "gpsLocation" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "category" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "icon" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "rendererData" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "images" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "thumbnail" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reports" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gpsLocation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "icon" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rendererData" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventsQueryQuery, EventsQueryQueryVariables>;
export const SummaryReportByCategoryQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SummaryReportByCategoryQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "toDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "summaryReportByCategoryQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "toDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "toDate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SummaryReportByCategoryQueryQuery,
  SummaryReportByCategoryQueryQueryVariables
>;
export const SummaryCaseByCategoryQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SummaryCaseByCategoryQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "toDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "summaryCaseByCategoryQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "toDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "toDate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SummaryCaseByCategoryQueryQuery,
  SummaryCaseByCategoryQueryQueryVariables
>;
export const QueryFollowupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QueryFollowups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "incidentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "followups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "incidentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "incidentId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rendererData" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryFollowupsQuery, QueryFollowupsQueryVariables>;
export const GetFollowupReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetFollowupReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "followupReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "data" } },
                { kind: "Field", name: { kind: "Name", value: "testFlag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rendererData" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "incident" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportedBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrl" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportedBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetFollowupReportQuery,
  GetFollowupReportQueryVariables
>;
export const ResetPasswordRequestCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPasswordRequestCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPasswordRequest" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordRequestCreateMutation,
  ResetPasswordRequestCreateMutationVariables
>;
export const ResetPasswordCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPasswordCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordCreateMutation,
  ResetPasswordCreateMutationVariables
>;
export const InvitationCodesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "invitationCodes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "roleContains" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminInvitationCodeQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role_Contains" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "roleContains" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fromDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "throughDate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authority" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvitationCodesQuery,
  InvitationCodesQueryVariables
>;
export const InvitationCodeCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InvitationCodeCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminInvitationCodeCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "throughDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "role" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminInvitationCodeCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminInvitationCodeCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvitationCodeCreateMutation,
  InvitationCodeCreateMutationVariables
>;
export const InvitationCodeUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InvitationCodeUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminInvitationCodeUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "throughDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "role" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminInvitationCodeUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "invitationCode" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromDate" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "throughDate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "authority" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "role" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminInvitationCodeUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvitationCodeUpdateMutation,
  InvitationCodeUpdateMutationVariables
>;
export const InvitationCodeDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InvitationCodeDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminInvitationCodeDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvitationCodeDeleteMutation,
  InvitationCodeDeleteMutationVariables
>;
export const GetInvitationCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetInvitationCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "invitationCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authority" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fromDate" } },
                { kind: "Field", name: { kind: "Name", value: "throughDate" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetInvitationCodeQuery,
  GetInvitationCodeQueryVariables
>;
export const NotificationTemplateAuthorityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "NotificationTemplateAuthority" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "adminNotificationTemplateAuthorityQuery",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notificationTemplateId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notificationTemplateName" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notificationId" },
                },
                { kind: "Field", name: { kind: "Name", value: "to" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationTemplateAuthorityQuery,
  NotificationTemplateAuthorityQueryVariables
>;
export const AuthorityNotificationUpsertDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorityNotificationUpsert" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notificationTemplateId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "to" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityNotificationUpsert" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "notificationTemplateId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "notificationTemplateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "to" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "to" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityNotificationUpsertSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "to" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityNotificationUpsertProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityNotificationUpsertMutation,
  AuthorityNotificationUpsertMutationVariables
>;
export const AuthorityNotificationDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorityNotificationDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityNotificationDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorityNotificationDeleteMutation,
  AuthorityNotificationDeleteMutationVariables
>;
export const NotificationTemplatesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "notificationTemplates" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminNotificationTemplateQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationTemplatesQuery,
  NotificationTemplatesQueryVariables
>;
export const NotificationTemplateCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NotificationTemplateCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateTransitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bodyTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminNotificationTemplateCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateTransitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateTransitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "bodyTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "bodyTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminNotificationTemplateCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminNotificationTemplateCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationTemplateCreateMutation,
  NotificationTemplateCreateMutationVariables
>;
export const NotificationTemplateUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NotificationTemplateUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateTransitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bodyTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminNotificationTemplateUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateTransitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateTransitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "bodyTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "bodyTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminNotificationTemplateUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "notificationTemplate",
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "condition" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "reportType" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "stateTransition",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "titleTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "bodyTemplate",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminNotificationTemplateUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationTemplateUpdateMutation,
  NotificationTemplateUpdateMutationVariables
>;
export const NotificationTemplateDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NotificationTemplateDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminNotificationTemplateDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationTemplateDeleteMutation,
  NotificationTemplateDeleteMutationVariables
>;
export const GetNotificationTemplateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetNotificationTemplate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "notificationTemplateGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "condition" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stateTransition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fromStep" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "toStep" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "titleTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "bodyTemplate" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetNotificationTemplateQuery,
  GetNotificationTemplateQueryVariables
>;
export const ObservationSubjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ObservationSubjects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "observationSubjects" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Gte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Lte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "definition_Id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "identity" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gpsLocation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "file" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationSubjectsQuery,
  ObservationSubjectsQueryVariables
>;
export const GetObservationSubjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetObservationSubject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "observationSubject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "identity" } },
                { kind: "Field", name: { kind: "Name", value: "formData" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "gpsLocation" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "definition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "registerFormDefinition" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "monitoringRecords" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrl" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "uploadFiles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetObservationSubjectQuery,
  GetObservationSubjectQueryVariables
>;
export const GetObservationSubjectMonitoringDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetObservationSubjectMonitoring" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "observationSubjectMonitoringRecord" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "formData" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "monitoringDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "formDefinition" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrl" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "uploadFiles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetObservationSubjectMonitoringQuery,
  GetObservationSubjectMonitoringQueryVariables
>;
export const ObservationDefinitionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ObservationDefinitions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminObservationDefinitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationDefinitionsQuery,
  ObservationDefinitionsQueryVariables
>;
export const ObservationDefinitionCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationDefinitionCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "registerFormDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JSONString" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "identityTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminObservationDefinitionCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "registerFormDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "registerFormDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "descriptionTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "identityTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "identityTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminObservationDefinitionCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminObservationDefinitionCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationDefinitionCreateMutation,
  ObservationDefinitionCreateMutationVariables
>;
export const ObservationDefinitionUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationDefinitionUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "registerFormDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JSONString" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "identityTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminObservationDefinitionUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "registerFormDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "registerFormDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "descriptionTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "identityTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "identityTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminObservationDefinitionUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "definition" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "description",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "registerFormDefinition",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "titleTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "descriptionTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "identityTemplate",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminObservationDefinitionUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationDefinitionUpdateMutation,
  ObservationDefinitionUpdateMutationVariables
>;
export const ObservationDefinitionDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationDefinitionDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminObservationDefinitionDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationDefinitionDeleteMutation,
  ObservationDefinitionDeleteMutationVariables
>;
export const GetObservationDefinitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetObservationDefinition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "observationDefinitionGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registerFormDefinition" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "titleTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identityTemplate" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "adminObservationMonitoringDefinitionQuery",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetObservationDefinitionQuery,
  GetObservationDefinitionQueryVariables
>;
export const ObservationMonitoringDefinitionCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationMonitoringDefinitionCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JSONString" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "adminObservationMonitoringDefinitionCreate",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "formDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "descriptionTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value:
                              "AdminObservationMonitoringDefinitionCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value:
                              "AdminObservationMonitoringDefinitionCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationMonitoringDefinitionCreateMutation,
  ObservationMonitoringDefinitionCreateMutationVariables
>;
export const ObservationMonitoringDefinitionUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationMonitoringDefinitionUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JSONString" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "adminObservationMonitoringDefinitionUpdate",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "formDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "descriptionTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value:
                              "AdminObservationMonitoringDefinitionUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "monitoringDefinition",
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "description",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "titleTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "descriptionTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "definition" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value:
                              "AdminObservationMonitoringDefinitionUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationMonitoringDefinitionUpdateMutation,
  ObservationMonitoringDefinitionUpdateMutationVariables
>;
export const ObservationMonitoringDefinitionDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ObservationMonitoringDefinitionDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "adminObservationMonitoringDefinitionDelete",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ObservationMonitoringDefinitionDeleteMutation,
  ObservationMonitoringDefinitionDeleteMutationVariables
>;
export const GetObservationMonitoringDefinitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetObservationMonitoringDefinition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "observationMonitoringDefinitionGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "formDefinition" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "titleTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "descriptionTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "definition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetObservationMonitoringDefinitionQuery,
  GetObservationMonitoringDefinitionQueryVariables
>;
export const OutbreakPlacesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OutbreakPlaces" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "caseId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "outbreakPlaces" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "caseId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "caseId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "place" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "zone" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OutbreakPlacesQuery, OutbreakPlacesQueryVariables>;
export const OutbreakPlansDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "outbreakPlans" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminOutbreakPlanQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OutbreakPlansQuery, OutbreakPlansQueryVariables>;
export const OutbreakPlanCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "OutbreakPlanCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminOutbreakPlanCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateStepId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1Radius" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2Radius" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3Radius" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminOutbreakPlanCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminOutbreakPlanCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OutbreakPlanCreateMutation,
  OutbreakPlanCreateMutationVariables
>;
export const OutbreakPlanUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "OutbreakPlanUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone1Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone2Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3Color" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3MessageBody" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3MessageTitle" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zone3Radius" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          defaultValue: { kind: "NullValue" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminOutbreakPlanUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateStepId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone1Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone1Radius" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone2Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone2Radius" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3Color" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3Color" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3MessageBody" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3MessageBody" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3MessageTitle" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3MessageTitle" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zone3Radius" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zone3Radius" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminOutbreakPlanUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateStep" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone1Color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone1MessageBody" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "zone1MessageTitle",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone1Radius" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone2Color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone2MessageBody" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "zone2MessageTitle",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone2Radius" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone3Color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone3MessageBody" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "zone3MessageTitle",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "zone3Radius" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminOutbreakPlanUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OutbreakPlanUpdateMutation,
  OutbreakPlanUpdateMutationVariables
>;
export const OutbreakPlanDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "OutbreakPlanDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminOutbreakPlanDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OutbreakPlanDeleteMutation,
  OutbreakPlanDeleteMutationVariables
>;
export const GetOutbreakPlanDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetOutbreakPlan" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "outbreakPlanGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stateStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "zone1Color" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone1MessageBody" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone1MessageTitle" },
                },
                { kind: "Field", name: { kind: "Name", value: "zone1Radius" } },
                { kind: "Field", name: { kind: "Name", value: "zone2Color" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone2MessageBody" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone2MessageTitle" },
                },
                { kind: "Field", name: { kind: "Name", value: "zone2Radius" } },
                { kind: "Field", name: { kind: "Name", value: "zone3Color" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone3MessageBody" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "zone3MessageTitle" },
                },
                { kind: "Field", name: { kind: "Name", value: "zone3Radius" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOutbreakPlanQuery,
  GetOutbreakPlanQueryVariables
>;
export const PlacesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "places" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminPlaceQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authority" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlacesQuery, PlacesQueryVariables>;
export const PlaceCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PlaceCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "latitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "longitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notificationTo" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminPlaceCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "latitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "latitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "longitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "longitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "notificationTo" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "notificationTo" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminPlaceCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authority" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "notificationTo" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "location" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminPlaceCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlaceCreateMutation, PlaceCreateMutationVariables>;
export const PlaceUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PlaceUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "latitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "longitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notificationTo" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "StringValue", value: "", block: false },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminPlaceUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "latitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "latitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "longitude" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "longitude" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "notificationTo" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "notificationTo" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminPlaceUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authority" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "notificationTo" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminPlaceUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlaceUpdateMutation, PlaceUpdateMutationVariables>;
export const PlaceDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PlaceDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminPlaceDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlaceDeleteMutation, PlaceDeleteMutationVariables>;
export const GetPlaceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlace" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "placeGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authority" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notificationTo" },
                },
                { kind: "Field", name: { kind: "Name", value: "latitude" } },
                { kind: "Field", name: { kind: "Name", value: "longitude" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlaceQuery, GetPlaceQueryVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "authorityId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authorityName" },
                },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
                { kind: "Field", name: { kind: "Name", value: "isSuperuser" } },
                { kind: "Field", name: { kind: "Name", value: "isStaff" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
                { kind: "Field", name: { kind: "Name", value: "features" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UserChangePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "userChangePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newPassword" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUserChangePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newPassword" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserChangePasswordMutation,
  UserChangePasswordMutationVariables
>;
export const UserUpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "userUpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "telephone" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUserUpdateProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "telephone" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "telephone" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserUpdateProfileMutation,
  UserUpdateProfileMutationVariables
>;
export const UserUploadAvatarDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "userUploadAvatar" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "image" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUserUploadAvatar" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "image" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "image" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserUploadAvatarMutation,
  UserUploadAvatarMutationVariables
>;
export const CheckCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CheckCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkInvitationCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "code" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authority" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CheckCodeQuery, CheckCodeQueryVariables>;
export const UserRegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserRegister" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "invitationCode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "telephone" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorityUserRegister" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "invitationCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "invitationCode" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "telephone" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "telephone" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "me" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authorityName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authorityId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStaff" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isSuperuser" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "telephone" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "features" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserRegisterMutation,
  UserRegisterMutationVariables
>;
export const ReportsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Reports" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorities" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypes" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "testFlag" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeChildAuthorities" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "incidentReports" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Gte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Lte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "relevantAuthorities_Id_In" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportType_Id_In" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypes" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "testFlag" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "testFlag" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "includeChildAuthorities" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "includeChildAuthorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "incidentDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rendererData" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "caseId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gpsLocation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "icon" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportedBy" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "telephone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authorities" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "testFlag" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReportsQuery, ReportsQueryVariables>;
export const BoundaryConnectedReportsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BoundaryConnectedReports" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorities" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypes" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "testFlag" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "boundaryConnectedIncidentReports" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Gte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "createdAt_Lte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "relevantAuthorities_Id_In" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportType_Id_In" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypes" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "testFlag" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "testFlag" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "incidentDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rendererData" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "caseId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gpsLocation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "icon" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportedBy" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "telephone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "thumbnail" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "testFlag" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BoundaryConnectedReportsQuery,
  BoundaryConnectedReportsQueryVariables
>;
export const GetReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "incidentReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "incidentDate" },
                },
                { kind: "Field", name: { kind: "Name", value: "gpsLocation" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rendererData" },
                },
                { kind: "Field", name: { kind: "Name", value: "caseId" } },
                { kind: "Field", name: { kind: "Name", value: "gpsLocation" } },
                { kind: "Field", name: { kind: "Name", value: "threadId" } },
                { kind: "Field", name: { kind: "Name", value: "data" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "definition" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coverImage" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "images" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrl" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "uploadFiles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fileUrl" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportedBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "telephone" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "testFlag" } },
                { kind: "Field", name: { kind: "Name", value: "definition" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authorities" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReportQuery, GetReportQueryVariables>;
export const PromoteReportToCaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PromoteReportToCase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "promoteToCase" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "case" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PromoteReportToCaseMutation,
  PromoteReportToCaseMutationVariables
>;
export const ConvertReportToTestReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConvertReportToTestReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "convertToTestReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "report" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConvertReportToTestReportMutation,
  ConvertReportToTestReportMutationVariables
>;
export const ReportCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReportCategories" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nameContains" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCategoryQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name_Contains" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nameContains" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "icon" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ordering" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportCategoriesQuery,
  ReportCategoriesQueryVariables
>;
export const ReportCategoriesByNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReportCategoriesByName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCategoryQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ordering" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportCategoriesByNameQuery,
  ReportCategoriesByNameQueryVariables
>;
export const ReportCategoryCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportCategoryCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "icon" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Upload" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCategoryCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "icon" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "icon" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCategoryCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCategoryCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportCategoryCreateMutation,
  ReportCategoryCreateMutationVariables
>;
export const ReportCategoryUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportCategoryUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "icon" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Upload" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clearIcon" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCategoryUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "icon" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "icon" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "clearIcon" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clearIcon" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCategoryUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "ordering" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "icon" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminCategoryUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportCategoryUpdateMutation,
  ReportCategoryUpdateMutationVariables
>;
export const ReportCategoryDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportCategoryDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCategoryDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportCategoryDeleteMutation,
  ReportCategoryDeleteMutationVariables
>;
export const GetReportCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetReportCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
                { kind: "Field", name: { kind: "Name", value: "icon" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetReportCategoryQuery,
  GetReportCategoryQueryVariables
>;
export const ReportTypesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReportTypes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReportTypeQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "definition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ordering" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "published" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReportTypesQuery, ReportTypesQueryVariables>;
export const ReportTypeByNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReportTypeByName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reportTypeByName" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportTypeByNameQuery,
  ReportTypeByNameQueryVariables
>;
export const ReportTypeSelectionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReportTypeSelections" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReportTypeQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ordering" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportTypeSelectionsQuery,
  ReportTypeSelectionsQueryVariables
>;
export const MyReportTypesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyReportTypes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myReportTypes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyReportTypesQuery, MyReportTypesQueryVariables>;
export const ReportTypeCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportTypeCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateDefinitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rendererDataTemplate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "followupDefinition" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rendererFollowupDataTemplate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isFollowable" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReportTypeCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "categoryId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "definition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateDefinitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateDefinitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rendererDataTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rendererDataTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "followupDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "followupDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rendererFollowupDataTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rendererFollowupDataTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isFollowable" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isFollowable" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReportTypeCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReportTypeCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportTypeCreateMutation,
  ReportTypeCreateMutationVariables
>;
export const ReportTypeUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportTypeUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateDefinitionId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rendererDataTemplate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "followupDefinition" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rendererFollowupDataTemplate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isFollowable" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReportTypeUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "categoryId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "categoryId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "definition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateDefinitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateDefinitionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rendererDataTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rendererDataTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "followupDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "followupDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rendererFollowupDataTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rendererFollowupDataTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isFollowable" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isFollowable" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReportTypeUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "reportType" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "definition" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "category" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "stateDefinition",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "rendererDataTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "followupDefinition",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "rendererFollowupDataTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "isFollowable",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "ordering" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReportTypeUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportTypeUpdateMutation,
  ReportTypeUpdateMutationVariables
>;
export const ReportTypeDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReportTypeDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReportTypeDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReportTypeDeleteMutation,
  ReportTypeDeleteMutationVariables
>;
export const PublicReportTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "publicReportType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publishReportType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PublicReportTypeMutation,
  PublicReportTypeMutationVariables
>;
export const UnpublicReportTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "unpublicReportType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "unpublishReportType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UnpublicReportTypeMutation,
  UnpublicReportTypeMutationVariables
>;
export const GetReportTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetReportType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reportType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "definition" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stateDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rendererDataTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "followupDefinition" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rendererFollowupDataTemplate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isFollowable" },
                },
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReportTypeQuery, GetReportTypeQueryVariables>;
export const ReporterNotificationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReporterNotifications" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "descriptionContains" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReporterNotificationQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description_Contains" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "descriptionContains" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "reportType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "condition" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "titleTemplate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "template" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReporterNotificationsQuery,
  ReporterNotificationsQueryVariables
>;
export const ReporterNotificationCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReporterNotificationCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "template" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReporterNotificationCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "template" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "template" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReporterNotificationCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReporterNotificationCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReporterNotificationCreateMutation,
  ReporterNotificationCreateMutationVariables
>;
export const ReporterNotificationUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReporterNotificationUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "condition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleTemplate" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "template" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReporterNotificationUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "condition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "condition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleTemplate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleTemplate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "template" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "template" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReporterNotificationUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "reporterNotification",
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "reportType" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "description",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "condition" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "titleTemplate",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "template" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminReporterNotificationUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReporterNotificationUpdateMutation,
  ReporterNotificationUpdateMutationVariables
>;
export const ReporterNotificationDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReporterNotificationDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminReporterNotificationDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReporterNotificationDeleteMutation,
  ReporterNotificationDeleteMutationVariables
>;
export const GetReporterNotificationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetReporterNotification" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reporterNotification" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reportType" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "condition" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "titleTemplate" },
                },
                { kind: "Field", name: { kind: "Name", value: "template" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetReporterNotificationQuery,
  GetReporterNotificationQueryVariables
>;
export const StateDefinitionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateDefinitions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nameContains" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateDefinitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name_Contains" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nameContains" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDefault" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateDefinitionsQuery,
  StateDefinitionsQueryVariables
>;
export const StateDefinitionsByNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateDefinitionsByName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateDefinitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDefault" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateDefinitionsByNameQuery,
  StateDefinitionsByNameQueryVariables
>;
export const StateDefinitionCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateDefinitionCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isDefault" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateDefinitionCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isDefault" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isDefault" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateDefinitionCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isDefault" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateDefinitionCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateDefinitionCreateMutation,
  StateDefinitionCreateMutationVariables
>;
export const StateDefinitionUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateDefinitionUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isDefault" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateDefinitionUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isDefault" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isDefault" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateDefinitionUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateDefinition" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "isDefault" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateDefinitionUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateDefinitionUpdateMutation,
  StateDefinitionUpdateMutationVariables
>;
export const StateDefinitionDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateDefinitionDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateDefinitionDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateDefinitionDeleteMutation,
  StateDefinitionDeleteMutationVariables
>;
export const GetStateDefinitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetStateDefinition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stateDefinitionGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "isDefault" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateStepQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isStartState" },
                },
                { kind: "Field", name: { kind: "Name", value: "isStopState" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateTransitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fromStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "toStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "formDefinition" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetStateDefinitionQuery,
  GetStateDefinitionQueryVariables
>;
export const StateStepsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateSteps" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateStepQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definitionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isStartState" },
                },
                { kind: "Field", name: { kind: "Name", value: "isStopState" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StateStepsQuery, StateStepsQueryVariables>;
export const StateStepsByReportTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateStepsByReportType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stateStepListByReportType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isStartState" },
                },
                { kind: "Field", name: { kind: "Name", value: "isStopState" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateStepsByReportTypeQuery,
  StateStepsByReportTypeQueryVariables
>;
export const StateStepCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateStepCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isStartState" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isStopState" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateDefinitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateStepCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isStartState" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isStartState" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isStopState" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isStopState" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateDefinitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateDefinitionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateStepCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStartState" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isStopState" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateStepCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateStepCreateMutation,
  StateStepCreateMutationVariables
>;
export const StateStepUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateStepUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isStartState" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isStopState" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stateDefinitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateStepUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isStartState" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isStartState" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isStopState" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isStopState" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "stateDefinitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "stateDefinitionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateStepUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateStep" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "isStartState",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "isStopState",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "stateDefinition",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateStepUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateStepUpdateMutation,
  StateStepUpdateMutationVariables
>;
export const StateStepDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateStepDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateStepDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateStepDeleteMutation,
  StateStepDeleteMutationVariables
>;
export const GetStateStepDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetStateStep" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stateStepGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isStartState" },
                },
                { kind: "Field", name: { kind: "Name", value: "isStopState" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stateDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetStateStepQuery, GetStateStepQueryVariables>;
export const StateTransitionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateTransitions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "definitionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateTransitionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "definitionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "definitionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fromStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "toStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "formDefinition" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateTransitionsQuery,
  StateTransitionsQueryVariables
>;
export const StateTransistionListByReportTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StateTransistionListByReportType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportTypeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "transitionListByReportType" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reportTypeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportTypeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fromStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "toStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateTransistionListByReportTypeQuery,
  StateTransistionListByReportTypeQueryVariables
>;
export const StateTransitionCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateTransitionCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "toStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateTransitionCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromStepId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "toStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "toStepId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateTransitionCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateTransitionCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateTransitionCreateMutation,
  StateTransitionCreateMutationVariables
>;
export const StateTransitionUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateTransitionUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "formDefinition" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "toStepId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateTransitionUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "formDefinition" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "formDefinition" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromStepId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "toStepId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "toStepId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateTransitionUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateTransition" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fromStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "toStep" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStartState",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStopState",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "formDefinition",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminStateTransitionUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateTransitionUpdateMutation,
  StateTransitionUpdateMutationVariables
>;
export const StateTransitionDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StateTransitionDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStateTransitionDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StateTransitionDeleteMutation,
  StateTransitionDeleteMutationVariables
>;
export const GetStateTransitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetStateTransition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stateTransitionGet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fromStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "toStep" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStartState" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isStopState" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "formDefinition" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetStateTransitionQuery,
  GetStateTransitionQueryVariables
>;
export const UsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Users" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "q" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorities" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "throughDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ordering" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUserQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "q" },
                value: { kind: "Variable", name: { kind: "Name", value: "q" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorities" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorities" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "role" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateJoinedGte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateJoinedLte" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "throughDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ordering" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ordering" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authority" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "telephone" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const UserCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "telephone" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUserCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "telephone" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "telephone" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "role" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserCreateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserCreateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCreateMutation, UserCreateMutationVariables>;
export const UserUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "authorityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "telephone" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          defaultValue: { kind: "NullValue" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUserUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "authorityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "authorityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "telephone" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "telephone" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "role" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authorityUser" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "username" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "email" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "telephone" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "role" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "authority" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const UserUpdatePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserUpdatePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUserUpdatePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserUpdateSuccess",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "authorityUser" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "username" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "AdminAuthorityUserUpdateProblem",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fields" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserUpdatePasswordMutation,
  UserUpdatePasswordMutationVariables
>;
export const UserDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuthorityUserDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDeleteMutation, UserDeleteMutationVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorityUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "authority" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const LoginQrTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LoginQrToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getLoginQrToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginQrTokenQuery, LoginQrTokenQueryVariables>;
export const SummaryContributionQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SummaryContributionQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "toDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "summaryContributionQuery" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "toDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "toDate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "day" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SummaryContributionQueryQuery,
  SummaryContributionQueryQueryVariables
>;
