import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  BoundaryConnectedReportsDocument,
  ConvertReportToTestReportDocument,
  GetReportDocument,
  ReportsDocument,
} from "lib/generated/graphql";
import {
  Image,
  Report,
  ReportDetail,
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
  includeTest?: boolean;
};

export type ReportFilter = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: string[];
  reportTypes?: string[];
  limit: number;
  offset: number;
  testFlag?: boolean;
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
}

export class ReportService implements IReportService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchReportsQuery: ReportFilter = {
    fromDate: undefined,
    throughDate: undefined,
    limit: 20,
    offset: 0,
    authorities: undefined,
    reportTypes: undefined,
    testFlag: undefined,
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
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
}
