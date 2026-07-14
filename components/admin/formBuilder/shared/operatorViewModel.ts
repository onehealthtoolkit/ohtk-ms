import { AbstractDefinitionViewModel } from "components/admin/formBuilder/shared/definitionViewModel";
import { Definition } from "components/admin/formBuilder/shared/interfaces";
import { ParseError } from "components/admin/formBuilder/shared/parseException";
import { computed, makeObservable, observable } from "mobx";

export const logicalOperatorLabelValues = [
  { label: "and", value: "and" },
  { label: "or", value: "or" },
] as const;

export const logicalOperatorKeys = logicalOperatorLabelValues.map(o => o.value);

export const comparableOperatorLabelValues = [
  { label: "is equal to", value: "=" },
  { label: "is not equal to", value: "!=" },
  { label: "is greater than", value: ">" },
  { label: "is greater or equal to", value: ">=" },
  { label: "is less than", value: "<" },
  { label: "is less or equal to", value: "<=" },
  // Canonical UI value is "in". Wire aliases has_one_of / hasOneOf / isOneOf
  // are accepted when parsing existing definitions (see normalizeComparableOperator).
  { label: "is in", value: "in" },
  { label: "contains", value: "contain" },
  { label: "is between", value: "between" },
] as const;

export const comparableOperatorKeys = comparableOperatorLabelValues.map(
  o => o.value
);

export type TOperatorValue = string | number | Array<string | number>;

export type TLogicalOperatorKey = (typeof logicalOperatorKeys)[number];
export type TComparableOperatorKey = (typeof comparableOperatorKeys)[number];
export type TOperatorKey = TLogicalOperatorKey | TComparableOperatorKey;

/** Mobile/legacy list-membership operator names → form-builder "in". */
const LIST_MEMBERSHIP_ALIASES = new Set([
  "in",
  "has_one_of",
  "hasOneOf",
  "isOneOf",
]);

export function normalizeComparableOperator(
  operator: string
): TComparableOperatorKey | string {
  if (LIST_MEMBERSHIP_ALIASES.has(operator)) {
    return "in";
  }
  return operator;
}

export interface ConditionDefinition {
  /** May include wire aliases such as has_one_of / isOneOf; normalized on parse. */
  operator?: string;
  left?: ConditionDefinition;
  right?: ConditionDefinition;
  name?: string;
  value?: TOperatorValue;
}

/**
 * Condition definition can be any of 2 types of operator:
 * Logical operator and comparable operator
 */
export class OperatorViewModel extends AbstractDefinitionViewModel {
  _operator: TOperatorKey = "=";
  instance?: OperatorViewModel = undefined;

  constructor(operator: TOperatorKey) {
    super();
    makeObservable(this, {
      _operator: observable,
      operator: computed,
      instance: observable,
      isLogical: computed,
    });
    this._operator = operator;
    this.instance = this;
  }

  get operator(): TOperatorKey {
    return this._operator;
  }
  set operator(operator: TOperatorKey) {
    this._operator = operator;
  }

  get isLogical(): boolean {
    return logicalOperatorKeys.includes(this.operator as TLogicalOperatorKey);
  }

  public parse(definition: ConditionDefinition): void {
    try {
      let error;
      if (definition.operator !== undefined) {
        if (
          logicalOperatorKeys.includes(
            definition.operator as TLogicalOperatorKey
          )
        ) {
          if (definition.left && definition.right) {
            if (definition.left.operator && definition.right.operator) {
              const left = new OperatorViewModel(
                definition.left.operator as TOperatorKey
              );
              const right = new OperatorViewModel(
                definition.right.operator as TOperatorKey
              );

              this.instance = new LogicalOperatorViewModel(
                definition.operator as TLogicalOperatorKey,
                left,
                right
              );

              left.parse(definition.left);
              right.parse(definition.right);
            } else {
              error = true;
            }
          } else {
            error = true;
          }
        } else {
          if (definition.name && definition.value) {
            const comparableOp = normalizeComparableOperator(
              definition.operator
            ) as TComparableOperatorKey;
            this.instance = new ComparableOperatorViewModel(
              comparableOp,
              definition.name,
              definition.value
            );
          } else {
            error = true;
          }
        }
      }

      if (error) {
        throw new ParseError(
          "Error building condition with invalid operator expression: " +
            definition.operator
        );
      }
    } catch (e) {
      throw new ParseError("Error while building condition definition");
    }
  }

  public toJson(): Definition {
    const json: Definition = {};
    if (this.isLogical) {
      const logicalViewModel = this.instance as LogicalOperatorViewModel;
      const leftDef = logicalViewModel.left.toJson();
      const rightDef = logicalViewModel.right.toJson();

      if (Object.keys(leftDef).length > 0 && Object.keys(rightDef).length > 0) {
        json.left = leftDef;
        json.right = rightDef;
        json.operator = logicalViewModel.operator;
      }
    } else {
      const comparableViewModel = this.instance as ComparableOperatorViewModel;
      if (comparableViewModel.name && comparableViewModel.value) {
        json.name = comparableViewModel.name;
        json.value = comparableViewModel.value;
        json.operator = comparableViewModel.operator;
      }
    }
    return json;
  }
}

export class LogicalOperatorViewModel extends OperatorViewModel {
  left!: OperatorViewModel;
  right!: OperatorViewModel;

  constructor(
    operator: TLogicalOperatorKey,
    left: OperatorViewModel,
    right: OperatorViewModel
  ) {
    super(operator);
    this.left = left;
    this.right = right;
  }

  // TODO make observable
}

export class ComparableOperatorViewModel extends OperatorViewModel {
  _name: string = "";
  _value: TOperatorValue = "";

  constructor(
    operator: TComparableOperatorKey,
    name: string,
    value: TOperatorValue
  ) {
    super(operator);
    makeObservable(this, {
      _name: observable,
      name: computed,
      _value: observable,
      value: computed,
    });
    this._name = name;
    this._value = value;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get value(): string {
    return this._value.toString();
  }
  set value(value: string) {
    this._value = value;
  }
}
