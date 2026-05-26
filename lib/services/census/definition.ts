export type CensusKind = "ANIMAL" | "HUMAN";

export type CensusSchemaMeasure = {
  key: string;
  label: string;
  type?: string;
  required?: boolean;
};

export type CensusSchemaRow = {
  row_key?: string;
  label?: string;
  species_id?: string | number;
  species_code?: string;
  [key: string]: unknown;
};

export type CensusSchema = {
  rows?: CensusSchemaRow[];
  measures?: CensusSchemaMeasure[];
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
  runtimeSchema: CensusSchema;
  publishedAt?: string | null;
};

export type CensusDefinitionAdminState = {
  definitions: CensusDefinition[];
  activeVersions: Record<CensusKind, CensusDefinitionVersion | undefined>;
};

export type CensusDefinitionValidationProblem = {
  name: string;
  message: string;
};
