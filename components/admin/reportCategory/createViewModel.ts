import { ReportCategory } from "lib/services/reportCategory";
import { SaveResult } from "lib/services/interface";
import { ReportCategoryViewModel } from "./reportCategoryViewModel";

export class ReportCategoryCreateViewModel extends ReportCategoryViewModel {
  public _save(): Promise<SaveResult<ReportCategory>> {
    return this.reportCategoryService.createReportCategory(
      this.name,
      this.ordering,
      this.icon
    );
  }
}
