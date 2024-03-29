import { action, computed, makeObservable, observable, toJS } from "mobx";
import Field, { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import { valueIsUndefinedAndNotRequiredGuard } from "./helpers";

export type ChoiceOption = {
  label: string;
  value: string;
  textInput: boolean;
};

export default class SingleChoicesField extends Field {
  _value?: string = undefined;
  _text?: string = undefined;
  _invalidTextInputMessage?: string = undefined;

  constructor(
    id: string,
    name: string,
    readonly options: ChoiceOption[],
    params: FieldParams
  ) {
    super(id, name, params);
    makeObservable(this, {
      _value: observable,
      _text: observable,
      _invalidTextInputMessage: observable,
      value: computed,
      text: computed,
      clearTextInputError: action,
      loadJsonValue: action,
      selectedOption: computed,
    });
  }

  get text() {
    return this._text;
  }

  set text(value: string | undefined) {
    this.clearTextInputError();
    this._text = value;
  }

  clearTextInputError() {
    this._invalidTextInputMessage = undefined;
  }

  get value(): string | undefined {
    return this._value;
  }

  set value(value: string | undefined) {
    super.clearError();
    this._value = value;
    this.text = undefined;
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

  get selectedOption(): ChoiceOption | undefined {
    return this.options.find(o => o.value === this.value);
  }

  _validateInputText = () => {
    var selected = this.selectedOption;
    if (selected && selected.textInput) {
      const valid = this.text != undefined && this.text.length > 0;
      if (!valid) {
        this.markError(this.requiredMessage || "This field is required");
      }
      return valid;
    }
    return true;
  };

  toJsonValue(json: Record<string, any>): void {
    json[this.name] = this.value;
    json[`${this.name}_text`] = this.text;
    json[this.name + "__value"] = this.renderedValue;
  }

  loadJsonValue(json: Record<string, any>): void {
    this.value = json[this.name];
    this.text = json[`${this.name}_text`];
  }

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

  get renderedValue(): string {
    return this.value !== null && typeof this.value !== "undefined"
      ? toJS(this.value) + (this.text ? " - " + toJS(this.text) : "")
      : "";
  }
}
