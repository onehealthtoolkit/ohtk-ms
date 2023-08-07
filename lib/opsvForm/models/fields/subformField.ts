import { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import { valueIsUndefinedAndNotRequiredGuard } from "./helpers";
import PrimitiveField from "./primitiveField";

export type SubformFieldParams = {
  formRef?: string;
  titleTemplate?: string;
  descriptionTemplate?: string;
} & FieldParams;

export default class SubformField extends PrimitiveField<string> {
  formRef?: string = undefined;
  titleTemplate?: string = undefined;
  descriptionTemplate?: string = undefined;

  constructor(id: string, name: string, params: SubformFieldParams) {
    super(id, name, params);
    this.formRef = params.formRef;
    this.titleTemplate = params.titleTemplate;
    this.descriptionTemplate = params.descriptionTemplate;
  }

  clearTextInputError() {
    // this._invalidTextInputMessage = undefined;
  }

  _validate(): boolean {
    return [
      this._validateRequired,
      valueIsUndefinedAndNotRequiredGuard(this, this._validateInputText),
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

  _validateInputText = () => {
    const valid =
      this.titleTemplate != undefined && this.titleTemplate.length > 0;
    if (!valid) {
      this.markError(this.requiredMessage || "This field is required");
    }
    return valid;
    return true;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this._value == undefined) {
      return false;
    }
    switch (operator) {
      case "=":
        return this.value == value;
      case "!=":
        return this.value != value;
      default:
        return this.value!.indexOf(value) >= 0;
    }
  }
}
