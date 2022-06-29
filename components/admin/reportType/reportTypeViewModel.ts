import { BaseFormViewModel } from "lib/baseFormViewModel";
import { ReportType, IReportTypeService } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "components/admin/formBuilder";

export abstract class ReportTypeViewModel extends BaseFormViewModel {
  reportTypeService: IReportTypeService;

  _name: string = "";
  _categoryId: number = 0;
  _definition: string = "";
  _ordering: number = 0;

  _isFormBuilderMode = false;
  formViewModel = new FormViewModel();

  constructor(reportTypeService: IReportTypeService) {
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
      _isFormBuilderMode: observable,
      isFormBuilderMode: computed,
      formViewModel: observable,
    });
    this.reportTypeService = reportTypeService;
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

  public abstract _save(): Promise<SaveResult<ReportType>>;

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

  public get isFormBuilderMode(): boolean {
    return this._isFormBuilderMode;
  }
  public set isFormBuilderMode(value: boolean) {
    this._isFormBuilderMode = value;
  }
}
