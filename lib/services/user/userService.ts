import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  UsersDocument,
  UserCreateDocument,
  UserUpdateDocument,
  GetUserDocument,
} from "lib/generated/graphql";
import { User } from "lib/services/user/user";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IUserService extends IService {
  fetchUsers(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<User[]>>;
  getUser(id: string): Promise<GetResult<User>>;
  createUser(
    authorityId: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<SaveResult<User>>;
  updateUser(
    id: string,
    authorityId: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<SaveResult<User>>;
  deleteUser(id: string): Promise<DeleteResult>;
}

export class UserService implements IUserService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchUsersQuery = {
    limit: 20,
    offset: 0,
    nameStartWith: "",
    ordering: "username,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchUsers(limit: number, offset: number, searchText: string) {
    this.fetchUsersQuery = {
      ...this.fetchUsersQuery,
      limit,
      offset,
      nameStartWith: searchText,
    };

    const fetchResult = await this.client.query({
      query: UsersDocument,
      variables: this.fetchUsersQuery,
    });

    const items = Array<User>();
    fetchResult.data.adminAuthorityUserQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          username: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminAuthorityUserQuery?.totalCount,
    };
  }

  async getUser(id: string) {
    const getResult = await this.client.query({
      query: GetUserDocument,
      variables: {
        id,
      },
    });

    let data;
    const user = getResult.data.authorityUser;
    if (user) {
      data = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone || "",
      };
    }
    return {
      data,
    };
  }

  async createUser(
    authorityId: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<SaveResult<User>> {
    const createResult = await this.client.mutate({
      mutation: UserCreateDocument,
      variables: {
        authorityId,
        username,
        password,
        firstName,
        lastName,
        email,
        telephone,
      },
      refetchQueries: [
        {
          query: UsersDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminAuthorityUserCreate?.result;
    switch (result?.__typename) {
      case "AdminAuthorityUserCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminAuthorityUserCreateProblem": {
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

  async updateUser(
    id: string,
    authorityId: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string
  ): Promise<SaveResult<User>> {
    const updateResult = await this.client.mutate({
      mutation: UserUpdateDocument,
      variables: {
        id,
        authorityId,
        username,
        firstName,
        lastName,
        email,
        telephone,
      },
      refetchQueries: [
        {
          query: UsersDocument,
          variables: this.fetchUsersQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetUserDocument,
          variables: { id },
        });
        const authorityUserCache = cacheItem?.authorityUser;
        if (authorityUserCache) {
          const serverReturnValue =
            result.data?.adminAuthorityUserUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminAuthorityUserUpdateSuccess"
          ) {
            const newAuthorityUserValue = serverReturnValue.authorityUser;
            cache.writeQuery({
              query: GetUserDocument,
              variables: { id },
              data: {
                __typename: "Query",
                authorityUser: newAuthorityUserValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminAuthorityUserUpdate?.result;
    switch (result?.__typename) {
      case "AdminAuthorityUserUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminAuthorityUserUpdateProblem": {
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

  async deleteUser(id: string) {
    console.log("delete user", id);
    return { error: "" };
  }
}
