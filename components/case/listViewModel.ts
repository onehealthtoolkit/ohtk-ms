import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Case } from "lib/services/case";
import { CaseFilterData, ICaseService } from "lib/services/case/caseService";

export class CaseListViewModel extends BaseViewModel {
  data: Case[] = [];
  filter: CaseFilterData = {
    fromDate: null,
    throughDate: new Date(),
    authorities: [],
  };

  constructor(readonly caseService: ICaseService, offset: number = 0) {
    super();
    makeObservable(this, {
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
    });
    this.offset = offset;
    this.fetch();
  }

  setSearchValue(offset: number = 0) {
    if (this.offset != offset) {
      this.offset = offset;
      this.fetch();
    }
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
}
