import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  AdminIntegrationClientCreateOpDocument,
  AdminIntegrationClientDisableOpDocument,
  AdminIntegrationClientGetDocument,
  AdminIntegrationClientRotateSecretOpDocument,
  AdminIntegrationClientsDocument,
  AdminIntegrationClientUpdateOpDocument,
  AdminIntegrationOptionsDocument,
  AdminIntegrationPolicyUpdateOpDocument,
  AdminWebhookEndpointCreateOpDocument,
  AdminWebhookEndpointDisableOpDocument,
  AdminWebhookEndpointGetDocument,
  AdminWebhookEndpointsDocument,
  AdminWebhookEndpointUpdateOpDocument,
  IntegrationPolicyAdminUsersDocument,
  IntegrationPolicyGetDocument,
} from "lib/generated/graphql";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import {
  AdminUserOption,
  IntegrationClient,
  IntegrationClientInput,
  IntegrationOption,
  IntegrationOptions,
  IntegrationPolicy,
  IntegrationPolicyInput,
  WebhookEndpoint,
  WebhookEndpointInput,
} from "./integration";

const fieldErrors = (
  fields?: readonly { name: string; message: string }[] | null
) => {
  const result: Record<string, string> = {};
  fields?.forEach(field => {
    result[field.name] = field.message;
  });
  return result;
};

const graphQlErrorMessage = (result: any) =>
  result?.error?.message ||
  result?.errors?.map((error: { message: string }) => error.message).join(",");

const clientFromGraphql = (item: any): IntegrationClient => ({
  id: item.id,
  name: item.name,
  code: item.code,
  integrationType: item.integrationType,
  status: item.status,
  clientId: item.clientId,
  scopeCodes: item.scopeCodes || [],
  allowedCallbackDomains: item.allowedCallbackDomains || [],
  rateLimitPolicy: item.rateLimitPolicy || {},
});

const webhookFromGraphql = (item: any): WebhookEndpoint => ({
  id: item.id,
  name: item.name,
  url: item.url,
  status: item.status,
  eventTypes: item.eventTypes || [],
  schemaVersion: item.schemaVersion,
  activeSigningSecretRef: item.activeSigningSecretRef || "",
  activeSigningSecretVersion: item.activeSigningSecretVersion || 1,
  nextSigningSecretRef: item.nextSigningSecretRef,
  nextSigningSecretVersion: item.nextSigningSecretVersion,
  timeoutSeconds: item.timeoutSeconds || 10,
  maxAttempts: item.maxAttempts || 5,
  retryPolicy: item.retryPolicy || {},
  customHeaders: item.customHeaders || {},
  integrationClient: item.integrationClient,
});

const policyFromGraphql = (item: any): IntegrationPolicy => ({
  integrationEnabled: item.integrationEnabled,
  aiEnabled: item.aiEnabled,
  riskEvaluatorEnabled: item.riskEvaluatorEnabled,
  clusterDetectorEnabled: item.clusterDetectorEnabled,
  aiDefaultCommentOwnerUserId: item.aiDefaultCommentOwnerUserId,
  aiDefaultCommentOwnerName: item.aiDefaultCommentOwnerName,
  dashboardRiskWindowDays: item.dashboardRiskWindowDays,
});

