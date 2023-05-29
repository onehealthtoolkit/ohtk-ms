import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ReporterNotification } from "lib/services/reporterNotification";
import { IReporterNotificationService } from "lib/services/reporterNotification/reporterNotificationService";
import { SaveResult } from "lib/services/interface";

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

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result =
      await this.reporterNotificationService.fetchReporterNotifications(
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
      await this.reporterNotificationService.deleteReporterNotification(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async exportReporterNotification(id: string) {
    this.isLoading = true;
    const data = await (
      await this.reporterNotificationService.getReporterNotification(id)
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
        `reporter-alert-${data.description}.json`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importReporterNotification(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as ReporterNotification;

    const reporterNotification = await (
      await this.reporterNotificationService.getReporterNotification(data.id)
    ).data;
    var result;
    if (reporterNotification) {
      result = await this._updateReporterNotification(data);
    } else {
      result = await this._createReporterNotification(data);
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

  _createReporterNotification(
    data: ReporterNotification
  ): Promise<SaveResult<ReporterNotification>> {
    return this.reporterNotificationService.createReporterNotification(
      data.reportType?.id!,
      data.description,
      data.condition,
      data.titleTemplate,
      data.template
    );
  }

  _updateReporterNotification(
    data: ReporterNotification
  ): Promise<SaveResult<ReporterNotification>> {
    return this.reporterNotificationService.updateReporterNotification(
      data.id,
      data.reportType?.id!,
      data.description,
      data.condition,
      data.titleTemplate,
      data.template
    );
  }
}
