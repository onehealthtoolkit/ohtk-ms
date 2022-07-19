import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { EventData } from "lib/services/dashboard/event";

export class MapViewModel extends BaseViewModel {
  data: EventData = {} as EventData;
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
        this.data = data;
      });
    }
    this.isLoading = false;
  }
}
