import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  CaseDefinition,
  ICaseDefinitionService,
} from "lib/services/caseDefinition";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class CaseDefinitionViewModel extends BaseFormViewModel {
  caseDefinitionService: ICaseDefinitionService;

  _reportTypeId: string = "";
  _description: string = "";
  _condition: string = "";

  constructor(caseDefinitionService: ICaseDefinitionService) {
    super();
    makeObservable(this, {
      _reportTypeId: observable,
      reportTypeId: computed,
      _description: observable,
      description: computed,
      _condition: observable,
      condition: computed,
      save: action,
      validate: action,
    });
    this.caseDefinitionService = caseDefinitionService;
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
    return isValid;
  }
}
