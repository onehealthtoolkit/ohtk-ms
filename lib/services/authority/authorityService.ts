import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  AuthoritiesDocument,
  AuthorityCreateDocument,
  AuthorityUpdateDocument,
  GetAuthorityDocument,
} from "lib/generated/graphql";
import { Authority } from "lib/services/authority/authority";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IAuthorityService extends IService {
  fetchAuthorities(searchText: string): Promise<QueryResult<Authority[]>>;
  getAuthority(id: string): Promise<GetResult<Authority>>;
  createAuthority(code: string, name: string): Promise<SaveResult<Authority>>;
  updateAuthority(
    id: string,
    code: string,
    name: string
  ): Promise<SaveResult<Authority>>;
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

  async getAuthority(id: string) {
    const getResult = await this.client.query({
      query: GetAuthorityDocument,
      variables: {
        id,
      },
    });

    let data;
    const authority = getResult.data.authority;
    if (authority) {
      data = { id: authority.id, code: authority.code, name: authority.name };
    }
    return {
      data,
    };
  }

  async createAuthority(
    code: string,
    name: string
  ): Promise<SaveResult<Authority>> {
    const createResult = await this.client.mutate({
      mutation: AuthorityCreateDocument,
      variables: {
        code,
        name,
      },
      refetchQueries: [
        {
          query: AuthoritiesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
    });

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
    name: string
  ): Promise<SaveResult<Authority>> {
    const updateResult = await this.client.mutate({
      mutation: AuthorityUpdateDocument,
      variables: {
        id,
        code,
        name,
      },
      refetchQueries: [
        {
          query: AuthoritiesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
    });

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
}
