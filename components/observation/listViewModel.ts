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
import { ObservationEventItem } from "lib/services/observation/event";

export enum ObservationViewMode {
  list,
  calendar,
  map,
}

const initialFilter: ObservationFilterData = {
  definitionId: undefined,
  fromDate: undefined,
  throughDate: undefined,
};

type SearchParams = {
  viewMode?: number;
  definitionId?: number;
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
} & ObservationCalendarParams;

export class ObservationListViewModel extends BaseViewModel {
  data: ObservationSubject[] = [];
  dataEvents: ObservationEventItem[] = [];
  filter: ObservationFilterData = initialFilter;
  calendarViewModel = new ObservationCalendarViewModel();
  viewMode: ObservationViewMode = ObservationViewMode.list;

  constructor(readonly observationService: IObservationService) {
    super();
    makeObservable(this, {
      data: observable,
      dataEvents: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
      filterReset: action,
      calendarViewModel: observable,
      viewMode: observable,
      switchView: action,
    });
  }

  setSearchValue(params: SearchParams) {
    this.filter.definitionId = params.definitionId;
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.viewMode = params.viewMode
      ? (params.viewMode as ObservationViewMode)
      : ObservationViewMode.list;
    this.offset = params.offset || 0;

    if (
      this.viewMode == ObservationViewMode.calendar &&
      params.calendarMonth !== undefined &&
      params.calendarYear !== undefined
    ) {
      this.calendarViewModel.toMonthYear(
        params.calendarMonth,
        params.calendarYear
      );

      this.filter.fromDate = this.calendarViewModel.getStartDate();
      this.filter.throughDate = this.calendarViewModel.getEndDate();
    } else if (
      this.viewMode == ObservationViewMode.map &&
      !params.fromDate &&
      !params.throughDate
    ) {
      this.setDefaultSearchValue();
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

      if (this.viewMode == ObservationViewMode.map) {
        const events = Array<ObservationEventItem>();
        this.data?.forEach(it => {
          if (it.gpsLocation) {
            const lnglat = it.gpsLocation.split(",");

            try {
              events.push({
                id: it.id,
                title: it.title,
                description: it.description,
                location: {
                  lat: parseFloat(lnglat[1]),
                  lng: parseFloat(lnglat[0]),
                },
                imageUrl: it.imageUrl,
                createdAt: it.createdAt,
              });
            } catch (e) {
              console.log("Cannot parse (lat,lng) location: " + it.gpsLocation);
            }
          }
        });
        this.dataEvents = events;
      }
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  filterReset() {
    this.filter = initialFilter;
    this.fetch();
  }

  switchView(viewMode: ObservationViewMode) {
    this.viewMode = viewMode;
  }

  setDefaultSearchValue() {
    const today = new Date();
    this.filter.fromDate = new Date(new Date().setDate(today.getDate() - 30));
    this.filter.throughDate = new Date();
  }
}
