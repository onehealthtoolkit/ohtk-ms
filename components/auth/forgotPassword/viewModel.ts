import { setBackendSubDomain } from "lib/client";
import { IForgotPasswordService } from "lib/services/forgotPassword/forgotPasswordService";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ServerOption } from "../signin/viewModel";

export class ForgotPasswordViewModel {
  _email: string = "";

  _password: string = "";
  _confirmPassword: string = "";

  fieldErrors: { [key: string]: string } = {};

  submitError: string = "";

  isSubmitting: boolean = false;

  isLoading: boolean = false;

  resetPasswordRequestSuccess: boolean = false;

  serverOptions: ServerOption[] = [];

  constructor(
    readonly forgotPasswordService: IForgotPasswordService,
    tenantApiEndpoint: string
  ) {
    makeObservable(this, {
      _email: observable,
      email: computed,
      _password: observable,
      _confirmPassword: observable,
      password: computed,
      confirmPassword: computed,

      fieldErrors: observable,
      submitError: observable,
      resetPasswordRequestSuccess: observable,
      resetPasswordRequest: action,
      isValid: computed,
      fetchTenant: action,
      serverOptions: observable,
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

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
    this.resetPasswordRequestSuccess = false;
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

  public get confirmPassword(): string {
    return this._confirmPassword;
  }
  public set confirmPassword(value: string) {
    this._confirmPassword = value;
    delete this.fieldErrors["password"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public async resetPasswordRequest() {
    this.isSubmitting = true;
    if (this.validate()) {
      const result = await this.forgotPasswordService.resetPasswordRequest(
        this.email
      );
      this.isSubmitting = false;
      if (result.success) {
        runInAction(() => {
          this.submitError = "";
          this.resetPasswordRequestSuccess = true;
        });
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

  public async resetPassword(token: string) {
    this.isSubmitting = true;
    if (this.validateResetPassword()) {
      const result = await this.forgotPasswordService.resetPassword(
        token,
        this.password
      );
      this.isSubmitting = false;
      if (result.success) {
        runInAction(() => {
          this.resetPasswordRequestSuccess = true;
        });
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

  public get isValid(): boolean {
    return Object.keys(this.fieldErrors).length === 0;
  }

  validate(): boolean {
    let isValid = true;
    if (this._email.length === 0) {
      isValid = false;
      this.fieldErrors["email"] = "this field is required";
    }

    return isValid;
  }

  validateResetPassword(): boolean {
    let isValid = true;
    if (this._password.length === 0) {
      isValid = false;
      this.fieldErrors["password"] = "this field is required";
    }

    if (this._confirmPassword.length === 0) {
      isValid = false;
      this.fieldErrors["confirmPassword"] = "this field is required";
    }

    if (this.password !== this.confirmPassword) {
      isValid = false;
      this.fieldErrors["password"] = "Password does not match confirm password";
    }

    return isValid;
  }

  changeServer(subDomainName: string) {
    setBackendSubDomain(subDomainName);
  }
}
