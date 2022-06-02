/* eslint-disable require-jsdoc */
import {
  ApolloClient,
  ApolloLink,
  from,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const customFetch = (uri: string, options: Record<string, string>) => {
  const now = Math.round(new Date().getTime() / 1000);
  if (client.refreshExpiresIn !== 0 && client.refreshExpiresIn - now < 30) {
    return client.refreshToken().then(() => {
      return fetch(uri, options);
    });
  } else {
    return fetch(uri, options);
  }
};

const httpLink = createUploadLink({
  uri: "/graphql/",
  fetch: customFetch,
}) as unknown as ApolloLink;

export class CustomApolloClient<T> extends ApolloClient<T> {
  refreshExpiresIn = 0;

  setRefreshExpiresIn(value: number) {
    this.refreshExpiresIn = value;
  }

  async refreshToken() {
    try {
      const result = await this.mutate({
        mutation: gql(`mutation RefreshToken {
          refreshToken {
            token
            payload
          }
        }`),
      });

      if (result.errors) {
        return false;
      }

      this.refreshExpiresIn = result.data.refreshToken.payload.exp;
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
    const fetchResult = await this.mutate({
      mutation: gql(`
        mutation TokenAuth($username: String!, $password: String!) {
          tokenAuth(username: $username, password: $password) {
            refreshExpiresIn
            token
          }
        }
        `),
      variables: {
        username,
        password,
      },
    });
    if (fetchResult.errors) {
      throw new Error(fetchResult.errors.map(o => o.message).join(","));
    }
    return fetchResult.data;
  }

  async signOut(): Promise<any> {
    const deleteTokenResult = await this.mutate({
      mutation: gql(`
        mutation DeleteTokenCookie {
          deleteTokenCookie {
            deleted
          }
          deleteRefreshTokenCookie {
            deleted
          }
        }
      `),
    });
    if (deleteTokenResult.errors) {
      throw new Error(deleteTokenResult.errors.map(o => o.message).join(","));
    }
    return deleteTokenResult.data;
  }
}

export const client = new CustomApolloClient({
  uri: "http://localhost:3000/graphql/",
  credentials: "include",
  cache: new InMemoryCache(),
  link: from([httpLink]),
});
