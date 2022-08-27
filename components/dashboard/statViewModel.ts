import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { StatData } from "lib/services/dashboard/stat";
import { DashBoardFilterData } from "./dashboardViewModel";

export class StatViewModel extends BaseViewModel {
  data: StatData = {} as StatData;
  authorityId: number = 0;
  fromDate?: Date = undefined;
  toDate?: Date = new Date();

  constructor(readonly dashboardService: IDashboardService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
  }

  setSearchValue(authorityId: number, filter: DashBoardFilterData) {
    this.authorityId = authorityId;
    this.fromDate = filter.fromDate;
    this.toDate = filter.toDate;

    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await this.dashboardService.fetchStat(this.authorityId);
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }
}
