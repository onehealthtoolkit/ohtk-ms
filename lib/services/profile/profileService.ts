import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  UserChangePasswordDocument,
  UserUploadAvatarDocument,
  MeDocument,
  UserUpdateProfileDocument,
} from "lib/generated/graphql";
import { IService, SaveResult } from "lib/services/interface";
import { Me, ProfileUpdate } from "lib/services/profile/me";

export interface IProfileService extends IService {
  fetchMe(): Promise<Me>;

  uploadAvatar(image: File): Promise<SaveResult<ProfileUpdate>>;

  changePassword(newPassword: string): Promise<SaveResult<ProfileUpdate>>;

  updateProfile(
    firstName: string,
    lastName: string,
    telephone?: string
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
      const me = result.data.me!;
      return {
        username: me.username,
        firstName: me.firstName,
        lastName: me.lastName,
        id: me.id,
        authorityId: me.authorityId || 0,
        authorityName: me.authorityName || "",
        avatarUrl: me.avatarUrl || "",
        role: me.role || "",
        isReporter: me.role === "REP",
        isStaff: me.isStaff || false,
        isSuperUser: me.isSuperuser || false,
        email: me.email || "",
        telephone: me.telephone || "",
      };
    } else {
      throw new Error("Method not implemented.");
    }
  }

  async uploadAvatar(image: File): Promise<SaveResult<ProfileUpdate>> {
    const uploadResult = await this.client.mutate({
      mutation: UserUploadAvatarDocument,
      variables: {
        image,
      },
      context: {
        useMultipart: true,
      },
    });

    if (uploadResult.errors) {
      return {
        success: false,
        message: uploadResult.errors.map(o => o.message).join(","),
      };
    }

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
    const changePasswordResult = await this.client.mutate({
      mutation: UserChangePasswordDocument,
      variables: {
        newPassword,
      },
    });

    if (changePasswordResult.errors) {
      return {
        success: false,
        message: changePasswordResult.errors.map(o => o.message).join(","),
      };
    }

    const success = changePasswordResult.data?.adminUserChangePassword
      ?.success as boolean;
    return {
      success,
    };
  }

  async updateProfile(
    firstName: string,
    lastName: string,
    telephone?: string
  ): Promise<SaveResult<ProfileUpdate>> {
    const updateResult = await this.client.mutate({
      mutation: UserUpdateProfileDocument,
      variables: {
        firstName,
        lastName,
        telephone,
      },
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const success = updateResult.data?.adminUserUpdateProfile
      ?.success as boolean;
    return {
      success,
    };
  }
}
