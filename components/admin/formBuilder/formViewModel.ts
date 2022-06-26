import { SectionViewModel } from "components/admin/formBuilder/sectionViewModel";
import { action, makeObservable, observable } from "mobx";

export class FormViewModel {
  sections = Array<SectionViewModel>();
  currentSection: SectionViewModel | undefined = undefined;

  constructor() {
    makeObservable(this, {
      sections: observable,
      currentSection: observable,
      addSection: action,
      selectSection: action,
      setCurrentSection: action,
      unsetCurrentSection: action,
      moveSectionUp: action,
      moveSectionDown: action,
    });
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

  moveSectionUp(sectionId: string) {
    this.moveSection(sectionId, -1);
  }

  moveSectionDown(sectionId: string) {
    this.moveSection(sectionId, 1);
  }

  private moveSection(sectionId: string, step: number) {
    const sectionIndex = this.sections.findIndex(
      section => section.id === sectionId
    );
    if (sectionIndex > -1) {
      const newIndex = sectionIndex + step;
      if (newIndex >= 0 && newIndex < this.sections.length) {
        const tempSection = this.sections.splice(sectionIndex, 1)[0];
        this.sections.splice(newIndex, 0, tempSection);
      }
    }
  }
}
