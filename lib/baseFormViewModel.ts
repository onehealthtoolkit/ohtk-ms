import { computed, makeObservable, observable } from "mobx";

interface FieldErrors {
  [key: string]: string;
}

export class BaseFormViewModel {
  _fieldErrors: FieldErrors = {};
  _submitError: string = "";
  _isSubmitting: boolean = false;
  _isLoading: boolean = false;

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
    });
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
}
