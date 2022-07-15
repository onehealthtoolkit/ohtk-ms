import { BaseViewModel } from "lib/baseViewModel";
import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";
import { computed, makeObservable, observable } from "mobx";

export class StateDefinitionViewViewModel extends BaseViewModel {
  id: string;
  _data: StateDefinition = {} as StateDefinition;

  constructor(
    id: string,
    readonly stateDefinitionService: IStateDefinitionService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): StateDefinition {
    return this._data;
  }
  set data(value: StateDefinition) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.stateDefinitionService.getStateDefinition(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
