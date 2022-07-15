import { BaseViewModel } from "lib/baseViewModel";
import { ReportCategory } from "lib/services/reportCategory";
import { IReportCategoryService } from "lib/services/reportCategory/reportCategoryService";
import { computed, makeObservable, observable } from "mobx";

export class ReportCategoryViewViewModel extends BaseViewModel {
  id: string;
  _data: ReportCategory = {} as ReportCategory;

  constructor(
    id: string,
    readonly reportCategoryService: IReportCategoryService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): ReportCategory {
    return this._data;
  }
  set data(value: ReportCategory) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reportCategoryService.getReportCategory(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
