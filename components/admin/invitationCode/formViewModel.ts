import { action, computed, makeObservable, observable } from "mobx";
import {
  InvitationCode,
  IInvitationCodeService,
} from "lib/services/invitationCode";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminInvitationCodeFormViewModel extends BaseFormViewModel {
  _code: string = "";
  _authorityId: number = 0;
  _fromDate: string = "";
  _throughDate: string = "";

  constructor(
    readonly invitationCodeService: IInvitationCodeService,
    authorityId?: number
  ) {
    super();
    if (authorityId) this.authorityId = authorityId;
    makeObservable(this, {
      _code: observable,
      code: computed,
      _authorityId: observable,
      authorityId: computed,
      _fromDate: observable,
      fromDate: computed,
      _throughDate: observable,
      throughDate: computed,
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

  public get fromDate(): string {
    return this._fromDate;
  }
  public set fromDate(value: string) {
    this._fromDate = value;
    delete this.fieldErrors["fromDate"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get throughDate(): string {
    return this._throughDate;
  }
  public set throughDate(value: string) {
    this._throughDate = value;
    delete this.fieldErrors["throughDate"];
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
          this.code,
          this.authorityId,
          new Date(this.fromDate).toISOString(),
          new Date(this.throughDate).toISOString()
        );
      } else {
        result = await this.invitationCodeService.updateInvitationCode(
          id,
          this.code,
          new Date(this.fromDate).toISOString(),
          new Date(this.throughDate).toISOString()
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

    return isValid;
  }
}
