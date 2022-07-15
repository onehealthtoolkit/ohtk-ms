import { BaseFormViewModel } from "lib/baseFormViewModel";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { IStateStepService, StateStep } from "lib/services/stateStep";

export abstract class StateStepViewModel extends BaseFormViewModel {
  stateStepService: IStateStepService;

  stateSteps: StateStep[] = [];
  _name: string = "";
  _isStartState: boolean = false;
  _isStopState: boolean = false;

  constructor(
    readonly stateDefinitionId: string,
    stateStepService: IStateStepService
  ) {
    super();
    makeObservable(this, {
      stateSteps: observable,
      _name: observable,
      name: computed,
      _isStartState: observable,
      isStartState: computed,
      _isStopState: observable,
      isStopState: computed,
      save: action,
      validate: action,
    });
    this.stateStepService = stateStepService;
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

  public get isStartState(): boolean {
    return this._isStartState;
  }
  public set isStartState(value: boolean) {
    this._isStartState = value;
    delete this.fieldErrors["isStartState"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get isStopState(): boolean {
    return this._isStopState;
  }
  public set isStopState(value: boolean) {
    this._isStopState = value;
    delete this.fieldErrors["isStopState"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<StateStep>>;

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
