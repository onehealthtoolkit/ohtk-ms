import { BaseFormViewModel } from "lib/baseFormViewModel";
import { IProfileService } from "lib/services/profile";
import { makeObservable, observable } from "mobx";

export class ProfileUpdateViewModel extends BaseFormViewModel {
  _image?: File = undefined;
  _imageUrl: string = "";
  _password: string = "";
  _confirmPassword: string = "";

  constructor(readonly profileService: IProfileService) {
    super();
    makeObservable(this, {
      _image: observable,
      _imageUrl: observable,
      _password: observable,
      _confirmPassword: observable,
    });
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
    delete this.fieldErrors["confirmPassword"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get image(): File | undefined {
    return this._image;
  }
  public set image(value: File | undefined) {
    this._image = value;
    delete this.fieldErrors["image"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }
  public set imageUrl(value: string) {
    this._imageUrl = value;
    delete this.fieldErrors["image"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      var result = await this.profileService.updateProfile(
        this.image,
        this.password,
        this.confirmPassword
      );

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
    if (this.password !== this.confirmPassword) {
      isValid = false;
      this.fieldErrors["password"] = "Password does not match confirm password";
    }
    return isValid;
  }
}
