import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";

export type StateStep = {
  id: string;
  name: string;
  isStartState: boolean;
  isStopState: boolean;
};

export type DeepStateStep = StateStep & {
  toTransitions?: Array<StateTransitionRef | null> | null;
};
