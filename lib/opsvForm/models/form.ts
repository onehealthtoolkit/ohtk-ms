import { action, computed, makeObservable, observable } from "mobx";
import Field from "./fields";
import Section from "./section";
import { Values } from "./values";
import { v4 as uuidv4 } from "uuid";

export type FormImageMap = {
  [id: string]: string; // uuid : base64-encoded image
};

export type FormFileMap = {
  [id: string]: File; // uuid : file object
};

export default class Form {
  subforms: Form[] = [];
  sections: Section[] = [];
  values: Values = new Values();
  images: { [fieldName: string]: FormImageMap } = {};
  files: { [fieldName: string]: FormFileMap } = {};

  _currentSectionIdx: number = 0;

  constructor(readonly id: string) {
    makeObservable(this, {
      _currentSectionIdx: observable,
      currentSection: computed,
      currentSecitonIdx: computed,
      couldGoToNextSection: computed,
      couldGoToPreviousSection: computed,
      next: action,
      previous: action,
      images: observable,
      addImage: action,
      removeImage: action,
      files: observable,
      addFile: action,
      removeFile: action,
    });
  }

  public registerValues() {
    this.sections.forEach(section => {
      section.registerValues(this.values, this);
    });
    return this.values;
  }

  public get numberOfSections() {
    return this.sections.length;
  }

  public get currentSectionIdx() {
    return this._currentSectionIdx;
  }

  public loadJsonValue(json: Record<string, any>) {
    // this.subforms.forEach(subform => {
    //   console.log(
    //     "subform loadJsonValue",
    //     subform,
    //     json["subform_var_sub1"]["f1"]
    //   );
    //   subform.loadJsonValue(json["subform_var_sub1"]);
    // });
    this.sections.forEach(section => section.loadJsonValue(json));
  }

  public toJsonValue(): Record<string, any> {
    const json: Record<string, any> = {};
    this.subforms.forEach(subform => subform.toJsonValue());
    this.sections.forEach(section => section.toJsonValue(json));
    return json;
  }

  get currentSecitonIdx(): number {
    return this._currentSectionIdx;
  }

  get currentSection(): Section {
    return this.sections[this._currentSectionIdx];
  }

  get couldGoToNextSection(): boolean {
    return this._currentSectionIdx < this.sections.length - 1;
  }

  get couldGoToPreviousSection(): boolean {
    return this._currentSectionIdx > 0;
  }

  public next(): boolean {
    if (this.couldGoToNextSection) {
      if (this.currentSection.validate()) {
        this._currentSectionIdx++;
        return true;
      }
    }
    return false;
  }

  public previous(): boolean {
    if (this.couldGoToPreviousSection) {
      this._currentSectionIdx--;
      return true;
    }
    return false;
  }

  public getField<T extends Field>(name: string): T {
    return this.values.getDelegate(name).getField() as T;
  }

  addImage(fieldName: string, base64: string): string {
    const id = uuidv4();
    if (!this.images[fieldName]) {
      this.images[fieldName] = {};
    }
    this.images[fieldName][id] = base64;
    return id;
  }

  removeImage(fieldName: string, id: string) {
    if (this.images[fieldName]) {
      delete this.images[fieldName][id];
    }
  }

  addFile(fieldName: string, file: File): string {
    const id = uuidv4();
    if (!this.files[fieldName]) {
      this.files[fieldName] = {};
    }
    this.files[fieldName][id] = file;
    return id;
  }

  removeFile(fieldName: string, id: string) {
    if (this.files[fieldName]) {
      delete this.files[fieldName][id];
    }
  }
}
