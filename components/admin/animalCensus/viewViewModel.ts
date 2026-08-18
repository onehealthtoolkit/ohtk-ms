import { BaseViewModel } from "lib/baseViewModel";
import {
  CensusCoverageStatus,
  CensusRoundMode,
  CensusRoundCoverage,
  CensusRoundCoverageRow,
  CensusRoundOccurrence,
  ICensusRoundService,
} from "lib/services/census";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type CensusCoverageFilter = CensusCoverageStatus | "ALL";

export class AnimalCensusCoverageViewModel extends BaseViewModel {
  occurrences: CensusRoundOccurrence[] = [];
  mode: CensusRoundMode = "PRODUCTION";
  selectedOccurrenceId: string = "";
  /** Optional drill-down within the viewer's authority inherits-down tree. */
  authorityId: number | null = null;
  status: CensusCoverageFilter = "MISSING";
  q: string = "";
  coverage: CensusRoundCoverage = {
    totalCount: 0,
    submittedCount: 0,
    missingCount: 0,
    lateCount: 0,
    rows: [],
  };
  selectedRow: CensusRoundCoverageRow | undefined = undefined;
  pendingOccurrenceId = "";

  constructor(
    readonly censusRoundService: ICensusRoundService,
    initial?: { mode?: CensusRoundMode; occurrenceId?: string }
  ) {
    super();
    makeObservable(this, {
      occurrences: observable,
      mode: observable,
      selectedOccurrenceId: observable,
      authorityId: observable,
      status: observable,
      q: observable,
      coverage: observable,
      selectedRow: observable,
      selectedOccurrence: computed,
      rows: computed,
      fetch: action,
      fetchCoverage: action,
      setMode: action,
      setOccurrence: action,
      setAuthorityId: action,
      setStatus: action,
      setSearch: action,
      setOffset: action,
      selectRow: action,
      closeDetail: action,
      applyQuery: action,
    });
    if (initial?.mode) {
      this.mode = initial.mode;
    }
    if (initial?.occurrenceId) {
      this.pendingOccurrenceId = initial.occurrenceId;
    }
    this.fetch();
  }

  applyQuery(params: { mode?: string; occurrenceId?: string }) {
    const mode =
      params.mode === "TRAINING" || params.mode === "PRODUCTION"
        ? params.mode
        : undefined;
    const occurrenceId = params.occurrenceId
      ? String(params.occurrenceId)
      : undefined;
    if (mode && mode !== this.mode) {
      this.pendingOccurrenceId = occurrenceId ?? this.pendingOccurrenceId;
      this.setMode(mode);
      return;
    }
    if (occurrenceId && occurrenceId !== this.selectedOccurrenceId) {
      if (this.occurrences.some(occurrence => occurrence.id === occurrenceId)) {
        this.setOccurrence(occurrenceId);
      } else {
        this.pendingOccurrenceId = occurrenceId;
      }
    }
  }

  get selectedOccurrence(): CensusRoundOccurrence | undefined {
    return this.occurrences.find(
      occurrence => occurrence.id === this.selectedOccurrenceId
    );
  }

  get rows(): CensusRoundCoverageRow[] {
    return this.coverage.rows;
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.censusRoundService.getAnimalOccurrences(
      this.mode
    );
    runInAction(() => {
      if (result.data) {
        this.occurrences = result.data;
        const pending = this.pendingOccurrenceId;
        const pendingExists = pending
          ? result.data.some(occurrence => occurrence.id === pending)
          : false;
        this.selectedOccurrenceId = pendingExists
          ? pending
          : this.defaultOccurrenceId(result.data);
        this.pendingOccurrenceId = "";
        this.setErrorMessage(undefined);
      } else {
        this.setErrorMessage(result.error);
      }
      this.isLoading = false;
    });
    if (result.data?.length) {
      await this.fetchCoverage();
    }
  }

  async fetchCoverage() {
    if (!this.selectedOccurrenceId) {
      this.coverage = {
        totalCount: 0,
        submittedCount: 0,
        missingCount: 0,
        lateCount: 0,
        rows: [],
      };
      return;
    }
    this.isLoading = true;
    const result = await this.censusRoundService.getCoverage({
      occurrenceId: Number(this.selectedOccurrenceId),
      authorityId: this.authorityId,
      status: this.status,
      q: this.q,
      limit: this.limit,
      offset: this.offset,
    });
    runInAction(() => {
      if (result.data) {
        this.coverage = result.data;
        this.setErrorMessage(undefined);
      } else {
        this.setErrorMessage(result.error);
      }
      this.isLoading = false;
    });
  }

  setMode(value: CensusRoundMode) {
    if (this.mode === value) {
      return;
    }
    this.mode = value;
    this.selectedOccurrenceId = "";
    this.offset = 0;
    this.coverage = {
      totalCount: 0,
      submittedCount: 0,
      missingCount: 0,
      lateCount: 0,
      rows: [],
    };
    this.fetch();
  }

  setOccurrence(value: string) {
    this.selectedOccurrenceId = value;
    this.offset = 0;
    this.fetchCoverage();
  }

  setAuthorityId(value: number | null) {
    this.authorityId = value;
    this.offset = 0;
    this.fetchCoverage();
  }

  setStatus(value: CensusCoverageFilter) {
    this.status = value;
    this.offset = 0;
    this.fetchCoverage();
  }

  setSearch(value: string) {
    this.q = value;
  }

  setOffset(value: number) {
    this.offset = value;
    this.fetchCoverage();
  }

  selectRow(row: CensusRoundCoverageRow) {
    this.selectedRow = row;
  }

  closeDetail() {
    this.selectedRow = undefined;
  }

  private defaultOccurrenceId(occurrences: CensusRoundOccurrence[]): string {
    const open =
      occurrences.find(occurrence => occurrence.status === "OPEN") ??
      occurrences.find(occurrence => occurrence.status === "LATE_WINDOW") ??
      occurrences[0];
    return open?.id ?? "";
  }
}
