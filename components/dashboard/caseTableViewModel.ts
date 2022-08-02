import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Case, ICaseService } from "lib/services/case";
import { CaseFilterData } from "lib/services/case/caseService";

export class CaseTableViewModel extends BaseViewModel {
  data: Case[] = [];
  authorityId: number;
  filter: CaseFilterData = {
    fromDate: undefined,
    throughDate: new Date(),
    authorities: [],
  };
  constructor(authorityId: number, readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
    this.authorityId = authorityId;
    this.filter.authorities = [
      {
        id: authorityId.toString(),
        code: "",
        name: "",
      },
    ];
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.caseService.fetchCases(
      this.limit,
      this.offset,
      this.filter
    );
    runInAction(() => {
      this.data = result.items || [];
    });
    this.isLoading = false;
  }
}
