import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { StatData } from "lib/services/dashboard/stat";

export class StatViewModel extends BaseViewModel {
  data: StatData = {} as StatData;
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
    const data = await this.dashboardService.fetchStat(this.authorityId);
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }
}
