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

  publishSuccess:
    | {
        kind: CensusKind;
        version?: number;
      }
    | undefined = undefined;

  constructor(readonly censusDefinitionService: ICensusDefinitionService) {
    super();
    makeObservable(this, {
      _state: observable,
      state: computed,
      versions: computed,
      schemaText: observable,
      publishSuccess: observable,
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
    this.publishSuccess = undefined;
  }

  activeVersionFor(kind: CensusKind): CensusDefinitionVersion | undefined {
    return this.state.activeVersions[kind];
  }

  hasSchemaEdits(kind: CensusKind): boolean {
    const activeVersion = this.activeVersionFor(kind);
    if (!activeVersion && !this.schemaText[kind].trim()) {
      return false;
    }
    return this.schemaText[kind].trim() !== this.formatSchema(activeVersion);
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
        this.publishSuccess = undefined;
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  async publish(kind: CensusKind) {
    this.publishSuccess = undefined;
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
        this.publishSuccess = {
          kind,
          version: result.data?.version,
        };
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
