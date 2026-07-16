import type { LegacyApolloClient } from "lib/services/apolloClient";
import { gql } from "@apollo/client";
import { GetResult, IService, SaveResult } from "lib/services/interface";

export type CensusRoundMode = "PRODUCTION" | "TRAINING";
export type CensusRoundKind = "ANIMAL" | "HUMAN";
export type CensusRoundRepeat = "ANNUAL";
export type CensusCoverageStatus =
  | "MISSING"
  | "SUBMITTED_ON_TIME"
  | "SUBMITTED_LATE";

export type CensusRoundOccurrence = {
  id: string;
  occurrenceKey: string;
  kind: string;
  mode: CensusRoundMode;
  year?: number;
  censusPeriodStart: string;
  censusPeriodEnd: string;
  startDate: string;
  softFinishDate: string;
  hardFinishDate: string;
  status: string;
};

export type CensusRoundDefinition = {
  id: string;
  code: string;
  name: string;
  kind: CensusRoundKind;
  mode: CensusRoundMode;
  repeat: CensusRoundRepeat;
  censusPeriodStart: string;
  censusPeriodEnd: string;
  startDate: string;
  softFinishDate: string;
  hardFinishDate: string;
  targetAuthorityId?: number | null;
  targetAuthorityName?: string | null;
  enabled: boolean;
};

export type CensusRoundDefinitionSaveInput = {
  id?: number;
  code: string;
  name: string;
  kind: CensusRoundKind;
  mode: CensusRoundMode;
  censusPeriodStart: string;
  censusPeriodEnd: string;
  startDate: string;
  softFinishDate: string;
  hardFinishDate: string;
  targetAuthorityId?: number | null;
  enabled?: boolean;
  materializeFromYear?: number | null;
  materializeYears?: number;
};

export type CensusRoundDefinitionSaveResult = {
  definition: CensusRoundDefinition;
  occurrences: CensusRoundOccurrence[];
};

export type CensusCoverageSpeciesSummary = {
  rowKey: string;
  rowLabel: string;
  animalQuantity: number;
};

export type CensusRoundCoverageRow = {
  id: string;
  villageId: string;
  villageCode: string;
  villageName: string;
  authorityName?: string;
  status: CensusCoverageStatus;
  censusDate?: string;
  submittedAt?: string;
  reporterUsername?: string;
  villageHouseholdQuantity?: number | null;
  animalHouseholdQuantity?: number | null;
  totalAnimalQuantity?: number | null;
  speciesSummary: CensusCoverageSpeciesSummary[];
  occurrence: CensusRoundOccurrence;
};

export type CensusRoundCoverage = {
  totalCount: number;
  submittedCount: number;
  missingCount: number;
  lateCount: number;
  rows: CensusRoundCoverageRow[];
};

export interface ICensusRoundService extends IService {
  getAnimalOccurrences(
    mode?: CensusRoundMode
  ): Promise<GetResult<CensusRoundOccurrence[]>>;
  getCoverage(params: {
    occurrenceId: number;
    authorityId?: number | null;
    status?: CensusCoverageStatus | "ALL";
    q?: string;
    offset?: number;
    limit?: number;
  }): Promise<GetResult<CensusRoundCoverage>>;
  getDefinitions(params?: {
    kind?: CensusRoundKind;
    mode?: CensusRoundMode;
  }): Promise<GetResult<CensusRoundDefinition[]>>;
  getDefinition(id: string): Promise<GetResult<CensusRoundDefinition>>;
  saveDefinition(
    input: CensusRoundDefinitionSaveInput
  ): Promise<SaveResult<CensusRoundDefinitionSaveResult>>;
}

const CensusRoundOccurrenceFields = gql`
  fragment CensusRoundOccurrenceFields on CensusRoundOccurrenceType {
    id
    occurrenceKey
    kind
    mode
    year
    censusPeriodStart
    censusPeriodEnd
    startDate
    softFinishDate
    hardFinishDate
    status
  }
`;

const CensusRoundDefinitionFields = gql`
  fragment CensusRoundDefinitionFields on CensusRoundDefinitionType {
    id
    code
    name
    kind
    mode
    repeat
    censusPeriodStart
    censusPeriodEnd
    startDate
    softFinishDate
    hardFinishDate
    enabled
    targetAuthority {
      id
      name
    }
  }
`;

const AnimalCensusOccurrencesDocument = gql`
  query AnimalCensusOccurrences($mode: String) {
    censusRoundOccurrences(kind: "ANIMAL", mode: $mode) {
      ...CensusRoundOccurrenceFields
    }
  }
  ${CensusRoundOccurrenceFields}
`;

