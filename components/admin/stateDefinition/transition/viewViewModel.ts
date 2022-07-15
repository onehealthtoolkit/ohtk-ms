import { BaseViewModel } from "lib/baseViewModel";
import {
  IStateTransitionService,
  StateTransition,
} from "lib/services/stateTransition";
import { makeObservable, observable } from "mobx";

export class StateTransitionViewViewModel extends BaseViewModel {
  id: string;
  data: StateTransition = {} as StateTransition;

  constructor(
    id: string,
    readonly stateDefinitionService: IStateTransitionService
  ) {
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
      await this.stateDefinitionService.getStateTransition(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
