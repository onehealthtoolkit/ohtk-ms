import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  AuthorityCreateDocument,
  AuthorityUpdateDocument,
  AuthorityQueryDocument,
  GetAuthorityDocument,
  AuthorityInheritLookupDocument,
  AuthorityInheritsDownLookupDocument,
  AuthorityDeleteDocument,
  AuthorityInheritsDownFirstDocument,
} from "lib/generated/graphql";
import { Authority, PolygonData } from "lib/services/authority/authority";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IAuthorityService extends IService {
  lookupAuthorities(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<Authority[]>>;

  lookupAuthorityInheritsDown(authorityId: string): Promise<Authority[]>;

  lookupAuthorityInheritsDownFirst(authorityId: string): Promise<Authority[]>;

  fetchAuthorities(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<Authority[]>>;

  getAuthority(id: string): Promise<GetResult<Authority>>;

  createAuthority(
    code: string,
    name: string,
    area: PolygonData | undefined,
    inherits: string[]
  ): Promise<SaveResult<Authority>>;

  updateAuthority(
    id: string,
    code: string,
    name: string,
    area: PolygonData | undefined,
    inherits: string[]
  ): Promise<SaveResult<Authority>>;

  deleteAuthority(id: string): Promise<DeleteResult>;
}

export class AuthorityService implements IAuthorityService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchAuthoritiesQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "code,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async lookupAuthorities(limit: number, offset: number, searchText: string) {
    const variables = {
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: AuthorityInheritLookupDocument,
      variables,
    });

    const items = Array<Authority>();
    fetchResult.data.adminAuthorityInheritLookup?.results.forEach(item => {
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
      totalCount: fetchResult.data.adminAuthorityInheritLookup?.totalCount,
    };
  }

  async lookupAuthorityInheritsDown(authorityId: string) {
    const fetchResult = await this.client.query({
      query: AuthorityInheritsDownLookupDocument,
      variables: {
        authorityId,
      },
    });

    const items = Array<Authority>();
    fetchResult.data.authorityInheritsDown?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          code: item.code,
        });
      }
    });
    return items;
  }

  async lookupAuthorityInheritsDownFirst(authorityId: string) {
    const fetchResult = await this.client.query({
      query: AuthorityInheritsDownFirstDocument,
      variables: {
        authorityId,
      },
    });

    const items = Array<Authority>();
    fetchResult.data.authorityInheritsDownFirst?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          code: item.code,
        });
      }
    });
    return items;
  }

  async fetchAuthorities(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchAuthoritiesQuery = {
      ...this.fetchAuthoritiesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: AuthorityQueryDocument,
      variables: this.fetchAuthoritiesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Authority>();
    fetchResult.data.adminAuthorityQuery?.results.forEach(item => {
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
      totalCount: fetchResult.data.adminAuthorityQuery?.totalCount,
    };
  }

  async getAuthority(id: string): Promise<GetResult<Authority>> {
    const getResult = await this.client.query({
      query: GetAuthorityDocument,
      variables: {
        id,
      },
    });

    let data;
    const authority = getResult.data.authority;
    if (authority) {
      const inherits = authority.inherits?.map(obj => {
        return {
          id: obj!.id,
          code: obj!.code,
          name: obj!.name,
        };
      });
      data = {
        id: authority.id,
        code: authority.code,
        name: authority.name,
        area: authority.area,
        inherits,
      };
    }
    return {
      data,
    };
  }

  async createAuthority(
    code: string,
    name: string,
    area: PolygonData | undefined,
    inherits: string[]
  ): Promise<SaveResult<Authority>> {
    const createResult = await this.client.mutate({
      mutation: AuthorityCreateDocument,
      variables: {
        code,
        name,
        area: area && JSON.stringify(area),
        inherits,
      },
      refetchQueries: [
        {
          query: AuthorityQueryDocument,
          variables: this.fetchAuthoritiesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });
    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

    const result = createResult.data?.adminAuthorityCreate?.result;
    switch (result?.__typename) {
      case "AdminAuthorityCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminAuthorityCreateProblem": {
        console.log("problem", result);
        const fields: any = {};
        // field validation errors, show specifiic error for each fields
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });
        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async updateAuthority(
    id: string,
    code: string,
    name: string,
    area: PolygonData | undefined,
    inherits: string[]
  ): Promise<SaveResult<Authority>> {
    const updateResult = await this.client.mutate({
      mutation: AuthorityUpdateDocument,
      variables: {
        id,
        code,
        name,
        area: area && JSON.stringify(area),
        inherits,
      },
      refetchQueries: [
        {
          query: AuthorityQueryDocument,
          variables: this.fetchAuthoritiesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetAuthorityDocument,
          variables: { id },
        });
        const authoirtyCache = cacheItem?.authority;
        if (authoirtyCache) {
          const serverReturnValue = result.data?.adminAuthorityUpdate?.result;
          if (serverReturnValue?.__typename === "AdminAuthorityUpdateSuccess") {
            const newAuthorityValue = serverReturnValue.authority;
            cache.writeQuery({
              query: GetAuthorityDocument,
              variables: { id },
              data: {
                __typename: "Query",
                authority: newAuthorityValue,
              },
            });
          }
        }
      },
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const result = updateResult.data?.adminAuthorityUpdate?.result;
    switch (result?.__typename) {
      case "AdminAuthorityUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminAuthorityUpdateProblem": {
        console.log("problem", result);
        const fields: any = {};
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });

        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async deleteAuthority(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: AuthorityDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: AuthorityQueryDocument,
          variables: this.fetchAuthoritiesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminAuthorityQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "AuthorityType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
