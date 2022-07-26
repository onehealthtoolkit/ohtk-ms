import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  INotificationTemplateService,
  NotificationTemplate,
} from "lib/services/notificationTemplate";

export class NotificationTemplateListViewModel extends BaseViewModel {
  data: NotificationTemplate[] = [];

  nameSearch: string = "";

  constructor(
    readonly notificationTemplateService: INotificationTemplateService,
    nameSearch: string = "",
    offset: number = 0
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    if (nameSearch != this.nameSearch || this.offset != offset) {
      this.nameSearch = nameSearch;
      this.offset = offset;
      this.fetch();
    }
  }

  clearCodeSearch() {
    this.nameSearch = "";
  }

  async fetch(): Promise<void> {
    const result =
      await this.notificationTemplateService.fetchNotificationTemplates(
        this.limit,
        this.offset,
        this.nameSearch
      );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  async delete(id: string): Promise<void> {
    const result =
      await this.notificationTemplateService.deleteNotificationTemplate(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
