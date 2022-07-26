import { BaseViewModel } from "lib/baseViewModel";
import { NotificationTemplate } from "lib/services/notificationTemplate";
import { INotificationTemplateService } from "lib/services/notificationTemplate/notificationTemplateService";
import { computed, makeObservable, observable } from "mobx";

export class NotificationTemplateViewViewModel extends BaseViewModel {
  id: string;
  _data: NotificationTemplate = {} as NotificationTemplate;

  constructor(
    id: string,
    readonly notificationTemplateService: INotificationTemplateService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): NotificationTemplate {
    return this._data;
  }
  set data(value: NotificationTemplate) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.notificationTemplateService.getNotificationTemplate(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
