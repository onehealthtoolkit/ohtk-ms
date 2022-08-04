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

export class FormSimulationViewModel {
  form?: Form = undefined;
  errorRendering = false;
  isSubmitting = false;
  isSubmitted = false;

  constructor(readonly definition: string) {
    makeObservable(this, {
      form: observable,
      errorRendering: observable,
      isSubmitting: observable,
      isSubmitted: observable,
      currentSection: computed,
      next: action,
      previous: action,
      isFirst: computed,
      isLast: computed,
    });
    this._init();
  }

  private _init() {
    try {
      const json = JSON.parse(this.definition);
      json.id = crypto.randomUUID();
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

  get isFirst() {
    return !this.form?.couldGoToPreviousSection;
  }

  get isLast() {
    return !this.form?.couldGoToNextSection;
  }

  next() {
    if (!this.form) return;
    this.isSubmitted = false;
    if (this.form.couldGoToNextSection) {
      this.form.next();
    } else {
      if (this.form.currentSection.validate()) {
        this.submit();
      }
    }
  }

  previous() {
    this.isSubmitted = false;
    this.form?.previous();
  }

  submit() {
    this.isSubmitting = true;
    this.isSubmitted = false;
    setTimeout(() => {
      runInAction(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
      });
    }, 2000);
  }
}
