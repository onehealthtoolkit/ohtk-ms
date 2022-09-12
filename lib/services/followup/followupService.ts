import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  GetFollowupReportDocument,
  QueryFollowupsDocument,
} from "lib/generated/graphql";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { Image } from "../report/report";
import { Followup, FollowupDetail } from "./followup";

export interface IFollowupService extends IService {
  fetchFollowups(incidentId: string): Promise<QueryResult<Followup[]>>;

  getFollowup(id: string): Promise<GetResult<FollowupDetail>>;
}

export class FollowupService implements IFollowupService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchFollowups(incidentId: string): Promise<QueryResult<Followup[]>> {
    const fetchResult = await this.client.query({
      query: QueryFollowupsDocument,
      variables: { incidentId },
    });

    const items = Array<Followup>();
    fetchResult.data.followups?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          rendererData: item.rendererData,
          createdAt: item.createdAt,
        });
      }
    });
    return {
      items,
    };
  }

  async getFollowup(id: string): Promise<GetResult<FollowupDetail>> {
    const getResult = await this.client.query({
      query: GetFollowupReportDocument,
      variables: {
        id,
      },
    });

    let data;
    const followup = getResult.data.followupReport;
    if (followup) {
      data = {
        id: followup.id,
        rendererData: followup.rendererData,
        createdAt: followup.createdAt,
        data: followup.data,
        images: followup.images as Image[],
      };
    }
    return {
      data,
    };
  }
}
