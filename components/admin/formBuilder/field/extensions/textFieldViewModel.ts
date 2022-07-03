import { Definition } from "components/admin/formBuilder/shared";
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

  parse(definition: Definition) {
    if (definition.min !== undefined) {
      this.minLength = definition.min as string;
    }
    if (definition.max !== undefined) {
      this.maxLength = definition.max as string;
    }
  }
}
