import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { MeDocument } from "lib/generated/graphql";
import { Me } from "lib/model/me";
import { IService } from "../interface";

export interface IProfileService extends IService {
  fetchMe(): Promise<Me>;
}

export default class ProfileService implements IProfileService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchMe(): Promise<Me> {
    const result = await this.client.query({
      query: MeDocument,
      fetchPolicy: "network-only",
    });

    if (!result.errors) {
      return {
        username: result.data.me!.username,
        firstName: result.data.me!.firstName,
        lastName: result.data.me!.lastName,
        id: result.data.me!.id,
      };
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
