import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";
import { SaveResult } from "lib/services/interface";
import { IStateStepService, StateStep } from "lib/services/stateStep";
import {
  IStateTransitionService,
  StateTransition,
} from "lib/services/stateTransition";

export class AdminStateDefinitionListViewModel extends BaseViewModel {
  data: StateDefinition[] = [];

  nameSearch: string = "";

  constructor(
    readonly stateDefinitionService: IStateDefinitionService,
    readonly stateStepService: IStateStepService,
    readonly stateTransitionService: IStateTransitionService
  ) {
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
    const result = await this.stateDefinitionService.fetchStateDefinitions(
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
    const result = await this.stateDefinitionService.deleteStateDefinition(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async exportStateDefinition(id: string) {
    this.isLoading = true;
    const data = await (
      await this.stateDefinitionService.getStateDefinition(id)
    ).data;
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data, null, 2))
      );
      element.setAttribute("download", `state-definition-${data.name}.json`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importStateDefinition(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as StateDefinition;
    if (!data.name) {
      this.submitError = "Import errors : Name is required.";
      this.isSubmitting = false;
      return false;
    }

    var stateDefinition: StateDefinition | undefined;
    if (data.id)
      stateDefinition = await (
        await this.stateDefinitionService.getStateDefinition(data.id)
      ).data;

    if (!stateDefinition) {
      stateDefinition = await this.stateDefinitionService.findByName(data.name);
      if (stateDefinition) {
        data.id = stateDefinition.id;
        stateDefinition = await (
          await this.stateDefinitionService.getStateDefinition(
            stateDefinition.id
          )
        ).data;
      }
    }

    var result;
    if (stateDefinition) {
      result = await this._updateStateDefinition(data);
    } else {
      result = await this._createStateDefinition(data);
    }

    if (!result.success) {
      this.submitError = "Import errors : " + result.message;
      if (result.message) {
        this.submitError = "Import errors : " + result.message;
      }
      if (result.fields) {
        const msg = Object.values(result.fields).join(",");
        if (msg) this.submitError = "Import errors : " + msg;
      }
      return result.success;
    }
    if (result.data) {
      let errors: string[] = [];
      const stateDefinitionId = result.data?.id!;
      if (stateDefinition) {
        // update stateStep, stateTransition
        if (data.stateSteps) {
          const stateSteps = stateDefinition.stateSteps || [];
          var stateStep: StateStep | undefined;
          for (var stepData of data.stateSteps) {
            stateStep = stateSteps.find(item => item.id == stepData.id);
            if (stateStep)
              result = await this._updateStateStep(stateDefinitionId, stepData);
            else
              result = await this._createStateStep(stateDefinitionId, stepData);
            this.errorHandler(errors, result);
          }
          // remove if not exists
          const objCleans = stateSteps.filter(
            item => data.stateSteps!.findIndex(it => it.id == item.id) < 0
          );
          for (var objClean of objCleans) {
            await this.stateStepService.deleteStateStep(
              objClean.id,
              stateDefinition.id
            );
          }
        }
        if (data.stateTransitions) {
          stateDefinition = await (
            await this.stateDefinitionService.getStateDefinition(
              stateDefinitionId
            )
          ).data!;
          const stateTransitions = stateDefinition.stateTransitions || [];
          var stateTransition: StateTransition | undefined;
          for (var transitionData of data.stateTransitions) {
            stateTransition = stateTransitions.find(
              item => item.id == transitionData.id
            );
            fromStep = stateDefinition.stateSteps?.find(
              it =>
                it.id == transitionData.fromStep.id ||
                it.name == transitionData.fromStep.name
            );
            toStep = stateDefinition.stateSteps?.find(
              it =>
                it.id == transitionData.toStep.id ||
                it.name == transitionData.toStep.name
            );
            if (fromStep && toStep) {
              transitionData.fromStep.id = fromStep.id;
              transitionData.toStep.id = toStep.id;
              if (stateTransition)
                result = await this._updateStateTransition(
                  stateDefinitionId,
                  transitionData
                );
              else
                result = await this._createStateTransition(
                  stateDefinitionId,
                  transitionData
                );
              this.errorHandler(errors, result);
            }
          }

          // remove if not exists
          const objCleans = stateTransitions.filter(
            item => data.stateTransitions!.findIndex(it => it.id == item.id) < 0
          );
          for (var itemClean of objCleans) {
            result = await this.stateStepService.deleteStateStep(
              itemClean.id,
              stateDefinition.id
            );
            this.errorHandler(errors, result);
          }
        }
      } else {
        // create stateStep, stateTransition
        if (data.stateSteps) {
          for (var stepData of data.stateSteps) {
            result = await this._createStateStep(stateDefinitionId, stepData);
            this.errorHandler(errors, result);
          }
        }
        if (data.stateTransitions) {
          stateDefinition = await (result =
            await this.stateDefinitionService.getStateDefinition(
              stateDefinitionId
            )).data!;
          var fromStep, toStep;
          for (var transitionData of data.stateTransitions) {
            fromStep = stateDefinition.stateSteps?.find(
              it => it.name == transitionData.fromStep.name
            );
            toStep = stateDefinition.stateSteps?.find(
              it => it.name == transitionData.toStep.name
            );
            if (fromStep && toStep) {
              transitionData.fromStep.id = fromStep.id;
              transitionData.toStep.id = toStep.id;
              result = await this._createStateTransition(
                stateDefinitionId,
                transitionData
              );
              this.errorHandler(errors, result);
            }
          }
        }
      }
      if (errors.length) {
        this.submitError =
          "Import success with warnings : " + errors.join(", ");
      }
    }

    this.isSubmitting = false;
    return true;
  }

  _createStateDefinition(
    data: StateDefinition
  ): Promise<SaveResult<StateDefinition>> {
    return this.stateDefinitionService.createStateDefinition(
      data.name,
      data.isDefault
    );
  }

  _updateStateDefinition(
    data: StateDefinition
  ): Promise<SaveResult<StateDefinition>> {
    return this.stateDefinitionService.updateStateDefinition(
      data.id,
      data.name,
      data.isDefault
    );
  }

  _createStateStep(
    stateDefinitionId: string,
    data: StateStep
  ): Promise<SaveResult<StateStep>> {
    return this.stateStepService.createStateStep(
      data.name,
      data.isStartState,
      data.isStopState,
      stateDefinitionId
    );
  }

  _updateStateStep(
    stateDefinitionId: string,
    data: StateStep
  ): Promise<SaveResult<StateStep>> {
    return this.stateStepService.updateStateStep(
      data.id,
      data.name,
      data.isStartState,
      data.isStopState,
      stateDefinitionId
    );
  }

  _createStateTransition(
    stateDefinitionId: string,
    data: StateTransition
  ): Promise<SaveResult<StateTransition>> {
    return this.stateTransitionService.createStateTransition(
      data.formDefinition,
      data.fromStep.id,
      data.toStep.id,
      stateDefinitionId
    );
  }

  _updateStateTransition(
    stateDefinitionId: string,
    data: StateTransition
  ): Promise<SaveResult<StateTransition>> {
    return this.stateTransitionService.updateStateTransition(
      data.id,
      data.formDefinition,
      data.fromStep.id,
      data.toStep.id,
      stateDefinitionId
    );
  }

  errorHandler(errors: string[], result: any) {
    if (result.message) {
      errors.push(result.message);
    }
    if (result.fields) {
      const msg = Object.values(result.fields).join(",");
      if (msg) errors.push(msg);
    }
  }
}
