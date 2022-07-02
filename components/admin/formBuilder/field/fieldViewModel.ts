import {
  DecimalFieldViewModel,
  IntegerFieldViewModel,
  TextFieldViewModel,
} from "components/admin/formBuilder/field/extensions";
import {
  BaseViewModel,
  Definition,
  ParseError,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export const FIELD_TYPES = [
  "text",
  "integer",
  "decimal",
  "date",
  "images",
  "location",
  "singlechoices",
  "multiplechoices",
] as const;

export type TFieldValueType = typeof FIELD_TYPES[number];
export type TFieldExtensionType<T> = T extends "text"
  ? TextFieldViewModel
  : T extends "integer"
  ? IntegerFieldViewModel
  : T extends "decimal"
  ? DecimalFieldViewModel
  : never;

export class FieldViewModel extends BaseViewModel {
  isCurrent = false;
  name = "";
  fieldType: TFieldValueType = "text";
  isNameEditing = false;
  isRequired = false;
  isAdvanceOn = false;
  _extension: unknown = undefined;

  constructor(id: string, label: string, type: TFieldValueType = "text") {
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
      isRequired: observable,
      toggleRequired: action,
      isAdvanceOn: observable,
      toggleAdvanceOn: action,
      _extension: observable,
    });
    this.fieldType = type;
    this.name = "name";
    this._extension = this.constructExtension(type);
  }

  constructExtension(type: string): TFieldExtensionType<TFieldValueType> {
    switch (type) {
      case "text":
        return new TextFieldViewModel();
      case "integer":
        return new IntegerFieldViewModel();
      case "decimal":
        return new DecimalFieldViewModel();
      default:
        return new TextFieldViewModel();
    }
  }

  getExtension<T>() {
    return this._extension as TFieldExtensionType<T>;
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
    this.closeAllDialogs();
  }

  toggleRequired() {
    return (this.isRequired = !this.isRequired);
  }

  toggleAdvanceOn() {
    return (this.isAdvanceOn = !this.isAdvanceOn);
  }

  parse(definition: Definition) {
    try {
      if (definition.label !== undefined) {
        this.label = definition.label as string;
      }

      if (definition.name !== undefined && definition.type !== undefined) {
        this.name = definition.name as string;
        this.fieldType = definition.type as TFieldValueType;
      } else {
        throw new ParseError(
          "Error while building a field without name or type"
        );
      }
    } catch (e) {
      if (e instanceof ParseError) {
        throw e;
      } else {
        throw new ParseError(
          "Error while building a field with name: " + definition.name
        );
      }
    }
  }
}
