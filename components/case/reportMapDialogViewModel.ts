import { ModalDialogViewModel } from "lib/dialogViewModel";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";
import { makeObservable, observable } from "mobx";

export class ReportMapDialogViewModel extends ModalDialogViewModel {
  showZones = true;
  loading = false;

  constructor(
    readonly outbreakService: IOutbreakService,
    readonly caseId: string,
    readonly places: OutbreakPlace[]
  ) {
    super();
    makeObservable(this, {
      loading: observable,
      showZones: observable,
      places: observable,
    });
  }

  toggleZonesView() {
    this.showZones = !this.showZones;
  }
}
