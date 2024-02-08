/* eslint-disable require-jsdoc */
import { ApolloClient, ApolloLink, from, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { RefreshTokenDocument } from "./generated/graphql";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const BACKEND_DOMAIN = publicRuntimeConfig.serverDomain;
export const DEFAULT_GRAPHQL_URI = graphqlEndpoint(BACKEND_DOMAIN);
export const DEFAULT_WEBSOCKET_URI = websocketEndpoint(BACKEND_DOMAIN);

const LOCAL_STORAGE_REFRESH_EXPIRES_IN_KEY = "refreshExpiresIn";
const LOCAL_STORGAGE_BACKEND_URL_KEY = "backendUrl";
const LOCAL_STORGAGE_SUB_DOMAIN = "subdomain";

export function graphqlEndpoint(domain: string) {
  return `https://${domain}/graphql/`;
}

export function websocketEndpoint(domain: string) {
  return `wss://${domain}/ws`;
}

export function currentGraphqlEndpoint() {
  const savedBackendUrl = localStorage.getItem(LOCAL_STORGAGE_BACKEND_URL_KEY);
  if (savedBackendUrl) {
    return savedBackendUrl;
  }
  return DEFAULT_GRAPHQL_URI;
}

export function currentWebsocketEndpoint() {
  const savedBackendUrl = localStorage.getItem(LOCAL_STORGAGE_BACKEND_URL_KEY);
  if (savedBackendUrl) {
    const domain = savedBackendUrl
      .replace("https://", "")
      .replace("http://", "")
      .replace("/graphql/", "");
    return websocketEndpoint(domain);
  }
  return DEFAULT_WEBSOCKET_URI;
}

export function setBackendSubDomain(subdomain: string) {
  if (subdomain === "") {
    localStorage.removeItem(LOCAL_STORGAGE_BACKEND_URL_KEY);
  } else {
    localStorage.setItem(LOCAL_STORGAGE_SUB_DOMAIN, subdomain);
    localStorage.setItem(
      LOCAL_STORGAGE_BACKEND_URL_KEY,
      `https://${subdomain}/graphql/`
    );
  }
}

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

export function getSubDomain() {
  return localStorage.getItem(LOCAL_STORGAGE_SUB_DOMAIN) || undefined;
}

const refreshToken = async (): Promise<boolean> => {
  const result = await client.mutate({
    mutation: RefreshTokenDocument,
  });

  if (!result.errors) {
    setRefreshExpiresIn(result.data?.refreshToken?.payload.exp || 0);
    return false;
  }

  return true;
};

const resolveUri = (defaultUri: string) => {
  return localStorage.getItem(LOCAL_STORGAGE_BACKEND_URL_KEY) || defaultUri;
};

const customFetch = (uri: string, options: Record<string, string>) => {
  const fetchUri = resolveUri(uri);

  const now = Math.round(new Date().getTime() / 1000);
  const refreshExpiresIn = getRefreshExpiresIn();
  // diff is number of seconds until refresh token expires
  // diff value could be negative if token is already expired
  const diff = refreshExpiresIn - now;

  // we should prevent recursive call of refreshToken by
  // checking if options[body] is containing refreshToken
  var isRefreshingToken = false;
  if (options.body && options.body.includes("RefreshToken")) {
    isRefreshingToken = true;
  }

  if (refreshExpiresIn !== 0 && diff < 30 && !isRefreshingToken) {
    console.log("refreshing token due to expiration", diff);
    return refreshToken().then(() => {
      return fetch(fetchUri, {
        ...options,
      });
    });
  } else {
    return fetch(fetchUri, options);
  }
};

const httpLink = createUploadLink({
  uri: DEFAULT_GRAPHQL_URI,
  credentials: "include",
  fetch: customFetch,
}) as unknown as ApolloLink;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.error(graphQLErrors || networkError);
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
