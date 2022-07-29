import { makeObservable, observable } from "mobx";
import Section from "./section";
import { Values } from "./values";

export default class Form {
  sections: Section[] = [];
  values: Values = new Values();

  _currentSectionIdx: number = 0;

  constructor(readonly id: string) {
    makeObservable(this, {
      _currentSectionIdx: observable,
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
}
