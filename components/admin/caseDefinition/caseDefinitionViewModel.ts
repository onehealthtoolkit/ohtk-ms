import { FormVariableItem, FormViewModel } from "components/admin/formBuilder";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  CaseDefinition,
  ICaseDefinitionService,
} from "lib/services/caseDefinition";
import { SaveResult } from "lib/services/interface";
import { IReportTypeService } from "lib/services/reportType";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class CaseDefinitionViewModel extends BaseFormViewModel {
  caseDefinitionService: ICaseDefinitionService;
  reportTypeService: IReportTypeService;

  _reportTypeId: string = "";
  _description: string = "";
  _condition: string = "";
  _conditionVariables: FormVariableItem[] = [];

  constructor(
    caseDefinitionService: ICaseDefinitionService,
    reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _reportTypeId: observable,
      reportTypeId: computed,
      _description: observable,
      description: computed,
      _condition: observable,
      condition: computed,
      _conditionVariables: observable,
      conditionVariables: computed,
      save: action,
      validate: action,
    });
    this.caseDefinitionService = caseDefinitionService;
    this.reportTypeService = reportTypeService;
  }

  public get reportTypeId(): string {
    return this._reportTypeId;
  }
  public set reportTypeId(value: string) {
    this._reportTypeId = value;

    this.reportTypeService.getReportType(value).then(result => {
      if (result.data) {
        try {
          const formBuilder = new FormViewModel();
          formBuilder.parse(JSON.parse(result.data.definition));
          this.conditionVariables = formBuilder.conditionVariableList;
        } catch (e) {
          console.log("Error! Bad definition format");
        }
      }
    });

    delete this.fieldErrors["reportTypeId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
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

  public get conditionVariables(): FormVariableItem[] {
    return this._conditionVariables;
  }
  public set conditionVariables(value: FormVariableItem[]) {
    this._conditionVariables = value;
  }

  public abstract _save(): Promise<SaveResult<CaseDefinition>>;

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
    if (this.reportTypeId.length === 0) {
      isValid = false;
      this.fieldErrors["reportTypeId"] = "this field is required";
    }
    return isValid;
  }
}
