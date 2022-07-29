import { computed, makeObservable } from "mobx";
import { Condition } from "./condition";
import Field from "./fields";
import Form from "./form";
import { Values } from "./values";

type QuestionConstructorParams = {
  name?: string;
  description?: string;
  condition?: Condition;
};

export default class Question {
  form?: Form;
  name?: string;
  description?: string;
  condition?: Condition;
  fields: Field[] = [];
  values?: Values;

  constructor(
    readonly label: string,
    { name, description, condition }: QuestionConstructorParams
  ) {
    this.name = name;
    this.description = description;
    this.condition = condition;
    makeObservable(this, {
      display: computed,
    });
  }

  public registerValues(parentValues: Values, form?: Form) {
    this.form = form;
    if (this.name) {
      this.values = new Values(parentValues);
      parentValues.setValues(this.name, this.values);
    }
    const currentValues = this.name ? this.values! : parentValues;

    this.fields.forEach(field => field.registerValues(currentValues, form));
  }

  get display() {
    if (this.condition && this.form) {
      const rootValues = this.form.values;
      return this.condition.evaluate(rootValues);
    } else {
      return true;
    }
  }
}
