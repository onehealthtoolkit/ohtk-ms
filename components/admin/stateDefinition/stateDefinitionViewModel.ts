import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  StateDefinition,
  IStateDefinitionService,
} from "lib/services/stateDefinition";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { StateStep } from "lib/services/stateStep";
import { StateTransition } from "lib/services/stateTransition";

export abstract class StateDefinitionViewModel extends BaseFormViewModel {
  stateDefinitionService: IStateDefinitionService;

  _name: string = "";
  _isDefault: boolean = false;
  _activeTabIndex: number = 0;
  _stateSteps: StateStep[] = [];
  _stateTransitions: StateTransition[] = [];
  resultId: string = "";

  constructor(stateDefinitionService: IStateDefinitionService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _isDefault: observable,
      isDefault: computed,
      _stateSteps: observable,
      stateSteps: computed,
      _stateTransitions: observable,
      stateTransitions: computed,
      _activeTabIndex: observable,
      activeTabIndex: computed,
      save: action,
      validate: action,
    });
    this.stateDefinitionService = stateDefinitionService;
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

  public get isDefault(): boolean {
    return this._isDefault;
  }
  public set isDefault(value: boolean) {
    this._isDefault = value;
    delete this.fieldErrors["isDefault"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get stateSteps(): StateStep[] {
    return this._stateSteps;
  }
  public set stateSteps(value: StateStep[]) {
    this._stateSteps = value;
  }

  public get stateTransitions(): StateTransition[] {
    return this._stateTransitions;
  }
  public set stateTransitions(value: StateTransition[]) {
    this._stateTransitions = value;
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  public abstract _save(): Promise<SaveResult<StateDefinition>>;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      const result: SaveResult<StateDefinition> = await this._save();

      this.isSubmitting = false;

      if (!result.success) {
        if (result.message) {
          this.submitError = result.message;
        }
        if (result.fields) {
          this.fieldErrors = result.fields;
        }
      }
      if (result.success) {
        this.resultId = result.data?.id || "";
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
