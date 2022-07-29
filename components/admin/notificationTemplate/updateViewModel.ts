import { NotificationTemplate } from "lib/services/notificationTemplate";
import { INotificationTemplateService } from "lib/services/notificationTemplate/notificationTemplateService";
import { SaveResult } from "lib/services/interface";
import { NotificationTemplateViewModel } from "./notificationTemplateViewModel";

export class NotificationTemplateUpdateViewModel extends NotificationTemplateViewModel {
  id: string;
  constructor(
    id: string,
    notificationTemplateService: INotificationTemplateService
  ) {
    super(notificationTemplateService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.notificationTemplateService.getNotificationTemplate(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.condition = data.condition || "";
      this.stateTransitionId = data.stateTransitionId || 0;
      this.reportTypeId = data.reportTypeId;
      this.titleTemplate = data.titleTemplate;
      this.bodyTemplate = data.bodyTemplate;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<NotificationTemplate>> {
    return this.notificationTemplateService.updateNotificationTemplate(
      this.id,
      this.name,
      this.type,
      this.reportTypeId,
      this.titleTemplate,
      this.bodyTemplate,
      this.condition,
      this.stateTransitionId || undefined
    );
  }
}
