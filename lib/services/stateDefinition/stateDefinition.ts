export type StateStep = {
  id: string;
  name: string;
};

export type StateDefinition = {
  id: string;
  name: string;
  isDefault: boolean;
  stateSteps?: Array<StateStep>;
};
