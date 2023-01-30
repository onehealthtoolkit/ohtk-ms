import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IReportCategoryService,
  ReportCategory,
} from "lib/services/reportCategory";

export class AdminReportCategoryListViewModel extends BaseViewModel {
  data: ReportCategory[] = [];

  nameSearch: string = "";

  constructor(readonly reportCategorService: IReportCategoryService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.reportCategorService.fetchReportCategories(
      this.limit,
      this.offset,
      this.nameSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.reportCategorService.deleteReportCategory(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
