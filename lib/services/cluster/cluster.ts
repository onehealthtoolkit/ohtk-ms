import { RiskLevel } from "lib/services/report/report";

export type ClusterStatus = "NEW" | "REVIEWED" | "WATCHING" | "CLOSED" | string;

export type ClusterIntegrationClient = {
  code: string;
  name: string;
};

export type ClusterLinkedReport = {
  id: string;
  createdAt: string;
  incidentDate: string;
  rendererData: string;
  gpsLocation?: string | null;
  reportTypeName: string;
  categoryName?: string | null;
  categoryIcon?: string | null;
  authorityName?: string;
  riskLevel?: RiskLevel | null;
};

export type ClusterResult = {
  id: string;
  externalClusterId: string;
  algorithmVersion: string;
  windowStart: string;
  windowEnd: string;
  incidentIds: string[];
  authorityIds: number[];
  villageIds: number[];
  geometry?: unknown;
  radiusMeters?: number | null;
  score?: number | null;
  riskLevel?: RiskLevel | null;
  reportCount: number;
  status: ClusterStatus;
  explanation: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  integrationClient: ClusterIntegrationClient;
  linkedReports: ClusterLinkedReport[];
};