export interface IIntegrationService extends IService {
  fetchClients(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<IntegrationClient[]>>;

  getClient(id: string): Promise<GetResult<IntegrationClient>>;

  createClient(
    input: IntegrationClientInput
  ): Promise<SaveResult<IntegrationClient>>;

  updateClient(
    id: string,
    input: IntegrationClientInput
  ): Promise<SaveResult<IntegrationClient>>;

  disableClient(id: string): Promise<SaveResult<IntegrationClient>>;

  rotateClientSecret(id: string): Promise<SaveResult<IntegrationClient>>;

  fetchWebhookEndpoints(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<WebhookEndpoint[]>>;

  getWebhookEndpoint(id: string): Promise<GetResult<WebhookEndpoint>>;

  createWebhookEndpoint(
    input: WebhookEndpointInput
  ): Promise<SaveResult<WebhookEndpoint>>;

  updateWebhookEndpoint(
    id: string,
    input: WebhookEndpointInput
  ): Promise<SaveResult<WebhookEndpoint>>;

  disableWebhookEndpoint(id: string): Promise<SaveResult<WebhookEndpoint>>;

  getPolicy(): Promise<GetResult<IntegrationPolicy>>;

  updatePolicy(
    input: IntegrationPolicyInput
  ): Promise<SaveResult<IntegrationPolicy>>;

  getOptions(force?: boolean): Promise<GetResult<IntegrationOptions>>;

  fetchAdminUserOptions(searchText?: string): Promise<AdminUserOption[]>;
}

export class IntegrationService implements IIntegrationService {
  client: LegacyApolloClient;

  fetchClientsQuery = {
    limit: 20,
    offset: 0,
    q: "",
  };

  fetchWebhookEndpointsQuery = {
    limit: 20,
    offset: 0,
    q: "",
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  async fetchClients(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchClientsQuery = { limit, offset, q: searchText };
    const fetchResult = await this.client.query({
      query: AdminIntegrationClientsDocument,
      variables: this.fetchClientsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    return {
      items:
        fetchResult.data.adminIntegrationClientQuery?.results
          ?.filter(Boolean)
          .map(clientFromGraphql) || [],
      totalCount: fetchResult.data.adminIntegrationClientQuery?.totalCount,
    };
  }

  async getClient(id: string): Promise<GetResult<IntegrationClient>> {
    const result = await this.client.query({
      query: AdminIntegrationClientGetDocument,
      variables: { id },
      fetchPolicy: "network-only",
    });
    const error = graphQlErrorMessage(result);
    if (error) return { data: undefined, error };
    return {
      data: result.data.adminIntegrationClientGet
        ? clientFromGraphql(result.data.adminIntegrationClientGet)
        : undefined,
    };
  }

  async createClient(
    input: IntegrationClientInput
  ): Promise<SaveResult<IntegrationClient>> {
    const result = await this.client.mutate({
      mutation: AdminIntegrationClientCreateOpDocument,
      variables: { input },
      refetchQueries: [
        {
          query: AdminIntegrationClientsDocument,
          variables: this.fetchClientsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminIntegrationClientCreate?.result;
    if (payload?.__typename === "AdminIntegrationClientCreateSuccess") {
      return {
        success: true,
        data: {
          ...clientFromGraphql(payload.integrationClient),
          clientSecret: payload.clientSecret,
        },
      };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async updateClient(
    id: string,
    input: IntegrationClientInput
  ): Promise<SaveResult<IntegrationClient>> {
    const result = await this.client.mutate({
      mutation: AdminIntegrationClientUpdateOpDocument,
      variables: { id, input },
      refetchQueries: [
        {
          query: AdminIntegrationClientsDocument,
          variables: this.fetchClientsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminIntegrationClientUpdate?.result;
    if (payload?.__typename === "AdminIntegrationClientUpdateSuccess") {
      return {
        success: true,
        data: clientFromGraphql(payload.integrationClient),
      };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async disableClient(id: string): Promise<SaveResult<IntegrationClient>> {
    const result = await this.client.mutate({
      mutation: AdminIntegrationClientDisableOpDocument,
      variables: { id },
      refetchQueries: [
        {
          query: AdminIntegrationClientsDocument,
          variables: this.fetchClientsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminIntegrationClientDisable?.result;
    if (payload?.__typename === "AdminIntegrationClientUpdateSuccess") {
      return { success: true, data: payload.integrationClient as any };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async rotateClientSecret(id: string): Promise<SaveResult<IntegrationClient>> {
    const result = await this.client.mutate({
      mutation: AdminIntegrationClientRotateSecretOpDocument,
      variables: { id },
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminIntegrationClientRotateSecret?.result;
    if (payload?.__typename === "AdminIntegrationClientRotateSecretSuccess") {
      return {
        success: true,
        data: {
          ...(payload.integrationClient as any),
          clientSecret: payload.clientSecret,
        },
      };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async fetchWebhookEndpoints(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchWebhookEndpointsQuery = { limit, offset, q: searchText };
    const fetchResult = await this.client.query({
      query: AdminWebhookEndpointsDocument,
      variables: this.fetchWebhookEndpointsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    return {
      items:
        fetchResult.data.adminWebhookEndpointQuery?.results
          ?.filter(Boolean)
          .map(webhookFromGraphql) || [],
      totalCount: fetchResult.data.adminWebhookEndpointQuery?.totalCount,
    };
  }

  async getWebhookEndpoint(id: string): Promise<GetResult<WebhookEndpoint>> {
    const result = await this.client.query({
      query: AdminWebhookEndpointGetDocument,
      variables: { id },
      fetchPolicy: "network-only",
    });
    const error = graphQlErrorMessage(result);
    if (error) return { data: undefined, error };
    return {
      data: result.data.adminWebhookEndpointGet
        ? webhookFromGraphql(result.data.adminWebhookEndpointGet)
        : undefined,
    };
  }

  async createWebhookEndpoint(
    input: WebhookEndpointInput
  ): Promise<SaveResult<WebhookEndpoint>> {
    const result = await this.client.mutate({
      mutation: AdminWebhookEndpointCreateOpDocument,
      variables: { input },
      refetchQueries: [
        {
          query: AdminWebhookEndpointsDocument,
          variables: this.fetchWebhookEndpointsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminWebhookEndpointCreate?.result;
    if (payload?.__typename === "AdminWebhookEndpointCreateSuccess") {
      return {
        success: true,
        data: webhookFromGraphql(payload.webhookEndpoint),
      };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async updateWebhookEndpoint(
    id: string,
    input: WebhookEndpointInput
  ): Promise<SaveResult<WebhookEndpoint>> {
    const result = await this.client.mutate({
      mutation: AdminWebhookEndpointUpdateOpDocument,
      variables: { id, input },
      refetchQueries: [
        {
          query: AdminWebhookEndpointsDocument,
          variables: this.fetchWebhookEndpointsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminWebhookEndpointUpdate?.result;
    if (payload?.__typename === "AdminWebhookEndpointUpdateSuccess") {
      return {
        success: true,
        data: webhookFromGraphql(payload.webhookEndpoint),
      };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async disableWebhookEndpoint(
    id: string
  ): Promise<SaveResult<WebhookEndpoint>> {
    const result = await this.client.mutate({
      mutation: AdminWebhookEndpointDisableOpDocument,
      variables: { id },
      refetchQueries: [
        {
          query: AdminWebhookEndpointsDocument,
          variables: this.fetchWebhookEndpointsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminWebhookEndpointDisable?.result;
    if (payload?.__typename === "AdminWebhookEndpointUpdateSuccess") {
      return { success: true, data: payload.webhookEndpoint as any };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async getPolicy(): Promise<GetResult<IntegrationPolicy>> {
    const result = await this.client.query({
      query: IntegrationPolicyGetDocument,
      fetchPolicy: "network-only",
    });
    const error = graphQlErrorMessage(result);
    if (error) return { data: undefined, error };
    return {
      data: result.data.integrationPolicyGet
        ? policyFromGraphql(result.data.integrationPolicyGet)
        : undefined,
    };
  }

  async updatePolicy(
    input: IntegrationPolicyInput
  ): Promise<SaveResult<IntegrationPolicy>> {
    const result = await this.client.mutate({
      mutation: AdminIntegrationPolicyUpdateOpDocument,
      variables: { input },
    });
    const error = graphQlErrorMessage(result);
    if (error) return { success: false, message: error };
    const payload = result.data?.adminIntegrationPolicyUpdate?.result;
    if (payload?.__typename === "AdminIntegrationPolicyUpdateSuccess") {
      return { success: true, data: policyFromGraphql(payload.policy) };
    }
    return {
      success: false,
      fields: fieldErrors(payload?.fields) as any,
      message: payload?.message,
    };
  }

  async getOptions(force?: boolean): Promise<GetResult<IntegrationOptions>> {
    const result = await this.client.query({
      query: AdminIntegrationOptionsDocument,
      fetchPolicy: force ? "network-only" : "cache-first",
    });
    return {
      data: {
        scopes: result.data.integrationScopeOptions as IntegrationOption[],
        statuses: result.data
          .integrationClientStatusOptions as IntegrationOption[],
        webhookStatuses: result.data
          .webhookEndpointStatusOptions as IntegrationOption[],
        integrationTypes: result.data
          .integrationTypeOptions as IntegrationOption[],
        eventTypes: result.data
          .integrationEventTypeOptions as IntegrationOption[],
      },
    };
  }

  async fetchAdminUserOptions(
    searchText: string = ""
  ): Promise<AdminUserOption[]> {
    const result = await this.client.query({
      query: IntegrationPolicyAdminUsersDocument,
      variables: { limit: 100, offset: 0, q: searchText || undefined },
      fetchPolicy: "network-only",
    });
    return (
      result.data.adminAuthorityUserQuery?.results
        ?.filter(Boolean)
        .map(item => ({
          id: item.id,
          label:
            [item.firstName, item.lastName].filter(Boolean).join(" ") ||
            item.username,
        })) || []
    );
  }
}
