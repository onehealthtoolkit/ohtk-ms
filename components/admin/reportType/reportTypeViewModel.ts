import { BaseFormViewModel } from "lib/baseFormViewModel";
import { ReportType, IReportTypeService } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "components/admin/formBuilder";
import { ParseError } from "components/admin/formBuilder/shared";

export abstract class ReportTypeViewModel extends BaseFormViewModel {
  reportTypeService: IReportTypeService;

  _name: string = "";
  _categoryId?: number = undefined;
  _definition: string = "";
  _stateDefinitionId: number = 0;
  _ordering: number = 0;
  _rendererDataTemplate: string = "";

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
      _stateDefinitionId: observable,
      stateDefinitionId: computed,
      _rendererDataTemplate: observable,
      rendererDataTemplate: computed,
      _ordering: observable,
      ordering: computed,
      save: action,
      validate: action,
      _isFormBuilderMode: observable,
      isFormBuilderMode: computed,
      formViewModel: observable,
      parseDefinition: action,
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

  public get categoryId(): number | undefined {
    return this._categoryId;
  }
  public set categoryId(value: number | undefined) {
    console.log("who set this", value);
    this._categoryId = value;
    this.clearError("categoryId");
  }

  public get definition(): string {
    return this._definition;
  }
  public set definition(value: string) {
    this._definition = value;
    this.clearError("definition");
  }

  public parseDefinition(value: string): boolean {
    try {
      this.formViewModel.parse(JSON.parse(value));
      this.definition = this.formViewModel.jsonString;
      return true;
    } catch (e) {
      if (e instanceof ParseError) {
        this.fieldErrors["definition"] = e.message;
      } else {
        this.fieldErrors["definition"] = "Error! Bad definition format";
      }
      return false;
    }
  }

  public get stateDefinitionId(): number {
    return this._stateDefinitionId;
  }
  public set stateDefinitionId(value: number) {
    this._stateDefinitionId = value;
    this.clearError("stateDefinitionId");
  }

  public get rendererDataTemplate(): string {
    return this._rendererDataTemplate;
  }

  public set rendererDataTemplate(value: string) {
    this._rendererDataTemplate = value;
    this.clearError("rendererDataTemplate");
  }

  public get ordering(): number {
    return this._ordering;
  }
  public set ordering(value: number) {
    this._ordering = value;
    this.clearError("ordering");
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

    if (this.definition.length === 0) {
      isValid = false;
      this.fieldErrors["definition"] = "this field is required";
    } else {
      isValid = this.parseDefinition(
        this.isFormBuilderMode ? this.formViewModel.jsonString : this.definition
      );
    }

    if (!this.categoryId) {
      isValid = false;
      this.fieldErrors["categoryId"] = "this field is required";
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
