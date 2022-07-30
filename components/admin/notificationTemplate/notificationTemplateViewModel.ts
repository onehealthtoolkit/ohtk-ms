import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  NotificationTemplate,
  INotificationTemplateService,
} from "lib/services/notificationTemplate";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { CasesNotificationTemplateTypeChoices } from "lib/generated/graphql";

export abstract class NotificationTemplateViewModel extends BaseFormViewModel {
  notificationTemplateService: INotificationTemplateService;

  _name: string = "";
  _type: string = CasesNotificationTemplateTypeChoices.Rep;
  _reportTypeId: string = "";
  _stateTransitionId: number = 0;
  _condition: string = "";
  _titleTemplate: string = "";
  _bodyTemplate: string = "";

  constructor(notificationTemplateService: INotificationTemplateService) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _type: observable,
      type: computed,
      _reportTypeId: observable,
      reportTypeId: computed,
      _stateTransitionId: observable,
      stateTransitionId: computed,
      _condition: observable,
      condition: computed,
      _titleTemplate: observable,
      titleTemplate: computed,
      _bodyTemplate: observable,
      bodyTemplate: computed,
      save: action,
      validate: action,
    });
    this.notificationTemplateService = notificationTemplateService;
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

  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
    delete this.fieldErrors["type"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
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

  public get stateTransitionId(): number {
    return this._stateTransitionId;
  }
  public set stateTransitionId(value: number) {
    this._stateTransitionId = value;
    delete this.fieldErrors["stateTransitionId"];
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

  public get bodyTemplate() {
    return this._bodyTemplate;
  }

  public set bodyTemplate(value) {
    this._bodyTemplate = value;
    delete this.fieldErrors["bodyTemplate"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<NotificationTemplate>>;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      if (
        this.type == CasesNotificationTemplateTypeChoices.Rep ||
        this.type == CasesNotificationTemplateTypeChoices.Ptc
      )
        this.stateTransitionId = 0;
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

    if (this.type.length === 0) {
      isValid = false;
      this.fieldErrors["type"] = "this field is required";
    }

    if (
      this.type == CasesNotificationTemplateTypeChoices.Cas &&
      this.stateTransitionId === 0
    ) {
      isValid = false;
      this.fieldErrors["stateTransitionId"] = "this field is required";
    }
    if (this.reportTypeId.length === 0) {
      isValid = false;
      this.fieldErrors["reportTypeId"] = "this field is required";
    }

    if (this.titleTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["titleTemplate"] = "this field is required";
    }

    if (this.bodyTemplate.length === 0) {
      isValid = false;
      this.fieldErrors["bodyTemplate"] = "this field is required";
    }

    return isValid;
  }
}
