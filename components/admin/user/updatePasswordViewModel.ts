import { BaseFormViewModel } from "lib/baseFormViewModel";
import { IUserService } from "lib/services/user";
import { action, computed, makeObservable, observable } from "mobx";

export class UserUpdatePasswordViewModel extends BaseFormViewModel {
  _username: string = "";
  _password: string = "";
  _confirmPassword: string = "";

  id: string;
  constructor(id: string, readonly userService: IUserService) {
    super();
    makeObservable(this, {
      _password: observable,
      _confirmPassword: observable,
      password: computed,
      confirmPassword: computed,
      save: action,
    });
    this.id = id;
    if (this.id) this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.userService.getUser(this.id)).data;
    if (data) {
      this.username = data.username;
    }
    this.isLoading = false;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
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

  public async save(): Promise<boolean> {
    if (this.password && this.validate()) {
      this.isSubmitting = true;

      const result = await this.userService.updateUserPassword(
        this.id,
        this.password
      );
      if (!result.success) {
        this.submitError = "Failed to set new password";
      }
      this.isSubmitting = false;
      this.password = "";
      this.confirmPassword = "";

      return result.success;
    }
    return false;
  }

  validate(): boolean {
    let isValid = true;
    if (this.password !== this.confirmPassword) {
      isValid = false;
      this.fieldErrors["password"] = "Password does not match confirm password";
    }
    return isValid;
  }
}
