import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  CensusRoundDefinition,
  CensusRoundMode,
  ICensusRoundService,
} from "lib/services/census";

export class CensusRoundListViewModel extends BaseViewModel {
  data: CensusRoundDefinition[] = [];
  allData: CensusRoundDefinition[] = [];
  codeSearch: string = "";
  modeFilter: CensusRoundMode | "ALL" = "ALL";

  constructor(readonly censusRoundService: ICensusRoundService) {
    super();
    makeObservable(this, {
      data: observable,
      allData: observable,
      codeSearch: observable,
      modeFilter: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
      disable: action,
    });
  }

  setSearchValue(
    codeSearch: string = "",
    offset: number = 0,
    modeFilter: CensusRoundMode | "ALL" = "ALL"
  ) {
    this.codeSearch = codeSearch;
    this.offset = offset;
    this.modeFilter = modeFilter;
    this.applyFilter();
  }

  clearCodeSearch() {
    this.codeSearch = "";
  }

  async fetch(): Promise<void> {
    this.isLoading = true;
    const result = await this.censusRoundService.getDefinitions({
      kind: "ANIMAL",
    });
    runInAction(() => {
      this.allData = result.data || [];
      this.isLoading = false;
      if (result.error) {
        this.setErrorMessage(result.error);
      } else {
        this.setErrorMessage("");
      }
      this.applyFilter();
    });
  }

  applyFilter() {
    let filtered = this.allData;
    if (this.modeFilter !== "ALL") {
      filtered = filtered.filter(item => item.mode === this.modeFilter);
    }
    if (this.codeSearch) {
      const q = this.codeSearch.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.code.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q)
      );
    }
    this.totalCount = filtered.length;
    this.data = filtered.slice(this.offset, this.offset + this.limit);
  }

  async disable(record: CensusRoundDefinition): Promise<void> {
    const result = await this.censusRoundService.saveDefinition({
      id: parseInt(record.id, 10),
      code: record.code,
      name: record.name,
      kind: record.kind,
      mode: record.mode,
      censusPeriodStart: record.censusPeriodStart,
      censusPeriodEnd: record.censusPeriodEnd,
      startDate: record.startDate,
      softFinishDate: record.softFinishDate,
      hardFinishDate: record.hardFinishDate,
      targetAuthorityId: record.targetAuthorityId,
      enabled: false,
      materializeFromYear: null,
    });
    if (!result.success) {
      this.setErrorMessage(
        result.message || "Unable to disable census round definition."
      );
    } else {
      await this.fetch();
    }
  }
}
