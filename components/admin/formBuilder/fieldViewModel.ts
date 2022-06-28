import { Definition } from "components/admin/formBuilder/interfaces";
import { action, makeObservable, observable } from "mobx";

export const FIELD_TYPES = ["text", "integer", "date", "singlechoices"];

export class FieldViewModel {
  id = "";
  label = "";
  name = "";
  fieldType = "";
  isNameEditing = false;

  constructor(id: string, name: string, fieldType = "text") {
    makeObservable(this, {
      id: observable,
      label: observable,
      name: observable,
      fieldType: observable,
      isNameEditing: observable,
      setIsNameEditing: action,
      setName: action,
    });

    this.id = id;
    this.label = name;
    this.name = name;
    this.fieldType = fieldType;
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

  parse(definition: Definition): boolean {
    if (
      definition.id !== undefined &&
      definition.name !== undefined &&
      definition.type !== undefined
    ) {
      this.id = definition.id as string;
      this.label = definition.label as string;
      this.name = definition.name as string;
      this.fieldType = definition.type as string;

      return true;
    }
    return false;
  }
}
