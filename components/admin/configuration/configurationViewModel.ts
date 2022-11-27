import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  Configuration,
  IConfigurationService,
} from "lib/services/configuration";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { IReportTypeService } from "lib/services/reportType";

export abstract class ConfigurationViewModel extends BaseFormViewModel {
  configurationService: IConfigurationService;

  _key: string = "";
  _value: string = "";

  constructor(
    configurationService: IConfigurationService,
    readonly reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _key: observable,
      key: computed,
      _value: observable,
      value: computed,

      save: action,
      validate: action,
    });
    this.configurationService = configurationService;
  }

  public get key(): string {
    return this._key;
  }
  public set key(value: string) {
    this._key = value;
    delete this.fieldErrors["key"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
    delete this.fieldErrors["value"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<Configuration>>;

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
    if (this.key.length === 0) {
      isValid = false;
      this.fieldErrors["key"] = "this field is required";
    }

    if (this.value.length === 0) {
      isValid = false;
      this.fieldErrors["value"] = "this field is required";
    }

    return isValid;
  }
}
