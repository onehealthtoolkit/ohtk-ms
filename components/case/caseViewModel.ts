import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseDetail } from "lib/services/case/case";
import { CaseStateViewViewModel } from "components/case/caseState/viewViewModel";
import { Me } from "lib/services/profile/me";
import { FetchPolicy } from "@apollo/client";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";
import { ICommentService } from "lib/services/comment/commentService";
import { ReportMapDialogViewModel } from "components/case/reportMapDialogViewModel";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";
import { IReportService } from "lib/services/report";
import { RiskFilterLevel } from "lib/services/report/report";

export type OutbreakZone = {
  color: string;
  radius: number;
};

export class CaseViewModel extends BaseViewModel {
  data: CaseDetail = {} as CaseDetail;
  id: string;
  _activeTabIndex: number = 0;
  stateViewViewModel: CaseStateViewViewModel;
  galleryViewModel?: GalleryDialogViewModel = undefined;
  reportMapViewModel?: ReportMapDialogViewModel = undefined;
  outbreakPlaces: OutbreakPlace[] = [];
  _riskSaving: boolean = false;
  testResultDraft: string = "";
  /**
   * Layer2 stamp_out draft: animals terminated (integer).
   * Empty string while typing; validated as >= 0 integer on close.
   */
  stampOutDraft: string = "";
  _testResultSaving: boolean = false;
  _caseClosing: boolean = false;

