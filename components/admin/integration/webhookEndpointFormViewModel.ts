import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  IIntegrationService,
  IntegrationClient,
  IntegrationOptions,
  WebhookEndpoint,
  WebhookEndpointInput,
} from "lib/services/integration";
import { SaveResult } from "lib/services/interface";
import { jsonToText, parseJsonObject } from "./formUtils";

const parseOptionalInt = (value: string) => {
  if (!value.trim()) return null;
  return parseInt(value, 10);
};

const parseRequiredInt = (value: string) => parseInt(value, 10);

const validatePositiveInt = (label: string, value: string, required = true) => {
  if (!value.trim()) return required ? `${label} is required` : "";
  const parsed = parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return `${label} must be a positive number`;
  }
  return "";
};

export abstract class WebhookEndpointFormViewModel extends BaseFormViewModel {
  integrationClientId: string = "";
  name: string = "";
  url: string = "";
  status: string = "ACTIVE";
  eventTypes: string[] = [];
  schemaVersion: string = "2026-06-02";
  activeSigningSecretRef: string = "";
  activeSigningSecretVersionText: string = "1";
  nextSigningSecretRef: string = "";
  nextSigningSecretVersionText: string = "";
  timeoutSecondsText: string = "10";
  maxAttemptsText: string = "5";
  retryPolicyText: string = "{}";
  customHeadersText: string = "{}";
  clients: IntegrationClient[] = [];
  options: IntegrationOptions = {
    scopes: [],
    statuses: [],
    webhookStatuses: [],
    integrationTypes: [],
    eventTypes: [],
  };

  constructor(readonly integrationService: IIntegrationService) {
    super();
    makeObservable(this, {
      integrationClientId: observable,
      name: observable,
      url: observable,
      status: observable,
      eventTypes: observable,
      schemaVersion: observable,
      activeSigningSecretRef: observable,
      activeSigningSecretVersionText: observable,
      nextSigningSecretRef: observable,
      nextSigningSecretVersionText: observable,
      timeoutSecondsText: observable,
      maxAttemptsText: observable,
      retryPolicyText: observable,
      customHeadersText: observable,
      clients: observable,
      options: observable,
      input: computed,
      setEventType: action,
      save: action,
      fetchOptions: action,
    });
    this.fetchOptions();
  }

  get input(): WebhookEndpointInput {
    return {
      integrationClientId: this.integrationClientId,
      name: this.name,
      url: this.url,
      status: this.status,
      eventTypes: this.eventTypes,
      schemaVersion: this.schemaVersion,
      activeSigningSecretRef: this.activeSigningSecretRef,
      activeSigningSecretVersion: parseRequiredInt(
        this.activeSigningSecretVersionText
      ),
      nextSigningSecretRef: this.nextSigningSecretRef || null,
      nextSigningSecretVersion: parseOptionalInt(
        this.nextSigningSecretVersionText
      ),
      timeoutSeconds: parseRequiredInt(this.timeoutSecondsText),
      maxAttempts: parseRequiredInt(this.maxAttemptsText),
      retryPolicy: parseJsonObject("Retry policy", this.retryPolicyText)
        .value as Record<string, unknown>,
      customHeaders: parseJsonObject("Custom headers", this.customHeadersText)
        .value as Record<string, unknown>,
    };
  }

  setEventType(code: string, enabled: boolean) {
    this.eventTypes = enabled
      ? Array.from(new Set([...this.eventTypes, code]))
      : this.eventTypes.filter(item => item !== code);
  }

  async fetchOptions() {
    const [optionsResult, clientsResult] = await Promise.all([
      this.integrationService.getOptions(),
      this.integrationService.fetchClients(100, 0, "", true),
    ]);
    runInAction(() => {
      if (optionsResult.data) this.options = optionsResult.data;
      this.clients = clientsResult.items || [];
      if (!this.integrationClientId && this.clients.length > 0) {
        this.integrationClientId = this.clients[0].id;
      }
      if (this.eventTypes.length === 0 && optionsResult.data?.eventTypes[0]) {
        this.eventTypes = [optionsResult.data.eventTypes[0].code];
      }
    });
  }