const AnimalCensusCoverageDocument = gql`
  query AnimalCensusCoverage(
    $occurrenceId: Int!
    $authorityId: Int
    $status: String
    $q: String
    $offset: Int = 0
    $limit: Int = 50
  ) {
    censusRoundCoverage(
      occurrenceId: $occurrenceId
      authorityId: $authorityId
      status: $status
      q: $q
      offset: $offset
      limit: $limit
    ) {
      totalCount
      submittedCount
      missingCount
      lateCount
      rows {
        status
        village {
          id
          code
          name
          authority {
            name
          }
        }
        occurrence {
          ...CensusRoundOccurrenceFields
        }
        snapshot {
          id
          censusDate
          submittedAt
          reporter {
            username
          }
        }
        villageHouseholdQuantity
        animalHouseholdQuantity
        totalAnimalQuantity
        speciesSummary
      }
    }
  }
  ${CensusRoundOccurrenceFields}
`;

const CensusRoundDefinitionsDocument = gql`
  query CensusRoundDefinitions($kind: String, $mode: String) {
    censusRoundDefinitions(kind: $kind, mode: $mode) {
      ...CensusRoundDefinitionFields
    }
  }
  ${CensusRoundDefinitionFields}
`;

const AdminCensusRoundDefinitionSaveDocument = gql`
  mutation AdminCensusRoundDefinitionSave(
    $id: Int
    $code: String!
    $name: String!
    $kind: String!
    $mode: String
    $censusPeriodStart: String!
    $censusPeriodEnd: String!
    $startDate: String!
    $softFinishDate: String!
    $hardFinishDate: String!
    $targetAuthorityId: Int
    $enabled: Boolean
    $materializeFromYear: Int
    $materializeYears: Int
  ) {
    adminCensusRoundDefinitionSave(
      id: $id
      code: $code
      name: $name
      kind: $kind
      mode: $mode
      censusPeriodStart: $censusPeriodStart
      censusPeriodEnd: $censusPeriodEnd
      startDate: $startDate
      softFinishDate: $softFinishDate
      hardFinishDate: $hardFinishDate
      targetAuthorityId: $targetAuthorityId
      enabled: $enabled
      materializeFromYear: $materializeFromYear
      materializeYears: $materializeYears
    ) {
      definition {
        ...CensusRoundDefinitionFields
      }
      occurrences {
        ...CensusRoundOccurrenceFields
      }
      fields {
        name
        message
      }
    }
  }
  ${CensusRoundDefinitionFields}
  ${CensusRoundOccurrenceFields}
`;

const FIELD_NAME_MAP: Record<string, string> = {
  census_period_start: "censusPeriodStart",
  census_period_end: "censusPeriodEnd",
  start_date: "startDate",
  soft_finish_date: "softFinishDate",
  hard_finish_date: "hardFinishDate",
  target_authority_id: "targetAuthorityId",
  materialize_from_year: "materializeFromYear",
  materialize_years: "materializeYears",
};

export class CensusRoundService implements ICensusRoundService {
  constructor(readonly client: LegacyApolloClient) {}

