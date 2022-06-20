import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";

export class AdminReportTypeListViewModel extends BaseViewModel {
  data: ReportType[] = [];

  searchText: string = "";

  constructor(readonly reportTypeService: IReportTypeService) {
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
    const result = await this.reportTypeService.fetchReportTypes(
      this.searchText
    );
    runInAction(() => (this.data = result.items || []));
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
