import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService, Report } from "lib/services/report";
import { ReportFilterData } from "lib/services/report/reportService";

const initialFilter: ReportFilterData = {
  fromDate: undefined,
  throughDate: undefined,
  authorities: undefined,
};

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
  authorities?: ReportFilterData["authorities"];
};

export class ReportListViewModel extends BaseViewModel {
  data: Report[] = [];
  filter: ReportFilterData = initialFilter;

  constructor(readonly reportService: IReportService) {
    super();
    makeObservable(this, {
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
      filterReset: action,
    });
  }

  setSearchValue(params: SearchParams) {
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.filter.authorities = params.authorities;

    this.offset = params.offset || 0;
    this.fetch();
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

  filterReset() {
    this.filter = initialFilter;
    this.fetch();
  }
}
