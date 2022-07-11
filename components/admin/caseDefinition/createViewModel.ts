import { CaseDefinition } from "lib/services/caseDefinition";
import { SaveResult } from "lib/services/interface";
import { CaseDefinitionViewModel } from "./caseDefinitionViewModel";

export class CaseDefinitionCreateViewModel extends CaseDefinitionViewModel {
  public _save(): Promise<SaveResult<CaseDefinition>> {
    return this.caseDefinitionService.createCaseDefinition(
      this.reportTypeId,
      this.description,
      this.condition
    );
  }
}
