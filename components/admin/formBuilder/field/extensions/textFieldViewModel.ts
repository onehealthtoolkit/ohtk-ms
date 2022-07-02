import { action, makeObservable, observable } from "mobx";

export class TextFieldViewModel {
  minLength?: string = "";
  maxLength?: string = "";

  constructor() {
    makeObservable(this, {
      minLength: observable,
      maxLength: observable,
      setMinLength: action,
      setMaxLength: action,
    });
  }

  setMinLength(value: string) {
    this.minLength = value || "";
  }

  setMaxLength(value: string) {
    this.maxLength = value || "";
  }
}
