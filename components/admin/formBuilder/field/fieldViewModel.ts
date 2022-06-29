import { BaseViewModel, Definition } from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export const FIELD_TYPES = ["text", "integer", "date", "singlechoices"];

export class FieldViewModel extends BaseViewModel {
  isCurrent = false;
  name = "";
  fieldType = "text";
  isNameEditing = false;

  constructor(id: string, label: string, type: string) {
    super(id, label);
    makeObservable(this, {
      name: observable,
      fieldType: observable,
      isCurrent: observable,
      isNameEditing: observable,
      setIsNameEditing: action,
      setName: action,
      setCurrent: action,
      unsetCurrent: action,
    });
    this.fieldType = type;
    this.name = "name";
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

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }

  parse(definition: Definition): boolean {
    if (definition.name !== undefined && definition.type !== undefined) {
      this.label = definition.label as string;
      this.name = definition.name as string;
      this.fieldType = definition.type as string;

      return true;
    }
    return false;
  }
}
