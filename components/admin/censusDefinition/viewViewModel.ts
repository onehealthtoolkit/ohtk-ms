import { BaseViewModel } from "lib/baseViewModel";
import {
  CensusDefinition,
  CensusDefinitionAdminState,
  CensusDefinitionAuthoredSchema,
  CensusDefinitionVersion,
  CensusKind,
  ICensusDefinitionService,
} from "lib/services/census";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

const censusKinds: CensusKind[] = ["ANIMAL", "HUMAN"];

export type CensusDefinitionAdminRow = {
  id: string;
  kind: CensusKind;
  enabled: boolean;
  activeVersion?: CensusDefinitionVersion;
};

export class CensusDefinitionViewViewModel extends BaseViewModel {
  _state: CensusDefinitionAdminState = {
    definitions: [],
    activeVersions: { ANIMAL: undefined, HUMAN: undefined },
    draftVersions: { ANIMAL: undefined, HUMAN: undefined },
  };

  schemaText: Record<CensusKind, string> = {
    ANIMAL: "",
    HUMAN: "",
  };

  schemaValid: Record<CensusKind, boolean> = {
    ANIMAL: true,
    HUMAN: true,
  };

  publishSuccess:
    | {
        kind: CensusKind;
        version?: number;
      }
    | undefined = undefined;

  saveSuccess:
    | {
        kind: CensusKind;
        version?: number;
      }
    | undefined = undefined;

  statusSuccess:
    | {
        kind: CensusKind;
        enabled: boolean;
      }
    | undefined = undefined;

