import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  UsersDocument,
  UserCreateDocument,
  UserUpdateDocument,
  GetUserDocument,
  UsersQueryVariables,
  UserDeleteDocument,
  LoginQrTokenDocument,
  UserUpdatePasswordDocument,
  SummaryContributionQueryDocument,
} from "lib/generated/graphql";
import { User } from "lib/services/user/user";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import { Contribution } from ".";
import { Authority } from "../authority";

export interface IUserService extends IService {
  fetchUsers(
    limit: number,
    offset: number,
    searchText: string,
    authorities?: Pick<Authority, "id" | "code" | "name">[],
    role?: string,
    fromDate?: Date,
    throughDate?: Date,
    force?: boolean
  ): Promise<QueryResult<User[]>>;

  getUser(id: string): Promise<GetResult<User>>;

  createUser(
    authorityId: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    address: string,
    role: string
  ): Promise<SaveResult<User>>;

  updateUser(
    id: string,
    authorityId: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    address: string,
    role: string
  ): Promise<SaveResult<User>>;

  updateUserPassword(id: string, password: string): Promise<SaveResult<User>>;

  deleteUser(id: string): Promise<DeleteResult>;

  getLoginQrToken(userId: string): Promise<GetResult<string>>;

  fetchContribution(
    userId: number,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Contribution[]>;
}

export class UserService implements IUserService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchUsersQuery: UsersQueryVariables = {
    limit: 20,
    offset: 0,
    ordering: "username,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchUsers(
    limit: number,
    offset: number,
    searchText: string,
    authorities?: Pick<Authority, "id" | "code" | "name">[],
    role?: string,
    fromDate?: Date,
    throughDate?: Date,
    force?: boolean
  ) {
    if (throughDate) throughDate.setHours(23, 59, 59, 999);

    this.fetchUsersQuery = {
      ...this.fetchUsersQuery,
      limit,
      offset,
      q: searchText,
      authorities: authorities?.map(a => a.id),
      role: role,
      fromDate: fromDate,
      throughDate: throughDate,
    };

    const fetchResult = await this.client.query({
      query: UsersDocument,
      variables: this.fetchUsersQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
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
          role: item.role,
          authorityName: item.authority.name,
          telephone: item.telephone || undefined,
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
        address: user.address || "",
        role: user.role,
        authorityId: parseInt(user.authority.id),
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
    telephone: string,
    address: string,
    role: string
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
        address,
        role,
      },
      refetchQueries: [
        {
          query: UsersDocument,
          variables: this.fetchUsersQuery,
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
    telephone: string,
    address: string,
    role: string
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
        address,
        role,
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

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

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

  async updateUserPassword(
    id: string,
    password: string
  ): Promise<SaveResult<User>> {
    const updateResult = await this.client.mutate({
      mutation: UserUpdatePasswordDocument,
      variables: {
        id,
        password,
      },
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const result = updateResult.data?.adminAuthorityUserUpdatePassword?.result;
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
    const deleteResult = await this.client.mutate({
      mutation: UserDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: UsersDocument,
          variables: this.fetchUsersQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminAuthorityUserQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "AuthorityUserType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }

  async getLoginQrToken(userId: string) {
    const getResult = await this.client.query({
      query: LoginQrTokenDocument,
      variables: {
        userId,
      },
    });

    const result = getResult.data.getLoginQrToken;
    return {
      data: result?.token,
      error: getResult.errors?.map(o => o.message).join(","),
    };
  }

  async fetchContribution(
    userId: number,
    fromDate: Date,
    toDate: Date
  ): Promise<Contribution[]> {
    const fetchResult = await this.client.query({
      query: SummaryContributionQueryDocument,
      variables: {
        userId,
        fromDate,
        toDate,
      },
      fetchPolicy: "network-only",
    });

    const items: Contribution[] = [];
    fetchResult.data.summaryContributionQuery?.forEach(item => {
      items.push({
        day: item.day,
        total: item.total,
      });
    });

    return items;
  }
}
