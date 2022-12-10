import { ObservationMonitoringDefinition } from "../observationMonitoringDefinition/observationMonitoringDefinition";

export type ObservationDefinition = {
  id: string;
  name: string;
  description: string;
  registerFormDefinition: string;
  titleTemplate: string;
  descriptionTemplate: string;
  identityTemplate: string;
  monitoringDefinitions?: Array<ObservationMonitoringDefinition>;
};
