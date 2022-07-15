import { BaseViewModel } from "lib/baseViewModel";
import { IStateStepService, StateStep } from "lib/services/stateStep";
import { makeObservable, observable } from "mobx";

export class StateStepViewViewModel extends BaseViewModel {
  id: string;
  data: StateStep = {} as StateStep;

  constructor(id: string, readonly stateDefinitionService: IStateStepService) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.stateDefinitionService.getStateStep(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
