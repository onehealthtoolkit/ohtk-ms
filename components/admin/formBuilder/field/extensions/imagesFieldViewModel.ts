import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class ImagesFieldViewModel extends AbstractDefinitionViewModel {
  minValue?: string = "";
  maxValue?: string = "";

  constructor() {
    super();
    makeObservable(this, {
      minValue: observable,
      maxValue: observable,
      setMinValue: action,
      setMaxValue: action,
    });
  }

  setMinValue(value: string) {
    this.minValue = value || "";
  }

  setMaxValue(value: string) {
    this.maxValue = value || "";
  }

  parse(definition: Definition) {
    if (definition.min !== undefined) {
      this.minValue = String(definition.min);
    } else {
      this.minValue = "";
    }
    if (definition.max !== undefined) {
      this.maxValue = String(definition.max);
    } else {
      this.maxValue = "";
    }
  }

  toJson() {
    const json: Definition = {};
    const minNum = parseInt(this.minValue || "");
    if (minNum >= 0) {
      json.min = minNum;
    }
    const maxNum = parseInt(this.maxValue || "");
    if (maxNum >= 0) {
      json.max = maxNum;
    }
    return json;
  }
}
