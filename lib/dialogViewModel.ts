import { BaseViewModel } from "lib/baseViewModel";
import { action, makeObservable, observable, ObservableMap } from "mobx";

type DialogMap = ObservableMap<string, ModalDialogStore>;

/**
 * Base viewModel to manage all modal dialogs references and handle their states.
 * Each dialog's controller (store) is referenced through key in dialog map
 */
export class DialogViewModel extends BaseViewModel {
  dialogs: DialogMap = observable.map({});

  constructor() {
    super();
    makeObservable(this, {});
  }

  registerDialog(name: string): this {
    this.dialogs.set(name, new ModalDialogStore());
    return this;
  }

  unregisterDialog(name: string) {
    this.dialogs.delete(name);
  }

  get dialog() {
    return (name: string) => {
      this.closeAllDialogs();
      return this.dialogs.get(name);
    };
  }

  closeAllDialogs() {
    this.dialogs.forEach(store => store.close());
  }
}

/**
 * Control open/close of dialog
 */
export class ModalDialogStore {
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
