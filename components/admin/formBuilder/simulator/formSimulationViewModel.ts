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

export class FormSimulationViewModel {
  form?: Form = undefined;
  errorRendering = false;
  isSubmitting = false;
  isSubmitted = false;

  constructor(readonly definition: string, readonly formRef?: string) {
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
      var json = JSON.parse(this.definition);
      if (this.formRef && Array.isArray(json.subforms)) {
        const subform = (json.subforms as any[]).find(item =>
          item.hasOwnProperty(this.formRef)
        );
        json = subform ? subform[this.formRef] : {};
      }
      json.id = uuidv4();
      // json can be empty {}, to be able to run parseForm, then add sections
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
