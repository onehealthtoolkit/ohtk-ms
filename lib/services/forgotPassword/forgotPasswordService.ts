import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ResetPasswordCreateDocument,
  ResetPasswordRequestCreateDocument,
} from "lib/generated/graphql";
import { IService } from "../interface";

export type ForgotResult = ForgotSuccess | ForgotFailure;
export type ForgotSuccess = {
  success: true;
};
export type ForgotFailure = {
  success: false;
  message: string;
};

export interface IForgotPasswordService extends IService {
  resetPasswordRequest(email: string): Promise<ForgotResult>;

  resetPassword(token: string, password: string): Promise<ForgotResult>;
}

export class ForgotPasswordService implements IForgotPasswordService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async resetPasswordRequest(email: string): Promise<ForgotResult> {
    const getResult = await this.client.mutate({
      mutation: ResetPasswordRequestCreateDocument,
      variables: {
        email,
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
    };
  }

  async resetPassword(token: string, password: string): Promise<ForgotResult> {
    const registerResult = await this.client.mutate({
      mutation: ResetPasswordCreateDocument,
      variables: {
        token,
        password,
      },
      fetchPolicy: "network-only",
    });

    if (registerResult.errors) {
      return {
        success: false,
        message: registerResult.errors.map(o => o.message).join(","),
      };
    }
    return {
      success: true,
    };
  }
}
