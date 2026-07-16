import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  CensusRoundDefinition,
  CensusRoundDefinitionSaveInput,
  CensusRoundKind,
  CensusRoundMode,
  ICensusRoundService,
} from "lib/services/census";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

const MM_DD_PATTERN = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export abstract class CensusRoundViewModel extends BaseFormViewModel {
  censusRoundService: ICensusRoundService;

  _code: string = "";
  _name: string = "";
  _kind: CensusRoundKind = "ANIMAL";
  _mode: CensusRoundMode = "PRODUCTION";
  _censusPeriodStart: string = "";
  _censusPeriodEnd: string = "";
  _startDate: string = "";
  _softFinishDate: string = "";
  _hardFinishDate: string = "";
  _targetAuthorityId: number | null = null;
  _enabled: boolean = true;
  _materialize: boolean = true;
  _materializeFromYear: number = new Date().getFullYear();
  _materializeYears: number = 2;

  constructor(censusRoundService: ICensusRoundService) {
    super();
    makeObservable(this, {
      _code: observable,
      code: computed,
      _name: observable,
      name: computed,
      _kind: observable,
      kind: computed,
      _mode: observable,
      mode: computed,
      _censusPeriodStart: observable,
      censusPeriodStart: computed,
      _censusPeriodEnd: observable,
      censusPeriodEnd: computed,
      _startDate: observable,
      startDate: computed,
      _softFinishDate: observable,
      softFinishDate: computed,
      _hardFinishDate: observable,
      hardFinishDate: computed,
      _targetAuthorityId: observable,
      targetAuthorityId: computed,
      _enabled: observable,
      enabled: computed,
      _materialize: observable,
      materialize: computed,
      _materializeFromYear: observable,
      materializeFromYear: computed,
      _materializeYears: observable,
      materializeYears: computed,
      save: action,
      validate: action,
      applyDefinition: action,
    });
    this.censusRoundService = censusRoundService;
  }

  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
    this.clearError("code");
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.clearError("name");
  }

  public get kind(): CensusRoundKind {
    return this._kind;
  }
  public set kind(value: CensusRoundKind) {
    this._kind = value;
    this.clearError("kind");
  }

  public get mode(): CensusRoundMode {
    return this._mode;
  }
  public set mode(value: CensusRoundMode) {
    this._mode = value;
    this.clearError("mode");
  }

  public get censusPeriodStart(): string {
    return this._censusPeriodStart;
  }
  public set censusPeriodStart(value: string) {
    this._censusPeriodStart = value;
    this.clearError("censusPeriodStart");
  }

  public get censusPeriodEnd(): string {
    return this._censusPeriodEnd;
  }
  public set censusPeriodEnd(value: string) {
    this._censusPeriodEnd = value;
    this.clearError("censusPeriodEnd");
  }

  public get startDate(): string {
    return this._startDate;
  }
  public set startDate(value: string) {
    this._startDate = value;
    this.clearError("startDate");
  }

  public get softFinishDate(): string {
    return this._softFinishDate;
  }
  public set softFinishDate(value: string) {
    this._softFinishDate = value;
    this.clearError("softFinishDate");
  }

  public get hardFinishDate(): string {
    return this._hardFinishDate;
  }
  public set hardFinishDate(value: string) {
    this._hardFinishDate = value;
    this.clearError("hardFinishDate");
  }

  public get targetAuthorityId(): number | null {
    return this._targetAuthorityId;
  }
  public set targetAuthorityId(value: number | null) {
    this._targetAuthorityId = value;
    this.clearError("targetAuthorityId");
  }

  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(value: boolean) {
    this._enabled = value;
    this.clearError("enabled");
  }

  public get materialize(): boolean {
    return this._materialize;
  }
  public set materialize(value: boolean) {
    this._materialize = value;
    this.clearError("materializeFromYear");
    this.clearError("materializeYears");
  }

  public get materializeFromYear(): number {
    return this._materializeFromYear;
  }
  public set materializeFromYear(value: number) {
    this._materializeFromYear = value;
    this.clearError("materializeFromYear");
  }

  public get materializeYears(): number {
    return this._materializeYears;
  }
  public set materializeYears(value: number) {
    this._materializeYears = value;
    this.clearError("materializeYears");
  }

  public applyDefinition(data: CensusRoundDefinition) {
    this.code = data.code;
    this.name = data.name;
    this.kind = data.kind;
    this.mode = data.mode;
    this.censusPeriodStart = data.censusPeriodStart;
    this.censusPeriodEnd = data.censusPeriodEnd;
    this.startDate = data.startDate;
    this.softFinishDate = data.softFinishDate;
    this.hardFinishDate = data.hardFinishDate;
    this.targetAuthorityId = data.targetAuthorityId ?? null;
    this.enabled = data.enabled;
  }

  protected buildSaveInput(id?: number): CensusRoundDefinitionSaveInput {
    return {
      id,
      code: this.code.trim(),
      name: this.name.trim(),
      kind: this.kind,
      mode: this.mode,
      censusPeriodStart: this.censusPeriodStart.trim(),
      censusPeriodEnd: this.censusPeriodEnd.trim(),
      startDate: this.startDate.trim(),
      softFinishDate: this.softFinishDate.trim(),
      hardFinishDate: this.hardFinishDate.trim(),
      targetAuthorityId: this.targetAuthorityId,
      enabled: this.enabled,
      materializeFromYear:
        this.enabled && this.materialize ? this.materializeFromYear : null,
      materializeYears: this.materializeYears,
    };
  }

  public abstract _save(): Promise<
    SaveResult<{ definition: CensusRoundDefinition }>
  >;

  public async save(): Promise<boolean> {
    this.isSubmitting = true;

    if (this.validate()) {
      const result = await this._save();
      this.isSubmitting = false;

      if (!result.success) {
        if (result.message) {
          this.submitError = result.message;
        }
        if (result.fields) {
          this.fieldErrors = result.fields as Record<string, string>;
        }
      }
      return result.success;
    }
    this.isSubmitting = false;
    return false;
  }

  validate(): boolean {
    let isValid = true;
    this.fieldErrors = {};

    if (!this.code.trim()) {
      isValid = false;
      this.fieldErrors["code"] = "this field is required";
    }

    if (!this.name.trim()) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }

    const dateFields: Array<{
      key: string;
      value: string;
    }> = [
      { key: "censusPeriodStart", value: this.censusPeriodStart },
      { key: "censusPeriodEnd", value: this.censusPeriodEnd },
      { key: "startDate", value: this.startDate },
      { key: "softFinishDate", value: this.softFinishDate },
      { key: "hardFinishDate", value: this.hardFinishDate },
    ];

    dateFields.forEach(({ key, value }) => {
      if (!value.trim()) {
        isValid = false;
        this.fieldErrors[key] = "this field is required";
      } else if (!MM_DD_PATTERN.test(value.trim())) {
        isValid = false;
        this.fieldErrors[key] = "use MM-DD (e.g. 06-30)";
      } else if (value.trim() === "02-29") {
        isValid = false;
        this.fieldErrors[key] = "leap day 02-29 is not allowed";
      }
    });

    if (this.enabled && this.materialize) {
      if (
        !Number.isInteger(this.materializeFromYear) ||
        this.materializeFromYear < 2000 ||
        this.materializeFromYear > 2100
      ) {
        isValid = false;
        this.fieldErrors["materializeFromYear"] =
          "enter a year between 2000 and 2100";
      }
      if (
        !Number.isInteger(this.materializeYears) ||
        this.materializeYears < 1 ||
        this.materializeYears > 10
      ) {
        isValid = false;
        this.fieldErrors["materializeYears"] =
          "materialize years must be between 1 and 10";
      }
    }

    return isValid;
  }
}
