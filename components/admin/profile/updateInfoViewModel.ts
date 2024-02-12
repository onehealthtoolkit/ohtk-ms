import { BaseFormViewModel } from "lib/baseFormViewModel";
import { SaveResult } from "lib/services/interface";
import { IProfileService } from "lib/services/profile";
import { Me, ProfileUpdate } from "lib/services/profile/me";
import { action, computed, makeObservable, observable } from "mobx";

export class ProfileUpdateInfoViewModel extends BaseFormViewModel {
  _firstName: string = "";
  _lastName: string = "";
  _telephone: string = "";
  _address: string = "";

  constructor(readonly me: Me, readonly profileService: IProfileService) {
    super();
    makeObservable(this, {
      _firstName: observable,
      firstName: computed,
      _lastName: observable,
      lastName: computed,
      _telephone: observable,
      telephone: computed,
      _address: observable,
      address: computed,
      save: action,
      validate: action,
    });

    this.me = me;
    this.initValue();
  }

  async initValue() {
    this.firstName = this.me.firstName;
    this.lastName = this.me.lastName;
    this.telephone = this.me.telephone || "";
    this.address = this.me.address || "";
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

  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
    delete this.fieldErrors["address"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

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

  public _save(): Promise<SaveResult<ProfileUpdate>> {
    return this.profileService.updateProfile(
      this.firstName,
      this.lastName,
      this.telephone,
      this.address
    );
  }

  validate(): boolean {
    let isValid = true;

    if (this.firstName.length === 0) {
      isValid = false;
      this.fieldErrors["firstName"] = "this field is required";
    }

    if (this.lastName.length === 0) {
      isValid = false;
      this.fieldErrors["lastName"] = "this field is required";
    }

    return isValid;
  }
}
