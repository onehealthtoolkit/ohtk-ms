import { action, computed, makeObservable, observable } from "mobx";
import { Condition, ConditionOperator } from "../condition";
import Form from "../form";
import { ValueDelegate, Values } from "../values";

export type FieldParams = {
  label?: string;
  description?: string;
  suffixLabel?: string;
  required?: boolean;
  requiredMessage?: string;
  condition?: Condition;
  tags?: string;
};

export default abstract class Field {
  form?: Form;

  label?: string;
  description?: string;
  suffixLabel?: string;
  required?: boolean;
  requiredMessage?: string;
  condition?: Condition;
  tags?: string;

  invalidMessage?: string = undefined;

  constructor(
    readonly id: string,
    readonly name: string,
    {
      label,
      description,
      suffixLabel,
      required,
      requiredMessage,
      condition,
      tags,
    }: FieldParams
  ) {
    this.label = label;
    this.description = description;
    this.suffixLabel = suffixLabel;
    this.required = required;
    this.requiredMessage = requiredMessage;
    this.condition = condition;
    this.tags = tags;

    makeObservable(this, {
      invalidMessage: observable,
      markError: action,
      clearError: action,
      isValid: computed,
      display: computed,
    });
  }
  abstract get value(): any;

  abstract get renderedValue(): any;

  get display() {
    if (this.condition && this.form) {
      const values = this.form.values;
      return this.condition.evaluate(values);
    } else {
      return true;
    }
  }

  public registerValues(values: Values, form?: Form) {
    this.form = form;
    values.setValueDelegate(this.name, new ValueDelegate(() => this));
  }

  get isValid() {
    return this.invalidMessage == undefined;
  }

  markError(message: string) {
    this.invalidMessage = message;
  }

  clearError() {
    this.invalidMessage = undefined;
  }

  abstract evaluate(operator: ConditionOperator, value: string): boolean;

  validate(): boolean {
    if (!this.display) {
      return true;
    }
    return this._validate();
  }

  abstract _validate(): boolean;

  abstract toJsonValue(json: Record<string, any>): void;

  abstract loadJsonValue(json: Record<string, any>): void;
}
