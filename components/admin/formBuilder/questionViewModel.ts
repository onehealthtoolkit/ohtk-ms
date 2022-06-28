import { FieldViewModel } from "components/admin/formBuilder/fieldViewModel";
import { Definition } from "components/admin/formBuilder/interfaces";
import { action, makeObservable, observable } from "mobx";

export class QuestionViewModel {
  id = "";
  name = "";
  description = "description...";
  isNameEditing = false;
  isDescriptionEditing = false;
  isFieldMenusOpen = false;

  fields = Array<FieldViewModel>();

  constructor(id: string, name: string) {
    makeObservable(this, {
      id: observable,
      name: observable,
      description: observable,
      isNameEditing: observable,
      setIsNameEditing: action,
      setName: action,
      isDescriptionEditing: observable,
      setIsDescriptionEditing: action,
      setDescription: action,
      isFieldMenusOpen: observable,
      toggleFieldMenus: action,
      fields: observable,
      addField: action,
    });

    this.id = id;
    this.name = name;
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

  setIsDescriptionEditing(editing: boolean) {
    if (!editing && !this.description) {
      this.setDescription("...");
    }
    this.isDescriptionEditing = editing;
  }

  setDescription(description: string) {
    this.description = description;
  }

  toggleFieldMenus() {
    this.isFieldMenusOpen = !this.isFieldMenusOpen;
  }

  addField(type: string) {
    const id = crypto.randomUUID();
    this.fields.push(new FieldViewModel(id, "field...", type));
  }

  parse(definition: Definition): boolean {
    if (definition.label !== undefined) {
      this.name = definition.label as string;

      if (Array.isArray(definition.fields)) {
        const fields = Array<FieldViewModel>();

        definition.fields.forEach(fieldDefinition => {
          const id = crypto.randomUUID();
          const fieldViewModel = new FieldViewModel(id, "Field...");
          const success = fieldViewModel.parse(fieldDefinition);
          if (success) {
            fields.push(fieldViewModel);
          }
        });
        this.fields.splice(0, this.fields.length, ...fields);
        return true;
      }
    }
    return false;
  }
}
