export type NotificationTemplate = {
  id: string;
  name: string;
  reportTypeId: string;
  reportTypeName: string;
  stateTransitionId: number;
  titleTemplate: string;
  bodyTemplate: string;
  fromStepName?: string;
  toStepName?: string;
};
