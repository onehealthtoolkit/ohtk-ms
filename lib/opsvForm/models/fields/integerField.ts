import { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import { stringValueInList } from "../conditionList";
import PrimitiveField from "./primitiveField";

export type IntegerFieldParams = {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
} & FieldParams;

export default class IntegerField extends PrimitiveField<number> {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;

  constructor(id: string, name: string, params: IntegerFieldParams) {
    super(id, name, params);
    this.min = params.min;
    this.max = params.max;
    this.minMessage = params.minMessage;
    this.maxMessage = params.maxMessage;
  }

  _validate(): boolean {
    return [this._validateRequired, this._validateMin, this._validateMax].every(
      fn => fn()
    );
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

  _validateMin = () => {
    if (!this.min) {
      return true;
    }

    const valid = this.value ? this.value >= this.min : true;
    if (!valid) {
      this.markError(
        this.minMessage ||
          `This value must be equal or greater than ${this.min}`
      );
    }
    return valid;
  };

  _validateMax = () => {
    if (!this.max) {
      return true;
    }

    const valid = this.value ? this.value <= this.max : true;
    if (!valid) {
      this.markError(
        this.maxMessage || `This value must be equal or lesser than ${this.max}`
      );
    }
    return valid;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this._value == undefined) {
      return false;
    }
    try {
      const current = this._value.toString();
      switch (operator) {
        case "=":
          return current == value;
        case "!=":
          return current != value;
        case "in":
          return stringValueInList(current, value);
        case "contains":
          return current.indexOf(value) >= 0;
        default:
          return false;
      }
    } catch {
      return false;
    }
  }
}
