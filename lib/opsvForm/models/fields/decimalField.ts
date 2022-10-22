import Decimal from "decimal.js";
import { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import PrimitiveField from "./primitiveField";

export default class DecimalField extends PrimitiveField<Decimal> {
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
    const valid = this.value != undefined;
    if (!valid) {
      this.markError(this.requiredMessage || "This field is required");
    }
    return valid;
  };

  toJsonValue(json: Record<string, any>) {
    json[this.name] = this.value?.toFixed(2);
    json[this.name + "__value"] = this.renderedValue;
  }

  loadJsonValue(json: Record<string, any>) {
    try {
      this.value = new Decimal(json[this.name]);
    } catch (e) {
      // new Decimal with null value
    }
  }

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this._value == undefined) {
      return false;
    } else {
      switch (operator) {
        case "=":
          return this._value.eq(new Decimal(value));
        case "contains":
          return this._value.toString().indexOf(value) >= 0;
        default:
          return false;
      }
    }
  }

  get renderedValue(): string {
    return this.value !== null && typeof this.value !== "undefined"
      ? this.value.toFixed(2)
      : "";
  }
}
