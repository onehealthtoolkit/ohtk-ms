import { ReportType } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { ReportTypeViewModel } from "./reportTypeViewModel";

export class ReportTypeCreateViewModel extends ReportTypeViewModel {
  public _save(): Promise<SaveResult<ReportType>> {
    return this.reportTypeService.createReportType(
      this.name,
      this.categoryId!,
      this.definition,
      this.ordering,
      this.stateDefinitionId,
      this.rendererDataTemplate,
      this.followupDefinition,
      this.rendererFollowupDataTemplate
    );
  }
}
