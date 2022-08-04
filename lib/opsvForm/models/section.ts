import Form from "./form";
import Question from "./question";
import { Values } from "./values";
import * as _ from "fp-ts/Array";

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

  public loadJsonValue(json: Record<string, any>) {
    this.questions.forEach(question => question.loadJsonValue(json));
  }

  public toJsonValue(json: Record<string, any>) {
    this.questions.forEach(question => question.toJsonValue(json));
  }

  public validate(): boolean {
    return _.reduce<Question, boolean>(
      true,
      (acc, question) => question.validate() && acc
    )(this.questions);
  }
}
