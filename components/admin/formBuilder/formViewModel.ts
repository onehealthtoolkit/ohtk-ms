import { SectionViewModel } from "components/admin/formBuilder/section";
import {
  Definition,
  MovableItemsViewModel,
  ParseError,
} from "components/admin/formBuilder/shared";
import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { action, computed, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class FormViewModel extends MovableItemsViewModel<SectionViewModel> {
  sections = Array<SectionViewModel>();
  currentSection: SectionViewModel | undefined = undefined;
  _isSimulationMode = false;
  formSimulation?: FormSimulationViewModel = undefined;

  constructor() {
    super("", "");
    makeObservable(this, {
      sections: observable,
      currentSection: observable,
      addSection: action,
      selectSection: action,
      parse: action,
      jsonString: computed,
      _isSimulationMode: observable,
      isSimulationMode: computed,
      formSimulation: observable,
    });
  }

  get movableItems() {
    return this.sections;
  }

  addSection() {
    const id = uuidv4();
    const section = new SectionViewModel(id, "Section ...");
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
    this.currentSection?.unsetCurrent();
    this.currentSection = undefined;
    this._isSimulationMode = false;

    try {
      if (Array.isArray(definition.sections)) {
        const sections = Array<SectionViewModel>();

        definition.sections.forEach(sectionDefinition => {
          const id = uuidv4();
          const sectionViewModel = new SectionViewModel(id, "Section");
          sectionViewModel.parse(sectionDefinition);
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
}
