import { ObservationDefinition } from "lib/services/observationDefinition";
import { IObservationDefinitionService } from "lib/services/observationDefinition/observationDefinitionService";
import { SaveResult } from "lib/services/interface";
import { ObservationDefinitionViewModel } from "./observationDefinitionViewModel";
import { runInAction } from "mobx";
import { IObservationMonitoringDefinitionService } from "lib/services/observationMonitoringDefinition";

export class ObservationDefinitionUpdateViewModel extends ObservationDefinitionViewModel {
  id: string;
  observationMonitoringDefinitionService: IObservationMonitoringDefinitionService;

  constructor(
    id: string,
    observationDefinitionService: IObservationDefinitionService,
    observationMonitoringDefinitionService: IObservationMonitoringDefinitionService
  ) {
    super(observationDefinitionService);
    this.observationMonitoringDefinitionService =
      observationMonitoringDefinitionService;
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.observationDefinitionService.getObservationDefinition(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.titleTemplate = data.titleTemplate;
      this.descriptionTemplate = data.descriptionTemplate;
      this.identityTemplate = data.identityTemplate;
      this.parseDefinition(data.registerFormDefinition);
      if (data.monitoringDefinitions)
        this.monitoringDefinitions = data.monitoringDefinitions;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ObservationDefinition>> {
    return this.observationDefinitionService.updateObservationDefinition(
      this.id,
      this.name,
      this.description,
      this.registerFormDefinition,
      this.titleTemplate,
      this.descriptionTemplate,
      this.identityTemplate
    );
  }

  async deleteMonitoringDefinition(id: string): Promise<void> {
    const result =
      await this.observationMonitoringDefinitionService.deleteObservationMonitoringDefinition(
        id,
        this.id
      );
    if (!result.error) {
      runInAction(
        () =>
          (this.monitoringDefinitions = this.monitoringDefinitions.filter(
            item => item.id != id
          ))
      );
    }
  }
}
