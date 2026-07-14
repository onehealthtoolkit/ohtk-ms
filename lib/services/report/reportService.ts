import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  BoundaryConnectedReportsDocument,
  ConvertReportToTestReportDocument,
  GetReportDocument,
  ReportsDocument,
  RiskAssessmentFieldsFragment,
  SetReportRiskValueDocument,
} from "lib/generated/graphql";
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

export type ReportFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: Pick<Authority, "id" | "code" | "name">[];
  reportTypes?: Pick<ReportType, "id" | "name">[];
  includeChildAuthorities?: boolean;
  includeTest?: boolean;
  riskLevels?: RiskFilterLevel[];
};

export type ReportFilter = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: string[];
  reportTypes?: string[];
  limit: number;
  offset: number;
  testFlag?: boolean;
  includeChildAuthorities?: boolean;
  currentRiskLevels?: string;
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
      testFlag: filter.includeTest ? undefined : false,
      includeChildAuthorities: filter.includeChildAuthorities,
      currentRiskLevels:
        filter.riskLevels && filter.riskLevels.length > 0
          ? filter.riskLevels.join(",")
          : undefined,
    };
    const fetchResult = await this.client.query({
      query: ReportsDocument,
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
        testFlag: incidentReport.testFlag,
        currentRiskAssessment: mapRiskAssessment(
          incidentReport.currentRiskAssessment
        ),
        riskAssessmentHistory:
          incidentReport.riskAssessmentHistory
            ?.map(mapRiskAssessment)
            .filter(isRiskAssessment) || [],
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
