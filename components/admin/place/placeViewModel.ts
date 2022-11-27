import { BaseFormViewModel } from "lib/baseFormViewModel";
import { Place, IPlaceService } from "lib/services/place";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { IReportTypeService } from "lib/services/reportType";

export abstract class PlaceViewModel extends BaseFormViewModel {
  placeService: IPlaceService;

  _name: string = "";
  _latitude: number = 0;
  _longitude: number = 0;
  _notificationTo: string = "";
  _authorityId: number = 0;

  constructor(
    placeService: IPlaceService,
    readonly reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _latitude: observable,
      latitude: computed,
      _longitude: observable,
      longitude: computed,
      _notificationTo: observable,
      notificationTo: computed,
      _authorityId: observable,
      authorityId: computed,
      save: action,
      validate: action,
    });
    this.placeService = placeService;
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

  public get latitude(): number {
    return this._latitude;
  }
  public set latitude(value: number) {
    this._latitude = value;
    delete this.fieldErrors["latitude"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get longitude(): number {
    return this._longitude;
  }
  public set longitude(value: number) {
    this._longitude = value;
    delete this.fieldErrors["longitude"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get notificationTo(): string {
    return this._notificationTo;
  }
  public set notificationTo(value: string) {
    this._notificationTo = value;
    delete this.fieldErrors["notificationTo"];
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

  public abstract _save(): Promise<SaveResult<Place>>;

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
    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }

    if (this.notificationTo.length === 0) {
      isValid = false;
      this.fieldErrors["notificationTo"] = "this field is required";
    }

    if (this.latitude === 0) {
      isValid = false;
      this.fieldErrors["latitude"] = "this field is required";
    }

    if (this.longitude === 0) {
      isValid = false;
      this.fieldErrors["longitude"] = "this field is required";
    }

    if (this.authorityId === 0) {
      isValid = false;
      this.fieldErrors["authorityId"] = "this field is required";
    }

    return isValid;
  }
}
