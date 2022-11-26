import { ModalDialogViewModel } from "lib/dialogViewModel";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";
import { makeObservable, observable, runInAction } from "mobx";

export class ReportMapDialogViewModel extends ModalDialogViewModel {
  showZones = true;
  loading = false;
  places: OutbreakPlace[] = [];

  constructor(
    readonly outbreakService: IOutbreakService,
    readonly caseId: string
  ) {
    super();
    makeObservable(this, {
      loading: observable,
      showZones: observable,
      places: observable,
    });
    this.fetch();
  }

  toggleZonesView() {
    this.showZones = !this.showZones;
  }

  async fetch() {
    this.loading = true;
    const result = await this.outbreakService.fecthOutbreakPlaces(this.caseId);

    runInAction(() => {
      this.places = (!result.error && result.items) || [];
      this.loading = false;
    });
  }
}
