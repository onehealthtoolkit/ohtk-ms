import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  DeleteTokenCookieDocument,
  RefreshTokenDocument,
  TokenAuthDocument,
} from "lib/generated/graphql";
import { IService } from "../interface";

const REFRESH_EXPIRES_IN = "refreshExpiresIn";

export function setRefreshExpiresIn(value: number) {
  localStorage.setItem(REFRESH_EXPIRES_IN, value.toString());
}

export function getRefreshExpiresIn(): number {
  const value = localStorage.getItem(REFRESH_EXPIRES_IN);
  if (value) {
    try {
      return parseInt(value);
    } catch (_) {
      localStorage.removeItem(REFRESH_EXPIRES_IN);
      return 0;
    }
  }
  return 0;
}

export function minutesUntilTokenExpire(): number {
  const expireTime = getRefreshExpiresIn();
  if (expireTime == 0) {
    return 0;
  }
  const now = Date.now();
  const diff = now - expireTime * 1000;
  if (diff > 0) {
    return 0;
  }

  const diffInMinute = diff / (60 * 1000);
  return diffInMinute * -1;
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
  refreshToken(refreshToken?: string): Promise<boolean>;
  signIn(username: string, password: string): Promise<SignInResult>;
  signOut(): Promise<void>;
  startAutoRefreshToken(): void;
}

export class AuthService implements IAuthService {
  client: ApolloClient<NormalizedCacheObject>;
  interval?: number;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  startAutoRefreshToken(): void {
    if (this.interval != undefined) {
      clearInterval(this.interval);
    }
    // window.setInterval return number
    // setInterval without window prefix return NodeJS.Timer
    this.interval = window.setInterval(() => {
      const diff = minutesUntilTokenExpire();
      console.debug("refresh interval", diff);
      if (diff < 3) {
        this.refreshToken();
      }
    }, 60 * 1 * 1000 /* millisec */);
  }

  async refreshToken(refreshToken?: string): Promise<boolean> {
    const result = await this.client.mutate({
      mutation: RefreshTokenDocument,
      variables: {
        refreshToken,
      },
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
    this.client.resetStore();
  }
}
