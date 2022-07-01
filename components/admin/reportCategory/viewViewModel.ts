import { BaseViewModel } from "lib/baseViewModel";
import { ReportCategory } from "lib/services/reportCategory";
import { IReportCategoryService } from "lib/services/reportCategory/reportCategoryService";
import { makeObservable, observable } from "mobx";

export class ReportCategoryViewViewModel extends BaseViewModel {
  id: string;
  data: ReportCategory = {} as ReportCategory;

  constructor(
    id: string,
    readonly reportCategoryService: IReportCategoryService
  ) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
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
