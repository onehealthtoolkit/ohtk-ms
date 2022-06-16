import { action, computed, makeObservable, observable } from "mobx";
import { Authority, IAuthorityService } from "lib/services/authority";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminAuthorityFormViewModel extends BaseFormViewModel {
  _code: string = "";
  _name: string = "";

  constructor(readonly authorityService: IAuthorityService) {
    super();
    makeObservable(this, {
      _code: observable,
      _name: observable,
      code: computed,
      name: computed,
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

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    delete this.fieldErrors["name"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public async save(id?: string): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      let result: SaveResult<Authority>;
      if (!id) {
        result = await this.authorityService.createAuthority(
          this.code,
          this.name
        );
      } else {
        result = await this.authorityService.updateAuthority(
          id,
          this.code,
          this.name
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

    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }
    return isValid;
  }
}
