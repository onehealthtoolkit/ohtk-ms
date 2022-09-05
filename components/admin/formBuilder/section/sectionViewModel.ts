import { QuestionViewModel } from "components/admin/formBuilder/question";
import {
  Definition,
  MovableItemsViewModel,
  ParseError,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

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
    this.currentQuestion?.unsetCurrent();
    this.currentQuestion = undefined;

    const question = this.questions.find(question => question.id === id);
    if (question) {
      this.currentQuestion = question;
      question.setCurrent();
      // Reset currently selected field
      question.selectField("");
    }
  }

  addQuestion() {
    const id = uuidv4();
    this.questions.push(new QuestionViewModel(id, "Question"));
    this.selectQuestion(id);
  }

  deleteQuestion(id: string) {
    const index = this.questions.findIndex(it => it.id === id);
    if (index > -1) {
      this.questions.splice(index, 1);
    }
  }

  parse(definition: Definition) {
    try {
      if (definition.label !== undefined) {
        this.label = definition.label as string;
      } else {
        this.label = "Section";
      }

      if (Array.isArray(definition.questions)) {
        const questions = Array<QuestionViewModel>();

        definition.questions.forEach(questionDefinition => {
          const id = uuidv4();
          const questionViewModel = new QuestionViewModel(id, "Question");
          questionViewModel.parse(questionDefinition);
          questions.push(questionViewModel);
        });
        this.questions.splice(0, this.questions.length, ...questions);
      } else {
        this.questions.splice(0, this.questions.length);
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

  toJson() {
    const json: Definition = {
      label: this.label,
    };
    const questions = Array<Definition>();
    this.questions.forEach(question => {
      questions.push(question.toJson());
    });
    json.questions = questions;
    return json;
  }
}
