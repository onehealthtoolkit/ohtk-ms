import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IIntegrationService,
  IntegrationOptions,
  WebhookEndpoint,
} from "lib/services/integration";

export class WebhookEndpointViewModel extends BaseViewModel {
  data: WebhookEndpoint = {} as WebhookEndpoint;
  options: IntegrationOptions = {
    scopes: [],
    statuses: [],
    webhookStatuses: [],
    integrationTypes: [],
    eventTypes: [],
  };

  constructor(
    readonly id: string,
    readonly integrationService: IIntegrationService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      options: observable,
      fetch: action,
      disable: action,
    });
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const [dataResult, optionResult] = await Promise.all([
      this.integrationService.getWebhookEndpoint(this.id),
      this.integrationService.getOptions(),
    ]);
    runInAction(() => {
      if (dataResult.data) this.data = dataResult.data;
      if (optionResult.data) this.options = optionResult.data;
      this.isLoading = false;
    });
  }

  async disable() {
    const result = await this.integrationService.disableWebhookEndpoint(
      this.id
    );
    if (result.success) {
      this.fetch();
    } else {
      this.setErrorMessage(
        result.message || "Unable to disable webhook endpoint"
      );
    }
  }
}
