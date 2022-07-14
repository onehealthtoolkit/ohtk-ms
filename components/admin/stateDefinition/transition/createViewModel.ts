import { StateTransition } from "lib/services/stateTransition";
import { SaveResult } from "lib/services/interface";
import { StateTransitionViewModel } from "./stateTransitionViewModel";

export class StateTransitionCreateViewModel extends StateTransitionViewModel {
  public _save(): Promise<SaveResult<StateTransition>> {
    return this.stateTransitionService.createStateTransition(
      this.formDefinition,
      this.fromStepId,
      this.toStepId,
      this.stateDefinitionId
    );
  }
}
