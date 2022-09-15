import { setBackendSubDomain } from "lib/client";
import { Store } from "lib/store";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type ServerOption = {
  label: string;
  domain: string;
};
export class SignInViewModel {
  _username: string = "";
  _password: string = "";

  fieldErrors: { [key: string]: string } = {};

  submitError: string = "";

  isSubmitting: boolean = false;

  isLoading: boolean = false;

  serverOptions: ServerOption[] = [];

  isForgotPassword: boolean = false;

  constructor(readonly store: Store, tenantApiEndpoint: string) {
    makeObservable(this, {
      _username: observable,
      _password: observable,
      username: computed,
      password: computed,
      isForgotPassword: observable,
      fieldErrors: observable,
      submitError: observable,
      serverOptions: observable,
      signIn: action,
      forgotPassword: action,
      validate: action,
      isValid: computed,
      fetchTenant: action,
    });

    this.fetchTenant(tenantApiEndpoint);
  }

  async fetchTenant(tenantApiEndpoint: string) {
    this.isLoading = true;
    try {
      const response = await fetch(tenantApiEndpoint);
      if (response.ok) {
        const data = (await response.json()) as { tenants: ServerOption[] };
        runInAction(() => {
          this.serverOptions = data.tenants;
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
    delete this.fieldErrors["username"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
    delete this.fieldErrors["password"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get isValid(): boolean {
    return Object.keys(this.fieldErrors).length === 0;
  }

  public async signIn() {
    this.isSubmitting = true;
    if (this.validate()) {
      const result = await this.store.signIn(this.username, this.password);
      this.isSubmitting = false;
      if (result.success) {
        return true;
      } else {
        runInAction(() => {
          this.submitError = result.message;
        });
        return false;
      }
    }
    this.isSubmitting = false;
    return false;
  }

  public forgotPassword(value: boolean) {
    this.isForgotPassword = value;
  }

  validate(): boolean {
    let isValid = true;
    if (this._username.length === 0) {
      isValid = false;
      this.fieldErrors["username"] = "this field is required";
    }

    if (this._password.length === 0) {
      isValid = false;
      this.fieldErrors["password"] = "this field is required";
    }
    return isValid;
  }

  changeServer(subDomainName: string) {
    setBackendSubDomain(subDomainName);
  }
}
