import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService, Report } from "lib/services/report";

export class ReportListViewModel extends BaseViewModel {
  data: Report[] = [];

  constructor(readonly reportService: IReportService, offset: number = 0) {
    super();
    makeObservable(this, {
      data: observable,
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
      this.offset
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
