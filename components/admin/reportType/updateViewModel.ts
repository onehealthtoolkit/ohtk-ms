import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { SaveResult } from "lib/services/interface";
import { ReportTypeViewModel } from "./reportTypeViewModel";
import { ParseError } from "components/admin/formBuilder/shared";

export class ReportTypeUpdateViewModel extends ReportTypeViewModel {
  id: string;
  constructor(id: string, reportTypeService: IReportTypeService) {
    super(reportTypeService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reportTypeService.getReportType(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.definition = data.definition;
      this.categoryId = data.categoryId;
      this.ordering = data.ordering;
      try {
        this.formViewModel.parse(JSON.parse(data.definition));
      } catch (e) {
        if (e instanceof ParseError) {
          this.submitError = e.message;
        } else {
          this.submitError = "Error! Bad definition format";
        }
      }
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ReportType>> {
    return this.reportTypeService.updateReportType(
      this.id,
      this.name,
      this.categoryId,
      this.definition,
      this.ordering
    );
  }
}
