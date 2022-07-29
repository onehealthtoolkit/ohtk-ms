export type NotificationTemplate = {
  id: string;
  name: string;
  type: string;
  typeName?: string;
  condition?: string;
  reportTypeId: string;
  reportTypeName: string;
  titleTemplate: string;
  bodyTemplate: string;
  stateTransitionId?: number;
  fromStepName?: string;
  toStepName?: string;
};
