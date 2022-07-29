import { action, makeObservable, observable } from "mobx";
import Field, { FieldParams } from ".";
import { ConditionOperator } from "../condition";
import { ChoiceOption } from "./singleChoicesField";
import * as _ from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";

export default class MultipleChoicesField extends Field {
  _selected: Record<string, boolean> = {};
  _text: Record<string, string | undefined> = {};
  _invalidTextMessage: Record<string, string | undefined> = {};

  constructor(
    id: string,
    name: string,
    readonly options: ChoiceOption[],
    params: FieldParams
  ) {
    super(id, name, params);
    options.forEach(option => {
      this._selected[option.value] = false;
      if (option.textInput) {
        this._text[option.value] = undefined;
        this._invalidTextMessage[option.value] = undefined;
      }
    });
    makeObservable(this, {
      _selected: observable,
      _text: observable,
      _invalidTextMessage: observable,
      loadJsonValue: action,
      setSelectedFor: action,
      setTextValuefor: action,
      _validate: action,
      invalidTextMessageFor: action,
    });
  }

  setSelectedFor(key: string, value: boolean) {
    this._selected[key] = value;
    if (value === false && this._text[key] != undefined) {
      this._text[key] = undefined;
      this._invalidTextMessage[key] = undefined;
    }
    this.clearError();
  }

  valueFor(key: string): boolean {
    return this._selected[key] || false;
  }

  textValueFor(key: string): string | undefined {
    return this._text[key];
  }

  setTextValuefor(key: string, value: string) {
    this._text[key] = value;
    this._invalidTextMessage[key] = undefined;
  }

  invalidTextMessageFor(key: string) {
    return this._invalidTextMessage[key];
  }

  _validate(): boolean {
    return [this._validateRequired, this._validateInputText].every(fn => fn());
  }

  _validateRequired = () => {
    if (this.required) {
      var fn = _.reduce<ChoiceOption, boolean>(false, (valid, option) => {
        return valid || this._selected[option.value];
      });
      var isValid = fn(this.options);
      if (!isValid) {
        this.markError(this.requiredMessage || "This field is required");
      }
      return isValid;
    }
    return true;
  };

  _validateInputText = () => {
    var filterSelectedOption = _.filter<ChoiceOption>(
      option => this._selected[option.value]
    );
    var filterTextInputOptionIsTrue = _.filter<ChoiceOption>(
      option => option.textInput
    );
    var filterTextIsEmpty = _.filter<ChoiceOption>(
      option =>
        this._text[option.value] === undefined ||
        this._text[option.value]?.length === 0
    );

    var invalidOptions = pipe(
      this.options,
      filterSelectedOption,
      filterTextInputOptionIsTrue,
      filterTextIsEmpty
    );

    invalidOptions.forEach(
      option =>
        (this._invalidTextMessage[option.value] =
          this.requiredMessage || "This field is required")
    );

    return invalidOptions.length === 0;
  };

  get value(): string {
    var fn = _.reduce<ChoiceOption, Array<string>>([], (acc, option) => {
      if (this._selected[option.value]) {
        return [option.value, ...acc];
      } else {
        return [...acc];
      }
    });
    return fn(this.options).join(",");
  }

  toJsonValue(json: Record<string, any>): void {
    var values: Record<string, any> = {};
    for (const [key, value] of Object.entries(this._selected)) {
      values[key] = value;
    }
    for (const [key, value] of Object.entries(this._text)) {
      values[`${key}_text`] = value;
    }
    json[this.name] = values;
  }

  loadJsonValue(json: Record<string, any>): void {
    var values = json[this.name];
    if (values) {
      for (const key of Object.keys(this._selected)) {
        this._selected[key] = values[key];
        var textKey = `${key}_text`;
        if (values[textKey]) {
          this._text[key] = values[textKey];
        }
      }
    }
  }

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this.value == undefined) {
      return false;
    }
    switch (operator) {
      case "=":
        return this.value == value;
      case "contains":
        return this.value.indexOf(value) >= 0;
      default:
        return false;
    }
  }
}
