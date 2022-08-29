/* eslint-disable require-jsdoc */
import { ApolloClient, ApolloLink, from, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";
import { createUploadLink } from "apollo-upload-client";
import { RefreshTokenDocument } from "./generated/graphql";

export const BACKEND_DOMAIN = "opensur.test";

const LOCAL_STORAGE_REFRESH_EXPIRES_IN_KEY = "refreshExpiresIn";
const LOCAL_STORGAGE_BACKEND_URL_KEY = "backendUrl";

export function setRefreshExpiresIn(value: number) {
  localStorage.setItem(LOCAL_STORAGE_REFRESH_EXPIRES_IN_KEY, value.toString());
}

export function getRefreshExpiresIn(): number {
  const value = localStorage.getItem(LOCAL_STORAGE_REFRESH_EXPIRES_IN_KEY);
  if (value) {
    return parseInt(value);
  }
  return 0;
}

const refreshToken = async (): Promise<void> => {
  const result = await client.mutate({
    mutation: RefreshTokenDocument,
  });

  if (!result.errors) {
    setRefreshExpiresIn(result.data?.refreshToken?.payload.exp || 0);
  }
};

const resolveUri = (defaultUri: string) => {
  return localStorage.getItem(LOCAL_STORGAGE_BACKEND_URL_KEY) || defaultUri;
};

const customFetch = (uri: string, options: Record<string, string>) => {
  const fetchUri = resolveUri(uri);

  const now = Math.round(new Date().getTime() / 1000);
  const refreshExpiresIn = getRefreshExpiresIn();
  const diff = refreshExpiresIn - now;
  if (refreshExpiresIn !== 0 && diff < 30 && diff > 5) {
    return refreshToken().then(() => {
      return fetch(fetchUri, options);
    });
  } else {
    return fetch(fetchUri, options);
  }
};

const httpLink = createUploadLink({
  uri: `https://${BACKEND_DOMAIN}/graphql/`,
  credentials: "include",
  fetch: customFetch,
}) as unknown as ApolloLink;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === "development") {
    console.error(graphQLErrors || networkError);
  } else {
    Router.push({
      pathname: "/error/[e]",
      query: { e: (graphQLErrors ? 400 : networkError ? 500 : 0).toString() },
    });
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
