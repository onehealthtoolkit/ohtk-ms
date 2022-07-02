import { action, makeObservable, observable } from "mobx";

export class IntegerFieldViewModel {
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
}
