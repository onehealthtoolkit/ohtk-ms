import { BaseFormViewModel } from "lib/baseFormViewModel";
import { Authority, IAuthorityService } from "lib/services/authority";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

// mock data for 'authority inherits' autocomplete
export const authorities: Authority[] = [...Array(1000)].map((_, index) => ({
  id: "id." + index,
  code: "code." + index,
  name: "authority " + index,
}));

export abstract class AuthorityViewModel extends BaseFormViewModel {
  authorityService: IAuthorityService;

  _code: string = "";
  _name: string = "";
  _authorityInherits: Authority[] = [];

  constructor(authorityService: IAuthorityService) {
    super();
    makeObservable(this, {
      _code: observable,
      _name: observable,
      _authorityInherits: observable,
      code: computed,
      name: computed,
      authorityInherits: computed,
      save: action,
      validate: action,
      addAuthorityInherits: action,
      removeAuthorityInherits: action,
    });
    this.authorityService = authorityService;
  }

  public get code() {
    return this._code;
  }

  public set code(value: string) {
    this._code = value;
    delete this.fieldErrors["code"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
    delete this.fieldErrors["name"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get authorityInherits(): Authority[] {
    return this._authorityInherits;
  }
  public set authorityInherits(value: Authority[]) {
    this._authorityInherits = value;
    delete this.fieldErrors["authorityInherits"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<Authority>>;

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

    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }
    return isValid;
  }

  async addAuthorityInherits(authorityId: string) {
    const authority = authorities.find(it => it.id === authorityId);
    if (authority) {
      this.authorityInherits.push(authority);
    }
  }

  removeAuthorityInherits(authorityId: string) {
    const idx = this.authorityInherits.findIndex(it => it.id === authorityId);
    if (idx > -1) {
      this.authorityInherits.splice(idx, 1);
    }
  }
}
