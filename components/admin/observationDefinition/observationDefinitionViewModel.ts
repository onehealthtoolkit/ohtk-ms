import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  ObservationDefinition,
  IObservationDefinitionService,
} from "lib/services/observationDefinition";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "../formBuilder";
import { ParseError } from "../formBuilder/shared";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition/observationMonitoringDefinition";

export abstract class ObservationDefinitionViewModel extends BaseFormViewModel {
  observationDefinitionService: IObservationDefinitionService;

  _name: string = "";
  _description: string = "";
  _registerFormDefinition: string = "{}";
  _titleTemplate: string = "";
  _descriptionTemplate: string = "";
  _identityTemplate: string = "";
  _monitoringDefinitions: ObservationMonitoringDefinition[] = [];
  resultId: string = "";

  definitionFormViewModel = new FormViewModel([
    {
      label: "reportDate",
      value: "report_date",
      type: "Report",
    },
    {
      label: "reportDateNoTime",
      value: "report_date_no_time",
      type: "Report",
    },
    {
      label: "gpsLocation",
      value: "gps_location",
      type: "Report",
    },
    {
      label: "reportId",
      value: "report_id",
      type: "Report",
    },
  ]);

  constructor(observationDefinitionService: IObservationDefinitionService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _description: observable,
      description: computed,
      _registerFormDefinition: observable,
      registerFormDefinition: computed,
      _titleTemplate: observable,
      titleTemplate: computed,
      _descriptionTemplate: observable,
      descriptionTemplate: computed,
      _identityTemplate: observable,
      identityTemplate: computed,
      _monitoringDefinitions: observable,
      monitoringDefinitions: computed,
      definitionFormViewModel: observable,
      parseDefinition: action,
      save: action,
      validate: action,
    });
    this.observationDefinitionService = observationDefinitionService;
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

  public get registerFormDefinition(): string {
    return this._registerFormDefinition;
  }
  public set registerFormDefinition(value: string) {
    this._registerFormDefinition = value;
    delete this.fieldErrors["registerFormDefinition"];
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

  public get identityTemplate(): string {
    return this._identityTemplate;
  }
  public set identityTemplate(value: string) {
    this._identityTemplate = value;
    delete this.fieldErrors["_dentityTemplate"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get monitoringDefinitions(): ObservationMonitoringDefinition[] {
    return this._monitoringDefinitions;
  }
  public set monitoringDefinitions(value: ObservationMonitoringDefinition[]) {
    this._monitoringDefinitions = value;
  }

  public parseDefinition(value: string): boolean {
    try {
      this.definitionFormViewModel.parse(JSON.parse(value));
      this.definitionFormViewModel.setLabel(this.name);
      this.registerFormDefinition = this.definitionFormViewModel.jsonString;
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

  public abstract _save(): Promise<SaveResult<ObservationDefinition>>;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      const result: SaveResult<ObservationDefinition> = await this._save();

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

    if (this.registerFormDefinition.length === 0) {
      isValid = false;
      this.fieldErrors["registerFormDefinition"] = "this field is required";
    }

    if (this.titleTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["titleTemplate"] = "this field is required";
    }

    if (this.descriptionTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["descriptionTemplate"] = "this field is required";
    }

    if (this.identityTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["identityTemplate"] = "this field is required";
    }

    return isValid;
  }
}
