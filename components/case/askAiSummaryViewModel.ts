import { action, computed, makeObservable, observable } from "mobx";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { IIntegrationService } from "lib/services/integration";

export const ASK_AI_LOCK_MS = 60_000;

export class AskAiSummaryViewModel extends BaseFormViewModel {
  userPrompt = "";
  successMessage = "";
  lockedUntil = 0;
  promptDialog = new ModalDialogViewModel();

  constructor(readonly integrationService: IIntegrationService) {
    super();
    makeObservable(this, {
      userPrompt: observable,
      successMessage: observable,
      lockedUntil: observable,
      isLocked: computed,
      setUserPrompt: action,
      openDialog: action,
      closeDialog: action,
      request: action,
    });
  }

  get isLocked(): boolean {
    return this.lockedUntil > Date.now();
  }

  setUserPrompt(value: string) {
    this.userPrompt = value;
    delete this.fieldErrors["userPrompt"];
    if (this.submitError) {
      this.submitError = "";
    }
  }

  openDialog() {
    if (this.isLocked || this.isSubmitting) {
      return;
    }
    this.submitError = "";
    this.successMessage = "";
    this.fieldErrors = {};
    this.promptDialog.isOpen = true;
  }

  closeDialog() {
    if (this.isSubmitting) {
      return;
    }
    this.promptDialog.close();
  }

  async request(reportId: string): Promise<boolean> {
    if (!reportId || this.isSubmitting || this.isLocked) {
      return false;
    }
    this.isSubmitting = true;
    this.submitError = "";
    this.successMessage = "";
    this.fieldErrors = {};
    try {
      const result = await this.integrationService.requestAiSummary(
        reportId,
        this.userPrompt
      );
      if (result.success) {
        this.successMessage =
          "Request sent. The summary will appear in Comments.";
        this.lockedUntil = Date.now() + ASK_AI_LOCK_MS;
        this.promptDialog.close();
        return true;
      }
      if (result.fields) {
        this.fieldErrors = result.fields;
      }
      this.submitError = result.message || "Unable to request an AI summary.";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}
