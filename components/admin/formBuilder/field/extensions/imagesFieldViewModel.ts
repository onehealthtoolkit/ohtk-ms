import { Definition } from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class ImagesFieldViewModel {
  minValue?: string = "";
  maxValue?: string = "";

  constructor() {
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
      this.minValue = definition.min as string;
    }
    if (definition.max !== undefined) {
      this.maxValue = definition.max as string;
    }
  }
}
