import { BaseViewModel } from "lib/baseViewModel";
import { IStateStepService, StateStep } from "lib/services/stateStep";
import { computed, makeObservable, observable } from "mobx";

export class StateStepViewViewModel extends BaseViewModel {
  id: string;
  _data: StateStep = {} as StateStep;

  constructor(id: string, readonly stateDefinitionService: IStateStepService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): StateStep {
    return this._data;
  }
  set data(value: StateStep) {
    this._data = value;
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
