import { BaseFormViewModel } from "lib/baseFormViewModel";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import {
  IStateTransitionService,
  StateTransition,
} from "lib/services/stateTransition";
import { FormViewModel } from "components/admin/formBuilder";
import { ParseError } from "components/admin/formBuilder/shared";

export abstract class StateTransitionViewModel extends BaseFormViewModel {
  stateTransitionService: IStateTransitionService;

  stateTransitions: StateTransition[] = [];
  _formDefinition: string = "";
  _fromStepId: string = "";
  _toStepId: string = "";

  _isFormBuilderMode = false;
  formViewModel = new FormViewModel();

  constructor(
    readonly stateDefinitionId: string,
    stateTransitionService: IStateTransitionService
  ) {
    super();
    makeObservable(this, {
      stateTransitions: observable,
      _formDefinition: observable,
      formDefinition: computed,
      _fromStepId: observable,
      fromStepId: computed,
      _toStepId: observable,
      toStepId: computed,
      save: action,
      validate: action,
      _isFormBuilderMode: observable,
      isFormBuilderMode: computed,
      formViewModel: observable,
      parseFormDefinition: action,
    });
    this.stateTransitionService = stateTransitionService;
  }

  public get formDefinition(): string {
    return this._formDefinition;
  }
  public set formDefinition(value: string) {
    this._formDefinition = value;
    delete this.fieldErrors["formDefinition"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public parseFormDefinition(value: string): boolean {
    if (!value || value === "") {
      this.formDefinition = "{}";
      return true;
    }
    try {
      this.formViewModel.parse(JSON.parse(value));
      this.formDefinition = this.formViewModel.jsonString;
      return true;
    } catch (e) {
      if (e instanceof ParseError) {
        this.fieldErrors["formDefinition"] = e.message;
      } else {
        this.fieldErrors["formDefinition"] = "Error! Bad definition format";
      }
      return false;
    }
  }

  public get fromStepId(): string {
    return this._fromStepId;
  }
  public set fromStepId(value: string) {
    this._fromStepId = value;
    delete this.fieldErrors["fromStepId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get toStepId(): string {
    return this._toStepId;
  }
  public set toStepId(value: string) {
    this._toStepId = value;
    delete this.fieldErrors["toStepId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<StateTransition>>;

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
    if (this.formDefinition.length === 0) {
      isValid = false;
      this.fieldErrors["formDefinition"] = "this field is required";
    }
    if (this.fromStepId.length === 0) {
      isValid = false;
      this.fieldErrors["fromStepId"] = "this field is required";
    }
    if (this.toStepId.length === 0) {
      isValid = false;
      this.fieldErrors["toStepId"] = "this field is required";
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