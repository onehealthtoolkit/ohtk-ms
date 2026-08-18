import {
  CaseCalendarParams,
  CaseCalendarViewModel,
} from "components/case/calendarViewModel";
import { BaseViewModel } from "lib/baseViewModel";
import { Case } from "lib/services/case";
import {
  CaseFilterData,
  CaseStatusFilterValue,
  ICaseService,
} from "lib/services/case/caseService";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

const initialFilter: CaseFilterData = {
  fromDate: undefined,
  throughDate: undefined,
  incidentFromDate: undefined,
  incidentThroughDate: undefined,
  authorities: undefined,
  reportTypes: undefined,
  includeChildAuthorities: undefined,
  q: "",
  caseStatuses: [],
};

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  incidentFromDate?: Date;
  incidentThroughDate?: Date;
  offset?: number;
  authorities?: CaseFilterData["authorities"];
  reportTypes?: CaseFilterData["reportTypes"];
  includeChildAuthorities?: boolean;
  q?: string;
  caseStatuses?: CaseStatusFilterValue[];
} & CaseCalendarParams;

export class CaseListViewModel extends BaseViewModel {
  data: Case[] = [];
  filter: CaseFilterData = initialFilter;
  calendarViewModel = new CaseCalendarViewModel();
  isCalendarView = false;
  _fromDate?: Date = undefined;
  _throughDate?: Date = undefined;
  _incidentFromDate?: Date = undefined;
  _incidentThroughDate?: Date = undefined;

  constructor(readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      _fromDate: observable,
      _throughDate: observable,
      _incidentFromDate: observable,
      _incidentThroughDate: observable,
      fromDate: computed,
      throughDate: computed,
      incidentFromDate: computed,
      incidentThroughDate: computed,
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
      calendarViewModel: observable,
      isCalendarView: observable,
      switchView: action,
    });
  }

  public get fromDate() {
    return this._fromDate;
  }

  public set fromDate(value: Date | undefined) {
    this._fromDate = value;
  }

  public get throughDate() {
    return this._throughDate;
  }

  public set throughDate(value: Date | undefined) {
    this._throughDate = value;
  }

  public get incidentFromDate() {
    return this._incidentFromDate;
  }

  public set incidentFromDate(value: Date | undefined) {
    this._incidentFromDate = value;
  }

  public get incidentThroughDate() {
    return this._incidentThroughDate;
  }

  public set incidentThroughDate(value: Date | undefined) {
    this._incidentThroughDate = value;
  }

  setSearchValue(params: SearchParams) {
    this.fromDate = params.fromDate;
    this.throughDate = params.throughDate;
    this.incidentFromDate = params.incidentFromDate;
    this.incidentThroughDate = params.incidentThroughDate;
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.filter.incidentFromDate = params.incidentFromDate;
    this.filter.incidentThroughDate = params.incidentThroughDate;
    this.filter.authorities = params.authorities;
    this.filter.reportTypes = params.reportTypes;
    this.filter.includeChildAuthorities = params.includeChildAuthorities;
    this.filter.q = params.q || "";
    this.filter.caseStatuses = params.caseStatuses || [];

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
      this.isCalendarView ? 1000 : this.limit, // calendar view fetches all cases but we limit to 1000 records
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
    this.filter = { ...initialFilter, caseStatuses: [] };
    this.fromDate = undefined;
    this.throughDate = undefined;
    this.incidentFromDate = undefined;
    this.incidentThroughDate = undefined;
    this.calendarViewModel.today();
  }

  switchView(isCalendarView: boolean) {
    this.isCalendarView = isCalendarView;
  }
}
