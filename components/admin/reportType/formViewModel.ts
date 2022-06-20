import { action, computed, makeObservable, observable } from "mobx";
import { ReportType, IReportTypeService } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminReportTypeFormViewModel extends BaseFormViewModel {
  _name: string = "";

  constructor(readonly reportTypeService: IReportTypeService) {
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
      let result: SaveResult<ReportType>;
      if (!id) {
        result = await this.reportTypeService.createReportType(
          this.name,
          "",
          0
        );
      } else {
        result = await this.reportTypeService.updateReportType(
          id,
          this.name,
          "",
          0
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

    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }
    return isValid;
  }
}
