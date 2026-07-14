export type CensusKind = "ANIMAL" | "HUMAN";

export type CensusSchemaMeasure = {
  key: string;
  label: LocalizedLabel;
  type?: string;
  required?: boolean;
};

export type CensusSchemaRow = {
  key?: string;
  row_key?: string;
  label?: string;
  species_id?: string | number;
  species_code?: string;
  dimensions?: Record<string, unknown>;
  [key: string]: unknown;
};

export type CensusSchema = {
  rows?: CensusSchemaRow[];
  measures?: CensusSchemaMeasure[];
  row_source?: "ACTIVE_ANIMAL_SPECIES" | string;
  extra_dimensions?: unknown[];
  [key: string]: unknown;
};

export type LocalizedLabel =
  | string
  | {
      default?: string;
      la?: string;
      [locale: string]: string | undefined;
    };

export type CensusDefinitionSchemaValue = {
  key: string;
  label: LocalizedLabel;
};

export type CensusDefinitionSchemaDimension = {
  key: string;
  label: LocalizedLabel;
  values: CensusDefinitionSchemaValue[];
};

/** Option A: shared group HH row + per-species headcount rows. */
export type CensusDefinitionSchemaSpecies = {
  key: string;
  label: LocalizedLabel;
};

export type CensusDefinitionSchemaGroup = {
  key: string;
  label: LocalizedLabel;
  species: CensusDefinitionSchemaSpecies[];
};

export type CensusDefinitionAuthoredSchema = {
  schema_version?: number;
  display?: {
    single_row_label?: LocalizedLabel;
  };
  /** v1 flat Cartesian breakdowns */
  dimensions?: CensusDefinitionSchemaDimension[];
  measures?: CensusSchemaMeasure[];
  /** v2 Option A: group HH + species heads */
  summary_fields?: CensusSchemaMeasure[];
  group_measures?: CensusSchemaMeasure[];
  species_measures?: CensusSchemaMeasure[];
  groups?: CensusDefinitionSchemaGroup[];
  [key: string]: unknown;
};

export type CensusDefinition = {
  id: string;
  kind: CensusKind;
  enabled: boolean;
  sortOrder: number;
};

export type CensusDefinitionVersion = {
  id: string;
  definition: CensusDefinition;
  version: number;
  status: string;
  schema: CensusSchema;
  definitionSchema?: CensusDefinitionAuthoredSchema;
  runtimeSchema: CensusSchema;
  publishedAt?: string | null;
};

export type CensusDefinitionAdminState = {
  definitions: CensusDefinition[];
  activeVersions: Record<CensusKind, CensusDefinitionVersion | undefined>;
  draftVersions: Record<CensusKind, CensusDefinitionVersion | undefined>;
};

export type CensusDefinitionValidationProblem = {
  name: string;
  message: string;
};
