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
  authorityInherits: Array<AdminAuthorityCreateSuccess>;
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  incidents: Array<IncidentReportType>;
  inherits: Array<AdminAuthorityCreateSuccess>;
  inviations: Array<AdminInvitationCodeCreateSuccess>;
  name: Scalars["String"];
  reportTypes: Array<AdminReportTypeCreateSuccess>;
  updatedAt: Scalars["DateTime"];
  users: Array<AdminAuthorityUserCreateSuccess>;
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
  avatarUrl?: Maybe<Scalars["String"]>;
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
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
  telephone?: Maybe<Scalars["String"]>;
  thumbnailAvatarUrl?: Maybe<Scalars["String"]>;
  userPtr: UserType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type AdminAuthorityUserQueryType = {
  __typename?: "AdminAuthorityUserQueryType";
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
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
  throughDate: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type AdminInvitationCodeQueryType = {
  __typename?: "AdminInvitationCodeQueryType";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
  fromDate: Scalars["DateTime"];
  id: Scalars["ID"];
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
  category: AdminCategoryCreateSuccess;
  createdAt: Scalars["DateTime"];
  definition: Scalars["JSONString"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  incidentreports: Array<IncidentReportType>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
  rendererDataTemplate?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type AdminReportTypeQueryType = {
  __typename?: "AdminReportTypeQueryType";
  authorities: Array<AdminAuthorityCreateSuccess>;
  category: AdminCategoryCreateSuccess;
  definition: Scalars["JSONString"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
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

export type AuthorityInheritType = {
  __typename?: "AuthorityInheritType";
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AuthorityType = {
  __typename?: "AuthorityType";
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
  telephone?: Maybe<Scalars["String"]>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type CategoryType = {
  __typename?: "CategoryType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
  reporttypeSet: Array<AdminReportTypeCreateSuccess>;
  updatedAt: Scalars["DateTime"];
};

export type CheckInvitationCodeType = {
  __typename?: "CheckInvitationCodeType";
  authority: AdminAuthorityCreateSuccess;
  code: Scalars["String"];
};

export type DeleteJsonWebTokenCookie = {
  __typename?: "DeleteJSONWebTokenCookie";
  deleted: Scalars["Boolean"];
};

export type DeleteRefreshTokenCookie = {
  __typename?: "DeleteRefreshTokenCookie";
  deleted: Scalars["Boolean"];
};

export type FeatureType = {
  __typename?: "FeatureType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  key: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["String"];
};

export type ImageType = {
  __typename?: "ImageType";
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  file: Scalars["String"];
  id: Scalars["UUID"];
  incidentreportSet: Array<IncidentReportType>;
  reportId: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type IncidentReportType = {
  __typename?: "IncidentReportType";
  coverImage?: Maybe<ImageType>;
  createdAt: Scalars["DateTime"];
  data?: Maybe<Scalars["GenericScalar"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  gpsLocation?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  images?: Maybe<Array<Maybe<ImageType>>>;
  incidentDate: Scalars["Date"];
  originData: Scalars["JSONString"];
  originRendererData: Scalars["String"];
  originalData?: Maybe<Scalars["GenericScalar"]>;
  platform?: Maybe<Scalars["String"]>;
  relevantAuthorities: Array<AdminAuthorityCreateSuccess>;
  relevantAuthorityResolved: Scalars["Boolean"];
  rendererData: Scalars["String"];
  reportType: AdminReportTypeCreateSuccess;
  reportedBy?: Maybe<UserType>;
  testFlag: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
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
  throughDate: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  adminAuthorityCreate?: Maybe<AdminAuthorityCreateMutation>;
  adminAuthorityUpdate?: Maybe<AdminAuthorityUpdateMutation>;
  adminAuthorityUserCreate?: Maybe<AdminAuthorityUserCreateMutation>;
  adminAuthorityUserUpdate?: Maybe<AdminAuthorityUserUpdateMutation>;
  adminCategoryCreate?: Maybe<AdminCategoryCreateMutation>;
  adminCategoryUpdate?: Maybe<AdminCategoryUpdateMutation>;
  adminInvitationCodeCreate?: Maybe<AdminInvitationCodeCreateMutation>;
  adminInvitationCodeUpdate?: Maybe<AdminInvitationCodeUpdateMutation>;
  adminReportTypeCreate?: Maybe<AdminReportTypeCreateMutation>;
  adminReportTypeUpdate?: Maybe<AdminReportTypeUpdateMutation>;
  authorityUserRegister?: Maybe<AuthorityUserRegisterMutation>;
  deleteRefreshTokenCookie?: Maybe<DeleteRefreshTokenCookie>;
  deleteTokenCookie?: Maybe<DeleteJsonWebTokenCookie>;
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
  submitImage?: Maybe<SubmitImage>;
  submitIncidentReport?: Maybe<SubmitIncidentReport>;
  submitZeroReport?: Maybe<SubmitZeroReportMutation>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
};

export type MutationAdminAuthorityCreateArgs = {
  code: Scalars["String"];
  inherits?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  name: Scalars["String"];
};

export type MutationAdminAuthorityUpdateArgs = {
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
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationAdminAuthorityUserUpdateArgs = {
  authorityId?: InputMaybe<Scalars["Int"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationAdminCategoryCreateArgs = {
  icon?: InputMaybe<Scalars["Upload"]>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAdminCategoryUpdateArgs = {
  clearIcon?: InputMaybe<Scalars["Boolean"]>;
  icon?: InputMaybe<Scalars["Upload"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAdminInvitationCodeCreateArgs = {
  authorityId: Scalars["Int"];
  code: Scalars["String"];
  fromDate: Scalars["DateTime"];
  inherits?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  throughDate: Scalars["DateTime"];
};

export type MutationAdminInvitationCodeUpdateArgs = {
  code: Scalars["String"];
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  throughDate?: InputMaybe<Scalars["DateTime"]>;
};

export type MutationAdminReportTypeCreateArgs = {
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAdminReportTypeUpdateArgs = {
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
};

export type MutationAuthorityUserRegisterArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  invitationCode: Scalars["String"];
  lastName: Scalars["String"];
  telephone?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
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
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

export type PageInfoExtra = {
  __typename?: "PageInfoExtra";
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  adminAuthorityGet?: Maybe<AdminAuthorityQueryType>;
  adminAuthorityInheritLookup?: Maybe<AuthorityTypeNodeConnection>;
  adminAuthorityQuery?: Maybe<AdminAuthorityQueryTypeNodeConnection>;
  adminAuthorityUserQuery?: Maybe<AdminAuthorityUserQueryTypeNodeConnection>;
  adminCategoryQuery?: Maybe<AdminCategoryQueryTypeNodeConnection>;
  adminInvitationCodeQuery?: Maybe<AdminInvitationCodeQueryTypeNodeConnection>;
  adminReportTypeQuery?: Maybe<AdminReportTypeQueryTypeNodeConnection>;
  authorities?: Maybe<AuthorityTypeNodeConnection>;
  authority?: Maybe<AuthorityType>;
  authorityUser?: Maybe<AuthorityUserType>;
  category?: Maybe<CategoryType>;
  checkInvitationCode?: Maybe<CheckInvitationCodeType>;
  features?: Maybe<Array<Maybe<FeatureType>>>;
  hello?: Maybe<Scalars["String"]>;
  incidentReport?: Maybe<IncidentReportType>;
  incidentReports?: Maybe<IncidentReportTypeNodeConnection>;
  invitationCode?: Maybe<InvitationCodeType>;
  me?: Maybe<UserProfileType>;
  myReportTypes?: Maybe<Array<Maybe<ReportTypeType>>>;
  reportType?: Maybe<ReportTypeType>;
  syncReportTypes?: Maybe<ReportTypeSyncOutputType>;
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
  name?: InputMaybe<Scalars["String"]>;
  name_Istartswith?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminAuthorityQueryArgs = {
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

export type QueryAdminAuthorityUserQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_Istartswith?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  firstName_Istartswith?: InputMaybe<Scalars["String"]>;
  last?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  lastName_Istartswith?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
  username_Istartswith?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminCategoryQueryArgs = {
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

export type QueryAdminInvitationCodeQueryArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
  code_Istartswith?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryAdminReportTypeQueryArgs = {
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

export type QueryAuthorityUserArgs = {
  id: Scalars["ID"];
};

export type QueryCategoryArgs = {
  id: Scalars["ID"];
};

export type QueryCheckInvitationCodeArgs = {
  code: Scalars["String"];
};

export type QueryIncidentReportArgs = {
  id: Scalars["ID"];
};

export type QueryIncidentReportsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  ordering?: InputMaybe<Scalars["String"]>;
};

export type QueryInvitationCodeArgs = {
  id: Scalars["ID"];
};

export type QueryReportTypeArgs = {
  id: Scalars["ID"];
};

export type QuerySyncReportTypesArgs = {
  data: Array<ReportTypeSyncInputType>;
};

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

export type ReportTypeSyncInputType = {
  id: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type ReportTypeSyncOutputType = {
  __typename?: "ReportTypeSyncOutputType";
  categoryList?: Maybe<Array<Maybe<CategoryType>>>;
  removedList: Array<Maybe<ReportTypeType>>;
  updatedList: Array<Maybe<ReportTypeType>>;
};

export type ReportTypeType = {
  __typename?: "ReportTypeType";
  authorities: Array<AdminAuthorityCreateSuccess>;
  category: AdminCategoryCreateSuccess;
  createdAt: Scalars["DateTime"];
  definition?: Maybe<Scalars["GenericScalar"]>;
  deletedAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  incidentreports: Array<IncidentReportType>;
  name: Scalars["String"];
  ordering: Scalars["Int"];
  rendererDataTemplate?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type Revoke = {
  __typename?: "Revoke";
  revoked: Scalars["Int"];
};

export type SubmitImage = {
  __typename?: "SubmitImage";
  file?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["UUID"]>;
};

export type SubmitIncidentReport = {
  __typename?: "SubmitIncidentReport";
  result?: Maybe<IncidentReportType>;
};

export type SubmitZeroReportMutation = {
  __typename?: "SubmitZeroReportMutation";
  id?: Maybe<Scalars["UUID"]>;
};

export type UserProfileType = {
  __typename?: "UserProfileType";
  authorityId?: Maybe<Scalars["Int"]>;
  authorityName?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  id: Scalars["Int"];
  lastName: Scalars["String"];
  username: Scalars["String"];
};

export type UserType = {
  __typename?: "UserType";
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

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

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
  nameStartWith?: InputMaybe<Scalars["String"]>;
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
  nameStartWith?: InputMaybe<Scalars["String"]>;
}>;

export type AuthorityInheritLookupQuery = {
  __typename?: "Query";
  adminAuthorityInheritLookup?: {
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

export type AuthorityCreateMutationVariables = Exact<{
  code: Scalars["String"];
  name: Scalars["String"];
  inherits?: InputMaybe<
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
  inherits?: InputMaybe<
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
            inherits: Array<{
              __typename?: "AuthorityInheritType";
              id: string;
              code: string;
              name: string;
            } | null>;
          } | null;
        }
      | null;
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
    inherits: Array<{
      __typename?: "AuthorityInheritType";
      id: string;
      code: string;
      name: string;
    } | null>;
  } | null;
};

export type InvitationCodesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  codeStartWith?: InputMaybe<Scalars["String"]>;
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
    } | null>;
  } | null;
};

export type InvitationCodeCreateMutationVariables = Exact<{
  code: Scalars["String"];
  authorityId: Scalars["Int"];
  fromDate: Scalars["DateTime"];
  throughDate: Scalars["DateTime"];
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
  fromDate?: InputMaybe<Scalars["DateTime"]>;
  throughDate?: InputMaybe<Scalars["DateTime"]>;
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
            authority: {
              __typename?: "AdminAuthorityCreateSuccess";
              id: string;
            };
          } | null;
        }
      | null;
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
    authority: { __typename?: "AdminAuthorityCreateSuccess"; id: string };
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
  } | null;
};

export type ReportsQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
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
      reportType: {
        __typename?: "AdminReportTypeCreateSuccess";
        id: any;
        name: string;
      };
      reportedBy?: {
        __typename?: "UserType";
        username: string;
        firstName: string;
        lastName: string;
        telephone?: string | null;
      } | null;
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
    data?: any | null;
    platform?: string | null;
    reportType: {
      __typename?: "AdminReportTypeCreateSuccess";
      id: any;
      name: string;
    };
    coverImage?: { __typename?: "ImageType"; id: any; file: string } | null;
    images?: Array<{
      __typename?: "ImageType";
      id: any;
      file: string;
    } | null> | null;
    reportedBy?: {
      __typename?: "UserType";
      firstName: string;
      lastName: string;
      id: string;
      telephone?: string | null;
    } | null;
  } | null;
};

export type ReportCategoriesQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  nameStartWith?: InputMaybe<Scalars["String"]>;
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
  nameStartWith?: InputMaybe<Scalars["String"]>;
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
      category: {
        __typename?: "AdminCategoryCreateSuccess";
        id: string;
        name: string;
      };
    } | null>;
  } | null;
};

export type ReportTypeCreateMutationVariables = Exact<{
  categoryId: Scalars["Int"];
  definition: Scalars["String"];
  name: Scalars["String"];
  ordering: Scalars["Int"];
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
            ordering: number;
            category: {
              __typename?: "AdminCategoryCreateSuccess";
              id: string;
              name: string;
            };
          } | null;
        }
      | null;
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
    ordering: number;
    category: {
      __typename?: "AdminCategoryCreateSuccess";
      id: string;
      name: string;
    };
  } | null;
};

export type UsersQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  nameStartWith?: InputMaybe<Scalars["String"]>;
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
          } | null;
        }
      | null;
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
  } | null;
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
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshToken" },
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
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nameStartWith" },
          },
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
                name: { kind: "Name", value: "name_Istartswith" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nameStartWith" },
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
} as unknown as DocumentNode<
  AuthorityInheritLookupQuery,
  AuthorityInheritLookupQueryVariables
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
                name: { kind: "Name", value: "inherits" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inherits" },
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
                name: { kind: "Name", value: "inherits" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inherits" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuthorityQuery, GetAuthorityQueryVariables>;
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
            name: { kind: "Name", value: "codeStartWith" },
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
                name: { kind: "Name", value: "code_Istartswith" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "codeStartWith" },
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
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fromDate" } },
                { kind: "Field", name: { kind: "Name", value: "throughDate" } },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "data" } },
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
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coverImage" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "file" } },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReportQuery, GetReportQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "ordering" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReportTypeQuery, GetReportTypeQueryVariables>;
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
                name: { kind: "Name", value: "username_Istartswith" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
