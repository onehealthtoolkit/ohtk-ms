import {
  CensusDefinitionVersion,
  CensusRoundMode,
  CensusRoundOccurrence,
  ICensusDefinitionService,
  ICensusRoundService,
  ICensusSnapshotService,
  VillageCensusSnapshot,
} from "lib/services/census";
import { IVillageService } from "lib/services/village/villageService";
import { Village } from "lib/services/village/village";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  animalSummaryFields,
  buildAnimalFormData,
  CensusFormValues,
  fieldKeyForRow,
  fieldKeyForSummary,
  prefillFormValues,
} from "./formData";

export type AnimalCensusCreateStep = "setup" | "form";

export type AnimalCensusCreateOptions = {
  authorityId?: number;
  villageId?: string;
  occurrenceId?: string;
  mode?: CensusRoundMode;
};

export class AnimalCensusCreateViewModel {
  step: AnimalCensusCreateStep = "setup";
  mode: CensusRoundMode = "PRODUCTION";
  villages: Village[] = [];
  selectedVillageId = "";
  villagesLoading = false;
  occurrences: CensusRoundOccurrence[] = [];
  selectedOccurrenceId = "";
  censusDate = todayIsoDate();

  definition?: CensusDefinitionVersion = undefined;
  latestSnapshot?: VillageCensusSnapshot = undefined;
  values: CensusFormValues = { summary: {}, rows: {} };
  definitionChanged = false;

  loadingDefinition = false;
  loadError?: string = undefined;
  submitError?: string = undefined;
  fieldErrors: Record<string, string> = {};
  isSubmitting = false;

  constructor(
    readonly villageService: IVillageService,
    readonly censusDefinitionService: ICensusDefinitionService,
    readonly censusRoundService: ICensusRoundService,
    readonly censusSnapshotService: ICensusSnapshotService,
    readonly options: AnimalCensusCreateOptions
  ) {
    if (options.mode) {
      this.mode = options.mode;
    }
    if (options.villageId) {
      this.selectedVillageId = String(options.villageId);
    }
    if (options.occurrenceId) {
      this.selectedOccurrenceId = String(options.occurrenceId);
    }
    makeObservable(this, {
      step: observable,
      mode: observable,
      villages: observable,
      selectedVillageId: observable,
      villagesLoading: observable,
      occurrences: observable,
      selectedOccurrenceId: observable,
      censusDate: observable,
      definition: observable,
      latestSnapshot: observable,
      values: observable,
      definitionChanged: observable,
      loadingDefinition: observable,
      loadError: observable,
      submitError: observable,
      fieldErrors: observable,
      isSubmitting: observable,
      canContinueToForm: computed,
      selectedVillage: computed,
      selectedOccurrence: computed,
      runtimeSchema: computed,
      summaryFields: computed,
      isGrouped: computed,
      init: action,
      setMode: action,
      selectVillage: action,
      selectOccurrence: action,
      setCensusDate: action,
      clearFieldError: action,
      setSummaryValue: action,
      setRowValue: action,
      continueToForm: action,
      backToSetup: action,
      submit: action,
    });
  }

  get canContinueToForm(): boolean {
    return Boolean(
      this.selectedVillageId && this.selectedOccurrenceId && this.censusDate
    );
  }

  get selectedVillage(): Village | undefined {
    return this.villages.find(
      village => String(village.id) === this.selectedVillageId
    );
  }

  get selectedOccurrence(): CensusRoundOccurrence | undefined {
    return this.occurrences.find(
      occurrence => occurrence.id === this.selectedOccurrenceId
    );
  }

  get runtimeSchema() {
    return this.definition?.runtimeSchema ?? { rows: [], measures: [] };
  }

  get summaryFields() {
    return animalSummaryFields(this.runtimeSchema);
  }

  get isGrouped(): boolean {
    return this.runtimeSchema.layout === "grouped_species";
  }

  async init() {
    this.loadError = undefined;
    await Promise.all([this.loadVillages(), this.loadOccurrences()]);
    if (this.options.villageId && this.options.occurrenceId) {
      await this.continueToForm();
    }
  }

