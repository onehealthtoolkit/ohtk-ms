import { BaseViewModel } from "lib/baseViewModel";
import { ObservationDefinition } from "lib/services/observationDefinition";
import { IObservationDefinitionService } from "lib/services/observationDefinition/observationDefinitionService";
import { computed, makeObservable, observable } from "mobx";

export class ObservationDefinitionViewViewModel extends BaseViewModel {
  id: string;
  _data: ObservationDefinition = {} as ObservationDefinition;

  constructor(
    id: string,
    readonly observationDefinitionService: IObservationDefinitionService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): ObservationDefinition {
    return this._data;
  }
  set data(value: ObservationDefinition) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.observationDefinitionService.getObservationDefinition(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