  async getAnimalOccurrences(
    mode: CensusRoundMode = "PRODUCTION"
  ): Promise<GetResult<CensusRoundOccurrence[]>> {
    try {
      const result = await this.client.query({
        query: AnimalCensusOccurrencesDocument,
        variables: { mode },
        fetchPolicy: "network-only",
      });
      return {
        data: (result.data?.censusRoundOccurrences ?? []).map(
          this.toOccurrence
        ),
      };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  async getCoverage(params: {
    occurrenceId: number;
    authorityId?: number | null;
    status?: CensusCoverageStatus | "ALL";
    q?: string;
    offset?: number;
    limit?: number;
  }): Promise<GetResult<CensusRoundCoverage>> {
    try {
      const result = await this.client.query({
        query: AnimalCensusCoverageDocument,
        variables: {
          occurrenceId: params.occurrenceId,
          authorityId: params.authorityId ?? null,
          status: params.status === "ALL" ? undefined : params.status,
          q: params.q || undefined,
          offset: params.offset ?? 0,
          limit: params.limit ?? 50,
        },
        fetchPolicy: "network-only",
      });
      return { data: this.toCoverage(result.data?.censusRoundCoverage) };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  async getDefinitions(params?: {
    kind?: CensusRoundKind;
    mode?: CensusRoundMode;
  }): Promise<GetResult<CensusRoundDefinition[]>> {
    try {
      const result = await this.client.query({
        query: CensusRoundDefinitionsDocument,
        variables: {
          kind: params?.kind,
          mode: params?.mode,
        },
        fetchPolicy: "network-only",
      });
      return {
        data: (result.data?.censusRoundDefinitions ?? []).map(
          this.toDefinition
        ),
      };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  async getDefinition(id: string): Promise<GetResult<CensusRoundDefinition>> {
    const result = await this.getDefinitions();
    if (result.error) {
      return { data: undefined, error: result.error };
    }
    const definition = (result.data ?? []).find(item => item.id === String(id));
    if (!definition) {
      return { data: undefined, error: "Census round definition not found." };
    }
    return { data: definition };
  }

  async saveDefinition(
    input: CensusRoundDefinitionSaveInput
  ): Promise<SaveResult<CensusRoundDefinitionSaveResult>> {
    try {
      const result = await this.client.mutate({
        mutation: AdminCensusRoundDefinitionSaveDocument,
        variables: {
          id: input.id,
          code: input.code,
          name: input.name,
          kind: input.kind,
          mode: input.mode,
          censusPeriodStart: input.censusPeriodStart,
          censusPeriodEnd: input.censusPeriodEnd,
          startDate: input.startDate,
          softFinishDate: input.softFinishDate,
          hardFinishDate: input.hardFinishDate,
          targetAuthorityId: input.targetAuthorityId ?? null,
          enabled: input.enabled ?? true,
          materializeFromYear: input.materializeFromYear ?? null,
          materializeYears: input.materializeYears ?? 2,
        },
        refetchQueries: [{ query: CensusRoundDefinitionsDocument }],
        awaitRefetchQueries: true,
      });

      if (result.errors?.length) {
        return {
          success: false,
          message: result.errors.map(error => error.message).join(", "),
        };
      }

      const payload = result.data?.adminCensusRoundDefinitionSave;
      if (payload?.fields?.length) {
        const fields: Record<string, string> = {};
        payload.fields.forEach((field: { name?: string; message?: string }) => {
          if (!field?.name) {
            return;
          }
          const key = FIELD_NAME_MAP[field.name] ?? field.name;
          fields[key] = field.message ?? "Invalid value";
        });
        return {
          success: false,
          fields,
          message: payload.fields
            .map(
              (field: { name?: string; message?: string }) =>
                `${field.name}: ${field.message}`
            )
            .join("; "),
        };
      }

      if (!payload?.definition) {
        return {
          success: false,
          message: "Unable to save census round definition.",
        };
      }

      return {
        success: true,
        data: {
          definition: this.toDefinition(payload.definition),
          occurrences: (payload.occurrences ?? []).map(this.toOccurrence),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: this.toErrorMessage(error),
      };
    }
  }

  private toCoverage(payload: any): CensusRoundCoverage {
    return {
      totalCount: payload?.totalCount ?? 0,
      submittedCount: payload?.submittedCount ?? 0,
      missingCount: payload?.missingCount ?? 0,
      lateCount: payload?.lateCount ?? 0,
      rows: (payload?.rows ?? []).map((row: any) => this.toCoverageRow(row)),
    };
  }

  private toCoverageRow(row: any): CensusRoundCoverageRow {
    const speciesSummary = Array.isArray(row?.speciesSummary)
      ? row.speciesSummary
      : [];
    return {
      id: row.snapshot?.id ?? `missing-${row.village.id}`,
      villageId: row.village.id,
      villageCode: row.village.code,
      villageName: row.village.name,
      authorityName: row.village.authority?.name,
      status: row.status,
      censusDate: row.snapshot?.censusDate,
      submittedAt: row.snapshot?.submittedAt,
      reporterUsername: row.snapshot?.reporter?.username,
      villageHouseholdQuantity: row.villageHouseholdQuantity,
      animalHouseholdQuantity: row.animalHouseholdQuantity,
      totalAnimalQuantity: row.totalAnimalQuantity,
      speciesSummary: speciesSummary.map((item: any) => ({
        rowKey: item.row_key ?? item.rowKey,
        rowLabel: item.row_label ?? item.rowLabel,
        animalQuantity: item.animal_quantity ?? item.animalQuantity ?? 0,
      })),
      occurrence: this.toOccurrence(row.occurrence),
    };
  }

  private toDefinition = (payload: any): CensusRoundDefinition => {
    return {
      id: String(payload.id),
      code: payload.code,
      name: payload.name,
      kind: payload.kind,
      mode: payload.mode,
      repeat: payload.repeat ?? "ANNUAL",
      censusPeriodStart: payload.censusPeriodStart,
      censusPeriodEnd: payload.censusPeriodEnd,
      startDate: payload.startDate,
      softFinishDate: payload.softFinishDate,
      hardFinishDate: payload.hardFinishDate,
      targetAuthorityId: payload.targetAuthority?.id
        ? parseInt(String(payload.targetAuthority.id), 10)
        : null,
      targetAuthorityName: payload.targetAuthority?.name ?? null,
      enabled: Boolean(payload.enabled),
    };
  };

  private toOccurrence = (payload: any): CensusRoundOccurrence => {
    return {
      id: String(payload.id),
      occurrenceKey: payload.occurrenceKey,
      kind: payload.kind,
      mode: payload.mode,
      year: payload.year,
      censusPeriodStart: payload.censusPeriodStart,
      censusPeriodEnd: payload.censusPeriodEnd,
      startDate: payload.startDate,
      softFinishDate: payload.softFinishDate,
      hardFinishDate: payload.hardFinishDate,
      status: payload.status,
    };
  };

  private toErrorMessage(error: any): string {
    return error?.message ?? "Unable to load census round data.";
  }
}
