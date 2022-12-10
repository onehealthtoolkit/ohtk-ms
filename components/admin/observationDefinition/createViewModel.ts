import { ObservationDefinition } from "lib/services/observationDefinition";
import { SaveResult } from "lib/services/interface";
import { ObservationDefinitionViewModel } from "./observationDefinitionViewModel";

export class ObservationDefinitionCreateViewModel extends ObservationDefinitionViewModel {
  public _save(): Promise<SaveResult<ObservationDefinition>> {
    return this.observationDefinitionService.createObservationDefinition(
      this.name,
      this.description,
      this.registerFormDefinition,
      this.titleTemplate,
      this.descriptionTemplate,
      this.identityTemplate
    );
  }
}
