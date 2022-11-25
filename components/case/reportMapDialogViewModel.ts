import { ModalDialogViewModel } from "lib/dialogViewModel";
import { makeObservable, observable } from "mobx";

export class ReportMapDialogViewModel extends ModalDialogViewModel {
  showZones = true;

  constructor() {
    super();
    makeObservable(this, {
      showZones: observable,
    });
  }

  toggleZonesView() {
    this.showZones = !this.showZones;
  }
}
