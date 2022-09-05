import { FieldErrors } from "lib/baseFormViewModel";

export type Notification = {
  notificationTemplateId: number;
  notificationTemplateName: string;
  to?: string;
  fieldErrors?: FieldErrors;
  submitError?: string;
};

export type AuthorityNotification = {
  id: number;
  to: string;
};
