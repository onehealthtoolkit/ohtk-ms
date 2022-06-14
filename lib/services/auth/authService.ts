import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  DeleteTokenCookieDocument,
  RefreshTokenDocument,
  TokenAuthDocument,
} from "lib/generated/graphql";
import { IService } from "../interface";

export function setRefreshExpiresIn(value: number) {
  localStorage.setItem("refreshExpiresIn", value.toString());
}

export type SignInResult = SignInSuccess | SingInFailure;
export type SignInSuccess = {
  success: true;
  tokenAuth: {
    token: string;
    refreshExpiresIn: number;
  };
};
export type SingInFailure = {
  success: false;
  message: string;
};
export interface IAuthService extends IService {
  refreshToken(): Promise<boolean>;
  signIn(username: string, password: string): Promise<SignInResult>;
  signOut(): Promise<void>;
}

export class AuthService implements IAuthService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async refreshToken(): Promise<boolean> {
    const result = await this.client.mutate({
      mutation: RefreshTokenDocument,
    });
    console.log("refreshtoken", result);

    if (result.errors) {
      return false;
    } else {
      setRefreshExpiresIn(result.data?.refreshToken?.payload.exp || 0);
    }
    return true;
  }

  async signIn(username: string, password: string): Promise<SignInResult> {
    const fetchResult = await this.client.mutate({
      mutation: TokenAuthDocument,
      variables: {
        username,
        password,
      },
    });
    if (fetchResult.errors) {
      return {
        success: false,
        message: fetchResult.errors.map(o => o.message).join(","),
      };
    }

    setRefreshExpiresIn(fetchResult.data?.tokenAuth?.refreshExpiresIn!);

    return {
      success: true,
      tokenAuth: {
        token: fetchResult.data?.tokenAuth?.token!,
        refreshExpiresIn: fetchResult.data?.tokenAuth?.refreshExpiresIn!,
      },
    };
  }

  async signOut(): Promise<void> {
    const deleteTokenResult = await this.client.mutate({
      mutation: DeleteTokenCookieDocument,
    });
    if (deleteTokenResult.errors) {
      throw new Error(deleteTokenResult.errors.map(o => o.message).join(","));
    }
  }
}
