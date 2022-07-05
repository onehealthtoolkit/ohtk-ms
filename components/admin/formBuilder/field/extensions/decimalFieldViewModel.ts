import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class DecimalFieldViewModel extends AbstractDefinitionViewModel {
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
    const minNum = parseFloat(this.minValue || "");
    if (minNum >= 0) {
      json.min = Math.round(minNum * 100) / 100;
    }
    const maxNum = parseFloat(this.maxValue || "");
    if (maxNum >= 0) {
      json.max = Math.round(maxNum * 100) / 100;
    }
    return json;
  }
}
