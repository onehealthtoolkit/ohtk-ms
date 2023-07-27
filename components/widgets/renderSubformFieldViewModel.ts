import { BaseFormViewModel } from "lib/baseFormViewModel";
import { action, computed, makeObservable, observable } from "mobx";

export class RenderSubformFieldViewModel extends BaseFormViewModel {
  _definitionView: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      _definitionView: observable,
      definitionView: computed,
      setDefinitionView: action,
    });
  }

  public get definitionView(): boolean {
    return this._definitionView;
  }

  public set definitionView(value: boolean) {
    this._definitionView = value;
  }

  public setDefinitionView(value: boolean) {
    this.definitionView = value;
  }
}
