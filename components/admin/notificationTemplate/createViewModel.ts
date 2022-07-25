import { NotificationTemplate } from "lib/services/notificationTemplate";
import { SaveResult } from "lib/services/interface";
import { NotificationTemplateViewModel } from "./notificationTemplateViewModel";

export class NotificationTemplateCreateViewModel extends NotificationTemplateViewModel {
  public _save(): Promise<SaveResult<NotificationTemplate>> {
    return this.notificationTemplateService.createNotificationTemplate(
      this.name,
      this.stateTransitionId,
      this.reportTypeId,
      this.titleTemplate,
      this.bodyTemplate
    );
  }
}
