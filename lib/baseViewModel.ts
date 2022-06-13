import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";

type Errors = ObservableMap<string, string>;

export class BaseViewModel {
  errors: Errors = observable.map({});

  constructor() {
    makeObservable(this, {
      errorMessage: computed,
      setErrorMessage: action,
      error: computed,
      setError: action,
    });
  }

  get errorMessage() {
    return this.error("message");
  }

  setErrorMessage(value: string | undefined) {
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
