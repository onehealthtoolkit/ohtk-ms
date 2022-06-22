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
  constructor(reportCategoryService: IReportCategoryService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _ordering: observable,
      ordering: computed,
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

    return isValid;
  }
}
