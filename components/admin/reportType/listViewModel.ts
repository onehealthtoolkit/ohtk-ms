import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";

export class AdminReportTypeListViewModel extends BaseViewModel {
  data: ReportType[] = [];

  nameSearch: string = "";

  constructor(readonly reportTypeService: IReportTypeService) {
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

  async fetch(): Promise<void> {
    const result = await this.reportTypeService.fetchReportTypes(
      this.limit,
      this.offset,
      this.nameSearch
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.reportTypeService.deleteReportType(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
