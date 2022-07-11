import { CaseDefinition } from "lib/services/caseDefinition";
import { ICaseDefinitionService } from "lib/services/caseDefinition/caseDefinitionService";
import { SaveResult } from "lib/services/interface";
import { CaseDefinitionViewModel } from "./caseDefinitionViewModel";

export class CaseDefinitionUpdateViewModel extends CaseDefinitionViewModel {
  id: string;
  constructor(id: string, caseDefinitionService: ICaseDefinitionService) {
    super(caseDefinitionService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.caseDefinitionService.getCaseDefinition(this.id)
    ).data;
    if (data) {
      this.reportTypeId = data.reportTypeId;
      this.description = data.description;
      this.condition = data.condition;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<CaseDefinition>> {
    return this.caseDefinitionService.updateCaseDefinition(
      this.id,
      this.reportTypeId,
      this.description,
      this.condition
    );
  }
}
