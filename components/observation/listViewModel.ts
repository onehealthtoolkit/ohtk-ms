import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IObservationService,
  ObservationFilterData,
} from "lib/services/observation/observationService";
import {
  ObservationCalendarParams,
  ObservationCalendarViewModel,
} from "components/observation/calendarViewModel";
import { ObservationSubject } from "lib/services/observation";

const initialFilter: ObservationFilterData = {
  definitionId: undefined,
  fromDate: undefined,
  throughDate: undefined,
};

type SearchParams = {
  definitionId?: number;
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
} & ObservationCalendarParams;

export class ObservationListViewModel extends BaseViewModel {
  data: ObservationSubject[] = [];
  filter: ObservationFilterData = initialFilter;
  calendarViewModel = new ObservationCalendarViewModel();
  isCalendarView = false;

  constructor(readonly observationService: IObservationService) {
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
    this.filter.definitionId = params.definitionId;
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;

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
    const result = await this.observationService.fetchObservationSubjects(
      this.limit,
      this.offset,
      this.filter,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.calendarViewModel.updateObservationEvents(this.data);
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  filterReset() {
    this.filter = initialFilter;
    this.fetch();
  }

  switchView(isCalendarView: boolean) {
    this.isCalendarView = isCalendarView;
  }
}
