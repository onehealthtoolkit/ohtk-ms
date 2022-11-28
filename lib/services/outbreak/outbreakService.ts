import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { OutbreakPlacesDocument } from "lib/generated/graphql";
import { IService, QueryResult } from "lib/services/interface";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";

export interface IOutbreakService extends IService {
  fecthOutbreakPlaces(caseId: string): Promise<QueryResult<OutbreakPlace[]>>;
}

export class OutbreakService implements IOutbreakService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fecthOutbreakPlaces(
    caseId: string
  ): Promise<QueryResult<OutbreakPlace[]>> {
    const fetchResult = await this.client.query({
      query: OutbreakPlacesDocument,
      variables: {
        caseId,
      },
      fetchPolicy: "cache-first",
    });

    const items = Array<OutbreakPlace>();
    fetchResult.data.outbreakPlaces?.forEach(item => {
      if (item) {
        items.push({
          place: item.place,
          zone: item.zone,
          color: item.color,
        });
      }
    });
    return {
      items,
      error: fetchResult.errors?.map(err => err.message).join(", "),
    };
  }
}
