import { BaseViewModel } from "lib/baseViewModel";
import { ReporterNotification } from "lib/services/reporterNotification";
import { IReporterNotificationService } from "lib/services/reporterNotification/reporterNotificationService";
import { makeObservable, observable } from "mobx";

export class ReporterNotificationViewViewModel extends BaseViewModel {
  id: string;
  data: ReporterNotification = {} as ReporterNotification;

  constructor(
    id: string,
    readonly reporterNotificationService: IReporterNotificationService
  ) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reporterNotificationService.getReporterNotification(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
