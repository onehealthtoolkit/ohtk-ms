import { StateStep } from "../stateStep";

export type StateDefinition = {
  id: string;
  name: string;
  isDefault: boolean;
  stateSteps?: Array<StateStep>;
};
