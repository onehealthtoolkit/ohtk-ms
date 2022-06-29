import { SectionViewModel } from "components/admin/formBuilder/section";
import {
  Definition,
  MovableItemsViewModel,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class FormViewModel extends MovableItemsViewModel<SectionViewModel> {
  sections = Array<SectionViewModel>();
  currentSection: SectionViewModel | undefined = undefined;

  constructor() {
    super("", "");
    makeObservable(this, {
      sections: observable,
      currentSection: observable,
      addSection: action,
      selectSection: action,
      setCurrentSection: action,
      unsetCurrentSection: action,
    });
  }

  get movableItems() {
    return this.sections;
  }

  addSection() {
    const id = crypto.randomUUID();
    const section = new SectionViewModel(id, "Section ...");
    this.sections.push(section);
  }

  selectSection(id: string) {
    const section = this.sections.find(section => section.id === id);
    if (section) {
      this.unsetCurrentSection();
      this.setCurrentSection(section);
    }
  }

  setCurrentSection(section: SectionViewModel) {
    this.currentSection = section;
    section.setCurrent();
  }

  unsetCurrentSection() {
    this.currentSection?.unsetCurrent();
    this.currentSection = undefined;
  }

  parse(definition: Definition): boolean {
    if (Array.isArray(definition.sections)) {
      const sections = Array<SectionViewModel>();

      definition.sections.forEach(sectionDefinition => {
        const id = crypto.randomUUID();
        const sectionViewModel = new SectionViewModel(id, "Section...");
        const success = sectionViewModel.parse(sectionDefinition);
        if (success) {
          sections.push(sectionViewModel);
        }
      });
      this.sections.splice(0, this.sections.length, ...sections);
      return true;
    }
    return false;
  }
}
