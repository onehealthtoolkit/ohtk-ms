import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";
import { SaveResult } from "lib/services/interface";
import { StateDefinitionViewModel } from "./stateDefinitionViewModel";
import { IStateTransitionService } from "lib/services/stateTransition";
import { IStateStepService } from "lib/services/stateStep";
import { runInAction } from "mobx";

export class StateDefinitionUpdateViewModel extends StateDefinitionViewModel {
  id: string;
  stateStepService: IStateStepService;
  stateTransitionService: IStateTransitionService;

  constructor(
    id: string,
    stateDefinitionService: IStateDefinitionService,
    stateStepService: IStateStepService,
    stateTransitionService: IStateTransitionService
  ) {
    super(stateDefinitionService);
    this.stateStepService = stateStepService;
    this.stateTransitionService = stateTransitionService;
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.stateDefinitionService.getStateDefinition(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.isDefault = data.isDefault;
      if (data.stateSteps) this.stateSteps = data.stateSteps;
      if (data.stateTransitions) this.stateTransitions = data.stateTransitions;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<StateDefinition>> {
    return this.stateDefinitionService.updateStateDefinition(
      this.id,
      this.name,
      this.isDefault
    );
  }

  async deleteStep(id: string): Promise<void> {
    const result = await this.stateStepService.deleteStateStep(id, this.id);
    if (!result.error) {
      runInAction(
        () => (this.stateSteps = this.stateSteps.filter(item => item.id != id))
      );
    }
  }

  async deleteTransition(id: string): Promise<void> {
    const result = await this.stateTransitionService.deleteStateTransition(
      id,
      this.id
    );
    if (!result.error) {
      runInAction(
        () =>
          (this.stateTransitions = this.stateTransitions.filter(
            item => item.id != id
          ))
      );
    }
  }
}
