import { StateStep } from "lib/services/stateStep";
import { SaveResult } from "lib/services/interface";
import { StateStepViewModel } from "./stateStepViewModel";

export class StateStepCreateViewModel extends StateStepViewModel {
  public _save(): Promise<SaveResult<StateStep>> {
    return this.stateStepService.createStateStep(
      this.name,
      this.isStartState,
      this.isStopState,
      this.stateDefinitionId
    );
  }
}
