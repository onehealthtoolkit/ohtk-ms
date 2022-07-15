import { StateStep } from "../stateStep";
import { StateTransition } from "../stateTransition";

export type StateDefinition = {
  id: string;
  name: string;
  isDefault: boolean;
  stateSteps?: Array<StateStep>;
  stateTransitions?: Array<StateTransition>;
};
