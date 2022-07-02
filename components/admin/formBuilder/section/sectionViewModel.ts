import { QuestionViewModel } from "components/admin/formBuilder/question";
import {
  Definition,
  MovableItemsViewModel,
  ParseError,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class SectionViewModel extends MovableItemsViewModel<QuestionViewModel> {
  isCurrent = false;
  questions = Array<QuestionViewModel>();
  currentQuestion: QuestionViewModel | undefined = undefined;

  constructor(id: string, label: string) {
    super(id, label);
    makeObservable(this, {
      isCurrent: observable,
      questions: observable,
      setCurrent: action,
      unsetCurrent: action,
      currentQuestion: observable,
      selectQuestion: action,
      addQuestion: action,
    });
  }

  get movableItems() {
    return this.questions;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }

  selectQuestion(id: string) {
    const question = this.questions.find(question => question.id === id);
    if (question) {
      this.currentQuestion?.unsetCurrent();
      this.currentQuestion = question;
      question.setCurrent();
    }
  }

  addQuestion() {
    const id = crypto.randomUUID();
    this.questions.push(new QuestionViewModel(id, "Question..."));
  }

  parse(definition: Definition) {
    try {
      if (definition.label !== undefined) {
        this.label = definition.label as string;
      }

      if (Array.isArray(definition.questions)) {
        const questions = Array<QuestionViewModel>();

        definition.questions.forEach(questionDefinition => {
          const id = crypto.randomUUID();
          const questionViewModel = new QuestionViewModel(id, "Question...");
          questionViewModel.parse(questionDefinition);
          questions.push(questionViewModel);
        });
        this.questions.splice(0, this.questions.length, ...questions);
        return true;
      }
    } catch (e) {
      if (e instanceof ParseError) {
        throw new ParseError(e.message + " << section: " + definition.label);
      } else {
        throw new ParseError(
          "Error while building a section with label: " + definition.label
        );
      }
    }
  }
}
