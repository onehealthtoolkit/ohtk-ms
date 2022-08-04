import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  ReportCategory,
  IReportCategoryService,
} from "lib/services/reportCategory";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class ReportCategoryViewModel extends BaseFormViewModel {
  reportCategoryService: IReportCategoryService;

  _name: string = "";
  _ordering: number = 0;
  _icon: any = null;
  _iconUrl: string = "";
  _clearIcon: boolean = false;
  constructor(reportCategoryService: IReportCategoryService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _ordering: observable,
      ordering: computed,
      _icon: observable,
      icon: computed,
      _iconUrl: observable,
      iconUrl: computed,
      _clearIcon: observable,
      clearIcon: computed,
      save: action,
      validate: action,
    });
    this.reportCategoryService = reportCategoryService;
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

  public get icon(): File {
    return this._icon;
  }
  public set icon(value: File) {
    this._icon = value;
    delete this.fieldErrors["icon"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get iconUrl(): string {
    return this._iconUrl;
  }
  public set iconUrl(value: string) {
    this._iconUrl = value;
    delete this.fieldErrors["icon"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get clearIcon(): boolean {
    return this._clearIcon;
  }
  public set clearIcon(value: boolean) {
    this._clearIcon = value;
    delete this.fieldErrors["clearIcon"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get ordering(): number {
    return this._ordering;
  }
  public set ordering(value: number) {
    this._ordering = value;
    delete this.fieldErrors["ordering"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<ReportCategory>>;

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

    if (!this.ordering) {
      isValid = false;
      this.fieldErrors["ordering"] = "this field is required";
    }

    return isValid;
  }
}
