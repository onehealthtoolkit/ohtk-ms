import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService, Report } from "lib/services/report";
import { ReportFilterData } from "lib/services/report/reportService";

export class ReportListViewModel extends BaseViewModel {
  data: Report[] = [];
  filter: ReportFilterData = {
    fromDate: null,
    throughDate: new Date(),
    authorities: [],
  };

  constructor(readonly reportService: IReportService, offset: number = 0) {
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
    const result = await this.reportService.fetchReports(
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