  fill(data: WebhookEndpoint) {
    this.integrationClientId = data.integrationClient.id;
    this.name = data.name;
    this.url = data.url;
    this.status = data.status;
    this.eventTypes = data.eventTypes || [];
    this.schemaVersion = data.schemaVersion;
    this.activeSigningSecretRef = data.activeSigningSecretRef || "";
    this.activeSigningSecretVersionText = String(
      data.activeSigningSecretVersion || 1
    );
    this.nextSigningSecretRef = data.nextSigningSecretRef || "";
    this.nextSigningSecretVersionText = data.nextSigningSecretVersion
      ? String(data.nextSigningSecretVersion)
      : "";
    this.timeoutSecondsText = String(data.timeoutSeconds || 10);
    this.maxAttemptsText = String(data.maxAttempts || 5);
    this.retryPolicyText = jsonToText(data.retryPolicy);
    this.customHeadersText = jsonToText(data.customHeaders);
  }

  validate() {
    this.fieldErrors = {};
    if (!this.integrationClientId) {
      this.fieldErrors.integrationClientId = "this field is required";
    }
    if (!this.name.trim()) this.fieldErrors.name = "this field is required";
    if (!this.url.trim()) this.fieldErrors.url = "this field is required";
    if (!this.schemaVersion.trim()) {
      this.fieldErrors.schemaVersion = "this field is required";
    }
    if (this.eventTypes.length === 0) {
      this.fieldErrors.eventTypes = "select at least one event type";
    }

    const activeVersionError = validatePositiveInt(
      "Active signing secret version",
      this.activeSigningSecretVersionText
    );
    if (activeVersionError) {
      this.fieldErrors.activeSigningSecretVersion = activeVersionError;
    }

    const nextVersionError = validatePositiveInt(
      "Next signing secret version",
      this.nextSigningSecretVersionText,
      false
    );
    if (nextVersionError) {
      this.fieldErrors.nextSigningSecretVersion = nextVersionError;
    }

    const timeoutError = validatePositiveInt(
      "Timeout seconds",
      this.timeoutSecondsText
    );
    if (timeoutError) this.fieldErrors.timeoutSeconds = timeoutError;

    const maxAttemptsError = validatePositiveInt(
      "Max attempts",
      this.maxAttemptsText
    );
    if (maxAttemptsError) this.fieldErrors.maxAttempts = maxAttemptsError;

    const parsedRetry = parseJsonObject("Retry policy", this.retryPolicyText);
    if (parsedRetry.error) this.fieldErrors.retryPolicy = parsedRetry.error;

    const parsedHeaders = parseJsonObject(
      "Custom headers",
      this.customHeadersText
    );
    if (parsedHeaders.error)
      this.fieldErrors.customHeaders = parsedHeaders.error;

    return this.isValid;
  }

  abstract _save(): Promise<SaveResult<WebhookEndpoint>>;

  async save(): Promise<boolean> {
    this.isSubmitting = true;
    if (!this.validate()) {
      this.isSubmitting = false;
      return false;
    }
    try {
      const result = await this._save();
      if (!result.success) {
        this.fieldErrors = (result.fields || {}) as any;
        this.submitError = result.message || "";
        return false;
      }
      return true;
    } catch (error) {
      this.submitError =
        error instanceof Error
          ? error.message
          : "Unable to save webhook endpoint";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}

export class WebhookEndpointCreateViewModel extends WebhookEndpointFormViewModel {
  _save() {
    return this.integrationService.createWebhookEndpoint(this.input);
  }
}

export class WebhookEndpointUpdateViewModel extends WebhookEndpointFormViewModel {
  id: string;

  constructor(id: string, integrationService: IIntegrationService) {
    super(integrationService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.integrationService.getWebhookEndpoint(this.id);
    runInAction(() => {
      if (result.data) this.fill(result.data);
      this.isLoading = false;
    });
  }

  _save() {
    return this.integrationService.updateWebhookEndpoint(this.id, this.input);
  }
}
