import { ReporterNotification } from "lib/services/reporterNotification";
import { IReporterNotificationService } from "lib/services/reporterNotification/reporterNotificationService";
import { SaveResult } from "lib/services/interface";
import { ReporterNotificationViewModel } from "./reporterNotificationViewModel";

export class ReporterNotificationUpdateViewModel extends ReporterNotificationViewModel {
  id: string;
  constructor(
    id: string,
    reporterNotificationService: IReporterNotificationService
  ) {
    super(reporterNotificationService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reporterNotificationService.getReporterNotification(this.id)
    ).data;
    if (data) {
      this.description = data.description;
      this.condition = data.condition;
      this.template = data.template;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<ReporterNotification>> {
    return this.reporterNotificationService.updateReporterNotification(
      this.id,
      this.description,
      this.condition,
      this.template
    );
  }
}
