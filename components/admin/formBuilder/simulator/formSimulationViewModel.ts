import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import { IReportTypeService } from "lib/services/reportType";
import { SimulationReportType } from "lib/services/reportType/reportType";
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
  rendererDataTemplate?: string;
  simulatorIncidentReportType?: SimulationReportType = undefined;

  constructor(
    readonly definition: string,
    readonly formRef?: string,
    readonly reportTypeService?: IReportTypeService,
    readonly reportTypeId?: string,
    rendererDataTemplate?: string
  ) {
    makeObservable(this, {
      form: observable,
      errorRendering: observable,
      isSubmitting: observable,
      isSubmitted: observable,
      simulatorIncidentReportType: observable,
      currentSection: computed,
      next: action,
      previous: action,
      isFirst: computed,
      isLast: computed,
    });
    this.rendererDataTemplate = rendererDataTemplate;
    this._init();
  }

  private _init() {
    try {
      var json = JSON.parse(this.definition);
      if (this.formRef && json.hasOwnProperty("subforms")) {
        json = json.subforms ? json.subforms[this.formRef] : {};
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

  async submit() {
    this.isSubmitting = true;
    this.isSubmitted = false;
    if (this.reportTypeService) {
      this.simulatorIncidentReportType =
        await this.reportTypeService.submitSimulationReport(
          this.form?.toJsonValue(),
          new Date().toISOString().split("T")[0],
          this.rendererDataTemplate || "",
          undefined,
          this.reportTypeId
        );
    }
    setTimeout(() => {
      runInAction(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
      });
    }, 2000);
  }
}
