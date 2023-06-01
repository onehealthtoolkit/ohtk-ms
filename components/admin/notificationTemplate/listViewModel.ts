import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  INotificationTemplateService,
  NotificationTemplate,
} from "lib/services/notificationTemplate";
import { SaveResult } from "lib/services/interface";

export class NotificationTemplateListViewModel extends BaseViewModel {
  data: NotificationTemplate[] = [];

  nameSearch: string = "";

  constructor(
    readonly notificationTemplateService: INotificationTemplateService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearCodeSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result =
      await this.notificationTemplateService.fetchNotificationTemplates(
        this.limit,
        this.offset,
        this.nameSearch,
        force
      );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result =
      await this.notificationTemplateService.deleteNotificationTemplate(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async exportNotificationTemplate(id: string) {
    this.isLoading = true;
    const data = await (
      await this.notificationTemplateService.getNotificationTemplate(id)
    ).data;
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data, null, 2))
      );
      element.setAttribute(
        "download",
        `notification-template-${data.name}.json`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importNotificationTemplate(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as NotificationTemplate;

    const notificationTemplate = await (
      await this.notificationTemplateService.getNotificationTemplate(data.id)
    ).data;
    var result;
    if (notificationTemplate) {
      result = await this._updateNotificationTemplate(data);
    } else {
      result = await this._createNotificationTemplate(data);
    }

    this.isSubmitting = false;

    if (!result.success) {
      if (result.message) {
        this.submitError = "Import errors : " + result.message;
      }
      if (result.fields) {
        this.submitError =
          "Import errors : " + Object.values(result.fields).join(",");
      }
    }
    return result.success;
  }

  _createNotificationTemplate(
    data: NotificationTemplate
  ): Promise<SaveResult<NotificationTemplate>> {
    return this.notificationTemplateService.createNotificationTemplate(
      data.name,
      data.type,
      data.reportTypeId,
      data.titleTemplate,
      data.bodyTemplate,
      data.condition,
      data.stateTransitionId || undefined
    );
  }

  _updateNotificationTemplate(
    data: NotificationTemplate
  ): Promise<SaveResult<NotificationTemplate>> {
    return this.notificationTemplateService.updateNotificationTemplate(
      data.id,
      data.name,
      data.type,
      data.reportTypeId,
      data.titleTemplate,
      data.bodyTemplate,
      data.condition,
      data.stateTransitionId || undefined
    );
  }
}
