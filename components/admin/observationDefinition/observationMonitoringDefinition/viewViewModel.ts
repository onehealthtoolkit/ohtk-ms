import { BaseViewModel } from "lib/baseViewModel";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinition";
import { IObservationMonitoringDefinitionService } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinitionService";
import { computed, makeObservable, observable } from "mobx";

export class ObservationMonitoringDefinitionViewViewModel extends BaseViewModel {
  id: string;
  _data: ObservationMonitoringDefinition =
    {} as ObservationMonitoringDefinition;

  constructor(
    id: string,
    readonly observationMonitoringDefinitionService: IObservationMonitoringDefinitionService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): ObservationMonitoringDefinition {
    return this._data;
  }
  set data(value: ObservationMonitoringDefinition) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.observationMonitoringDefinitionService.getObservationMonitoringDefinition(
        this.id
      )
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
