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

export interface IAuthService extends IService {
  refreshToken(): Promise<boolean>;
  signIn(
    username: string,
    password: string
  ): Promise<{
    tokenAuth: {
      token: string;
      refreshExpiresIn: number;
    };
  }>;
  signOut(): Promise<void>;
}

export class AuthService implements IAuthService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async refreshToken(): Promise<boolean> {
    try {
      const result = await this.client.mutate({
        mutation: RefreshTokenDocument,
      });

      if (result.errors) {
        return false;
      } else {
        setRefreshExpiresIn(result.data?.refreshToken?.payload.exp || 0);
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  async signIn(
    username: string,
    password: string
  ): Promise<{
    tokenAuth: {
      token: string;
      refreshExpiresIn: number;
    };
  }> {
    const fetchResult = await this.client.mutate({
      mutation: TokenAuthDocument,
      variables: {
        username,
        password,
      },
    });
    if (fetchResult.errors) {
      throw new Error(fetchResult.errors.map(o => o.message).join(","));
    }

    setRefreshExpiresIn(fetchResult.data?.tokenAuth?.refreshExpiresIn!);

    return {
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
