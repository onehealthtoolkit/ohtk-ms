import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Case } from "lib/services/case";
import { CaseFilterData, ICaseService } from "lib/services/case/caseService";

const initialFilter: CaseFilterData = {
  fromDate: undefined,
  throughDate: undefined,
  authorities: undefined,
  reportTypes: undefined,
};

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
  authorities?: CaseFilterData["authorities"];
  reportTypes?: CaseFilterData["reportTypes"];
};

export class CaseListViewModel extends BaseViewModel {
  data: Case[] = [];
  filter: CaseFilterData = initialFilter;

  constructor(readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
    });
  }

  setSearchValue(params: SearchParams) {
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.filter.authorities = params.authorities;
    this.filter.reportTypes = params.reportTypes;

    this.offset = params.offset || 0;
    this.fetch();
  }

  async fetch(): Promise<void> {
    const result = await this.caseService.fetchCases(
      this.limit,
      this.offset,
      this.filter
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  filterReset() {
    this.filter = initialFilter;
    this.fetch();
  }
}
