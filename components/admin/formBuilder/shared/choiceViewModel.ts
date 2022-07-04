import { Definition } from "components/admin/formBuilder/shared/interfaces";
import { action, makeObservable, observable } from "mobx";

export class ChoiceViewModel {
  id: string = "";
  label: string = "";
  value: string = "";
  hasTextInput: boolean = false;
  isHovered = false;

  constructor(id: string, label: string) {
    makeObservable(this, {
      label: observable,
      value: observable,
      hasTextInput: observable,
      isHovered: observable,
      setLabel: action,
      setValue: action,
      setHasTextInput: action,
      setIsHovered: action,
    });
    this.id = id;
    this.label = label;
  }

  setLabel(label: string) {
    this.label = label;
  }

  setValue(value: string) {
    this.value = value;
  }

  setHasTextInput(hasTextInput: boolean) {
    this.hasTextInput = hasTextInput;
  }

  setIsHovered(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  parse(definition: Definition) {
    if (definition.label !== undefined) {
      this.label = definition.label as string;
    }
    if (definition.value !== undefined) {
      this.value = definition.value as string;
    }
    if (definition.textInput !== undefined) {
      this.hasTextInput = Boolean(definition.textInput);
    }
  }
}
