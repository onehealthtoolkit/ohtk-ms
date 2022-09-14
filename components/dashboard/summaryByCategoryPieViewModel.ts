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

type SummaryCategory = {
  category: string;
  total: number;
};

const summaryCategory = (array: SummaryByCategoryData[]) => {
  return array.reduce(
    (result: SummaryCategory[], currentValue: SummaryByCategoryData) => {
      let group = result.find(item => item.category == currentValue.category);
      if (!group) {
        group = { category: currentValue.category, total: 0 };
        result.push(group);
      }
      group.total += currentValue.total;
      return result;
    },
    []
  );
};

export class SummaryByCategoryPieViewModel extends BaseViewModel {
  authorityId: number = 0;
  fromDate?: Date = undefined;
  toDate?: Date = new Date();
  _summaryType: string = "report";

  data: ChartData<"doughnut"> = {
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
    setTimeout(() => {
      if (this.summaryType == "report") {
        this.fetchReport();
      } else if (this.summaryType == "case") {
        this.fetchCase();
      }
    }, 200);
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
    const summaries = summaryCategory(data);
    this.data = {
      labels: summaries.map(item => item.category),
      datasets: [
        {
          label: String(
            summaries.reduce((sum, current) => sum + current.total, 0)
          ),
          data: summaries.map(item => item.total),
          backgroundColor: colors,
        },
      ],
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

  mapToArray<K, V, R>(m: Map<K, V>, transformer: (key: K, item: V) => R) {
    return Array.from(m.entries()).map(x => transformer(x[0], x[1]));
  }
}
