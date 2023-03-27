import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { EventItem } from "lib/services/dashboard/event";
import { DashBoardFilterData } from "./dashboardViewModel";

export class MapViewModel extends BaseViewModel {
  data = Array<EventItem>();
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
    const data = await this.dashboardService.fetchEvent(this.authorityId);
    if (data) {
      runInAction(() => {
        data.reports.forEach(it => this.data.push(it));
        data.cases.forEach(it => this.data.push(it));
      });
    }
    this.isLoading = false;
  }
}
