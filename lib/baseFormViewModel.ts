import { ModalDialogViewModel } from "lib/dialogViewModel";
import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";

export interface FieldErrors {
  [key: string]: string;
}
type DialogMap = ObservableMap<string, ModalDialogViewModel>;

export class BaseFormViewModel {
  _fieldErrors: FieldErrors = {};
  _submitError: string = "";
  _isSubmitting: boolean = false;
  _isLoading: boolean = false;
  dialogs: DialogMap = observable.map({});

  constructor() {
    makeObservable(this, {
      _fieldErrors: observable,
      _submitError: observable,
      _isSubmitting: observable,
      _isLoading: observable,
      fieldErrors: computed,
      submitError: computed,
      isSubmitting: computed,
      isLoading: computed,
      isValid: computed,
      clearError: action,
    });
  }
  public clearError(name: string) {
    delete this.fieldErrors[name];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get fieldErrors(): FieldErrors {
    return this._fieldErrors;
  }

  public set fieldErrors(value: FieldErrors) {
    this._fieldErrors = value;
  }

  public get submitError(): string {
    return this._submitError;
  }

  public set submitError(value: string) {
    this._submitError = value;
  }

  public get isSubmitting(): boolean {
    return this._isSubmitting;
  }

  public set isSubmitting(value: boolean) {
    this._isSubmitting = value;
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(value: boolean) {
    this._isLoading = value;
  }

  public get isValid(): boolean {
    return Object.keys(this.fieldErrors).length === 0;
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
