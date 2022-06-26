import { action, makeObservable, observable } from "mobx";

export class SectionViewModel {
  id = "";
  name = "";
  isCurrent = false;
  isNameEditing = false;

  constructor(id: string, name: string) {
    makeObservable(this, {
      id: observable,
      name: observable,
      isCurrent: observable,
      isNameEditing: observable,
      setCurrent: action,
      unsetCurrent: action,
      setIsNameEditing: action,
      setName: action,
    });

    this.id = id;
    this.name = name;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
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
}
