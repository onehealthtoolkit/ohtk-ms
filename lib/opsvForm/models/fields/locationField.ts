import { toJS } from "mobx";
import { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import PrimitiveField from "./primitiveField";

export default class LocationField extends PrimitiveField<string> {
  constructor(id: string, name: string, params: FieldParams) {
    super(id, name, params);
  }

  _validate(): boolean {
    return [this._validateRequired].every(fn => fn());
  }

  _validateRequired = () => {
    if (!this.required) {
      return true;
    }
    const valid = this.value != undefined && this.value.length > 0;
    if (!valid) {
      this.markError(this.requiredMessage || "This field is required");
    }
    return valid;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this._value == undefined) {
      return false;
    } else {
      switch (operator) {
        case "=":
          return this._value == value;
        default:
          return this._value.indexOf(value) >= 0;
      }
    }
  }

  get renderedValue(): string {
    return this.value !== null && typeof this.value !== "undefined"
      ? String(toJS(this.value)) + " (Lng,Lat)"
      : "";
  }
}
