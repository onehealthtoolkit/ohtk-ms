import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class TextAreaFieldViewModel extends AbstractDefinitionViewModel {
  minLength?: string = "";
  maxLength?: string = "";
  rows?: string = "2";

  constructor() {
    super();
    makeObservable(this, {
      minLength: observable,
      maxLength: observable,
      rows: observable,
      setMinLength: action,
      setMaxLength: action,
      setRows: action,
    });
  }

  setMinLength(value: string) {
    this.minLength = value || "";
  }

  setMaxLength(value: string) {
    this.maxLength = value || "";
  }

  setRows(value: string) {
    this.rows = value || "2";
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

    if (definition.rows !== undefined) {
      this.rows = String(definition.rows);
    } else {
      this.rows = "2";
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

    json.rows = parseInt(this.rows || "2");
    return json;
  }
}
