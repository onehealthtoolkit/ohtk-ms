import { ModalDialogViewModel } from "lib/dialogViewModel";
import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import { ICaseService } from "lib/services/case";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { v4 as uuidv4 } from "uuid";

export class FormTransitionViewModel extends ModalDialogViewModel {
  form?: Form = undefined;
  errorRendering = false;
  isSubmitting = false;
  errorForwardState = false;

  constructor(
    readonly caseService: ICaseService,
    readonly caseId: string,
    readonly transitionId: string,
    readonly definition: string
  ) {
    super();
    makeObservable(this, {
      form: observable,
      errorRendering: observable,
      isSubmitting: observable,
      currentSection: computed,
      next: action,
      previous: action,
      isFirst: computed,
      isLast: computed,
      submit: action,
    });
    this._init();
  }

  private _init() {
    try {
      const json = JSON.parse(this.definition);
      json.id = uuidv4();
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
    this.errorForwardState = false;
    this.form?.next();
  }

  previous() {
    this.errorForwardState = false;
    this.form?.previous();
  }

  async submit(): Promise<boolean> {
    const formData = this.form?.toJsonValue();
    console.log("on complete form", formData);

    this.isSubmitting = true;
    const result = await this.caseService.forwardState(
      this.caseId,
      this.transitionId,
      formData
    );

    runInAction(() => {
      this.isSubmitting = false;
    });

    if (result.data) {
      return true;
    }
    if (result.error) {
      this.errorForwardState = true;
      return false;
    }
    return false;
  }
}
