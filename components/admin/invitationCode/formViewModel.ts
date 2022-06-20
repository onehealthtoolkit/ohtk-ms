import { action, computed, makeObservable, observable } from "mobx";
import {
  InvitationCode,
  IInvitationCodeService,
} from "lib/services/invitationCode";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminInvitationCodeFormViewModel extends BaseFormViewModel {
  _code: string = "";

  constructor(readonly invitationCodeService: IInvitationCodeService) {
    super();
    makeObservable(this, {
      _code: observable,
      code: computed,
      save: action,
      validate: action,
    });
  }

  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
    delete this.fieldErrors["code"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public async save(id?: string): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      let result: SaveResult<InvitationCode>;
      if (!id) {
        result = await this.invitationCodeService.createInvitationCode(
          this.code
        );
      } else {
        result = await this.invitationCodeService.updateInvitationCode(
          id,
          this.code
        );
      }
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
    if (this.code.length === 0) {
      isValid = false;
      this.fieldErrors["code"] = "this field is required";
    }

    if (this.code.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }
    return isValid;
  }
}
