import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetReportDocument, ReportsDocument } from "lib/generated/graphql";
import { Image, Report, ReportDetail } from "lib/services/report/report";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { Authority } from "lib/services/authority";
import { ReportType } from "../reportType";

export type ReportFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: Pick<Authority, "id" | "code" | "name">[];
  reportTypes?: Pick<ReportType, "id" | "name">[];
  testFlag?: boolean;
};

export type ReportFilter = ReportFilterData & {
  limit: number;
  offset: number;
};

export interface IReportService extends IService {
  fetchReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ): Promise<QueryResult<Report[]>>;

  getReport(id: string): Promise<GetResult<ReportDetail>>;
}

export class ReportService implements IReportService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReports(
    limit: number,
    offset: number,
    filter: ReportFilterData,
    force?: boolean
  ) {
    const fetchResult = await this.client.query({
      query: ReportsDocument,
      variables: {
        limit: limit,
        offset: offset,
        fromDate: filter.fromDate,
        throughDate: filter.throughDate,
        authorities: filter.authorities?.map(a => a.id),
        reportTypes: filter.reportTypes?.map(a => a.id),
        testFlag: filter.testFlag,
      },
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
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.incidentReports?.totalCount,
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
        reportTypeDefinition: incidentReport.reportType?.definition,
        rendererData: incidentReport.rendererData,
        data: incidentReport.data,
        images: incidentReport.images as Image[],
        caseId: incidentReport.caseId,
        gpsLocation: incidentReport.gpsLocation,
        threadId: incidentReport.threadId,
        reportByName: `${incidentReport.reportedBy?.firstName} ${incidentReport.reportedBy?.lastName}`,
        reportByTelephone: incidentReport.reportedBy?.telephone || "",
      };
    }
    return {
      data,
    };
  }
}
