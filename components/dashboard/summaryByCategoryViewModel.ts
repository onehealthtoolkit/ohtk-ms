import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IDashboardService } from "lib/services/dashboard/dashboardService";
import { SummaryByCategoryData } from "lib/services/dashboard/summaryByCategory";
import { ChartData } from "chart.js";
import { DashBoardFilterData } from "./dashboardViewModel";

const colors = [
  "#56ADEC",
  "#626FE6",
  "#5CE081",
  "#D9D9D9",
  "#F6B50B",
  "#8530A3",
  "rgba(119, 154, 231, 1)",
];

export class SummaryByCategoryViewModel extends BaseViewModel {
  authorityId: number = 0;
  fromDate?: Date = undefined;
  toDate?: Date = new Date();
  _summaryType: string = "report";

  data: ChartData<"bar"> = {
    datasets: [],
  };

  constructor(readonly dashboardService: IDashboardService) {
    super();
    makeObservable(this, {
      data: observable,
      _summaryType: observable,
      summaryType: computed,
      fetch: action,
      changeSummaryType: action,
      filterByCategory: action,
    });
  }

  get summaryType(): string {
    return this._summaryType;
  }

  set summaryType(value: string) {
    this._summaryType = value;
  }

  setSearchValue(authorityId: number, filter: DashBoardFilterData) {
    this.authorityId = authorityId;
    this.fromDate = filter.fromDate;
    this.toDate = filter.toDate;

    this.fetch();
  }

  async fetch() {
    if (this.summaryType == "report") {
      this.fetchReport();
    } else if (this.summaryType == "case") {
      this.fetchCase();
    }
  }

  async fetchReport() {
    this.isLoading = true;
    const data = await this.dashboardService.fetchSummaryReportByCategory(
      this.authorityId,
      this.fromDate,
      this.toDate
    );
    if (data) {
      runInAction(() => {
        this.transformData(data);
      });
    }
    this.isLoading = false;
  }

  async fetchCase() {
    this.isLoading = true;
    const data = await this.dashboardService.fetchSummaryCaseByCategory(
      this.authorityId,
      this.fromDate,
      this.toDate
    );
    if (data) {
      runInAction(() => {
        this.transformData(data);
      });
    }
    this.isLoading = false;
  }

  transformData(data: SummaryByCategoryData[]) {
    const labels: string[] = [];
    let start: Date | undefined = undefined;
    let end: Date | undefined = undefined;
    if (this.fromDate) start = new Date(this.fromDate);
    if (this.toDate) end = new Date(this.toDate);
    if (!start && data.length) start = new Date(data[0].day);
    if (!end && data.length)
      end = new Date(Math.max(...data.map(element => element.day.getTime())));
    if (start && end) {
      for (const d: Date = start; d <= end; d.setDate(d.getDate() + 1)) {
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
      }
    }
    data.forEach(
      item => (item.x = `${item.day.getMonth() + 1}/${item.day.getDate()}`)
    );
    const groupByCategory = this.groupBy(
      data,
      (item: SummaryByCategoryData) => item.category
    );
    // console.log(groupByCategory);
    let datasets: any[] = this.mapToArray(groupByCategory, (key, value) => ({
      label: key,
      data: Array.from(value.values()),
    }));
    datasets.forEach((item, index) => {
      item.backgroundColor = colors[index % 3];
      item.ordering = item.data[0].ordering;
    });
    datasets = datasets.sort((n1, n2) => n1.ordering - n2.ordering);
    // console.log(datasets);
    this.data = {
      labels: labels,
      datasets: datasets,
    };
  }

  changeSummaryType(value: string) {
    this._summaryType = value;
    this.fetch();
  }

  filterByCategory(values: string[]) {
    runInAction(() => {
      let dataset = this.data.datasets.map(item => {
        return {
          hidden: item.label ? !values.includes(item.label) : false,
          label: item.label,
          data: item.data.map(d => d),
        };
      });
      this.data = {
        labels: this.data.labels,
        datasets: dataset,
      };
    });
  }

  groupBy(list: SummaryByCategoryData[], keyGetter: Function) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  mapToArray<K, V, R>(m: Map<K, V>, transformer: (key: K, item: V) => R) {
    return Array.from(m.entries()).map(x => transformer(x[0], x[1]));
  }
}
