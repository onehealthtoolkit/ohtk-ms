import { FormViewModel } from "components/admin/formBuilder/formViewModel";
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
  _form: FormViewModel;

  constructor(form: FormViewModel, id: string, label: string) {
    super(id, label);
    makeObservable(this, {
      isCurrent: observable,
      questions: observable,
      setCurrent: action,
      unsetCurrent: action,
      currentQuestion: observable,
      selectQuestion: action,
      addQuestion: action,
      moveQuestion: action,
    });
    this._form = form;
  }

  get movableItems() {
    return this.questions;
  }

  get form(): FormViewModel {
    return this._form;
  }
  set form(form: FormViewModel) {
    this._form = form;
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
      question.selectField(question.fields.length ? question.fields[0].id : "");
    }
  }

  addQuestion() {
    const id = uuidv4();
    this.questions.push(new QuestionViewModel(this, id, "Question"));
    this.selectQuestion(id);
  }

  deleteQuestion(id: string) {
    const index = this.questions.findIndex(it => it.id === id);
    if (index > -1) {
      this.questions.splice(index, 1);
    }
  }

  moveQuestion(fromIndex: number, toIndex: number) {
    const copyListItems = [...this.questions];
    const dragItemContent = copyListItems[fromIndex];
    copyListItems.splice(fromIndex, 1);
    copyListItems.splice(toIndex, 0, dragItemContent);
    this.questions = copyListItems;
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
          const questionViewModel = new QuestionViewModel(this, id, "Question");
          questionViewModel.parse(questionDefinition as Definition);
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
