import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { CheckCodeDocument, UserRegisterDocument } from "lib/generated/graphql";
import { IService } from "../interface";
import { CheckInvitationCodeResult, RegisterResult } from "./register";

export interface IRegisterService extends IService {
  checkInvitationCode(
    invitationCode: string
  ): Promise<CheckInvitationCodeResult>;

  registerUser(
    invitationCode: string,
    username: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string
  ): Promise<RegisterResult>;
}

export class RegisterService implements IRegisterService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async checkInvitationCode(
    invitationCode: string
  ): Promise<CheckInvitationCodeResult> {
    const getResult = await this.client.query({
      query: CheckCodeDocument,
      variables: {
        code: invitationCode,
      },
      fetchPolicy: "network-only",
    });

    if (getResult.errors) {
      return {
        success: false,
        message: getResult.errors.map(o => o.message).join(","),
      };
    }
    return {
      success: true,
      code: getResult.data.checkInvitationCode?.code!,
      authorityId: parseInt(getResult.data.checkInvitationCode?.authority.id!),
      authorityName: getResult.data.checkInvitationCode?.authority.name!,
    };
  }

  async registerUser(
    invitationCode: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone?: string
  ): Promise<RegisterResult> {
    const registerResult = await this.client.mutate({
      mutation: UserRegisterDocument,
      variables: {
        invitationCode: invitationCode,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
      },
      fetchPolicy: "network-only",
    });

    if (registerResult.errors) {
      return {
        success: false,
        message: registerResult.errors.map(o => o.message).join(","),
      };
    }
    const result = registerResult.data?.authorityUserRegister;
    const me = result?.me!;

    return {
      success: true,
      me: {
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
      },
      tokenAuth: {
        token: result?.token!,
        refreshToken: result?.refreshToken!,
      },
    };
  }
}
