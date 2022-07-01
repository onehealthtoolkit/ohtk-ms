import { ReportCategory } from "lib/services/reportCategory";
import { IReportCategoryService } from "lib/services/reportCategory/reportCategoryService";
import { SaveResult } from "lib/services/interface";
import { ReportCategoryViewModel } from "./reportCategoryViewModel";

export class ReportCategoryUpdateViewModel extends ReportCategoryViewModel {
  id: string;
  constructor(id: string, reportCategoryService: IReportCategoryService) {
    super(reportCategoryService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reportCategoryService.getReportCategory(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.ordering = data.ordering;
      this.iconUrl = data.icon || "";
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ReportCategory>> {
    return this.reportCategoryService.updateReportCategory(
      this.id,
      this.name,
      this.ordering,
      this.icon,
      this.clearIcon
    );
  }
}
