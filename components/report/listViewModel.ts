import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService, Report } from "lib/services/report";
import { ReportFilterData } from "lib/services/report/reportService";
import {
  ReportCalendarParams,
  ReportCalendarViewModel,
} from "components/report/calendarViewModel";

const initialFilter: ReportFilterData = {
  fromDate: undefined,
  throughDate: undefined,
  authorities: undefined,
  reportTypes: undefined,
};

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
  authorities?: ReportFilterData["authorities"];
  reportTypes?: ReportFilterData["reportTypes"];
} & ReportCalendarParams;

export class ReportListViewModel extends BaseViewModel {
  data: Report[] = [];
  filter: ReportFilterData = initialFilter;
  calendarViewModel = new ReportCalendarViewModel();
  isCalendarView = false;

  constructor(readonly reportService: IReportService) {
    super();
    makeObservable(this, {
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
      filterReset: action,
      calendarViewModel: observable,
      isCalendarView: observable,
      switchView: action,
    });
  }

  setSearchValue(params: SearchParams) {
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.filter.authorities = params.authorities;
    this.filter.reportTypes = params.reportTypes;

    this.offset = params.offset || 0;

    this.isCalendarView = params.isCalendar === 1;

    if (
      this.isCalendarView &&
      params.calendarMonth !== undefined &&
      params.calendarYear !== undefined
    ) {
      this.calendarViewModel.toMonthYear(
        params.calendarMonth,
        params.calendarYear
      );

      this.filter.fromDate = this.calendarViewModel.getStartDate();
      this.filter.throughDate = this.calendarViewModel.getEndDate();
    }
    this.fetch();
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.reportService.fetchReports(
      this.limit,
      this.offset,
      this.filter,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.calendarViewModel.updateReportEvents(this.data);
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  filterReset() {
    this.filter = initialFilter;
    this.fetch();
  }

  switchView(isCalendarView: boolean) {
    this.isCalendarView = isCalendarView;
  }
}
