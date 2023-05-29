import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { CaseDefinition } from "lib/services/caseDefinition";
import { ICaseDefinitionService } from "lib/services/caseDefinition/caseDefinitionService";
import { SaveResult } from "lib/services/interface";

export class AdminCaseDefinitionListViewModel extends BaseViewModel {
  data: CaseDefinition[] = [];

  nameSearch: string = "";

  constructor(readonly caseDefinitionService: ICaseDefinitionService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.caseDefinitionService.fetchCaseDefinitions(
      this.limit,
      this.offset,
      this.nameSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.caseDefinitionService.deleteCaseDefinition(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async exportCaseDefinition(id: string) {
    this.isLoading = true;
    const data = await (
      await this.caseDefinitionService.getCaseDefinition(id)
    ).data;
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data, null, 2))
      );
      element.setAttribute(
        "download",
        `case-definition--${data.description}.json`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importCaseDefinition(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as CaseDefinition;

    const caseDefinition = await (
      await this.caseDefinitionService.getCaseDefinition(data.id)
    ).data;
    var result;
    if (caseDefinition) {
      result = await this._updateCaseDefinition(data);
    } else {
      result = await this._createCaseDefinition(data);
    }

    this.isSubmitting = false;

    if (!result.success) {
      if (result.message) {
        this.submitError = "Import errors : " + result.message;
      }
      if (result.fields) {
        this.submitError =
          "Import errors : " + Object.values(result.fields).join(",");
      }
    }
    return result.success;
  }

  _createCaseDefinition(
    data: CaseDefinition
  ): Promise<SaveResult<CaseDefinition>> {
    return this.caseDefinitionService.createCaseDefinition(
      data.reportTypeId,
      data.description,
      data.condition
    );
  }

  _updateCaseDefinition(
    data: CaseDefinition
  ): Promise<SaveResult<CaseDefinition>> {
    return this.caseDefinitionService.updateCaseDefinition(
      data.id,
      data.reportTypeId,
      data.description,
      data.condition
    );
  }
}
