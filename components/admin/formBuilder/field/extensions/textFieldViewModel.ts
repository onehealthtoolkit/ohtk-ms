import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class TextFieldViewModel extends AbstractDefinitionViewModel {
  minLength?: string = "";
  maxLength?: string = "";

  constructor() {
    super();
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
    if (definition.minLength !== undefined) {
      this.minLength = String(definition.minLength);
    } else {
      this.minLength = "";
    }
    if (definition.maxLength !== undefined) {
      this.maxLength = String(definition.maxLength);
    } else {
      this.maxLength = "";
    }
  }

  toJson() {
    const json: Definition = {};
    const minNum = parseInt(this.minLength || "");
    if (minNum >= 0) {
      json.minLength = minNum;
    }
    const maxNum = parseInt(this.maxLength || "");
    if (maxNum >= 0) {
      json.maxLength = maxNum;
    }
    return json;
  }
}
