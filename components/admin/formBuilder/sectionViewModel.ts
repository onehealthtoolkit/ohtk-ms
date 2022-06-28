import { Definition } from "components/admin/formBuilder/interfaces";
import { QuestionViewModel } from "components/admin/formBuilder/questionViewModel";
import { action, makeObservable, observable } from "mobx";

export class SectionViewModel {
  id = "";
  name = "";
  isCurrent = false;
  isNameEditing = false;

  questions = Array<QuestionViewModel>();

  constructor(id: string, name: string) {
    makeObservable(this, {
      id: observable,
      name: observable,
      isCurrent: observable,
      isNameEditing: observable,
      questions: observable,
      setCurrent: action,
      unsetCurrent: action,
      setIsNameEditing: action,
      setName: action,
      addQuestion: action,
    });

    this.id = id;
    this.name = name;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }

  setIsNameEditing(editing: boolean) {
    if (!editing && !this.name) {
      this.setName("...");
    }
    this.isNameEditing = editing;
  }

  setName(name: string) {
    this.name = name;
  }

  addQuestion() {
    const id = crypto.randomUUID();
    this.questions.push(new QuestionViewModel(id, "Question..."));
  }

  parse(definition: Definition): boolean {
    if (definition.label !== undefined) {
      this.name = definition.label as string;

      if (Array.isArray(definition.questions)) {
        const questions = Array<QuestionViewModel>();

        definition.questions.forEach(questionDefinition => {
          const id = crypto.randomUUID();
          const questionViewModel = new QuestionViewModel(id, "Question...");
          const success = questionViewModel.parse(questionDefinition);
          if (success) {
            questions.push(questionViewModel);
          }
        });
        this.questions.splice(0, this.questions.length, ...questions);
        return true;
      }
    }
    return false;
  }
}
