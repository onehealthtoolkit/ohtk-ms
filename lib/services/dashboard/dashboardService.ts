import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { EventsQueryDocument, StatQueryDocument } from "lib/generated/graphql";
import { IService } from "../interface";
import { EventData } from "./event";
import { StatData } from "./stat";

export interface IDashboardService extends IService {
  fetchEvent(authorityId: number): Promise<EventData>;
  fetchStat(authorityId: number): Promise<StatData>;
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
    });

    const data: EventData = {
      reports: [],
      cases: [],
    };
    fetchResult.data.eventsQuery?.reports?.forEach(item => {
      if (item)
        data.reports.push({
          id: item.id,
          location: item.gpsLocation || "",
        });
    });
    fetchResult.data.eventsQuery?.cases?.forEach(item => {
      if (item)
        data.cases.push({
          id: item.id,
          location: item.report?.gpsLocation || "",
        });
    });

    return data;
  }

  async fetchStat(authorityId: number): Promise<StatData> {
    const fetchResult = await this.client.query({
      query: StatQueryDocument,
      variables: {
        authorityId,
      },
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
}
