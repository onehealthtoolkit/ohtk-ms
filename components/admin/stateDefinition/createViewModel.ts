import { StateDefinition } from "lib/services/stateDefinition";
import { SaveResult } from "lib/services/interface";
import { StateDefinitionViewModel } from "./stateDefinitionViewModel";

export class StateDefinitionCreateViewModel extends StateDefinitionViewModel {
  public _save(): Promise<SaveResult<StateDefinition>> {
    return this.stateDefinitionService.createStateDefinition(
      this.name,
      this.isDefault
    );
  }
}
