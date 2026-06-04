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
  IntegrationClientInput,
  IntegrationOptions,
} from "lib/services/integration";
import { SaveResult } from "lib/services/interface";
import {
  jsonToText,
  linesToList,
  listToLines,
  parseJsonObject,
} from "./formUtils";

export abstract class IntegrationClientFormViewModel extends BaseFormViewModel {
  name: string = "";
  code: string = "";
  integrationType: string = "GENERIC";
  status: string = "ACTIVE";
  scopeCodes: string[] = [];
  allowedCallbackDomainsText: string = "";
  rateLimitPolicyText: string = "{}";
  options: IntegrationOptions = {
    scopes: [],
    statuses: [],
    webhookStatuses: [],
    integrationTypes: [],
    eventTypes: [],
  };
  clientSecret: string = "";

  constructor(readonly integrationService: IIntegrationService) {
    super();
    makeObservable(this, {
      name: observable,
      code: observable,
      integrationType: observable,
      status: observable,
      scopeCodes: observable,
      allowedCallbackDomainsText: observable,
      rateLimitPolicyText: observable,
      options: observable,
      clientSecret: observable,
      input: computed,
      setScope: action,
      save: action,
      fetchOptions: action,
    });
    this.fetchOptions();
  }

  get input(): IntegrationClientInput {
    return {
      name: this.name,
      code: this.code,
      integrationType: this.integrationType,
      status: this.status,
      scopeCodes: this.scopeCodes,
      allowedCallbackDomains: linesToList(this.allowedCallbackDomainsText),
      rateLimitPolicy: parseJsonObject(
        "Rate limit policy",
        this.rateLimitPolicyText
      ).value as Record<string, unknown>,
    };
  }

  setScope(code: string, enabled: boolean) {
    this.scopeCodes = enabled
      ? Array.from(new Set([...this.scopeCodes, code]))
      : this.scopeCodes.filter(item => item !== code);
  }

  async fetchOptions() {
    const result = await this.integrationService.getOptions();
    if (result.data) {
      runInAction(() => {
        this.options = result.data!;
      });
    }
  }

  fill(data: IntegrationClient) {
    this.name = data.name;
    this.code = data.code;
    this.integrationType = data.integrationType;
    this.status = data.status;
    this.scopeCodes = data.scopeCodes || [];
    this.allowedCallbackDomainsText = listToLines(data.allowedCallbackDomains);
    this.rateLimitPolicyText = jsonToText(data.rateLimitPolicy);
  }

  validate() {
    this.fieldErrors = {};
    if (!this.name.trim()) this.fieldErrors.name = "this field is required";
    if (!this.code.trim()) this.fieldErrors.code = "this field is required";
    const parsedPolicy = parseJsonObject(
      "Rate limit policy",
      this.rateLimitPolicyText
    );
    if (parsedPolicy.error)
      this.fieldErrors.rateLimitPolicy = parsedPolicy.error;
    return this.isValid;
  }

  abstract _save(): Promise<SaveResult<IntegrationClient>>;

  async save(): Promise<boolean> {
    this.isSubmitting = true;
    this.clientSecret = "";
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
      if (result.data?.clientSecret) {
        this.clientSecret = result.data.clientSecret;
      }
      return true;
    } catch (error) {
      this.submitError =
        error instanceof Error
          ? error.message
          : "Unable to save integration client";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}

export class IntegrationClientCreateViewModel extends IntegrationClientFormViewModel {
  _save() {
    return this.integrationService.createClient(this.input);
  }
}

export class IntegrationClientUpdateViewModel extends IntegrationClientFormViewModel {
  id: string;

  constructor(id: string, integrationService: IIntegrationService) {
    super(integrationService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.integrationService.getClient(this.id);
    runInAction(() => {
      if (result.data) this.fill(result.data);
      this.isLoading = false;
    });
  }

  _save() {
    return this.integrationService.updateClient(this.id, this.input);
  }
}
