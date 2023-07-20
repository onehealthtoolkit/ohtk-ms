import { SectionViewModel } from "components/admin/formBuilder/section";
import {
  Definition,
  MovableItemsViewModel,
  ParseError,
} from "components/admin/formBuilder/shared";
import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { action, computed, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export type FormVariableItem = { label: string; value: string; type: string };

export class FormViewModel extends MovableItemsViewModel<SectionViewModel> {
  subforms = Array<FormViewModel>();
  _currentForm: FormViewModel = this;
  sections = Array<SectionViewModel>();
  currentSection: SectionViewModel | undefined = undefined;
  _isSimulationMode = false;
  formSimulation?: FormSimulationViewModel = undefined;
  isCurrent = false;

  constructor(
    public builtinVariables: FormVariableItem[] = [],
    id?: string,
    label?: string,
    readonly parent?: FormViewModel
  ) {
    super(id || "", label || "");
    makeObservable(this, {
      subforms: observable,
      _currentForm: observable,
      currentForm: computed,
      addSubform: action,
      sections: observable,
      currentSection: observable,
      addSection: action,
      selectSection: action,
      parse: action,
      jsonString: computed,
      _isSimulationMode: observable,
      isSimulationMode: computed,
      formSimulation: observable,
      variableList: computed,
      conditionVariableList: computed,
      isCurrent: observable,
      setCurrent: action,
      unsetCurrent: action,
    });
    this.setCurrent();
  }

  get movableItems() {
    return this.sections;
  }

  addSubform() {
    const id = "subform_" + (this.subforms.length + 1);
    const subform = new FormViewModel([], id, "", this);
    this.subforms.push(subform);
    this.selectForm(id);
  }

  selectForm(id: string) {
    this.currentForm?.unsetCurrent();
    var form = this.subforms.find(subform => subform.id === id);
    if (!form) form = this;
    this.currentForm = form;
    form.setCurrent();
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }

  get currentForm() {
    return this._currentForm;
  }

  set currentForm(value) {
    this._currentForm = value;
  }

  addSection() {
    const id = uuidv4();
    const section = new SectionViewModel(this, id, "Section ...");
    this.sections.push(section);
    this.selectSection(id);
  }

  deleteSection(id: string) {
    const index = this.sections.findIndex(it => it.id === id);
    if (index > -1) {
      this.sections.splice(index, 1);
      this.currentSection?.unsetCurrent();
      this.currentSection = undefined;
    }
  }

  selectSection(id: string) {
    this.currentSection?.unsetCurrent();
    this.currentSection = undefined;

    const section = this.sections.find(section => section.id === id);
    if (section) {
      this.currentSection = section;
      section.setCurrent();
      // Reset currently selected question
      section.selectQuestion("");
    }
  }

  parse(definition: Definition) {
    this.currentForm?.unsetCurrent();
    this._currentForm = this;
    this.currentSection?.unsetCurrent();
    this.currentSection = undefined;
    this._isSimulationMode = false;

    try {
      if (Array.isArray(definition.subforms)) {
        const subforms = Array<FormViewModel>();

        definition.subforms.forEach(formDefinition => {
          Object.entries(formDefinition).forEach(entry => {
            const [id, formDefinition] = entry;
            const formViewModel = new FormViewModel([], id, "", this);
            formViewModel.parse(formDefinition as Definition);
            subforms.push(formViewModel);
          });
        });
        this.subforms.splice(0, this.subforms.length, ...subforms);
      } else {
        this.subforms.splice(0, this.subforms.length);
      }

      if (Array.isArray(definition.sections)) {
        const sections = Array<SectionViewModel>();

        definition.sections.forEach(sectionDefinition => {
          const id = uuidv4();
          const sectionViewModel = new SectionViewModel(this, id, "Section");
          sectionViewModel.parse(sectionDefinition as Definition);
          sections.push(sectionViewModel);
        });
        this.sections.splice(0, this.sections.length, ...sections);
      } else {
        this.sections.splice(0, this.sections.length);
      }
    } catch (e) {
      if (e instanceof ParseError) {
        throw e;
      } else {
        throw new ParseError(
          "Error while building a form from given definition"
        );
      }
    }
  }

  toJson() {
    const json: Definition = {};
    const subforms = Array<Definition>();
    this.subforms.forEach(subform => {
      const value: Record<string, Definition> = {};
      value[subform.id] = subform.toJson();
      subforms.push(value);
    });
    json.subforms = subforms;

    const sections = Array<Definition>();
    this.sections.forEach(section => {
      sections.push(section.toJson());
    });
    json.sections = sections;
    return json;
  }

  get jsonString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }

  get isSimulationMode() {
    return this._isSimulationMode;
  }

  set isSimulationMode(isSimulationMode: boolean) {
    this._isSimulationMode = isSimulationMode;
    if (isSimulationMode) {
      this.formSimulation = new FormSimulationViewModel(this.jsonString);
    }
  }

  // Simplified form variables used in Description template / followup template
  // in Report type config
  get variableList(): Array<FormVariableItem> {
    let vars = Array<FormVariableItem>();
    // form variables
    this.sections.forEach(section => {
      section.questions.forEach(question => {
        question.fields.forEach(field => {
          if (field.name) {
            vars.push({
              label: field.name,
              // Use simplified value for display (postfixed with '__value').
              // Some real value is an object which cannot be displayed nicely as string.
              value: `data.${field.name}__value`,
              type: "Form data",
            });
          }
        });
      });
    });

    // add built-in variables
    vars = vars.concat(this.builtinVariables);

    return vars;
  }

  // Form variables used in Case Definition's condition config
  get conditionVariableList(): Array<FormVariableItem> {
    let vars = Array<FormVariableItem>();
    // form variables
    this.sections.forEach(section => {
      section.questions.forEach(question => {
        question.fields.forEach(field => {
          if (field.name) {
            vars.push({
              label: field.name,
              value: `data.${field.name}`,
              type: "Form data",
            });
          }
        });
      });
    });
    return vars;
  }
}
