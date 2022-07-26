import { FieldErrors } from "react-hook-form";

export type Notification = {
  notificationTemplateId: number;
  notificationTemplateName: string;
  to?: string;
  isSubmitting?: boolean;
  success?: boolean;
  fieldErrors?: FieldErrors;
  submitError?: string;
};

export type AuthorityNotification = {
  id: number;
  to: string;
};
