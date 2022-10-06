import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  ReporterNotification,
  IReporterNotificationService,
} from "lib/services/reporterNotification";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "components/admin/formBuilder";
import { IReportTypeService } from "lib/services/reportType";
import { ParseError } from "../formBuilder/shared";

export abstract class ReporterNotificationViewModel extends BaseFormViewModel {
  reporterNotificationService: IReporterNotificationService;

  _reportTypeId: string = "";
  _description: string = "";
  _condition: string = "";
  _template: string = "";

  _isFormBuilderMode = false;
  formViewModel = new FormViewModel();

  constructor(
    reporterNotificationService: IReporterNotificationService,
    readonly reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _reportTypeId: observable,
      reportTypeId: computed,
      _description: observable,
      description: computed,
      _condition: observable,
      condition: computed,
      _template: observable,
      template: computed,
      save: action,
      validate: action,
      formViewModel: observable,
    });
    this.reporterNotificationService = reporterNotificationService;
  }

  public get reportTypeId(): string {
    return this._reportTypeId;
  }
  public set reportTypeId(value: string) {
    this._reportTypeId = value;
    delete this.fieldErrors["reportTypeId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
    if (value) this.parseReportTypeDefinition();
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
    delete this.fieldErrors["description"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get condition(): string {
    return this._condition;
  }
  public set condition(value: string) {
    this._condition = value;
    delete this.fieldErrors["condition"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get template(): string {
    return this._template;
  }
  public set template(value: string) {
    this._template = value;
    delete this.fieldErrors["template"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  async parseReportTypeDefinition() {
    const data = await (
      await this.reportTypeService.getReportType(this.reportTypeId)
    ).data;
    if (data) {
      this.parseDefinition(data.definition);
    }
  }

  public parseDefinition(value: string): boolean {
    try {
      this.formViewModel.parse(JSON.parse(value));
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

  public abstract _save(): Promise<SaveResult<ReporterNotification>>;

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
    if (this.description.length === 0) {
      isValid = false;
      this.fieldErrors["description"] = "this field is required";
    }
    if (this.condition.length === 0) {
      isValid = false;
      this.fieldErrors["condition"] = "this field is required";
    }
    if (this.template.length === 0) {
      isValid = false;
      this.fieldErrors["template"] = "this field is required";
    }
    if (this.reportTypeId.length === 0) {
      isValid = false;
      this.fieldErrors["reportTypeId"] = "this field is required";
    }
    return isValid;
  }
}
