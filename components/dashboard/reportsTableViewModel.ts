import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Report, IReportService } from "lib/services/report";
import { ReportFilterData } from "lib/services/report/reportService";

export class ReportTableViewModel extends BaseViewModel {
  data: Report[] = [];
  authorityId: number;
  filter: ReportFilterData = {
    fromDate: undefined,
    throughDate: new Date(),
    authorities: [],
  };
  constructor(authorityId: number, readonly reportService: IReportService) {
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
    this.limit = 5;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.reportService.fetchReports(
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
