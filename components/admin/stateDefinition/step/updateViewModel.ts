import { StateStep } from "lib/services/stateStep";
import { IStateStepService } from "lib/services/stateStep/stateStepService";
import { SaveResult } from "lib/services/interface";
import { StateStepViewModel } from "./stateStepViewModel";

export class StateStepUpdateViewModel extends StateStepViewModel {
  id: string;
  constructor(
    readonly stateDefinitionId: string,
    id: string,
    stateStepService: IStateStepService
  ) {
    super(stateDefinitionId, stateStepService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.stateStepService.getStateStep(this.id)).data;
    if (data) {
      this.name = data.name;
      this.isStartState = data.isStartState;
      this.isStopState = data.isStopState;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<StateStep>> {
    return this.stateStepService.updateStateStep(
      this.id,
      this.name,
      this.isStartState,
      this.isStopState,
      this.stateDefinitionId
    );
  }
}
