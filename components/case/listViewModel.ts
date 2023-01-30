import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Case } from "lib/services/case";
import { CaseFilterData, ICaseService } from "lib/services/case/caseService";
import {
  CaseCalendarParams,
  CaseCalendarViewModel,
} from "components/case/calendarViewModel";

const initialFilter: CaseFilterData = {
  fromDate: undefined,
  throughDate: undefined,
  authorities: undefined,
  reportTypes: undefined,
};

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
  authorities?: CaseFilterData["authorities"];
  reportTypes?: CaseFilterData["reportTypes"];
} & CaseCalendarParams;

export class CaseListViewModel extends BaseViewModel {
  data: Case[] = [];
  filter: CaseFilterData = initialFilter;
  calendarViewModel = new CaseCalendarViewModel();
  isCalendarView = false;

  constructor(readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
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
    const result = await this.caseService.fetchCases(
      this.limit,
      this.offset,
      this.filter,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.calendarViewModel.updateCaseEvents(this.data);
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
