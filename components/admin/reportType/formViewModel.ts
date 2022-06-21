import { action, computed, makeObservable, observable } from "mobx";
import { ReportType, IReportTypeService } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { BaseFormViewModel } from "lib/baseFormViewModel";

export class AdminReportTypeFormViewModel extends BaseFormViewModel {
  _name: string = "";
  _categoryId: number = 0;
  _definition: string = "";
  _ordering: number = 0;

  constructor(readonly reportTypeService: IReportTypeService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _categoryId: observable,
      categoryId: computed,
      _definition: observable,
      definition: computed,
      _ordering: observable,
      ordering: computed,
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

  public get categoryId(): number {
    return this._categoryId;
  }
  public set categoryId(value: number) {
    this._categoryId = value;
    delete this.fieldErrors["categoryId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get definition(): string {
    return this._definition;
  }
  public set definition(value: string) {
    this._definition = value;
    delete this.fieldErrors["definition"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get ordering(): number {
    return this._ordering;
  }
  public set ordering(value: number) {
    this._ordering = value;
    delete this.fieldErrors["_rdering"];
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
          this.categoryId,
          this.definition,
          this.ordering
        );
      } else {
        result = await this.reportTypeService.updateReportType(
          id,
          this.name,
          this.categoryId,
          this.definition,
          this.ordering
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
