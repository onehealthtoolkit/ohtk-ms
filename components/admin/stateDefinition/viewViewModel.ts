import { BaseViewModel } from "lib/baseViewModel";
import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";
import { makeObservable, observable } from "mobx";

export class StateDefinitionViewViewModel extends BaseViewModel {
  id: string;
  data: StateDefinition = {} as StateDefinition;

  constructor(
    id: string,
    readonly stateDefinitionService: IStateDefinitionService
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
      await this.stateDefinitionService.getStateDefinition(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
