import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  InvitationCode,
  IInvitationCodeService,
} from "lib/services/invitationCode";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class InvitationCodeViewModel extends BaseFormViewModel {
  invitationCodeService: IInvitationCodeService;

  _code: string = "";
  _authorityId: number = 0;
  _fromDate: string = "";
  _throughDate: string = "";
  _role: string = "REP";

  constructor(invitationCodeService: IInvitationCodeService) {
    super();
    makeObservable(this, {
      _code: observable,
      code: computed,
      _authorityId: observable,
      authorityId: computed,
      _fromDate: observable,
      fromDate: computed,
      _throughDate: observable,
      throughDate: computed,
      _role: observable,
      role: computed,
      save: action,
      validate: action,
    });
    this.invitationCodeService = invitationCodeService;
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

  public get role() {
    return this._role;
  }

  public set role(value) {
    this._role = value;
    delete this.fieldErrors["role"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<InvitationCode>>;

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
    if (this.code.length === 0) {
      isValid = false;
      this.fieldErrors["code"] = "this field is required";
    }

    if (!this.fromDate) {
      isValid = false;
      this.fieldErrors["fromDate"] = "this field is required";
    }

    if (!this.throughDate) {
      isValid = false;
      this.fieldErrors["throughDate"] = "this field is required";
    }

    return isValid;
  }
}
