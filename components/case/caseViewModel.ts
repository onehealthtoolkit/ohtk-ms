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
import Form from "lib/opsvForm/models/form";
import { parseForm, FormType } from "lib/opsvForm/models/json";
import { v4 as uuidv4 } from "uuid";
import type { CaseCloseOutcome } from "lib/services/case/case";

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
  _caseClosing: boolean = false;
  /** opsv form built from ReportType.close_definition */
  closeForm?: Form = undefined;
  closeFormError: boolean = false;
  /** raw JSON string kept for FormQuestion definition prop */
  closeFormDefinitionJson: string = "{}";

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
      closeForm: observable,
      closeFormError: observable,
      closeFormDefinitionJson: observable,
      initCloseForm: action,
      closeCase: action,
      validateCloseForm: action,
      _caseClosing: observable,
      caseClosing: computed,
      isCaseClosed: computed,
      hasCloseForm: computed,
      imageUrlMap: computed,
      fileUrlMap: computed,
    });
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

  public get hasCloseForm(): boolean {
    return !!(this.closeForm && this.closeForm.sections.length > 0);
  }

  initCloseForm(
    definition: FormType | null | undefined,
    payload?: Record<string, any>
  ) {
    this.closeForm = undefined;
    this.closeFormError = false;
    this.closeFormDefinitionJson = "{}";
    if (!definition || !Array.isArray(definition.sections)) {
      return;
    }
    try {
      const json: FormType = {
        ...definition,
        id: definition.id || uuidv4(),
        subforms: definition.subforms || [],
        sections: definition.sections || [],
      };
      if (!json.sections) {
        json.sections = [];
      }
      this.closeFormDefinitionJson = JSON.stringify(json);
      this.closeForm = parseForm(json);
      const values = payload && typeof payload === "object" ? payload : {};
      this.closeForm.loadJsonValue(values);
    } catch (e) {
      console.log(e);
      this.closeFormError = true;
      this.closeForm = undefined;
    }
  }

  validateCloseForm(): boolean {
    if (!this.closeForm) {
      return true;
    }
    return this.closeForm.sections.every(section => section.validate());
  }

  getClosePayload(): Record<string, any> {
    if (!this.closeForm) {
      return { ...(this.data.closePayload || {}) };
    }
    return this.closeForm.toJsonValue();
  }

  async fetch(policy?: FetchPolicy) {
    this.isLoading = true;
    const data = (await this.caseService.getCase(this.id, policy)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
        this.initCloseForm(data.closeDefinition, data.closePayload);
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

  public get caseClosing(): boolean {
    return this._caseClosing;
  }

  public set caseClosing(value: boolean) {
    this._caseClosing = value;
  }

  public get isCaseClosed(): boolean {
    return !!(this.data.isFinished && this.data.stoppedAt);
  }

  /**
   * Finish case (CO2b): outcome + optional form payload in one step.
   */
  public async closeCase(
    outcome: CaseCloseOutcome = "close_case",
    payloadOverride?: Record<string, any>
  ): Promise<boolean> {
    this.setErrorMessage(undefined);
    if (outcome === "close_case" && !this.validateCloseForm()) {
      this.setErrorMessage("Please complete the close form before finishing");
      return false;
    }

    this.caseClosing = true;
    try {
      const payload =
        payloadOverride !== undefined
          ? payloadOverride
          : outcome === "close_case"
            ? this.getClosePayload()
            : {};
      const result = await this.caseService.closeCase(
        this.id,
        payload,
        outcome
      );
      runInAction(() => {
        if (result.data) {
          this.data = {
            ...this.data,
            ...result.data,
            closeDefinition: this.data.closeDefinition,
            files: this.data.files || [],
          };
          this.initCloseForm(
            this.data.closeDefinition,
            result.data.closePayload
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
          error instanceof Error ? error.message : "Unable to finish case"
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
