import { action, makeObservable, observable, runInAction } from "mobx";

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
    // When used with a form submission,
    // dialog must be delayed after form is re-rendered
    setTimeout(
      (open, data) => {
        runInAction(() => {
          this.isOpen = open;
          this.data = data;
        });
      },
      200,
      true,
      data
    );
  }

  close() {
    this.isOpen = false;
  }
}
