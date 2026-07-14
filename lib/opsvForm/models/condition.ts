import { Values } from "./values";

export type ConditionSource = {};

/**
 * Operators accepted in form JSON / evaluate().
 * List membership: canonical "in", plus mobile/legacy aliases.
 */
export type ConditionOperator =
  | "="
  | "contains"
  | "!="
  | "in"
  | "has_one_of"
  | "hasOneOf"
  | "isOneOf";

/** Operators after alias folding (what field switch cases should handle). */
export type CanonicalConditionOperator = "=" | "contains" | "!=" | "in";

const LIST_MEMBERSHIP_OPERATORS = new Set<string>([
  "in",
  "has_one_of",
  "hasOneOf",
  "isOneOf",
]);

export function isListMembershipOperator(operator: string): boolean {
  return LIST_MEMBERSHIP_OPERATORS.has(operator);
}

/**
 * Map wire-format aliases to the canonical operator used by field evaluate().
 * has_one_of / hasOneOf / isOneOf → "in" (mobile + staging legacy names).
 */
export function normalizeConditionOperator(
  operator: ConditionOperator | string
): CanonicalConditionOperator | string {
  if (isListMembershipOperator(operator)) {
    return "in";
  }
  return operator;
}

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
    try {
      // Delegate an unknown field name will throw exception
      const field = values.getDelegate(this.name).getField();
      const operator = normalizeConditionOperator(
        this.operator
      ) as ConditionOperator;
      return field.evaluate(operator, this.value);
    } catch (e) {
      return true;
    }
  }
}
