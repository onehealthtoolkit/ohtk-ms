import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IIntegrationService,
  IntegrationClient,
  IntegrationOptions,
} from "lib/services/integration";

export class IntegrationClientViewModel extends BaseViewModel {
  data: IntegrationClient = {} as IntegrationClient;
  clientSecret: string = "";
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
      clientSecret: observable,
      options: observable,
      fetch: action,
      rotateSecret: action,
      disable: action,
    });
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const [dataResult, optionResult] = await Promise.all([
      this.integrationService.getClient(this.id),
      this.integrationService.getOptions(),
    ]);
    runInAction(() => {
      if (dataResult.data) this.data = dataResult.data;
      if (optionResult.data) this.options = optionResult.data;
      this.isLoading = false;
    });
  }

  async rotateSecret() {
    this.clientSecret = "";
    const result = await this.integrationService.rotateClientSecret(this.id);
    if (result.success) {
      this.clientSecret = result.data?.clientSecret || "";
    } else {
      this.setErrorMessage(result.message || "Unable to rotate secret");
    }
  }

  async disable() {
    const result = await this.integrationService.disableClient(this.id);
    if (result.success) {
      this.fetch();
    } else {
      this.setErrorMessage(result.message || "Unable to disable client");
    }
  }
}
