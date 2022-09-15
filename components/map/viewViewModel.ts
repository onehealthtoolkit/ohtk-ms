import { IReportService } from "lib/services/report";
import { EventItem } from "lib/services/dashboard/event";
import { ReportType } from "lib/services/reportType";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type MapViewFilterData = {
  fromDate?: Date;
  toDate?: Date;
  reportTypes?: Pick<ReportType, "id" | "name">[];
};

export default class MapViewViewModel {
  _authorityId: number = 0;
  authorityName: string = "";
  _reportTypes?: MapViewFilterData["reportTypes"] = undefined;
  _fromDate: Date | undefined = undefined;
  _toDate: Date | undefined = undefined;

  data = Array<EventItem>();
  isLive: boolean = false;

  constructor(readonly reportService: IReportService) {
    makeObservable(this, {
      _authorityId: observable,
      authorityId: computed,
      authorityName: observable,
      _reportTypes: observable,
      reportTypes: computed,
      _fromDate: observable,
      fromDate: computed,
      _toDate: observable,
      toDate: computed,
      data: observable,
      fetch: action,
      isLive: observable,
      toggleLiveView: action,
    });
  }

  get authorityId() {
    return this._authorityId;
  }

  set authorityId(value: number) {
    this._authorityId = value;
  }

  get reportTypes() {
    return this._reportTypes;
  }

  set reportTypes(value: MapViewFilterData["reportTypes"]) {
    this._reportTypes = value;
  }

  get fromDate() {
    return this._fromDate;
  }

  set fromDate(value: Date | undefined) {
    if (value) value.setHours(0, 0, 0, 0);
    this._fromDate = value;
  }
  get toDate() {
    return this._toDate;
  }

  set toDate(value: Date | undefined) {
    if (value) value.setHours(23, 59, 59, 999);
    this._toDate = value;
  }

  setSearchValue(
    isLive: boolean,
    authorityId: number,
    authorityName: string,
    fromDate: Date | undefined,
    toDate: Date | undefined,
    reportTypes?: MapViewFilterData["reportTypes"]
  ) {
    runInAction(() => {
      if (!fromDate && !toDate) {
        this.setDefaultSearchValue();
      } else {
        this.fromDate = fromDate;
        this.toDate = toDate;
      }
      this.authorityId = authorityId;
      this.authorityName = authorityName;
      this.reportTypes = reportTypes;
      this.isLive = isLive;
    });

    this.fetch();
  }

  setDefaultSearchValue() {
    const today = new Date();
    this.fromDate = new Date(new Date().setDate(today.getDate() - 30));
    this.toDate = new Date();
  }

  async fetch() {
    const result = await this.reportService.fetchReports(1000, 0, {
      fromDate: this.fromDate,
      throughDate: this.toDate,
      reportTypes: this.reportTypes,
    });
    runInAction(() => {
      const events = Array<EventItem>();

      result.items?.forEach(it => {
        if (it.gpsLocation) {
          const lnglat = it.gpsLocation.split(",");

          events.push({
            id: it.id,
            type: "report",
            data: it.rendererData,
            location: {
              lat: parseFloat(lnglat[1]),
              lng: parseFloat(lnglat[0]),
            },
            categoryName: it.categoryName || "",
            categoryIcon: it.categoryIcon,
          });
        }
      });
      this.data = events;
    });
  }

  toggleLiveView() {
    this.isLive = !this.isLive;
  }
}
