import { gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  BoundaryConnectedReportsDocument,
  ConvertReportToTestReportDocument,
  GetReportDocument,
  ReportsDocument,
  RiskAssessmentFieldsFragment,
  SetReportRiskValueDocument,
  SubmitIncidentReportDocument,
} from "lib/generated/graphql";
import { toLocalIsoDate } from "lib/utils";
import {
  Image,
  Report,
  ReportDetail,
  ReportRiskState,
  RiskAssessment,
  RiskFilterLevel,
  UploadFile,
} from "lib/services/report/report";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { Authority } from "lib/services/authority";
import { ReportType } from "../reportType";
import { Village } from "lib/services/village";

export type ReportFilterVillage = Pick<Village, "id" | "code" | "name">;

export type ReportFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  incidentFromDate?: Date;
  incidentThroughDate?: Date;
  authorities?: Pick<Authority, "id" | "code" | "name">[];
  reportTypes?: Pick<ReportType, "id" | "name">[];
  includeChildAuthorities?: boolean;
  includeTest?: boolean;
  riskLevels?: RiskFilterLevel[];
  q?: string;
  onlyCase?: boolean;
  villages?: ReportFilterVillage[];
};

export type ReportFilter = {
  fromDate?: Date;
  throughDate?: Date;
  incidentFromDate?: string;
  incidentThroughDate?: string;
  authorities?: string[];
  reportTypes?: string[];
  limit: number;
  offset: number;
  testFlag?: boolean;
  includeChildAuthorities?: boolean;
  currentRiskLevels?: string;
  q?: string;
  onlyCase?: boolean;
  villageIds?: string[];
};

const ReportsListDocument = gql`
  fragment ReportListRiskAssessmentFields on RiskAssessmentProjectionType {
    id
    level
    source
    score
    factors
    evaluatorVersion
    externalAssessmentId
    isCurrent
    createdAt
    createdBy {
      id
      username
      firstName
      lastName
    }
  }
  query ReportsList(
    $limit: Int!
    $offset: Int!
    $fromDate: DateTime
    $throughDate: DateTime
    $incidentFromDate: Date
    $incidentThroughDate: Date
    $authorities: [ID]
    $reportTypes: [UUID]
    $testFlag: Boolean
    $includeChildAuthorities: Boolean
    $currentRiskLevels: String
    $q: String
    $onlyCase: Boolean
    $villageIds: [ID]
  ) {
    incidentReports(
      createdAt_Gte: $fromDate
      createdAt_Lte: $throughDate
      incidentDate_Gte: $incidentFromDate
      incidentDate_Lte: $incidentThroughDate
      relevantAuthorities_Id_In: $authorities
      reportType_Id_In: $reportTypes
      testFlag: $testFlag
      includeChildAuthorities: $includeChildAuthorities
      currentRiskLevels: $currentRiskLevels
      q: $q
      onlyCase: $onlyCase
      village_Id_In: $villageIds
      limit: $limit
      offset: $offset
    ) {
      totalCount
      results {
        id
        createdAt
        incidentDate
        rendererData
        caseId
        gpsLocation
        reportType {
          id
          name
          category {
            id
            name
            icon
          }
        }
        reportedBy {
          username
          firstName
          lastName
          telephone
        }
        images {
          thumbnail
        }
        authorities {
          name
        }
        currentRiskAssessment {
          ...ReportListRiskAssessmentFields
        }
        testFlag
      }
    }
  }
`;

export type SubmitIncidentReportInput = {
  data: Record<string, unknown>;
  reportTypeId: string;
  incidentDate: string; // YYYY-MM-DD
  gpsLocation?: string | null; // "longitude,latitude"
  incidentInAuthority?: boolean;
  testFlag?: boolean;
  villageId?: number | null;
};

export type SubmitIncidentReportResult = {
  id: string;
  caseId?: string | null;
};

export interface IReportService extends IService {
  fetchReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ): Promise<QueryResult<Report[]>>;

  fetchBoundaryConnectedReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ): Promise<QueryResult<Report[]>>;

  getReport(id: string): Promise<GetResult<ReportDetail>>;

  convertToTestReport(reportId: string): Promise<String>;

  setReportRisk(
    reportId: string,
    level: RiskFilterLevel | null
  ): Promise<GetResult<ReportRiskState>>;

  submitIncidentReport(
    input: SubmitIncidentReportInput
  ): Promise<GetResult<SubmitIncidentReportResult>>;
}

