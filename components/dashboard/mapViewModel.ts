import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { EventItem } from "lib/services/dashboard/event";

export class MapViewModel extends BaseViewModel {
  data = Array<EventItem>();
  authorityId: number;

  constructor(
    authorityId: number,
    readonly dashboardService: IDashboardService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
    this.authorityId = authorityId;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await this.dashboardService.fetchEvent(this.authorityId);
    if (data) {
      runInAction(() => {
        data.cases.forEach(it => this.data.push(it));
        data.reports.forEach(it => this.data.push(it));
      });
    }
    this.isLoading = false;
  }
}
