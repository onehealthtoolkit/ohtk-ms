import { BaseFormViewModel } from "lib/baseFormViewModel";
import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import { action, computed, makeObservable, observable } from "mobx";

export enum RendererState {
  formInput,
  confirmation,
}

export class FormRendererViewModel extends BaseFormViewModel {
  form?: Form = undefined;
  state = RendererState.formInput;

  constructor(readonly id: string, readonly definition: string) {
    super();
    makeObservable(this, {
      form: observable,
      state: observable,
      currentSection: computed,
      next: action,
      previous: action,
    });
    this._init();
  }

  private _init() {
    try {
      const json = JSON.parse(this.definition);
      this.form = parseForm(json);
    } catch (e) {
      this.fieldErrors["form"] = "Invalid form definition";
    }
  }

  get currentSection(): Section | undefined {
    return this.form?.currentSection;
  }

  next() {
    if (this.state == RendererState.formInput) {
      if (this.form?.couldGoToNextSection) {
        this.form.next();
      } else {
        this.state = RendererState.confirmation;
      }
    }
  }

  previous() {
    if (this.state == RendererState.formInput) {
      if (this.form?.couldGoToPreviousSection) {
        this.form.previous();
      } else {
        // back
      }
    } else if (this.state == RendererState.confirmation) {
      this.state = RendererState.formInput;
    }
  }

  submit() {
    console.log("submit", this.form?.toJsonValue());
  }
}
