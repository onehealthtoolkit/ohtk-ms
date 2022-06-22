import { BaseFormViewModel } from "lib/baseFormViewModel";
import { User, IUserService } from "lib/services/user";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class UserViewModel extends BaseFormViewModel {
  userService: IUserService;

  _authorityId: number = 0;
  _username: string = "";
  _password: string = "";
  _firstName: string = "";
  _lastName: string = "";
  _email: string = "";
  _telephone: string = "";
  constructor(userService: IUserService) {
    super();
    makeObservable(this, {
      _authorityId: observable,
      authorityId: computed,
      _username: observable,
      username: computed,
      _firstName: observable,
      firstName: computed,
      _lastName: observable,
      lastName: computed,
      _email: observable,
      email: computed,
      save: action,
      validate: action,
    });
    this.userService = userService;
  }

  public get authorityId(): number {
    return this._authorityId;
  }
  public set authorityId(value: number) {
    this._authorityId = value;
    delete this.fieldErrors["authorityId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
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

  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
    delete this.fieldErrors["firstName"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
    delete this.fieldErrors["lastName"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
    delete this.fieldErrors["username"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get telephone(): string {
    return this._telephone;
  }
  public set telephone(value: string) {
    this._telephone = value;
    delete this.fieldErrors["telephone"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<User>>;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      var result = await this._save();

      this.isSubmitting = false;

      if (!result.success) {
        if (result.message) {
          this.submitError = result.message;
        }
        if (result.fields) {
          this.fieldErrors = result.fields;
        }
      }
      return result.success;
    }
    this.isSubmitting = false;
    return false;
  }

  validate(): boolean {
    let isValid = true;
    if (this.firstName.length === 0) {
      isValid = false;
      this.fieldErrors["firstName"] = "this field is required";
    }

    return isValid;
  }
}
