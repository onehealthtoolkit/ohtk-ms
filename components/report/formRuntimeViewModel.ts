import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { v4 as uuidv4 } from "uuid";

/**
 * Form runtime: same section navigation / validation as FormSimulationViewModel,
 * but without simulation-only submit/result tabs. Used for officer report create.
 */
export class FormRuntimeViewModel {
  form?: Form = undefined;
  errorRendering = false;
  isSubmitting = false;
  submitError?: string = undefined;
  definitionRaw: string;

  constructor(definition: string) {
    this.definitionRaw = definition;
    makeObservable(this, {
      form: observable,
      errorRendering: observable,
      isSubmitting: observable,
      submitError: observable,
      currentSection: computed,
      next: action,
      previous: action,
      isFirst: computed,
      isLast: computed,
    });
    this._init(definition);
  }

  private _init(definition: string) {
    try {
      let json = JSON.parse(definition);
      json.id = uuidv4();
      if (!json.subforms) {
        json.subforms = [];
      }
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

  get isFirst() {
    return !this.form?.couldGoToPreviousSection;
  }

  get isLast() {
    return !this.form?.couldGoToNextSection;
  }

  next() {
    if (!this.form) return;
    this.submitError = undefined;
    if (this.form.couldGoToNextSection) {
      this.form.next();
    } else if (this.form.currentSection?.validate()) {
      // last section validated — caller may submit
    }
  }

  previous() {
    this.submitError = undefined;
    this.form?.previous();
  }

  /** Validate current (last) section and return form JSON or null. */
  buildValidatedData(): Record<string, unknown> | null {
    if (!this.form) return null;
    if (this.form.currentSection && !this.form.currentSection.validate()) {
      return null;
    }
    return this.form.toJsonValue() as Record<string, unknown>;
  }

  setSubmitting(value: boolean) {
    runInAction(() => {
      this.isSubmitting = value;
    });
  }

  setSubmitError(message?: string) {
    runInAction(() => {
      this.submitError = message;
    });
  }
}
