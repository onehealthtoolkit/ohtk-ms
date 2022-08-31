import {
  AbstractDefinitionViewModel,
  ChoiceViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class SinglechoicesFieldViewModel extends AbstractDefinitionViewModel {
  choices = Array<ChoiceViewModel>();

  constructor() {
    super();
    makeObservable(this, {
      choices: observable,
      addChoice: action,
      deleteChoice: action,
    });
  }

  addChoice() {
    const id = uuidv4();
    this.choices.push(new ChoiceViewModel(id, "Choice"));
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
        const id = uuidv4();
        const choiceViewModel = new ChoiceViewModel(id, "Choice");
        choiceViewModel.parse(choiceDefinition);
        choices.push(choiceViewModel);
      });
      this.choices.splice(0, this.choices.length, ...choices);
    } else {
      this.choices.splice(0, this.choices.length);
    }
  }

  toJson() {
    const json: Definition = {};
    const choices = Array<Definition>();
    this.choices.forEach(choice => {
      const item = {
        label: choice.label,
        value: choice.value,
      } as { label: string; value: string; textInput?: boolean };

      if (choice.hasTextInput) {
        item.textInput = choice.hasTextInput;
      }
      choices.push(item);
    });
    json.options = choices;
    return json;
  }
}
