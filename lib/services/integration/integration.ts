export type IntegrationOption = {
  code: string;
  label: string;
};

export type IntegrationClient = {
  id: string;
  name: string;
  code: string;
  integrationType: string;
  status: string;
  clientId: string;
  scopeCodes: string[];
  allowedCallbackDomains: string[];
  rateLimitPolicy: Record<string, unknown>;
  clientSecret?: string;
};

export type IntegrationClientInput = {
  name: string;
  code: string;
  integrationType: string;
  status: string;
  scopeCodes: string[];
  allowedCallbackDomains: string[];
  rateLimitPolicy: Record<string, unknown>;
};

export type WebhookEndpoint = {
  id: string;
  name: string;
  url: string;
  status: string;
  eventTypes: string[];
  schemaVersion: string;
  activeSigningSecretRef: string;
  activeSigningSecretVersion: number;
  nextSigningSecretRef?: string | null;
  nextSigningSecretVersion?: number | null;
  timeoutSeconds: number;
  maxAttempts: number;
  retryPolicy: Record<string, unknown>;
  customHeaders: Record<string, unknown>;
  integrationClient: {
    id: string;
    code: string;
    name: string;
  };
};

export type WebhookEndpointInput = {
  integrationClientId: string;
  name: string;
  url: string;
  status: string;
  eventTypes: string[];
  schemaVersion: string;
  activeSigningSecretRef: string;
  activeSigningSecretVersion: number;
  nextSigningSecretRef?: string | null;
  nextSigningSecretVersion?: number | null;
  timeoutSeconds: number;
  maxAttempts: number;
  retryPolicy: Record<string, unknown>;
  customHeaders: Record<string, unknown>;
};

export type IntegrationPolicy = {
  integrationEnabled: boolean;
  aiEnabled: boolean;
  riskEvaluatorEnabled: boolean;
  clusterDetectorEnabled: boolean;
  aiDefaultCommentOwnerUserId?: string | null;
  aiDefaultCommentOwnerName?: string | null;
  dashboardRiskWindowDays: number;
};

export type IntegrationPolicyInput = {
  integrationEnabled: boolean;
  aiEnabled: boolean;
  riskEvaluatorEnabled: boolean;
  clusterDetectorEnabled: boolean;
  aiDefaultCommentOwnerUserId?: string | null;
  dashboardRiskWindowDays: number;
};

export type AdminUserOption = {
  id: string;
  label: string;
};

export type IntegrationOptions = {
  scopes: IntegrationOption[];
  statuses: IntegrationOption[];
  webhookStatuses: IntegrationOption[];
  integrationTypes: IntegrationOption[];
  eventTypes: IntegrationOption[];
};
