import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  StateDefinition,
  IStateDefinitionService,
} from "lib/services/stateDefinition";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "components/admin/formBuilder";
import { StateStep } from "lib/services/stateDefinition/stateDefinition";

export abstract class StateDefinitionViewModel extends BaseFormViewModel {
  stateDefinitionService: IStateDefinitionService;

  stateSteps: StateStep[] = [];
  _name: string = "";
  _isDefault: boolean = false;

  _isFormBuilderMode = false;
  formViewModel = new FormViewModel();

  constructor(stateDefinitionService: IStateDefinitionService) {
    super();
    makeObservable(this, {
      stateSteps: observable,
      _name: observable,
      name: computed,
      _isDefault: observable,
      isDefault: computed,
      save: action,
      validate: action,
      formViewModel: observable,
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

  public abstract _save(): Promise<SaveResult<StateDefinition>>;

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
