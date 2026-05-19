/* eslint-disable require-jsdoc */
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { RefreshTokenDocument } from "./generated/graphql";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const BACKEND_DOMAIN = publicRuntimeConfig.serverDomain;
export const DEFAULT_GRAPHQL_URI = graphqlEndpoint(BACKEND_DOMAIN);
export const DEFAULT_WEBSOCKET_URI = websocketEndpoint(BACKEND_DOMAIN);

const LOCAL_STORAGE_REFRESH_EXPIRES_IN_KEY = "refreshExpiresIn";
const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";
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

export function setAccessToken(value: string) {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, value);
}

export function clearAccessToken() {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}

export function getAccessToken(): string | undefined {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || undefined;
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

function getPayloadExp(payload: unknown): number {
  if (!payload) {
    return 0;
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = typeof payload === "string" ? JSON.parse(payload) : payload;
  } catch (_) {
    return 0;
  }

  if (
    typeof parsedPayload === "object" &&
    parsedPayload !== null &&
    "exp" in parsedPayload
  ) {
    const exp = Number(parsedPayload.exp);
    return Number.isFinite(exp) ? exp : 0;
  }

  return 0;
}

const isAuthOperation = (body: unknown) =>
  typeof body === "string" &&
  (body.includes("TokenAuth") ||
    body.includes("RefreshToken") ||
    body.includes("DeleteTokenCookie"));

const withAuthorizationHeader = (options: RequestInit): RequestInit => {
  if (isAuthOperation(options.body)) {
    return options;
  }

  const token = getAccessToken();
  if (!token) {
    return options;
  }

  const headers = new Headers(options.headers);
  if (!headers.has("Authorization")) {
    headers.set("Authorization", `JWT ${token}`);
  }

  return {
    ...options,
    headers,
  };
};

const refreshToken = async (): Promise<boolean> => {
  const result = await client.mutate({
    mutation: RefreshTokenDocument,
  });

  if (!result.error) {
    setRefreshExpiresIn(getPayloadExp(result.data?.refreshToken?.payload));
    const token = result.data?.refreshToken?.token;
    if (token) {
      setAccessToken(token);
    }
    return false;
  }

  return true;
};

const resolveUri = (defaultUri: string) => {
  return localStorage.getItem(LOCAL_STORGAGE_BACKEND_URL_KEY) || defaultUri;
};

const customFetch = (input: RequestInfo | URL, options?: RequestInit) => {
  const fetchUri = resolveUri(input.toString());
  const requestOptions = options ?? {};

  const now = Math.round(new Date().getTime() / 1000);
  const refreshExpiresIn = getRefreshExpiresIn();
  // diff is number of seconds until refresh token expires
  // diff value could be negative if token is already expired
  const diff = refreshExpiresIn - now;

  // we should prevent recursive call of refreshToken by
  // checking if options[body] is containing refreshToken
  var isRefreshingToken = isAuthOperation(requestOptions.body);

  if (refreshExpiresIn !== 0 && diff < 30 && !isRefreshingToken) {
    console.log("refreshing token due to expiration", diff);
    return refreshToken().then(() => {
      return fetch(fetchUri, {
        ...withAuthorizationHeader(requestOptions),
      });
    });
  } else {
    return fetch(fetchUri, withAuthorizationHeader(requestOptions));
  }
};

const httpLink = new UploadHttpLink({
  uri: DEFAULT_GRAPHQL_URI,
  credentials: "include",
  fetch: customFetch,
});

const errorLink = onError(({ error }) => {
  console.error(error);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