  constructor(readonly censusDefinitionService: ICensusDefinitionService) {
    super();
    makeObservable(this, {
      _state: observable,
      state: computed,
      versions: computed,
      rows: computed,
      schemaText: observable,
      schemaValid: observable,
      publishSuccess: observable,
      saveSuccess: observable,
      statusSuccess: observable,
      fetch: action,
      ensureDefaults: action,
      saveDraft: action,
      publish: action,
      setEnabled: action,
      setSchemaText: action,
      setSchemaDraft: action,
      setSchemaValid: action,
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

  get rows(): CensusDefinitionAdminRow[] {
    return censusKinds.map(kind => {
      const definition = this.definitionFor(kind);
      const activeVersion = this.activeVersionFor(kind);
      return {
        id: definition?.id ?? activeVersion?.definition.id ?? kind,
        kind,
        enabled: this.isKindEnabled(kind),
        activeVersion,
      };
    });
  }

  setSchemaText(kind: CensusKind, value: string) {
    this.schemaText[kind] = value;
    this.publishSuccess = undefined;
    this.saveSuccess = undefined;
    this.statusSuccess = undefined;
  }

  setSchemaDraft(kind: CensusKind, value: CensusDefinitionAuthoredSchema) {
    this.setSchemaText(kind, JSON.stringify(value, null, 2));
  }

  setSchemaValid(kind: CensusKind, value: boolean) {
    if (this.schemaValid[kind] === value) {
      return;
    }
    this.schemaValid[kind] = value;
  }

  schemaDraftFor(kind: CensusKind): CensusDefinitionAuthoredSchema {
    try {
      return JSON.parse(this.schemaText[kind] || "{}");
    } catch {
      return {};
    }
  }

  activeVersionFor(kind: CensusKind): CensusDefinitionVersion | undefined {
    return this.state.activeVersions[kind];
  }

  draftVersionFor(kind: CensusKind): CensusDefinitionVersion | undefined {
    return this.state.draftVersions[kind];
  }

  editingVersionFor(kind: CensusKind): CensusDefinitionVersion | undefined {
    return this.draftVersionFor(kind) ?? this.activeVersionFor(kind);
  }

  definitionFor(kind: CensusKind): CensusDefinition | undefined {
    return this.state.definitions.find(definition => definition.kind === kind);
  }

  isKindEnabled(kind: CensusKind): boolean {
    const definition = this.definitionFor(kind);
    if (definition) {
      return definition.enabled;
    }
    return Boolean(this.activeVersionFor(kind));
  }

  hasSchemaEdits(kind: CensusKind): boolean {
    const activeVersion = this.activeVersionFor(kind);
    if (!activeVersion && !this.schemaText[kind].trim()) {
      return false;
    }
    return this.schemaText[kind].trim() !== this.formatSchema(activeVersion);
  }

  hasUnsavedSchemaEdits(kind: CensusKind): boolean {
    const editingVersion = this.editingVersionFor(kind);
    if (!editingVersion && !this.schemaText[kind].trim()) {
      return false;
    }
    return this.schemaText[kind].trim() !== this.formatSchema(editingVersion);
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
        this.saveSuccess = undefined;
        this.statusSuccess = undefined;
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  async saveDraft(kind: CensusKind) {
    this.publishSuccess = undefined;
    this.saveSuccess = undefined;
    this.statusSuccess = undefined;
    if (!this.schemaValid[kind]) {
      this.submitError = `${kind} schema has validation errors.`;
      return;
    }
    let parsedSchema: CensusDefinitionAuthoredSchema;
    try {
      parsedSchema = JSON.parse(this.schemaText[kind] || "{}");
    } catch {
      this.submitError = `${kind} schema must be valid JSON.`;
      return;
    }

    this.isSubmitting = true;
    const result = await this.censusDefinitionService.saveDraft(
      kind,
      parsedSchema
    );
    runInAction(() => {
      if (result.success) {
        this.fetch(true);
        this.submitError = "";
        this.saveSuccess = {
          kind,
          version: result.data?.version,
        };
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  async publish(kind: CensusKind) {
    this.publishSuccess = undefined;
    this.saveSuccess = undefined;
    this.statusSuccess = undefined;
    if (!this.schemaValid[kind]) {
      this.submitError = `${kind} schema has validation errors.`;
      return;
    }
    if (!this.isKindEnabled(kind)) {
      this.submitError =
        "Reactivate this census before publishing a new version.";
      return;
    }
    let parsedSchema: CensusDefinitionAuthoredSchema;
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

  async setEnabled(kind: CensusKind, enabled: boolean) {
    this.publishSuccess = undefined;
    this.saveSuccess = undefined;
    this.statusSuccess = undefined;
    this.isSubmitting = true;
    const result = await this.censusDefinitionService.setEnabled(kind, enabled);
    runInAction(() => {
      if (result.success) {
        this.fetch(true);
        this.submitError = "";
        this.statusSuccess = { kind, enabled };
      } else {
        this.submitError = result.message ?? "";
      }
      this.isSubmitting = false;
    });
  }

  private applyState(state: CensusDefinitionAdminState) {
    this.state = state;
    this.schemaText.ANIMAL = this.formatSchema(
      state.draftVersions.ANIMAL ?? state.activeVersions.ANIMAL
    );
    this.schemaText.HUMAN = this.formatSchema(
      state.draftVersions.HUMAN ?? state.activeVersions.HUMAN
    );
    this.schemaValid.ANIMAL = true;
    this.schemaValid.HUMAN = true;
  }

  private formatSchema(version?: CensusDefinitionVersion) {
    return JSON.stringify(
      normalizeAuthoredSchema(
        version?.definitionSchema,
        version?.runtimeSchema,
        version?.definition.kind
      ),
      null,
      2
    );
  }
}

export function normalizeAuthoredSchema(
  definitionSchema?: CensusDefinitionAuthoredSchema,
  runtimeSchema?: any,
  kind?: CensusKind
): CensusDefinitionAuthoredSchema {
  if (definitionSchema && Object.keys(definitionSchema).length > 0) {
    return definitionSchema;
  }
  const rows = Array.isArray(runtimeSchema?.rows) ? runtimeSchema.rows : [];
  const measures = Array.isArray(runtimeSchema?.measures)
    ? runtimeSchema.measures
    : [];
  if (rows.length <= 1) {
    return {
      schema_version: 1,
      display: {
        single_row_label: {
          default: rows[0]?.label ?? "Total",
        },
      },
      dimensions: [],
      measures,
    };
  }
  if (kind === "ANIMAL" && rows.some((row: any) => row.species_code)) {
    return {
      schema_version: 1,
      dimensions: [
        {
          key: "species",
          label: { default: "Species" },
          values: rows.map((row: any) => ({
            key: String(
              row.species_code ?? row.key ?? row.row_key
            ).toLowerCase(),
            label: { default: String(row.label ?? row.species_code) },
          })),
        },
      ],
      measures,
    };
  }
  return {
    schema_version: 1,
    dimensions: [
      {
        key: "row",
        label: { default: "Row" },
        values: rows.map((row: any, index: number) => ({
          key: String(row.key ?? row.row_key ?? `row_${index + 1}`),
          label: {
            default: String(row.label ?? row.key ?? `Row ${index + 1}`),
          },
        })),
      },
    ],
    measures,
  };
}
