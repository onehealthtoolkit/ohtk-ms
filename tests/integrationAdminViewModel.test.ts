import { IntegrationClientCreateViewModel } from "components/admin/integration/clientFormViewModel";
import { IntegrationPolicyViewModel } from "components/admin/integration/policyViewModel";
import { WebhookEndpointCreateViewModel } from "components/admin/integration/webhookEndpointFormViewModel";
import {
  IIntegrationService,
  IntegrationClient,
  IntegrationOptions,
} from "lib/services/integration";

const options: IntegrationOptions = {
  scopes: [
    { code: "ai.read_report", label: "Read report" },
    { code: "ai.create_comment", label: "Create comment" },
  ],
  statuses: [
    { code: "ACTIVE", label: "Active" },
    { code: "DISABLED", label: "Disabled" },
  ],
  webhookStatuses: [
    { code: "ACTIVE", label: "Active" },
    { code: "DISABLED", label: "Disabled" },
  ],
  integrationTypes: [{ code: "AI_ASSISTANT", label: "AI assistant" }],
  eventTypes: [{ code: "report.submitted", label: "Report submitted" }],
};

const clients: IntegrationClient[] = [
  {
    id: "1",
    name: "AI Assistant",
    code: "ai-assistant",
    integrationType: "AI_ASSISTANT",
    status: "ACTIVE",
    clientId: "oauth-client-id",
    scopeCodes: ["ai.read_report"],
    allowedCallbackDomains: [],
    rateLimitPolicy: {},
  },
];

const makeService = (overrides: Partial<IIntegrationService> = {}) =>
  ({
    fetchClients: jest
      .fn()
      .mockResolvedValue({ items: clients, totalCount: 1 }),
    getClient: jest.fn(),
    createClient: jest.fn().mockResolvedValue({
      success: true,
      data: { clientSecret: "one-time-secret" },
    }),
    updateClient: jest.fn(),
    disableClient: jest.fn(),
    rotateClientSecret: jest.fn(),
    fetchWebhookEndpoints: jest.fn(),
    getWebhookEndpoint: jest.fn(),
    createWebhookEndpoint: jest.fn().mockResolvedValue({ success: true }),
    updateWebhookEndpoint: jest.fn(),
    disableWebhookEndpoint: jest.fn(),
    getPolicy: jest.fn().mockResolvedValue({
      data: {
        integrationEnabled: false,
        aiEnabled: false,
        riskEvaluatorEnabled: false,
        clusterDetectorEnabled: false,
        aiDefaultCommentOwnerUserId: null,
        aiDefaultCommentOwnerName: "",
        dashboardRiskWindowDays: 7,
      },
    }),
    updatePolicy: jest.fn().mockResolvedValue({ success: true }),
    getOptions: jest.fn().mockResolvedValue({ data: options }),
    fetchAdminUserOptions: jest
      .fn()
      .mockResolvedValue([{ id: "10", label: "Tenant Admin" }]),
    ...overrides,
  }) as IIntegrationService;

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe("Integration admin view models", () => {
  it("builds integration client create input and stores one-time secret", async () => {
    const service = makeService();
    const viewModel = new IntegrationClientCreateViewModel(service);
    await flushPromises();

    viewModel.name = "AI Assistant";
    viewModel.code = "ai-assistant";
    viewModel.integrationType = "AI_ASSISTANT";
    viewModel.status = "ACTIVE";
    viewModel.setScope("ai.read_report", true);
    viewModel.setScope("ai.create_comment", true);
    viewModel.allowedCallbackDomainsText =
      "external.example.test\napi.example.test";
    viewModel.rateLimitPolicyText = '{ "perMinute": 60 }';

    await expect(viewModel.save()).resolves.toBe(true);

    expect(service.createClient).toHaveBeenCalledWith({
      name: "AI Assistant",
      code: "ai-assistant",
      integrationType: "AI_ASSISTANT",
      status: "ACTIVE",
      scopeCodes: ["ai.read_report", "ai.create_comment"],
      allowedCallbackDomains: ["external.example.test", "api.example.test"],
      rateLimitPolicy: { perMinute: 60 },
    });
    expect(viewModel.clientSecret).toBe("one-time-secret");
  });

  it("rejects invalid client rate policy JSON before calling the service", async () => {
    const service = makeService();
    const viewModel = new IntegrationClientCreateViewModel(service);
    await flushPromises();

    viewModel.name = "AI Assistant";
    viewModel.code = "ai-assistant";
    viewModel.rateLimitPolicyText = "{";

    await expect(viewModel.save()).resolves.toBe(false);

    expect(viewModel.fieldErrors.rateLimitPolicy).toBe(
      "Rate limit policy must be valid JSON"
    );
    expect(service.createClient).not.toHaveBeenCalled();
  });

  it("builds webhook endpoint create input from selected client, events, and JSON fields", async () => {
    const service = makeService();
    const viewModel = new WebhookEndpointCreateViewModel(service);
    await flushPromises();

    viewModel.name = "Report submitted";
    viewModel.url = "https://external.example.test/webhook";
    viewModel.activeSigningSecretRef = "secret-manager://tenant/ai/active";
    viewModel.activeSigningSecretVersionText = "2";
    viewModel.timeoutSecondsText = "15";
    viewModel.maxAttemptsText = "3";
    viewModel.retryPolicyText = '{ "backoff": "linear" }';
    viewModel.customHeadersText = '{ "X-Correlation-ID": "integration" }';

    await expect(viewModel.save()).resolves.toBe(true);

    expect(service.createWebhookEndpoint).toHaveBeenCalledWith({
      integrationClientId: "1",
      name: "Report submitted",
      url: "https://external.example.test/webhook",
      status: "ACTIVE",
      eventTypes: ["report.submitted"],
      schemaVersion: "2026-06-02",
      activeSigningSecretRef: "secret-manager://tenant/ai/active",
      activeSigningSecretVersion: 2,
      nextSigningSecretRef: null,
      nextSigningSecretVersion: null,
      timeoutSeconds: 15,
      maxAttempts: 3,
      retryPolicy: { backoff: "linear" },
      customHeaders: { "X-Correlation-ID": "integration" },
    });
  });

  it("rejects invalid policy risk window before saving", async () => {
    const service = makeService();
    const viewModel = new IntegrationPolicyViewModel(service);
    await flushPromises();

    viewModel.dashboardRiskWindowDaysText = "366";

    await expect(viewModel.save()).resolves.toBe(false);

    expect(viewModel.fieldErrors.dashboardRiskWindowDays).toBe(
      "Dashboard risk window days must be between 1 and 365."
    );
    expect(service.updatePolicy).not.toHaveBeenCalled();
  });
});
