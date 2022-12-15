import { SaveResult } from "lib/services/interface";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinition";
import { IObservationMonitoringDefinitionService } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinitionService";
import { ObservationMonitoringDefinitionViewModel } from "./monitoringViewModel";

export class ObservationMonitoringDefinitionUpdateViewModel extends ObservationMonitoringDefinitionViewModel {
  id: string;
  constructor(
    readonly definitionId: string,
    id: string,
    monitoringDefinitionService: IObservationMonitoringDefinitionService
  ) {
    super(definitionId, monitoringDefinitionService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.monitoringDefinitionService.getObservationMonitoringDefinition(
        this.id
      )
    ).data;
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.titleTemplate = data.titleTemplate;
      this.descriptionTemplate = data.descriptionTemplate;
      this.parseDefinition(data.formDefinition);
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ObservationMonitoringDefinition>> {
    return this.monitoringDefinitionService.updateObservationMonitoringDefinition(
      this.id,
      this.definitionId,
      this.name,
      this.description,
      this.formDefinition,
      this.titleTemplate,
      this.descriptionTemplate
    );
  }
}
