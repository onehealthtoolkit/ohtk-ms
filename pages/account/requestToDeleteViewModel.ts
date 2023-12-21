import { BaseFormViewModel } from "lib/baseFormViewModel";
import { IProfileService } from "lib/services/profile";
import { Me } from "lib/services/profile/me";
import { action, makeObservable } from "mobx";

export class RequestToDeleteViewModel extends BaseFormViewModel {
  user?: Me = undefined;

  constructor(user: Me, readonly profileService: IProfileService) {
    super();
    makeObservable(this, {
      delete: action,
    });
    this.user = user;
  }

  public async delete(): Promise<boolean> {
    this.isSubmitting = true;

    const result = await this.profileService.deleteMyAccount();
    this.isSubmitting = false;

    return result.success;
  }
}
