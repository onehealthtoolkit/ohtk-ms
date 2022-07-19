import { BaseViewModel } from "lib/baseViewModel";
import {
  IStateTransitionService,
  StateTransition,
} from "lib/services/stateTransition";
import { computed, makeObservable, observable } from "mobx";

export class StateTransitionViewViewModel extends BaseViewModel {
  id: string;
  _data: StateTransition = {} as StateTransition;

  constructor(
    id: string,
    readonly stateDefinitionService: IStateTransitionService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): StateTransition {
    return this._data;
  }
  set data(value: StateTransition) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.stateDefinitionService.getStateTransition(this.id)
    ).data;
    if (data) {
      this.data = data;
      try {
        const json = JSON.parse(data.formDefinition);
        this.data.formDefinition = JSON.stringify(json, null, 2);
      } catch (e) {
        this.data.formDefinition = "Error! Bad definition format";
      }
    }
    this.isLoading = false;
  }
}
