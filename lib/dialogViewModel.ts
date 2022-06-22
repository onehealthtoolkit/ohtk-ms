import { action, makeObservable, observable } from "mobx";

/**
 * Control open/close of modal dialog
 */
export class ModalDialogViewModel {
  isOpen = false;
  data: any;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      open: action,
      close: action,
    });
  }

  open(data: any | undefined) {
    this.isOpen = true;
    this.data = data;
  }

  close() {
    this.isOpen = false;
  }
}
