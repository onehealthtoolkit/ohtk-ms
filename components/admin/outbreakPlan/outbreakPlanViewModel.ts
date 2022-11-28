import { BaseFormViewModel } from "lib/baseFormViewModel";
import { OutbreakPlan, IOutbreakPlanService } from "lib/services/outbreakPlan";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";
import { FormViewModel } from "../formBuilder";
import { ParseError } from "../formBuilder/shared";
import { IReportTypeService } from "lib/services/reportType";

export abstract class OutbreakPlanViewModel extends BaseFormViewModel {
  outbreakPlanService: IOutbreakPlanService;

  _name: string = "";
  _description: string = "";
  _reportTypeId: string = "";
  _stateStepId: number = 0;
  _zone1Radius?: number = undefined;
  _zone1Color?: string = undefined;
  _zone1MessageTitle?: string = undefined;
  _zone1MessageBody?: string = undefined;
  _zone2Radius?: number = undefined;
  _zone2Color?: string = undefined;
  _zone2MessageTitle?: string = undefined;
  _zone2MessageBody?: string = undefined;
  _zone3Radius?: number = undefined;
  _zone3Color?: string = undefined;
  _zone3MessageTitle?: string = undefined;
  _zone3MessageBody?: string = undefined;

  formViewModel = new FormViewModel();

  constructor(
    outbreakPlanService: IOutbreakPlanService,
    readonly reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _name: observable,
      name: computed,
      _description: observable,
      description: computed,
      _reportTypeId: observable,
      reportTypeId: computed,
      _stateStepId: observable,
      stateStepId: computed,
      _zone1Radius: observable,
      zone1Radius: computed,
      _zone1Color: observable,
      zone1Color: computed,
      _zone1MessageTitle: observable,
      zone1MessageTitle: computed,
      _zone1MessageBody: observable,
      zone1MessageBody: computed,
      _zone2Radius: observable,
      zone2Radius: computed,
      _zone2Color: observable,
      zone2Color: computed,
      _zone2MessageTitle: observable,
      zone2MessageTitle: computed,
      _zone2MessageBody: observable,
      zone2MessageBody: computed,
      _zone3Radius: observable,
      zone3Radius: computed,
      _zone3Color: observable,
      zone3Color: computed,
      _zone3MessageTitle: observable,
      zone3MessageTitle: computed,
      _zone3MessageBody: observable,
      zone3MessageBody: computed,
      save: action,
      validate: action,
    });
    this.outbreakPlanService = outbreakPlanService;
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

  public get reportTypeId(): string {
    return this._reportTypeId;
  }
  public set reportTypeId(value: string) {
    this._reportTypeId = value;
    delete this.fieldErrors["reportTypeId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
    if (value) this.parseReportTypeDefinition();
  }

  public get stateStepId(): number {
    return this._stateStepId;
  }
  public set stateStepId(value: number) {
    this._stateStepId = value;
    delete this.fieldErrors["stateStepId"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone1Radius(): number | undefined {
    return this._zone1Radius;
  }
  public set zone1Radius(value: number | undefined) {
    this._zone1Radius = value;
    delete this.fieldErrors["zone1Radius"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone1Color(): string | undefined {
    return this._zone1Color;
  }
  public set zone1Color(value: string | undefined) {
    this._zone1Color = value;
    delete this.fieldErrors["zone1Color"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone1MessageTitle(): string | undefined {
    return this._zone1MessageTitle;
  }
  public set zone1MessageTitle(value: string | undefined) {
    this._zone1MessageTitle = value;
    delete this.fieldErrors["zone1MessageTitle"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone1MessageBody(): string | undefined {
    return this._zone1MessageBody;
  }
  public set zone1MessageBody(value: string | undefined) {
    this._zone1MessageBody = value;
    delete this.fieldErrors["zone1MessageBody"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone2Radius(): number | undefined {
    return this._zone2Radius;
  }
  public set zone2Radius(value: number | undefined) {
    this._zone2Radius = value;
    delete this.fieldErrors["zone2Radius"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone2Color(): string | undefined {
    return this._zone2Color;
  }
  public set zone2Color(value: string | undefined) {
    this._zone2Color = value;
    delete this.fieldErrors["zone2Color"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone2MessageTitle(): string | undefined {
    return this._zone2MessageTitle;
  }
  public set zone2MessageTitle(value: string | undefined) {
    this._zone2MessageTitle = value;
    delete this.fieldErrors["zone2MessageTitle"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone2MessageBody(): string | undefined {
    return this._zone2MessageBody;
  }
  public set zone2MessageBody(value: string | undefined) {
    this._zone2MessageBody = value;
    delete this.fieldErrors["zone2MessageBody"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone3Radius(): number | undefined {
    return this._zone3Radius;
  }
  public set zone3Radius(value: number | undefined) {
    this._zone3Radius = value;
    delete this.fieldErrors["zone3Radius"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone3Color(): string | undefined {
    return this._zone3Color;
  }
  public set zone3Color(value: string | undefined) {
    this._zone3Color = value;
    delete this.fieldErrors["zone3Color"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone3MessageTitle(): string | undefined {
    return this._zone3MessageTitle;
  }
  public set zone3MessageTitle(value: string | undefined) {
    this._zone3MessageTitle = value;
    delete this.fieldErrors["zone3MessageTitle"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get zone3MessageBody(): string | undefined {
    return this._zone3MessageBody;
  }
  public set zone3MessageBody(value: string | undefined) {
    this._zone3MessageBody = value;
    delete this.fieldErrors["zone3MessageBody"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public abstract _save(): Promise<SaveResult<OutbreakPlan>>;

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

  async parseReportTypeDefinition() {
    const data = await (
      await this.reportTypeService.getReportType(this.reportTypeId)
    ).data;
    if (data) {
      this.parseDefinition(data.definition);
    }
  }

  public parseDefinition(value: string): boolean {
    try {
      this.formViewModel.parse(JSON.parse(value));
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

  validate(): boolean {
    let isValid = true;
    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }

    if (this.description.length === 0) {
      isValid = false;
      this.fieldErrors["description"] = "this field is required";
    }

    if (this.reportTypeId.length === 0) {
      isValid = false;
      this.fieldErrors["reportTypeId"] = "this field is required";
    }

    if (this.stateStepId === 0) {
      isValid = false;
      this.fieldErrors["stateStepId"] = "this field is required";
    }

    return isValid;
  }
}
