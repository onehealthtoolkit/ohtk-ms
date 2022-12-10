import { SaveResult } from "lib/services/interface";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinition";
import { ObservationMonitoringDefinitionViewModel } from "./monitoringViewModel";

export class ObservationMonitoringDefinitionCreateViewModel extends ObservationMonitoringDefinitionViewModel {
  public _save(): Promise<SaveResult<ObservationMonitoringDefinition>> {
    return this.monitoringDefinitionService.createObservationMonitoringDefinition(
      this.definitionId,
      this.name,
      this.description,
      this.formDefinition,
      this.titleTemplate,
      this.descriptionTemplate
    );
  }
}
