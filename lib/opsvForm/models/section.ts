import Form from "./form";
import Question from "./question";
import { Values } from "./values";

export default class Section {
  form?: Form;
  questions: Question[] = [];

  constructor(readonly label: string, readonly description?: string) {}

  public registerValues(values: Values, form?: Form) {
    this.form = form;
    this.questions.forEach(question => {
      question.registerValues(values, form);
    });
  }
}
