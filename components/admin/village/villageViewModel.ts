import { BaseFormViewModel } from "lib/baseFormViewModel";
import { SaveResult } from "lib/services/interface";
import { IVillageService, Village } from "lib/services/village";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class VillageViewModel extends BaseFormViewModel {
  _code: string = "";
  _name: string = "";
  _authorityId: number = 0;
  _latitude: number | null = null;
  _longitude: number | null = null;
  _active: boolean = true;

  constructor(readonly villageService: IVillageService) {
    super();
    makeObservable(this, {
      _code: observable,
      code: computed,
      _name: observable,
      name: computed,
      _authorityId: observable,
      authorityId: computed,
      _latitude: observable,
      latitude: computed,
      _longitude: observable,
      longitude: computed,
      _active: observable,
      active: computed,
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
    this.submitError = "";
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    delete this.fieldErrors["name"];
    this.submitError = "";
  }

  public get authorityId(): number {
    return this._authorityId;
  }
  public set authorityId(value: number) {
    this._authorityId = value;
    delete this.fieldErrors["authorityId"];
    this.submitError = "";
  }

  public get latitude(): number | null {
    return this._latitude;
  }
  public set latitude(value: number | null) {
    this._latitude = value;
    delete this.fieldErrors["latitude"];
    this.submitError = "";
  }

  public get longitude(): number | null {
    return this._longitude;
  }
  public set longitude(value: number | null) {
    this._longitude = value;
    delete this.fieldErrors["longitude"];
    this.submitError = "";
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  public abstract _save(): Promise<SaveResult<Village>>;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      const result = await this._save();
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
    if (this.authorityId === 0) {
      isValid = false;
      this.fieldErrors["authorityId"] = "this field is required";
    }
    return isValid;
  }
}
