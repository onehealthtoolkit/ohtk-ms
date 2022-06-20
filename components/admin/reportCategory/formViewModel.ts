import { action, computed, makeObservable, observable } from "mobx";
import {
  ReportCategory,
  IReportCategoryService,
} from "lib/services/reportCategory";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminReportCategoryFormViewModel extends BaseFormViewModel {
  _name: string = "";

  constructor(readonly reportCategoryService: IReportCategoryService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      save: action,
      validate: action,
    });
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
      let result: SaveResult<ReportCategory>;
      if (!id) {
        result = await this.reportCategoryService.createReportCategory(
          this.name,
          ""
        );
      } else {
        result = await this.reportCategoryService.updateReportCategory(
          id,
          this.name,
          ""
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
    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }

    return isValid;
  }
}
