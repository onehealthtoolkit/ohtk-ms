import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetReportDocument, ReportsDocument } from "lib/generated/graphql";
import { Image, Report, ReportDetail } from "lib/services/report/report";
import { GetResult, IService, QueryResult } from "lib/services/interface";

export type ReportFilterData = {
  fromDate: Date;
  throughDate: Date;
  authorities: string[];
};
export interface IReportService extends IService {
  fetchReports(
    limit: number,
    offset: number,
    filter: ReportFilterData
  ): Promise<QueryResult<Report[]>>;
  getReport(id: string): Promise<GetResult<ReportDetail>>;
}

export class ReportService implements IReportService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchReportsQuery = {
    limit: 20,
    offset: 0,
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReports(limit: number, offset: number, filter: ReportFilterData) {
    console.log(
      filter.fromDate.toString(),
      filter.throughDate.toString(),
      filter.authorities.toString()
    );
    this.fetchReportsQuery = {
      ...this.fetchReportsQuery,
      limit,
      offset,
    };
    const fetchResult = await this.client.query({
      query: ReportsDocument,
      variables: this.fetchReportsQuery,
    });

    const items = Array<Report>();
    fetchResult.data.incidentReports?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          createdAt: item.createdAt,
          incidentDate: item.incidentDate,
          rendererData: item.rendererData,
          reportTypeName: item.reportType.name,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.incidentReports?.totalCount,
    };
  }

  async getReport(id: string) {
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
        reportTypeName: incidentReport.reportType.name,
        rendererData: incidentReport.rendererData,
        data: incidentReport.data,
        images: incidentReport.images as Image[],
      };
    }
    return {
      data,
    };
  }
}
