import { FormViewModel } from "components/admin/formBuilder";
import { ParseError } from "components/admin/formBuilder/shared";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import { SaveResult } from "lib/services/interface";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinition";
import { IObservationMonitoringDefinitionService } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinitionService";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class ObservationMonitoringDefinitionViewModel extends BaseFormViewModel {
  monitoringDefinitionService: IObservationMonitoringDefinitionService;

  _name: string = "";
  _description: string = "";
  _formDefinition: string = "{}";
  _titleTemplate: string = "";
  _descriptionTemplate: string = "";

  definitionFormViewModel = new FormViewModel();

  constructor(
    readonly definitionId: string,
    monitoringDefinitionService: IObservationMonitoringDefinitionService
  ) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _description: observable,
      description: computed,
      _formDefinition: observable,
      formDefinition: computed,
      _titleTemplate: observable,
      titleTemplate: computed,
      _descriptionTemplate: observable,
      descriptionTemplate: computed,
      save: action,
      validate: action,
    });
    this.monitoringDefinitionService = monitoringDefinitionService;
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

  public get titleTemplate(): string {
    return this._titleTemplate;
  }
  public set titleTemplate(value: string) {
    this._titleTemplate = value;
    delete this.fieldErrors["titleTemplate"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get descriptionTemplate(): string {
    return this._descriptionTemplate;
  }
  public set descriptionTemplate(value: string) {
    this._descriptionTemplate = value;
    delete this.fieldErrors["descriptionTemplate"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public parseDefinition(value: string): boolean {
    try {
      this.definitionFormViewModel.parse(JSON.parse(value));
      this.definitionFormViewModel.setLabel(this.name + " Definition");
      this.formDefinition = this.definitionFormViewModel.jsonString;
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

  public abstract _save(): Promise<SaveResult<ObservationMonitoringDefinition>>;

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

    if (this.formDefinition.length === 0) {
      isValid = false;
      this.fieldErrors["formDefinition"] = "this field is required";
    }

    if (this.titleTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["titleTemplate"] = "this field is required";
    }

    if (this.descriptionTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["descriptionTemplate"] = "this field is required";
    }

    return isValid;
  }
}
