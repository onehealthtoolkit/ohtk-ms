import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Report, IReportService } from "lib/services/report";
import { DashBoardFilterData } from "./dashboardViewModel";

export class ReportTableViewModel extends BaseViewModel {
  data: Report[] = [];
  authorityId: number = 0;
  fromDate?: Date = undefined;
  toDate?: Date = new Date();

  constructor(readonly reportService: IReportService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });

    this.limit = 5;
  }

  setSearchValue(authorityId: number, filter: DashBoardFilterData) {
    this.authorityId = authorityId;
    this.fromDate = filter.fromDate;
    this.toDate = filter.toDate;

    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.reportService.fetchReports(
      this.limit,
      this.offset,
      {
        fromDate: this.fromDate,
        throughDate: this.toDate,
        authorities: [
          {
            id: this.authorityId.toString(),
            code: "",
            name: "",
          },
        ],
      },
      true
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    this.isLoading = false;
  }
}
