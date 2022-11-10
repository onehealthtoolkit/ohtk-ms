import { action, computed, makeObservable, observable, toJS } from "mobx";
import Field, { FieldParams } from ".";

export default abstract class PrimitiveField<T> extends Field {
  _value?: T = undefined;

  constructor(id: string, name: string, params: FieldParams) {
    super(id, name, params);
    makeObservable(this, {
      _value: observable,
      value: computed,
      loadJsonValue: action,
      renderedValue: computed,
    });
  }

  get value(): T | undefined {
    return this._value;
  }

  set value(value: T | undefined) {
    this.clearError();
    this._value = value;
  }

  get renderedValue(): string {
    return this._value !== null && typeof this._value !== "undefined"
      ? Array.isArray(this._value)
        ? this._value.join(", ")
        : String(toJS(this._value))
      : "";
  }

  toJsonValue(json: Record<string, any>) {
    json[this.name] = toJS(this.value);
    json[this.name + "__value"] = this.renderedValue;
  }

  loadJsonValue(json: Record<string, any>) {
    this.value = json[this.name];
  }
}
