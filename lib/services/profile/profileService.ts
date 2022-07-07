import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { MeDocument } from "lib/generated/graphql";
import { Me, ProfileUpdate } from "lib/services/profile/me";
import { IService, SaveResult } from "../interface";

export interface IProfileService extends IService {
  fetchMe(): Promise<Me>;
  updateProfile(
    image: File | undefined,
    password: string,
    confirmPassword: string
  ): Promise<SaveResult<ProfileUpdate>>;
}

export class ProfileService implements IProfileService {
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
        authorityId: result.data.me!.authorityId || 0,
        authorityName: result.data.me!.authorityName || "",
      };
    } else {
      throw new Error("Method not implemented.");
    }
  }

  async updateProfile(
    image: File | undefined,
    password: string,
    confirmPassword: string
  ): Promise<SaveResult<ProfileUpdate>> {
    console.log(image, password, confirmPassword);
    return { success: true };
  }
}
