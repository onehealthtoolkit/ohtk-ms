import { StateStep } from "../stateStep";

export type StateTransition = {
  id: string;
  fromStep: StateStep;
  toStep: StateStep;
  formDefinition: string;
};

export type StateTransitionRef = {
  id: string;
  fromStep?: StateStep | null;
  toStep?: StateStep | null;
  formDefinition?: string;
};
