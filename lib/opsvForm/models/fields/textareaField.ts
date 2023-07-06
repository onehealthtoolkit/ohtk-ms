import { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import { valueIsUndefinedAndNotRequiredGuard } from "./helpers";
import PrimitiveField from "./primitiveField";

export type TextFieldParams = {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  minLengthMessage?: string;
  maxLengthMessage?: string;
} & FieldParams;

export default class TextAreaField extends PrimitiveField<string> {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  minLengthMessage?: string;
  maxLengthMessage?: string;

  constructor(id: string, name: string, params: TextFieldParams) {
    super(id, name, params);
    this.minLength = params.minLength;
    this.maxLength = params.maxLength;
    this.rows = params.rows;
    this.minLengthMessage = params.minLengthMessage;
    this.maxLengthMessage = params.maxLengthMessage;
  }

  _validate(): boolean {
    return [
      this._validateRequired,
      valueIsUndefinedAndNotRequiredGuard(this, this._validateMinLength),
      valueIsUndefinedAndNotRequiredGuard(this, this._validateMaxLength),
    ].every(fn => fn());
  }

  // using arrow function to avoid "this" binding issue.
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

  _validateMinLength = () => {
    if (!this.minLength) {
      return true;
    }
    const valid =
      this.value != undefined ? this.value.length >= this.minLength : false;
    if (!valid) {
      this.markError(
        this.minLengthMessage ||
          `The number of letter must be equal or greater than ${this.minLength} characters`
      );
    }
    return valid;
  };

  _validateMaxLength = () => {
    if (!this.maxLength) {
      return true;
    }
    const valid =
      this.value != undefined ? this.value.length <= this.maxLength : false;
    if (!valid) {
      this.markError(
        this.maxLengthMessage ||
          `The number of letter must be equal or greater than ${this.minLength} characters`
      );
    }
    return valid;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    console.debug("evaluate", operator, value);
    if (this._value == undefined) {
      return false;
    } else {
      switch (operator) {
        case "=":
          return this._value == value;
        case "!=":
          return this._value != value;
        default:
          return this._value.indexOf(value) >= 0;
      }
    }
  }
}
