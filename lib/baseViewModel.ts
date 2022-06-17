import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";

type Errors = ObservableMap<string, string>;

export class BaseViewModel {
  _totalCount = 0;
  _limit = 20;
  _offset = 0;

  errors: Errors = observable.map({});

  constructor() {
    makeObservable(this, {
      _totalCount: observable,
      _limit: observable,
      _offset: observable,
      totalCount: computed,
      limit: computed,
      offset: computed,
      errorMessage: computed,
      setErrorMessage: action,
      error: computed,
      setError: action,
    });
  }

  public get totalCount() {
    return this._totalCount;
  }

  public set totalCount(value) {
    this._totalCount = value;
  }

  public get limit() {
    return this._limit;
  }

  public set limit(value) {
    this._limit = value;
  }

  public get offset() {
    return this._offset;
  }

  public set offset(value) {
    this._offset = value;
  }

  public get errorMessage() {
    return this.error("message");
  }

  public setErrorMessage(value: string | undefined) {
    this.setError("message", value);
  }

  get error() {
    return (name: string) => {
      return this.errors.get(name);
    };
  }

  setError(name: string, value: string | undefined) {
    if (typeof value === "undefined" || value === "" || value === null) {
      this.errors.delete(name);
    } else {
      this.errors.set(name, value);
    }
  }
}
