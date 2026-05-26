import { BaseFormViewModel } from "lib/baseFormViewModel";
import { AnimalSpecies, IAnimalSpeciesService } from "lib/services/census";
import { SaveResult } from "lib/services/interface";
import { action, computed, makeObservable, observable } from "mobx";

export abstract class AnimalSpeciesViewModel extends BaseFormViewModel {
  _code: string = "";
  _name: string = "";
  _active: boolean = true;
  _sortOrder: number = 0;

  constructor(readonly animalSpeciesService: IAnimalSpeciesService) {
    super();
    makeObservable(this, {
      _code: observable,
      code: computed,
      _name: observable,
      name: computed,
      _active: observable,
      active: computed,
      _sortOrder: observable,
      sortOrder: computed,
      save: action,
      validate: action,
    });
  }

  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
    delete this.fieldErrors["code"];
    this.submitError = "";
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    delete this.fieldErrors["name"];
    this.submitError = "";
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  public get sortOrder(): number {
    return this._sortOrder;
  }
  public set sortOrder(value: number) {
    this._sortOrder = value;
  }

  public abstract _save(): Promise<SaveResult<AnimalSpecies>>;

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
    if (this.code.length === 0) {
      isValid = false;
      this.fieldErrors["code"] = "this field is required";
    }
    if (this.name.length === 0) {
      isValid = false;
      this.fieldErrors["name"] = "this field is required";
    }
    return isValid;
  }
}
