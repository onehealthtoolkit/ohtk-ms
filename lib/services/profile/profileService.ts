import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  AdminUserChangePasswordDocument,
  AdminUserUploadAvatarDocument,
  MeDocument,
} from "lib/generated/graphql";
import { IService, SaveResult } from "lib/services/interface";
import { Me, ProfileUpdate } from "lib/services/profile/me";

export interface IProfileService extends IService {
  fetchMe(): Promise<Me>;
  uploadAvatar(image: File): Promise<SaveResult<ProfileUpdate>>;
  changePassword(newPassword: string): Promise<SaveResult<ProfileUpdate>>;
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
        avatarUrl: result.data.me!.avatarUrl || "",
      };
    } else {
      throw new Error("Method not implemented.");
    }
  }

  async uploadAvatar(image: File): Promise<SaveResult<ProfileUpdate>> {
    const uploadResult = await this.client.mutate({
      mutation: AdminUserUploadAvatarDocument,
      variables: {
        image,
      },
      context: {
        useMultipart: true,
      },
    });

    const success = uploadResult.data?.adminUserUploadAvatar
      ?.success as boolean;
    return {
      success,
      data: {
        avatarUrl: uploadResult.data?.adminUserUploadAvatar
          ?.avatarUrl as string,
      },
    };
  }

  async changePassword(newPassword: string): Promise<SaveResult<never>> {
    const uploadResult = await this.client.mutate({
      mutation: AdminUserChangePasswordDocument,
      variables: {
        newPassword,
      },
    });

    const success = uploadResult.data?.adminUserChangePassword
      ?.success as boolean;
    return {
      success,
    };
  }
}
