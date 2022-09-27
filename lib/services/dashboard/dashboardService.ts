import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  EventsQueryDocument,
  StatQueryDocument,
  SummaryCaseByCategoryQueryDocument,
  SummaryReportByCategoryQueryDocument,
} from "lib/generated/graphql";
import { IService } from "../interface";
import { EventData } from "./event";
import { SummaryByCategoryData } from "./summaryByCategory";
import { StatData } from "./stat";

export interface IDashboardService extends IService {
  fetchEvent(authorityId: number): Promise<EventData>;

  fetchStat(authorityId: number): Promise<StatData>;

  fetchSummaryReportByCategory(
    authorityId: number,
    fromDate?: Date,
    toDate?: Date
  ): Promise<SummaryByCategoryData[]>;

  fetchSummaryCaseByCategory(
    authorityId: number,
    fromDate?: Date,
    toDate?: Date
  ): Promise<SummaryByCategoryData[]>;
}

export class DashboardService implements IDashboardService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchEvent(authorityId: number): Promise<EventData> {
    const fetchResult = await this.client.query({
      query: EventsQueryDocument,
      variables: {
        authorityId,
      },
      fetchPolicy: "network-only",
    });

    const data: EventData = {
      reports: [],
      cases: [],
    };
    fetchResult.data.eventsQuery?.reports?.forEach(item => {
      if (item) {
        const location = item.gpsLocation?.split(",");

        if (location?.length === 2) {
          const latlng = {
            lat: +location[1],
            lng: +location[0],
          };
          data.reports.push({
            id: item.id,
            type: "report",
            location: latlng,
            data: item.rendererData,
            categoryName: item.reportType?.category?.name || "",
            categoryIcon: item.reportType?.category?.icon,
          });
        }
      }
    });
    fetchResult.data.eventsQuery?.cases?.forEach(item => {
      if (item) {
        const location = item.report?.gpsLocation?.split(",");

        if (location?.length === 2) {
          const latlng = {
            lat: +location[1],
            lng: +location[0],
          };

          data.cases.push({
            id: item.id,
            type: "case",
            location: latlng,
            data: item.report?.rendererData || "",
            categoryName: item.report?.reportType?.category?.name || "",
            categoryIcon: item.report?.reportType?.category?.icon,
          });
        }
      }
    });

    return data;
  }

  async fetchStat(authorityId: number): Promise<StatData> {
    const fetchResult = await this.client.query({
      query: StatQueryDocument,
      variables: {
        authorityId,
      },
      fetchPolicy: "network-only",
    });

    const data: StatData = {
      openCaseCount: 0,
      reporterCount: 0,
      officialCount: 0,
    };

    const result = fetchResult.data.statQuery;
    if (result) {
      data.openCaseCount = result.openCaseCount || 0;
      data.officialCount = result.officialCount || 0;
      data.reporterCount = result.reporterCount || 0;
    }

    return data;
  }

  async fetchSummaryReportByCategory(
    authorityId: number,
    fromDate: Date,
    toDate: Date
  ): Promise<SummaryByCategoryData[]> {
    const fetchResult = await this.client.query({
      query: SummaryReportByCategoryQueryDocument,
      variables: {
        authorityId,
        fromDate,
        toDate,
      },
      fetchPolicy: "network-only",
    });

    const items: SummaryByCategoryData[] = [];
    fetchResult.data.summaryReportByCategoryQuery?.forEach(item => {
      items.push({
        category: item.category,
        ordering: item.ordering || 0,
        day: new Date(item.day),
        total: item.total,
      });
    });

    return items;
  }

  async fetchSummaryCaseByCategory(
    authorityId: number,
    fromDate: Date,
    toDate: Date
  ): Promise<SummaryByCategoryData[]> {
    const fetchResult = await this.client.query({
      query: SummaryCaseByCategoryQueryDocument,
      variables: {
        authorityId,
        fromDate,
        toDate,
      },
      fetchPolicy: "network-only",
    });

    const items: SummaryByCategoryData[] = [];
    fetchResult.data.summaryCaseByCategoryQuery?.forEach(item => {
      items.push({
        category: item.category,
        ordering: item.ordering || 0,
        day: new Date(item.day),
        total: item.total,
      });
    });

    return items;
  }
}
