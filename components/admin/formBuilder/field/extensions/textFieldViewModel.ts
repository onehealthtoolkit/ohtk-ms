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
    if (definition.min !== undefined) {
      this.minLength = String(definition.min);
    } else {
      this.minLength = "";
    }
    if (definition.max !== undefined) {
      this.maxLength = String(definition.max);
    } else {
      this.maxLength = "";
    }
  }

  toJson() {
    const json: Definition = {};
    const minNum = parseInt(this.minLength || "");
    if (minNum >= 0) {
      json.min = minNum;
    }
    const maxNum = parseInt(this.maxLength || "");
    if (maxNum >= 0) {
      json.max = maxNum;
    }
    return json;
  }
}
