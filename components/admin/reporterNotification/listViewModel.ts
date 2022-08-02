import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ReporterNotification } from "lib/services/reporterNotification";
import { IReporterNotificationService } from "lib/services/reporterNotification/reporterNotificationService";

export class AdminReporterNotificationListViewModel extends BaseViewModel {
  data: ReporterNotification[] = [];

  nameSearch: string = "";

  constructor(
    readonly reporterNotificationService: IReporterNotificationService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(): Promise<void> {
    const result =
      await this.reporterNotificationService.fetchReporterNotifications(
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
      await this.reporterNotificationService.deleteReporterNotification(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
