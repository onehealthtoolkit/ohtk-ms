import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import { action, computed, makeObservable, observable } from "mobx";

export enum RendererState {
  formInput,
  confirmation,
}
type OnCompleteForm = (jsonValue: Record<string, any> | undefined) => void;
type OnCancelForm = (message?: string) => void;

export class FormRendererViewModel {
  form?: Form = undefined;
  state = RendererState.formInput;
  _incidentInAuthority?: string = undefined;
  onComplete?: OnCompleteForm;
  onCancel?: OnCancelForm;
  errorRendering = false;

  constructor(
    readonly id: string,
    readonly definition: string,
    onComplete?: OnCompleteForm,
    onCancel?: OnCancelForm
  ) {
    makeObservable(this, {
      form: observable,
      state: observable,
      errorRendering: observable,
      _incidentInAuthority: observable,
      incidentInAuthority: computed,
      currentSection: computed,
      next: action,
      previous: action,
    });
    this._init();
    this.onComplete = onComplete;
    this.onCancel = onCancel;
  }

  private _init() {
    try {
      const json = JSON.parse(this.definition);
      json.id = this.id;
      // json can be empty {}, to be able to run parseForm, then add sections
      if (!json.sections) {
        json.sections = [];
      }
      this.form = parseForm(json);
    } catch (e) {
      console.log(e);
      this.errorRendering = true;
    }
  }

  get currentSection(): Section | undefined {
    return this.form?.currentSection;
  }

  get incidentInAuthority(): string | undefined {
    return this._incidentInAuthority;
  }
  set incidentInAuthority(value: string | undefined) {
    this._incidentInAuthority = value;
  }

  next() {
    // Empty form, when next is to exit with completion
    if (!this.currentSection) {
      console.log("on complete empty form");
      this.onComplete && this.onComplete(undefined);
      return;
    }
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
        console.log("on cancel form: back");
        this.onCancel && this.onCancel("back");
      }
    } else if (this.state == RendererState.confirmation) {
      this.state = RendererState.formInput;
    }
  }

  submit() {
    const json = this.form?.toJsonValue();
    if (json) {
      json.incidentInAuthority = this.incidentInAuthority;
    }
    console.log("on complete form", json);
    this.onComplete && this.onComplete(json);
  }

  get isSectionValid(): boolean {
    let valid = true;
    if (this.currentSection) {
      for (const question of this.currentSection.questions) {
        for (const field of question.fields) {
          valid = valid && field.isValid;
        }
      }
    }
    return valid;
  }
}
