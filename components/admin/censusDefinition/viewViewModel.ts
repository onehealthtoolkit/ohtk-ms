import { BaseViewModel } from "lib/baseViewModel";
import {
  CensusDefinitionAdminState,
  CensusDefinitionVersion,
  CensusKind,
  CensusSchema,
  ICensusDefinitionService,
} from "lib/services/census";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export class CensusDefinitionViewViewModel extends BaseViewModel {
  _state: CensusDefinitionAdminState = {
    definitions: [],
    activeVersions: { ANIMAL: undefined, HUMAN: undefined },
  };

  schemaText: Record<CensusKind, string> = {
    ANIMAL: "",
    HUMAN: "",
  };

  constructor(readonly censusDefinitionService: ICensusDefinitionService) {
    super();
    makeObservable(this, {
      _state: observable,
      state: computed,
      versions: computed,
      schemaText: observable,
      fetch: action,
      ensureDefaults: action,
      publish: action,
      setSchemaText: action,
    });
    this.fetch();
  }

  get state(): CensusDefinitionAdminState {
    return this._state;
  }

  set state(value: CensusDefinitionAdminState) {
    this._state = value;
  }

  get versions(): CensusDefinitionVersion[] {
    return [
      this.state.activeVersions.ANIMAL,
      this.state.activeVersions.HUMAN,
    ].filter(Boolean) as CensusDefinitionVersion[];
  }

  setSchemaText(kind: CensusKind, value: string) {
    this.schemaText[kind] = value;
  }

  async fetch(force?: boolean) {
    this.isLoading = true;
    const result = await this.censusDefinitionService.fetchAdminState(force);
    runInAction(() => {
      if (result.data) {
        this.applyState(result.data);
        this.setErrorMessage(undefined);
      } else {
        this.setErrorMessage(result.error);
      }
      this.isLoading = false;
    });
  }

  async ensureDefaults(resetSchema: boolean = false) {
    this.isSubmitting = true;
    const result =
      await this.censusDefinitionService.ensureDefaults(resetSchema);
    runInAction(() => {
      if (result.success) {
        this.fetch(true);
        this.submitError = "";
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  async publish(kind: CensusKind) {
    let parsedSchema: CensusSchema;
    try {
      parsedSchema = JSON.parse(this.schemaText[kind] || "{}");
    } catch {
      this.submitError = `${kind} schema must be valid JSON.`;
      return;
    }

    this.isSubmitting = true;
    const result = await this.censusDefinitionService.publishVersion(
      kind,
      parsedSchema,
      true
    );
    runInAction(() => {
      if (result.success) {
        this.fetch(true);
        this.submitError = "";
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  private applyState(state: CensusDefinitionAdminState) {
    this.state = state;
    this.schemaText.ANIMAL = this.formatSchema(state.activeVersions.ANIMAL);
    this.schemaText.HUMAN = this.formatSchema(state.activeVersions.HUMAN);
  }

  private formatSchema(version?: CensusDefinitionVersion) {
    return JSON.stringify(version?.schema ?? {}, null, 2);
  }
}
