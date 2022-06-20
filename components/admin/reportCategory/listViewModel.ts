import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IReportCategoryService,
  ReportCategory,
} from "lib/services/reportCategory";

export class AdminReportCategoryListViewModel extends BaseViewModel {
  data: ReportCategory[] = [];

  searchText: string = "";

  constructor(readonly reportCategorService: IReportCategoryService) {
    super();
    makeObservable(this, {
      data: observable,
      searchText: observable,
      setSearchText: action,
      clearSearchText: action,
      fetch: action,
    });
  }

  setSearchText(value: string) {
    this.searchText = value;
  }

  clearSearchText() {
    this.searchText = "";
  }

  async fetch(): Promise<void> {
    const result = await this.reportCategorService.fetchReportCategories(
      this.searchText
    );
    runInAction(() => (this.data = result.items || []));
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
