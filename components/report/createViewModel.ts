import { FormRuntimeViewModel } from "components/report/formRuntimeViewModel";
import { IReportService } from "lib/services/report/reportService";
import { IReportTypeService } from "lib/services/reportType";
import { ReportType } from "lib/services/reportType";
import { IVillageService } from "lib/services/village/villageService";
import { Village } from "lib/services/village/village";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type CreateReportStep = "setup" | "form";

export class ReportCreateViewModel {
  step: CreateReportStep = "setup";
  reportTypes: ReportType[] = [];
  selectedReportTypeId = "";
  selectedReportType?: ReportType = undefined;

  villageRequired = false;
  villages: Village[] = [];
  selectedVillageId = "";
  villagesLoading = false;

  testFlag = false;

  formRuntime?: FormRuntimeViewModel = undefined;
  loadingDefinition = false;
  loadError?: string = undefined;
  submitError?: string = undefined;

  constructor(
    readonly reportService: IReportService,
    readonly reportTypeService: IReportTypeService,
    readonly villageService: IVillageService,
    readonly options: {
      villageFeatureEnabled: boolean;
      authorityId?: number;
    }
  ) {
    this.villageRequired = options.villageFeatureEnabled;
    makeObservable(this, {
      step: observable,
      reportTypes: observable,
      selectedReportTypeId: observable,
      selectedReportType: observable,
      villageRequired: observable,
      villages: observable,
      selectedVillageId: observable,
      villagesLoading: observable,
      testFlag: observable,
      formRuntime: observable,
      loadingDefinition: observable,
      loadError: observable,
      submitError: observable,
      canContinueToForm: computed,
      init: action,
      selectReportType: action,
      selectVillage: action,
      continueToForm: action,
      backToSetup: action,
    });
  }

  get canContinueToForm(): boolean {
    if (!this.selectedReportTypeId) return false;
    if (this.villageRequired && !this.selectedVillageId) return false;
    return true;
  }

  /**
   * GraphQL incidentDate comes from the form field (usually incident_date),
   * not a separate setup control.
   */
  extractIncidentDate(data: Record<string, unknown>): string | null {
    const raw =
      data["incident_date"] ??
      data["incidentDate"] ??
      data["incident_date__value"];
    if (raw == null || raw === "") return null;
    if (typeof raw === "string") {
      // YYYY-MM-DD or ISO datetime
      const m = raw.match(/^(\d{4}-\d{2}-\d{2})/);
      if (m) return m[1];
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10);
      }
      return null;
    }
    return null;
  }

  async init() {
    this.loadError = undefined;
    const types = await this.reportTypeService.fetchReportTypeSelections(
      200,
      0,
      ""
    );
    runInAction(() => {
      this.reportTypes = types.items || [];
    });

    if (this.villageRequired && this.options.authorityId) {
      await this.loadVillages();
    }
  }

  async loadVillages() {
    if (!this.options.authorityId) return;
    this.villagesLoading = true;
    try {
      const result = await this.villageService.fetchVillages(
        500,
        0,
        "",
        true,
        this.options.authorityId
      );
      runInAction(() => {
        this.villages = (result.items || []).filter(v => v.active !== false);
        this.villagesLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.villagesLoading = false;
        this.loadError = "Failed to load villages";
      });
    }
  }

  selectReportType(id: string) {
    this.selectedReportTypeId = id;
    this.selectedReportType = this.reportTypes.find(r => r.id === id);
  }

  selectVillage(id: string) {
    this.selectedVillageId = id;
  }

  async continueToForm() {
    if (!this.canContinueToForm) return;
    this.loadingDefinition = true;
    this.loadError = undefined;
    this.submitError = undefined;
    try {
      const result = await this.reportTypeService.getReportType(
        this.selectedReportTypeId
      );
      const definition = result.data?.definition;
      if (!definition) {
        runInAction(() => {
          this.loadError = "Report type definition not found";
          this.loadingDefinition = false;
        });
        return;
      }
      runInAction(() => {
        this.selectedReportType = result.data;
        this.formRuntime = new FormRuntimeViewModel(definition);
        this.step = "form";
        this.loadingDefinition = false;
      });
    } catch (e) {
      runInAction(() => {
        this.loadError = "Failed to load form definition";
        this.loadingDefinition = false;
      });
    }
  }

  backToSetup() {
    this.step = "setup";
    this.formRuntime = undefined;
    this.submitError = undefined;
  }

  async submit(): Promise<{ id: string; caseId?: string | null } | null> {
    if (!this.formRuntime || !this.selectedReportTypeId) return null;
    const data = this.formRuntime.buildValidatedData();
    if (!data) return null;

    this.formRuntime.setSubmitting(true);
    this.formRuntime.setSubmitError(undefined);
    this.submitError = undefined;

    let gpsLocation: string | undefined;
    let villageId: number | undefined;
    if (this.villageRequired && this.selectedVillageId) {
      villageId = parseInt(this.selectedVillageId, 10);
      const village = this.villages.find(
        v => String(v.id) === this.selectedVillageId
      );
      if (
        village?.longitude != null &&
        village?.latitude != null &&
        !Number.isNaN(village.longitude) &&
        !Number.isNaN(village.latitude)
      ) {
        gpsLocation = `${village.longitude},${village.latitude}`;
      }
    }

    const incidentDate = this.extractIncidentDate(data);
    if (!incidentDate) {
      const msg =
        "Incident date is required in the form (field incident_date).";
      this.formRuntime.setSubmitting(false);
      this.formRuntime.setSubmitError(msg);
      runInAction(() => {
        this.submitError = msg;
      });
      return null;
    }

    try {
      const result = await this.reportService.submitIncidentReport({
        data,
        reportTypeId: this.selectedReportTypeId,
        incidentDate,
        gpsLocation,
        villageId,
        incidentInAuthority: !villageId,
        testFlag: this.testFlag,
      });

      this.formRuntime.setSubmitting(false);
      if (result.error || !result.data) {
        const msg = result.error || "Submit failed";
        this.formRuntime.setSubmitError(msg);
        runInAction(() => {
          this.submitError = msg;
        });
        return null;
      }
      return result.data;
    } catch (e) {
      this.formRuntime.setSubmitting(false);
      const msg = e instanceof Error ? e.message : "Submit failed";
      this.formRuntime.setSubmitError(msg);
      runInAction(() => {
        this.submitError = msg;
      });
      return null;
    }
  }
}