export class ReportService implements IReportService {
  client: LegacyApolloClient;
  fetchReportsQuery: ReportFilter = {
    fromDate: undefined,
    throughDate: undefined,
    limit: 20,
    offset: 0,
    authorities: undefined,
    reportTypes: undefined,
    testFlag: undefined,
    includeChildAuthorities: undefined,
    currentRiskLevels: undefined,
    q: undefined,
    onlyCase: undefined,
    incidentFromDate: undefined,
    incidentThroughDate: undefined,
    villageIds: undefined,
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  async fetchReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ) {
    this.fetchReportsQuery = {
      ...this.fetchReportsQuery,
      authorities: filter.authorities?.map(a => a.id),
      reportTypes: filter.reportTypes?.map(a => a.id),
      limit: limit,
      offset: offset,
      fromDate: filter.fromDate,
      throughDate: filter.throughDate,
      incidentFromDate: toLocalIsoDate(filter.incidentFromDate),
      incidentThroughDate: toLocalIsoDate(filter.incidentThroughDate),
      testFlag: filter.includeTest ? undefined : false,
      includeChildAuthorities: filter.includeChildAuthorities,
      currentRiskLevels:
        filter.riskLevels && filter.riskLevels.length > 0
          ? filter.riskLevels.join(",")
          : undefined,
      q: filter.q?.trim() || undefined,
      onlyCase: filter.onlyCase || undefined,
      villageIds:
        filter.villages && filter.villages.length > 0
          ? filter.villages.map(village => village.id)
          : undefined,
    };
    const fetchResult = await this.client.query({
      query: ReportsListDocument,
      variables: this.fetchReportsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Report>();
    fetchResult.data.incidentReports?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          createdAt: item.createdAt,
          incidentDate: item.incidentDate,
          rendererData: item.rendererData,
          reportTypeName: item.reportType?.name || "",
          caseId: item.caseId,
          gpsLocation: item.gpsLocation,
          categoryName: item.reportType?.category?.name,
          categoryIcon: item.reportType?.category?.icon,
          imageUrl:
            item.images && item.images.length > 0
              ? item.images[0]?.thumbnail
              : null,
          authorityName: item.authorities?.map(item => item?.name).join(", "),
          testFlag: item.testFlag,
          currentRiskAssessment: mapRiskAssessment(item.currentRiskAssessment),
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.incidentReports?.totalCount,
    };
  }

  async fetchBoundaryConnectedReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ) {
    this.fetchReportsQuery = {
      ...this.fetchReportsQuery,
      authorities: filter.authorities?.map(a => a.id),
      reportTypes: filter.reportTypes?.map(a => a.id),
      limit: limit,
      offset: offset,
      fromDate: filter.fromDate,
      throughDate: filter.throughDate,
      testFlag: filter.includeTest ? undefined : false,
    };
    const fetchResult = await this.client.query({
      query: BoundaryConnectedReportsDocument,
      variables: this.fetchReportsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Report>();
    fetchResult.data.boundaryConnectedIncidentReports?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          createdAt: item.createdAt,
          incidentDate: item.incidentDate,
          rendererData: item.rendererData,
          reportTypeName: item.reportType?.name || "",
          caseId: item.caseId,
          gpsLocation: item.gpsLocation,
          categoryName: item.reportType?.category?.name,
          categoryIcon: item.reportType?.category?.icon,
          imageUrl:
            item.images && item.images.length > 0
              ? item.images[0]?.thumbnail
              : null,
          testFlag: item.testFlag,
          currentRiskAssessment: mapRiskAssessment(item.currentRiskAssessment),
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.boundaryConnectedIncidentReports?.totalCount,
    };
  }

  async getReport(id: string): Promise<GetResult<ReportDetail>> {
    const getResult = await this.client.query({
      query: GetReportDocument,
      variables: {
        id,
      },
    });

    let data;
    const incidentReport = getResult.data.incidentReport;
    if (incidentReport) {
      data = {
        id: incidentReport.id,
        createdAt: incidentReport.createdAt,
        incidentDate: incidentReport.incidentDate,
        reportTypeName: incidentReport.reportType?.name || "",
        reportTypeDefinition:
          incidentReport.definition || incidentReport.reportType?.definition,
        rendererData: incidentReport.rendererData,
        data: incidentReport.data,
        images: incidentReport.images as Image[],
        files: incidentReport.uploadFiles as UploadFile[],
        caseId: incidentReport.caseId,
        gpsLocation: incidentReport.gpsLocation,
        threadId: incidentReport.threadId,
        reportByName: `${incidentReport.reportedBy?.firstName} ${incidentReport.reportedBy?.lastName}`,
        reportByTelephone: incidentReport.reportedBy?.telephone || "",
        authorityName: incidentReport.authorities
          ?.map(item => item?.name)
          .join(", "),
        villageName: formatVillageName(incidentReport.village),
        testFlag: incidentReport.testFlag,
        aiSuspected: (incidentReport as any).aiSuspected || "",
        currentRiskAssessment: mapRiskAssessment(
          incidentReport.currentRiskAssessment
        ),
        riskAssessmentHistory:
          incidentReport.riskAssessmentHistory
            ?.map(mapRiskAssessment)
            .filter(isRiskAssessment) || [],
        accumulatedMetrics: incidentReport.accumulatedMetrics || null,
      };
    }
    return {
      data,
    };
  }

  async convertToTestReport(reportId: string): Promise<String> {
    const result = await this.client.mutate({
      mutation: ConvertReportToTestReportDocument,
      variables: {
        reportId,
      },
      refetchQueries: [
        {
          query: ReportsDocument,
          variables: this.fetchReportsQuery,
          fetchPolicy: "network-only",
        },
        {
          query: GetReportDocument,
          variables: {
            id: reportId,
          },
        },
      ],
      awaitRefetchQueries: true,
    });
    return result.data?.convertToTestReport?.report?.id;
  }

  async submitIncidentReport(
    input: SubmitIncidentReportInput
  ): Promise<GetResult<SubmitIncidentReportResult>> {
    const result = await this.client.mutate({
      mutation: SubmitIncidentReportDocument,
      variables: {
        data: input.data,
        reportTypeId: input.reportTypeId,
        incidentDate: input.incidentDate,
        gpsLocation: input.gpsLocation ?? null,
        incidentInAuthority: input.incidentInAuthority ?? false,
        testFlag: input.testFlag ?? false,
        villageId: input.villageId ?? null,
      },
      refetchQueries: [
        {
          query: ReportsDocument,
          variables: this.fetchReportsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    if (result.errors?.length) {
      return {
        data: undefined,
        error: result.errors.map(e => e.message).join(", "),
      };
    }

    const created = result.data?.submitIncidentReport?.result;
    if (!created?.id) {
      return { data: undefined, error: "Submit failed" };
    }
    return {
      data: {
        id: created.id,
        caseId: created.caseId,
      },
    };
  }

  async setReportRisk(
    reportId: string,
    level: RiskFilterLevel | null
  ): Promise<GetResult<ReportRiskState>> {
    const result = await this.client.mutate({
      mutation: SetReportRiskValueDocument,
      variables: {
        reportId,
        level,
      },
      refetchQueries: [
        {
          query: ReportsDocument,
          variables: this.fetchReportsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    if (result.errors) {
      return {
        data: undefined,
        error: result.errors.map(error => error.message).join(","),
      };
    }

    const report = result.data?.setReportRisk?.report;
    return {
      data: {
        currentRiskAssessment: mapRiskAssessment(
          report?.currentRiskAssessment ||
            result.data?.setReportRisk?.riskAssessment
        ),
        riskAssessmentHistory:
          report?.riskAssessmentHistory
            ?.map(mapRiskAssessment)
            .filter(isRiskAssessment) || [],
      },
    };
  }
}

function formatVillageName(
  village?: { code?: string | null; name?: string | null } | null
): string | undefined {
  if (!village) return undefined;

  return [village.code, village.name].filter(Boolean).join(" - ") || undefined;
}

export const mapRiskAssessment = (
  item?: RiskAssessmentFieldsFragment | null
): RiskAssessment | null => {
  if (!item) return null;
  return {
    id: item.id,
    level: item.level as RiskAssessment["level"],
    source: item.source,
    score: item.score,
    factors: item.factors,
    evaluatorVersion: item.evaluatorVersion,
    externalAssessmentId: item.externalAssessmentId,
    isCurrent: item.isCurrent,
    createdAt: item.createdAt,
    createdBy: item.createdBy
      ? {
          id: item.createdBy.id,
          username: item.createdBy.username,
          firstName: item.createdBy.firstName,
          lastName: item.createdBy.lastName,
        }
      : null,
  };
};

export const isRiskAssessment = (
  item: RiskAssessment | null
): item is RiskAssessment => item !== null;
