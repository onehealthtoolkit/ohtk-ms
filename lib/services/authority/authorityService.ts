import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AuthoritiesDocument } from "lib/generated/graphql";
import { Authority } from "lib/services/authority/authority";
import { IService, QueryResult } from "lib/services/interface";

export interface IAuthorityService extends IService {
  fetchAuthorities(searchText: string): Promise<QueryResult<Authority[]>>;
}

export class AuthorityService implements IAuthorityService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchAuthorities(searchText: string) {
    const fetchResult = await this.client.query({
      query: AuthoritiesDocument,
      variables: {
        limit: 20,
        offset: 0,
        nameStartWith: searchText,
      },
    });

    if (fetchResult.errors) {
      return {
        items: undefined,
        error: fetchResult.errors.map(err => err.message).join(","),
      };
    }

    const items = Array<Authority>();
    fetchResult.data.authorities?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          code: item.code,
        });
      }
    });
    return {
      items,
    };
  }
}