  constructor(
    id: string,
    readonly me: Me,
    readonly caseService: ICaseService,
    readonly reportService: IReportService,
    readonly commentService: ICommentService,
    readonly outbreakService: IOutbreakService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      outbreakInfo: computed,
      fetch: action,
      _activeTabIndex: observable,
      activeTabIndex: computed,
      galleryViewModel: observable,
      openGallery: action,
      reportMapViewModel: observable,
      openReportMap: action,
      outbreakPlaces: observable,
      _riskSaving: observable,
      riskSaving: computed,
      setRiskLevel: action,
      testResultDraft: observable,
      stampOutDraft: observable,
      _testResultSaving: observable,
      testResultSaving: computed,
      setTestResultDraft: action,
      setStampOutDraft: action,
      saveTestResult: action,
      testResultDirty: computed,
      closeCase: action,
      _caseClosing: observable,
      caseClosing: computed,
      isCaseClosed: computed,
      requiresStampOut: computed,
      hasStampOutField: computed,
      stampOutFieldLabel: computed,
      imageUrlMap: computed,
      fileUrlMap: computed,
    });
    // ensure new observables
    this._caseClosing = false;
    this.id = id;
    this.stateViewViewModel = observable(
      new CaseStateViewViewModel(me, caseService, commentService)
    );
    this.fetch();
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  get reportId() {
    return this.data.reportId ? String(this.data.reportId) : "";
  }

  public get riskSaving(): boolean {
    return this._riskSaving;
  }

  public set riskSaving(value: boolean) {
    this._riskSaving = value;
  }

  get imageUrlMap(): Record<string, string> {
    const m = {} as Record<string, string>;
    if (this.data.images) {
      this.data.images.forEach(image => {
        m[image.id] = image.imageUrl;
      });
    }
    return m;
  }

  get fileUrlMap(): Record<string, string> {
    const m = {} as Record<string, string>;
    if (this.data.files) {
      this.data.files.forEach(file => {
        m[file.id] = file.fileUrl;
      });
    }
    return m;
  }

  async fetch(policy?: FetchPolicy) {
    this.isLoading = true;
    const data = (await this.caseService.getCase(this.id, policy)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
        this.testResultDraft = data.testResult || "";
        this.stampOutDraft = this.formatStampOutDraft(
          data.closePayload?.stamp_out
        );
        if (data.stateDefinition && data.states) {
          this.stateViewViewModel?.init(
            data.id,
            data.stateDefinition,
            data.states,
            data.threadId
          );
        }
      });

      this.fetchOutbreakPlaces();
    }
    this.isLoading = false;
  }

  public get testResultSaving(): boolean {
    return this._testResultSaving;
  }

  public set testResultSaving(value: boolean) {
    this._testResultSaving = value;
  }

  public get testResultDirty(): boolean {
    return (this.testResultDraft || "") !== (this.data.testResult || "");
  }

  setTestResultDraft(value: string) {
    this.testResultDraft = value;
  }

  private getCloseField(fieldId: string) {
    const fields = this.data.closeDefinition?.fields;
    if (!Array.isArray(fields)) {
      return undefined;
    }
    return fields.find(f => f && f.id === fieldId);
  }

  public get requiresStampOut(): boolean {
    const field = this.getCloseField("stamp_out");
    if (!field) {
      return false;
    }
    const requiredOn = field.requiredOn || [];
    return requiredOn.includes("officer");
  }

  public get stampOutFieldLabel(): string {
    const field = this.getCloseField("stamp_out");
    return field?.label || "Stamped out";
  }

  /** True when close_definition includes a stamp_out field (required or optional). */
  public get hasStampOutField(): boolean {
    return !!this.getCloseField("stamp_out");
  }

  private formatStampOutDraft(value: unknown): string {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(Math.trunc(value));
    }
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
    return "";
  }

  setStampOutDraft(value: string) {
    this.stampOutDraft = value;
  }

  /** Parse draft to non-negative integer, or null if empty/invalid. */
  private parseStampOutDraft(): number | null {
    const raw = (this.stampOutDraft || "").trim();
    if (raw === "") {
      return null;
    }
    if (!/^\d+$/.test(raw)) {
      return null;
    }
    return parseInt(raw, 10);
  }

  public async saveTestResult(): Promise<boolean> {
    this.testResultSaving = true;
    this.setErrorMessage(undefined);
    try {
      const result = await this.caseService.updateCaseTestResult(
        this.id,
        this.testResultDraft
      );
      runInAction(() => {
        if (result.data) {
          this.data.testResult = result.data.testResult;
          this.data.aiSuspected = result.data.aiSuspected;
          this.testResultDraft = result.data.testResult || "";
        }
        if (result.error) {
          this.setErrorMessage(result.error);
        }
        this.testResultSaving = false;
      });
      return !result.error && !!result.data;
    } catch (error) {
      runInAction(() => {
        this.setErrorMessage(
          error instanceof Error ? error.message : "Unable to save test result"
        );
        this.testResultSaving = false;
      });
      return false;
    }
  }

  public get caseClosing(): boolean {
    return this._caseClosing;
  }

  public set caseClosing(value: boolean) {
    this._caseClosing = value;
  }

  public get isCaseClosed(): boolean {
    return !!(this.data.isFinished && this.data.stoppedAt);
  }

  public async closeCase(): Promise<boolean> {
    this.caseClosing = true;
    this.setErrorMessage(undefined);
    try {
      const payload: Record<string, any> = {
        ...(this.data.closePayload || {}),
        test_result: this.testResultDraft,
      };
      if (this.hasStampOutField) {
        const raw = (this.stampOutDraft || "").trim();
        if (raw !== "") {
          const stampOut = this.parseStampOutDraft();
          if (stampOut === null) {
            this.setErrorMessage("Stamped out must be a whole number ≥ 0");
            this.caseClosing = false;
            return false;
          }
          payload.stamp_out = stampOut;
        }
        // empty + required: omit and let server validation reject
      }
      const result = await this.caseService.closeCase(this.id, payload);
      runInAction(() => {
        if (result.data) {
          this.data = {
            ...this.data,
            ...result.data,
            // keep schema + files from prior full fetch
            closeDefinition: this.data.closeDefinition,
            files: this.data.files || [],
          };
          this.testResultDraft = result.data.testResult || "";
          this.stampOutDraft = this.formatStampOutDraft(
            result.data.closePayload?.stamp_out
          );
        }
        if (result.error) {
          this.setErrorMessage(result.error);
        }
        this.caseClosing = false;
      });
      return !result.error && !!result.data;
    } catch (error) {
      runInAction(() => {
        this.setErrorMessage(
          error instanceof Error ? error.message : "Unable to close case"
        );
        this.caseClosing = false;
      });
      return false;
    }
  }

  async fetchOutbreakPlaces() {
    if (this.data.outbreakInfo) {
      const result = await this.outbreakService.fecthOutbreakPlaces(
        this.data.id
      );
      if (result.items) {
        this.outbreakPlaces = result.items;
      }
    }
  }

  public async setRiskLevel(level: RiskFilterLevel): Promise<boolean> {
    if (!this.reportId) {
      this.setErrorMessage("Unable to save risk level without report id");
      return false;
    }

    this.riskSaving = true;
    try {
      const result = await this.reportService.setReportRisk(
        this.reportId,
        level
      );
      runInAction(() => {
        if (result.data) {
          this.data.currentRiskAssessment = result.data.currentRiskAssessment;
          this.data.riskAssessmentHistory = result.data.riskAssessmentHistory;
        }
        if (result.error) {
          this.setErrorMessage(result.error);
        }
        this.riskSaving = false;
      });
      return !result.error;
    } catch (error) {
      runInAction(() => {
        this.setErrorMessage(
          error instanceof Error ? error.message : "Unable to save risk level"
        );
        this.riskSaving = false;
      });
      return false;
    }
  }

  get outbreakInfo(): OutbreakZone[] | undefined {
    let zones: OutbreakZone[] | undefined;
    if (this.data.outbreakInfo) {
      try {
        zones = JSON.parse(this.data.outbreakInfo).zones;
      } catch (_) {
        console.log("Error parsing outbreak plan info");
      }
    }
    return zones;
  }

  openGallery(imageId: string) {
    const images =
      this.data.images?.map(image => ({
        imageUrl: image.imageUrl,
        thumbnailUrl: image.thumbnail,
      })) || [];

    const selectedIdx = this.data.images?.findIndex(it => it.id === imageId);

    this.galleryViewModel = new GalleryDialogViewModel(images, selectedIdx);
    this.galleryViewModel.open(null);
  }

  openReportMap(caseId: string) {
    console.log(caseId);
    this.reportMapViewModel = new ReportMapDialogViewModel(
      this.outbreakService,
      caseId,
      this.outbreakPlaces
    );
    this.reportMapViewModel.open(null);
  }
}
