import { BaseViewModel } from "lib/baseViewModel";
import { ReporterNotification } from "lib/services/reporterNotification";
import { IReporterNotificationService } from "lib/services/reporterNotification/reporterNotificationService";
import { computed, makeObservable, observable } from "mobx";

export class ReporterNotificationViewViewModel extends BaseViewModel {
  id: string;
  _data: ReporterNotification = {} as ReporterNotification;

  constructor(
    id: string,
    readonly reporterNotificationService: IReporterNotificationService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): ReporterNotification {
    return this._data;
  }
  set data(value: ReporterNotification) {
    this._data = value;
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
