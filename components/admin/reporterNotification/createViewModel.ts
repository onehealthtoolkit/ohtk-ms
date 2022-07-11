import { ReporterNotification } from "lib/services/reporterNotification";
import { SaveResult } from "lib/services/interface";
import { ReporterNotificationViewModel } from "./reporterNotificationViewModel";

export class ReporterNotificationCreateViewModel extends ReporterNotificationViewModel {
  public _save(): Promise<SaveResult<ReporterNotification>> {
    return this.reporterNotificationService.createReporterNotification(
      this.description,
      this.condition,
      this.template
    );
  }
}
