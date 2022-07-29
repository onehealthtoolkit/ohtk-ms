import { Either, right, left, match } from "fp-ts/lib/Either";
import Field from "./fields";

export class Values {
  values: Record<string, Either<Values, ValueDelegate>> = {};

  constructor(readonly parent?: Values) {}

  getDelegate(name: string): ValueDelegate {
    var names = name.split(".");
    var fst = this.values[names[0]];
    var rest = names.slice(1).join(".");
    return match<Values, ValueDelegate, ValueDelegate>(
      l => l.getDelegate(rest),
      r => r
    )(fst);
  }

  setValues(name: string, values: Values) {
    this.values[name] = left(values);
  }

  setValueDelegate(name: string, delegate: ValueDelegate) {
    this.values[name] = right(delegate);
  }
}

type GetFieldFn = () => Field;

export class ValueDelegate {
  constructor(readonly getField: GetFieldFn) {}
}
