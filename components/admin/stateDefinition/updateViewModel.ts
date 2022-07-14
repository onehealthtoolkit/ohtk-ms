import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";
import { SaveResult } from "lib/services/interface";
import { StateDefinitionViewModel } from "./stateDefinitionViewModel";

export class StateDefinitionUpdateViewModel extends StateDefinitionViewModel {
  id: string;
  constructor(id: string, stateDefinitionService: IStateDefinitionService) {
    super(stateDefinitionService);
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
}
