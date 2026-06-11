import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  ClusterResultFieldsFragment,
  ClusterResultsDocument,
  GetClusterResultDocument,
} from "lib/generated/graphql";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { RiskFilterLevel, RiskLevel } from "lib/services/report/report";
import { ClusterLinkedReport, ClusterResult } from "./cluster";

export type ClusterFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  riskLevels?: RiskFilterLevel[];
  searchText?: string;
};

type ClusterFilter = {
  fromDate?: string;
  throughDate?: string;
  riskLevels?: string;
  q?: string;
  limit: number;
  offset: number;
};

export interface IClusterService extends IService {
  fetchClusters(
    limit: number,
    offset: number,
    filter: ClusterFilterData,
    force?: boolean
  ): Promise<QueryResult<ClusterResult[]>>;

  getCluster(id: string): Promise<GetResult<ClusterResult>>;
}

export class ClusterService implements IClusterService {
  client: LegacyApolloClient;
  fetchClustersQuery: ClusterFilter = {
    fromDate: undefined,
    throughDate: undefined,
    riskLevels: undefined,
    q: undefined,
    limit: 20,
    offset: 0,
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  async fetchClusters(
    limit: number,
    offset: number,
    filter: ClusterFilterData,
    force?: boolean
  ): Promise<QueryResult<ClusterResult[]>> {
    this.fetchClustersQuery = {
      limit,
      offset,
      fromDate: dateToGraphqlDate(filter.fromDate),
      throughDate: dateToGraphqlDate(filter.throughDate),
      riskLevels:
        filter.riskLevels && filter.riskLevels.length > 0
          ? filter.riskLevels.join(",")
          : undefined,
      q: filter.searchText?.trim() || undefined,
    };

    const fetchResult = await this.client.query({
      query: ClusterResultsDocument,
      variables: this.fetchClustersQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    return {
      items:
        fetchResult.data.clusterResults?.results
          ?.filter(Boolean)
          .map(clusterFromGraphql) || [],
      totalCount: fetchResult.data.clusterResults?.totalCount,
    };
  }

  async getCluster(id: string): Promise<GetResult<ClusterResult>> {
    const result = await this.client.query({
      query: GetClusterResultDocument,
      variables: { id },
      fetchPolicy: "network-only",
    });

    if (result.errors) {
      return {
        data: undefined,
        error: result.errors.map(error => error.message).join(","),
      };
    }

    return {
      data: result.data.clusterResult
        ? clusterFromGraphql(result.data.clusterResult)
        : undefined,
    };
  }
}

const dateToGraphqlDate = (date?: Date): string | undefined => {
  if (!date) return undefined;
  return date.toISOString().slice(0, 10);
};

const metadataFromGraphql = (metadata: unknown): Record<string, unknown> => {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    return metadata as Record<string, unknown>;
  }
  return {};
};

const riskLevelFromGraphql = (level?: string | null): RiskLevel | null => {
  if (
    level === "LOW" ||
    level === "MEDIUM" ||
    level === "HIGH" ||
    level === "CRITICAL"
  ) {
    return level;
  }
  return null;
};

const linkedReportFromGraphql = (
  item: ClusterResultFieldsFragment["linkedReports"][number]
): ClusterLinkedReport => ({
  id: item.id,
  createdAt: item.createdAt,
  incidentDate: item.incidentDate,
  rendererData: item.rendererData,
  gpsLocation: item.gpsLocation,
  reportTypeName: item.reportType?.name || "",
  categoryName: item.reportType?.category?.name,
  categoryIcon: item.reportType?.category?.icon,
  authorityName: item.authorities?.map(authority => authority?.name).join(", "),
  riskLevel: riskLevelFromGraphql(item.currentRiskAssessment?.level),
});

const clusterFromGraphql = (
  item: ClusterResultFieldsFragment
): ClusterResult => {
  const metadata = metadataFromGraphql(item.metadata);
  return {
    id: item.id,
    externalClusterId: item.externalClusterId,
    algorithmVersion: item.algorithmVersion,
    windowStart: item.windowStart,
    windowEnd: item.windowEnd,
    incidentIds: item.incidentIds || [],
    authorityIds: item.authorityIds || [],
    villageIds: item.villageIds || [],
    geometry: item.geometry,
    radiusMeters: item.radiusMeters,
    score: item.score,
    riskLevel: riskLevelFromGraphql(item.riskLevel),
    reportCount: item.reportCount,
    explanation: item.explanation || "",
    metadata,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    integrationClient: item.integrationClient,
    linkedReports: item.linkedReports?.map(linkedReportFromGraphql) || [],
  };
};
