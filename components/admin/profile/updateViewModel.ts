import { BaseFormViewModel } from "lib/baseFormViewModel";
import { IProfileService } from "lib/services/profile";
import { action, computed, makeObservable, observable } from "mobx";

export class ProfileUpdateViewModel extends BaseFormViewModel {
  _image?: File = undefined;
  _imageUrl: string = "";
  _password: string = "";
  _confirmPassword: string = "";

  constructor(imageUrl: string, readonly profileService: IProfileService) {
    super();
    makeObservable(this, {
      _image: observable,
      _imageUrl: observable,
      _password: observable,
      _confirmPassword: observable,
      image: computed,
      imageUrl: computed,
      password: computed,
      confirmPassword: computed,
      uploadAvatar: action,
      changePassword: action,
    });
    this.imageUrl = imageUrl;
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

  public async uploadAvatar(): Promise<boolean> {
    if (!this.image) return false;

    this.isSubmitting = true;
    var result = await this.profileService.uploadAvatar(this.image);

    if (result.success) {
      this.imageUrl = result.data?.avatarUrl || "";
      return true;
    } else {
      this.fieldErrors["image"] = "Cannot upload image";
    }
    this.isSubmitting = false;
    return false;
  }

  public async changePassword(): Promise<boolean> {
    if (this.password && this.validate()) {
      this.isSubmitting = true;

      const result = await this.profileService.changePassword(this.password);
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
