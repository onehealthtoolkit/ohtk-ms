import {
  ChoiceViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class SinglechoicesFieldViewModel {
  choices = Array<ChoiceViewModel>();

  constructor() {
    makeObservable(this, {
      choices: observable,
      addChoice: action,
      deleteChoice: action,
    });
  }

  addChoice() {
    const id = crypto.randomUUID();
    this.choices.push(new ChoiceViewModel(id, "choice..."));
  }

  deleteChoice(id: string) {
    const choiceIndex = this.choices.findIndex(choice => choice.id === id);
    if (choiceIndex > -1) {
      this.choices.splice(choiceIndex, 1);
    }
  }

  parse(definition: Definition) {
    if (Array.isArray(definition.options)) {
      const choices = Array<ChoiceViewModel>();

      definition.options.forEach(choiceDefinition => {
        const id = crypto.randomUUID();
        const choiceViewModel = new ChoiceViewModel(id, "choice...");
        choiceViewModel.parse(choiceDefinition);
        choices.push(choiceViewModel);
      });
      this.choices.splice(0, this.choices.length, ...choices);
    }
  }
}
