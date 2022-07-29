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
    });
  }

  get value(): T | undefined {
    return this._value;
  }

  set value(value: T | undefined) {
    this.clearError();
    this._value = value;
  }

  toJsonValue(json: Record<string, any>) {
    json[this.name] = toJS(this.value);
  }

  loadJsonValue(json: Record<string, any>) {
    this.value = json[this.name];
  }
}
