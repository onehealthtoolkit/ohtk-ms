import { Values } from "./values";

export type ConditionSource = {};

export type ConditionOperator = "=" | "contains";

export interface Condition {
  source?: ConditionSource;

  name: string;

  evaluate: (values: Values) => boolean;
}

export default class SimpleCondition implements Condition {
  constructor(
    readonly name: string,
    readonly operator: ConditionOperator,
    readonly value: string
  ) {}

  evaluate(values: Values) {
    const field = values.getDelegate(this.name).getField();
    return field.evaluate(this.operator, this.value);
  }
}
