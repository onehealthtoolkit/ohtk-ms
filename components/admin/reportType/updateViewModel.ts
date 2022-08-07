import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { SaveResult } from "lib/services/interface";
import { ReportTypeViewModel } from "./reportTypeViewModel";

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
      this.stateDefinitionId = data.stateDefinitionId || 0;
      this.ordering = data.ordering;
      this.rendererDataTemplate = data.rendererDataTemplate || "";
      this.parseDefinition(data.definition);
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ReportType>> {
    return this.reportTypeService.updateReportType(
      this.id,
      this.name,
      this.categoryId!,
      this.definition,
      this.ordering,
      this.stateDefinitionId,
      this.rendererDataTemplate
    );
  }
}
