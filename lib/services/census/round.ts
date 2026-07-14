import type { LegacyApolloClient } from "lib/services/apolloClient";
import { gql } from "@apollo/client";
import { GetResult, IService } from "lib/services/interface";

export type CensusRoundMode = "PRODUCTION" | "TRAINING";
export type CensusCoverageStatus =
  | "MISSING"
  | "SUBMITTED_ON_TIME"
  | "SUBMITTED_LATE";

export type CensusRoundOccurrence = {
  id: string;
  occurrenceKey: string;
  kind: string;
  mode: CensusRoundMode;
  censusPeriodStart: string;
  censusPeriodEnd: string;
  startDate: string;
  softFinishDate: string;
  hardFinishDate: string;
  status: string;
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
    status?: CensusCoverageStatus | "ALL";
    q?: string;
    offset?: number;
    limit?: number;
  }): Promise<GetResult<CensusRoundCoverage>>;
}

const CensusRoundOccurrenceFields = gql`
  fragment CensusRoundOccurrenceFields on CensusRoundOccurrenceType {
    id
    occurrenceKey
    kind
    mode
    censusPeriodStart
    censusPeriodEnd
    startDate
    softFinishDate
    hardFinishDate
    status
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
    $status: String
    $q: String
    $offset: Int = 0
    $limit: Int = 50
  ) {
    censusRoundCoverage(
      occurrenceId: $occurrenceId
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

  private toOccurrence(payload: any): CensusRoundOccurrence {
    return {
      id: payload.id,
      occurrenceKey: payload.occurrenceKey,
      kind: payload.kind,
      mode: payload.mode,
      censusPeriodStart: payload.censusPeriodStart,
      censusPeriodEnd: payload.censusPeriodEnd,
      startDate: payload.startDate,
      softFinishDate: payload.softFinishDate,
      hardFinishDate: payload.hardFinishDate,
      status: payload.status,
    };
  }

  private toErrorMessage(error: any): string {
    return error?.message ?? "Unable to load census round data.";
  }
}
