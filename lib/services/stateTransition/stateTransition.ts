import { StateStep } from "../stateStep";

export type StateTransition = {
  id: string;
  fromStep: StateStep;
  toStep: StateStep;
  formDefinition: string;
};
