import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class SubformFieldViewModel extends AbstractDefinitionViewModel {
  formRef?: string = "";
  titleTemplate?: string = "";
  descriptionTemplate?: string = "";

  constructor() {
    super();
    makeObservable(this, {
      formRef: observable,
      titleTemplate: observable,
      descriptionTemplate: observable,
      setFormRef: action,
      setTitleTemplate: action,
      setDescriptionTemplate: action,
    });
  }

  setFormRef(value: string) {
    this.formRef = value || "";
  }

  setTitleTemplate(value: string) {
    this.titleTemplate = value || "";
  }

  setDescriptionTemplate(value: string) {
    this.descriptionTemplate = value || "";
  }

  parse(definition: Definition) {
    if (definition.formRef !== undefined) {
      this.formRef = String(definition.formRef);
    } else {
      this.formRef = "";
    }
    if (definition.titleTemplate !== undefined) {
      this.titleTemplate = String(definition.titleTemplate);
    } else {
      this.titleTemplate = "";
    }
    if (definition.descriptionTemplate !== undefined) {
      this.descriptionTemplate = String(definition.descriptionTemplate);
    } else {
      this.descriptionTemplate = "";
    }
  }

  toJson() {
    const json: Definition = {};
    if (this.formRef) {
      json.formRef = this.formRef;
    }
    if (this.titleTemplate) {
      json.titleTemplate = this.titleTemplate;
    }
    if (this.descriptionTemplate) {
      json.descriptionTemplate = this.descriptionTemplate;
    }
    return json;
  }
}
