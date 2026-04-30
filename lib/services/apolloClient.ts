import type { ApolloClient } from "@apollo/client";

export type LegacyApolloClient = Omit<ApolloClient, "query" | "mutate"> & {
  query(options: any): Promise<any>;
  mutate(options: any): Promise<any>;
};
