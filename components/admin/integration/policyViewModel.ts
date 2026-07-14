import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  AdminUserOption,
  IIntegrationService,
  IntegrationPolicy,
  IntegrationPolicyInput,
} from "lib/services/integration";
import { SaveResult } from "lib/services/interface";

export class IntegrationPolicyViewModel extends BaseFormViewModel {
  integrationEnabled: boolean = false;
  aiEnabled: boolean = false;
  riskEvaluatorEnabled: boolean = false;
  clusterDetectorEnabled: boolean = false;
  aiDefaultCommentOwnerUserId: string = "";
  dashboardRiskWindowDaysText: string = "7";
  adminUsers: AdminUserOption[] = [];
  savedMessage: string = "";

  constructor(readonly integrationService: IIntegrationService) {
    super();
    makeObservable(this, {
      integrationEnabled: observable,
      aiEnabled: observable,
      riskEvaluatorEnabled: observable,
      clusterDetectorEnabled: observable,
      aiDefaultCommentOwnerUserId: observable,
      dashboardRiskWindowDaysText: observable,
      adminUsers: observable,
      savedMessage: observable,
      input: computed,
      fetch: action,
      save: action,
    });
    this.fetch();
  }

  get input(): IntegrationPolicyInput {
    return {
      integrationEnabled: this.integrationEnabled,
      aiEnabled: this.aiEnabled,
      riskEvaluatorEnabled: this.riskEvaluatorEnabled,
      clusterDetectorEnabled: this.clusterDetectorEnabled,
      aiDefaultCommentOwnerUserId: this.aiDefaultCommentOwnerUserId || null,
      dashboardRiskWindowDays: parseInt(this.dashboardRiskWindowDaysText, 10),
    };
  }

  fill(policy: IntegrationPolicy) {
    this.integrationEnabled = policy.integrationEnabled;
    this.aiEnabled = policy.aiEnabled;
    this.riskEvaluatorEnabled = policy.riskEvaluatorEnabled;
    this.clusterDetectorEnabled = policy.clusterDetectorEnabled;
    this.aiDefaultCommentOwnerUserId = policy.aiDefaultCommentOwnerUserId || "";
    this.dashboardRiskWindowDaysText = String(
      policy.dashboardRiskWindowDays || 7
    );
  }

  async fetch() {
    this.isLoading = true;
    const [policyResult, adminUsers] = await Promise.all([
      this.integrationService.getPolicy(),
      this.integrationService.fetchAdminUserOptions(),
    ]);
    runInAction(() => {
      if (policyResult.data) this.fill(policyResult.data);
      this.adminUsers = adminUsers;
      this.isLoading = false;
    });
  }

  validate() {
    this.fieldErrors = {};
    const dashboardDays = parseInt(this.dashboardRiskWindowDaysText, 10);
    if (
      !Number.isInteger(dashboardDays) ||
      dashboardDays <= 0 ||
      dashboardDays > 365
    ) {
      this.fieldErrors.dashboardRiskWindowDays =
        "Dashboard risk window days must be between 1 and 365.";
    }
    return this.isValid;
  }

  async _save(): Promise<SaveResult<IntegrationPolicy>> {
    return this.integrationService.updatePolicy(this.input);
  }

  async save(): Promise<boolean> {
    this.isSubmitting = true;
    this.savedMessage = "";
    if (!this.validate()) {
      this.isSubmitting = false;
      return false;
    }
    const result = await this._save();
    this.isSubmitting = false;
    if (!result.success) {
      this.fieldErrors = (result.fields || {}) as any;
      this.submitError = result.message || "";
      return false;
    }
    if (result.data) this.fill(result.data as IntegrationPolicy);
    this.savedMessage = "Integration settings saved.";
    return true;
  }
}
