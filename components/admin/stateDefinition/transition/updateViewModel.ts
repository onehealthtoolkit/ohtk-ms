import { StateTransition } from "lib/services/stateTransition";
import { IStateTransitionService } from "lib/services/stateTransition/stateTransitionService";
import { SaveResult } from "lib/services/interface";
import { StateTransitionViewModel } from "./stateTransitionViewModel";

export class StateTransitionUpdateViewModel extends StateTransitionViewModel {
  id: string;
  constructor(
    readonly stateDefinitionId: string,
    id: string,
    stateTransitionService: IStateTransitionService
  ) {
    super(stateDefinitionId, stateTransitionService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.stateTransitionService.getStateTransition(this.id)
    ).data;
    if (data) {
      this.formDefinition = data.formDefinition;
      this.fromStepId = data.fromStep.id;
      this.toStepId = data.toStep.id;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<StateTransition>> {
    return this.stateTransitionService.updateStateTransition(
      this.id,
      this.formDefinition,
      this.fromStepId,
      this.toStepId,
      this.stateDefinitionId
    );
  }
}