  async loadVillages() {
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
        this.villages = (result.items || []).filter(
          village => village.active !== false
        );
        this.villagesLoading = false;
      });
      if (
        this.selectedVillageId &&
        !this.villages.some(
          village => String(village.id) === this.selectedVillageId
        )
      ) {
        const missing = await this.villageService.getVillage(
          Number(this.selectedVillageId)
        );
        if (missing.data) {
          runInAction(() => {
            this.villages = [...this.villages, missing.data!];
          });
        }
      }
    } catch {
      runInAction(() => {
        this.villagesLoading = false;
        this.loadError = "Failed to load villages";
      });
    }
  }

  async loadOccurrences() {
    const result = await this.censusRoundService.getAnimalOccurrences(
      this.mode
    );
    runInAction(() => {
      if (result.data) {
        this.occurrences = result.data;
        if (
          !this.selectedOccurrenceId ||
          !result.data.some(
            occurrence => occurrence.id === this.selectedOccurrenceId
          )
        ) {
          this.selectedOccurrenceId = defaultOccurrenceId(result.data);
        }
        this.loadError = undefined;
      } else {
        this.loadError = result.error || "Failed to load census rounds";
      }
    });
  }

  async setMode(mode: CensusRoundMode) {
    if (this.mode === mode) {
      return;
    }
    this.mode = mode;
    this.selectedOccurrenceId = "";
    await this.loadOccurrences();
  }

  selectVillage(id: string) {
    this.selectedVillageId = id;
    this.clearFieldError("village");
  }

  selectOccurrence(id: string) {
    this.selectedOccurrenceId = id;
    this.clearFieldError("occurrence");
  }

  setCensusDate(value: string) {
    this.censusDate = value;
    this.clearFieldError("censusDate");
  }

  clearFieldError(key: string) {
    if (!this.fieldErrors[key]) {
      return;
    }
    const next = { ...this.fieldErrors };
    delete next[key];
    this.fieldErrors = next;
  }

  setSummaryValue(key: string, value: string) {
    this.values = {
      ...this.values,
      summary: {
        ...this.values.summary,
        [key]: value,
      },
    };
    this.clearFieldError(fieldKeyForSummary(key));
    this.submitError = undefined;
  }

  setRowValue(rowKey: string, measureKey: string, value: string) {
    this.values = {
      ...this.values,
      rows: {
        ...this.values.rows,
        [rowKey]: {
          ...(this.values.rows[rowKey] ?? {}),
          [measureKey]: value,
        },
      },
    };
    this.clearFieldError(fieldKeyForRow(rowKey, measureKey));
    this.submitError = undefined;
  }

  async continueToForm() {
    const setupErrors: Record<string, string> = {};
    if (!this.selectedVillageId) {
      setupErrors.village = "Select a village";
    }
    if (!this.selectedOccurrenceId) {
      setupErrors.occurrence = "Select a census round";
    }
    if (!this.censusDate) {
      setupErrors.censusDate = "Select a census date";
    }
    this.fieldErrors = setupErrors;
    if (Object.keys(setupErrors).length) {
      this.loadError = undefined;
      return;
    }

    this.loadingDefinition = true;
    this.loadError = undefined;
    this.submitError = undefined;
    this.fieldErrors = {};
    try {
      const [definitionResult, latestResult] = await Promise.all([
        this.censusDefinitionService.getActiveVersion("ANIMAL"),
        this.censusSnapshotService.getLatestAnimalVillageCensus(
          Number(this.selectedVillageId)
        ),
      ]);
      runInAction(() => {
        if (!definitionResult.data) {
          this.loadError =
            definitionResult.error || "No published animal census definition.";
          this.loadingDefinition = false;
          return;
        }
        this.definition = definitionResult.data;
        this.latestSnapshot = latestResult.data;
        this.definitionChanged = Boolean(
          latestResult.data?.definitionVersionId &&
          String(latestResult.data.definitionVersionId) !==
            String(definitionResult.data.id)
        );
        this.values = prefillFormValues(
          definitionResult.data.runtimeSchema,
          latestResult.data
        );
        this.step = "form";
        this.loadingDefinition = false;
      });
    } catch {
      runInAction(() => {
        this.loadError = "Failed to load census form";
        this.loadingDefinition = false;
      });
    }
  }

  backToSetup() {
    this.step = "setup";
    this.submitError = undefined;
    this.fieldErrors = {};
  }

  async submit(): Promise<VillageCensusSnapshot | null> {
    if (!this.definition || !this.selectedVillageId) {
      return null;
    }
    const built = buildAnimalFormData(this.runtimeSchema, this.values);
    if (!built.ok) {
      this.fieldErrors = built.fieldErrors;
      this.submitError = "Please fix the highlighted fields.";
      return null;
    }

    this.isSubmitting = true;
    this.submitError = undefined;
    const result =
      await this.censusSnapshotService.submitVillageCensusSnapshotV2({
        villageId: Number(this.selectedVillageId),
        definitionVersionId: Number(this.definition.id),
        occurrenceId: this.selectedOccurrenceId
          ? Number(this.selectedOccurrenceId)
          : undefined,
        censusDate: this.censusDate,
        formData: built.formData,
      });
    runInAction(() => {
      this.isSubmitting = false;
      if (result.error || !result.data) {
        this.submitError = result.error || "Submit failed";
      }
    });
    return result.data ?? null;
  }
}

function todayIsoDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function defaultOccurrenceId(occurrences: CensusRoundOccurrence[]): string {
  const open =
    occurrences.find(occurrence => occurrence.status === "OPEN") ??
    occurrences.find(occurrence => occurrence.status === "LATE_WINDOW") ??
    occurrences[0];
  return open?.id ?? "";
}
