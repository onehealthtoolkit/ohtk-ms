import { FormBuilderDialogViewModel } from "components/admin/formBuilder/shared";
import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";

type DialogMap = ObservableMap<string, FormBuilderDialogViewModel>;

export class BaseViewModel {
  id = "";
  label = "";
  description = "description...";
  isLabelEditing = false;
  isDescriptionEditing = false;
  _isHovered = false;

  dialogs: DialogMap = observable.map({});

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
      registerDialog: action,
      unregisterDialog: action,
      dialog: computed,
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

  /**
   * Manage all modal dialogs references and handle their viewModel states.
   * Each dialog's viewModel is referenced through key in dialog map
   */

  registerDialog(name: string): FormBuilderDialogViewModel | undefined {
    this.dialogs.set(name, new FormBuilderDialogViewModel());
    return this.dialog(name);
  }

  unregisterDialog(name: string) {
    this.dialogs.delete(name);
  }

  get dialog() {
    return (name: string) => {
      return this.dialogs.get(name);
    };
  }

  closeAllDialogs() {
    this.dialogs.forEach(dialog => dialog.close());
  }
}
