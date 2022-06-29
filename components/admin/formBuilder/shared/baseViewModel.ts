import { action, computed, makeObservable, observable } from "mobx";

export class BaseViewModel {
  id = "";
  label = "";
  description = "description...";
  isLabelEditing = false;
  isDescriptionEditing = false;
  _isHovered = false;

  constructor(id: string, label: string) {
    makeObservable(this, {
      id: observable,
      label: observable,
      description: observable,
      isLabelEditing: observable,
      setIsLabelEditing: action,
      setLabel: action,
      isDescriptionEditing: observable,
      setIsDescriptionEditing: action,
      setDescription: action,
      _isHovered: observable,
      isHovered: computed,
    });

    this.id = id;
    this.label = label;
  }

  setIsLabelEditing(editing: boolean) {
    if (!editing && !this.label) {
      this.setLabel("...");
    }
    this.isLabelEditing = editing;
  }

  setLabel(label: string) {
    this.label = label;
  }

  setIsDescriptionEditing(editing: boolean) {
    if (!editing && !this.description) {
      this.setDescription("...");
    }
    this.isDescriptionEditing = editing;
  }

  setDescription(description: string) {
    this.description = description;
  }

  get isHovered() {
    return this._isHovered;
  }
  set isHovered(isHovered: boolean) {
    this._isHovered = isHovered;
  }
}
