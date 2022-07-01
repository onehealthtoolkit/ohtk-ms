import { ModalDialogViewModel } from "lib/dialogViewModel";
import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";

type Errors = ObservableMap<string, string>;
type DialogMap = ObservableMap<string, ModalDialogViewModel>;

export class BaseViewModel {
  _totalCount = 0;
  _limit = 20;
  _offset = 0;
  _isLoading: boolean = false;

  errors: Errors = observable.map({});
  dialogs: DialogMap = observable.map({});

  constructor() {
    makeObservable(this, {
      _totalCount: observable,
      _limit: observable,
      _offset: observable,
      _isLoading: observable,
      isLoading: computed,
      totalCount: computed,
      limit: computed,
      offset: computed,
      errorMessage: computed,
      setErrorMessage: action,
      error: computed,
      setError: action,
    });
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(value: boolean) {
    this._isLoading = value;
  }

  public get totalCount() {
    return this._totalCount;
  }

  public set totalCount(value) {
    this._totalCount = value;
  }

  public get limit() {
    return this._limit;
  }

  public set limit(value) {
    this._limit = value;
  }

  public get offset() {
    return this._offset;
  }

  public set offset(value) {
    this._offset = value;
  }

  public get errorMessage() {
    return this.error("message");
  }

  public setErrorMessage(value: string | undefined) {
    this.setError("message", value);
  }

  get error() {
    return (name: string) => {
      return this.errors.get(name);
    };
  }

  setError(name: string, value: string | undefined) {
    if (typeof value === "undefined" || value === "" || value === null) {
      this.errors.delete(name);
    } else {
      this.errors.set(name, value);
    }
  }

  /**
   * Manage all modal dialogs references and handle their viewModel states.
   * Each dialog's viewModel is referenced through key in dialog map
   */

  registerDialog(name: string): this {
    this.dialogs.set(name, new ModalDialogViewModel());
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
