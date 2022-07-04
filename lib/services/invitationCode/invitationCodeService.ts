import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  InvitationCodesDocument,
  InvitationCodeCreateDocument,
  InvitationCodeUpdateDocument,
  GetInvitationCodeDocument,
} from "lib/generated/graphql";
import { InvitationCode } from "lib/services/invitationCode/invitationCode";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IInvitationCodeService extends IService {
  fetchInvitationCodes(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<InvitationCode[]>>;
  getInvitationCode(id: string): Promise<GetResult<InvitationCode>>;
  createInvitationCode(
    code: string,
    authorityId: number,
    fromDate: string,
    throughDate: string
  ): Promise<SaveResult<InvitationCode>>;
  updateInvitationCode(
    id: string,
    code: string,
    fromDate: string,
    throughDate: string
  ): Promise<SaveResult<InvitationCode>>;
  deleteInvitationCode(id: string): Promise<DeleteResult>;
}

export class InvitationCodeService implements IInvitationCodeService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchInvitationCodesQuery = {
    limit: 20,
    offset: 0,
    codeStartWith: "",
    ordering: "code,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchInvitationCodes(
    limit: number,
    offset: number,
    searchText: string
  ) {
    this.fetchInvitationCodesQuery = {
      ...this.fetchInvitationCodesQuery,
      limit,
      offset,
      codeStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: InvitationCodesDocument,
      variables: this.fetchInvitationCodesQuery,
    });

    const items = Array<InvitationCode>();
    fetchResult.data.adminInvitationCodeQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          code: item.code,
          fromDate: item.fromDate,
          throughDate: item.throughDate,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminInvitationCodeQuery?.totalCount,
    };
  }

  async getInvitationCode(id: string) {
    const getResult = await this.client.query({
      query: GetInvitationCodeDocument,
      variables: {
        id,
      },
    });

    let data;
    const invitationCode = getResult.data.invitationCode;
    if (invitationCode) {
      data = {
        id: invitationCode.id,
        code: invitationCode.code,
        fromDate: invitationCode.fromDate,
        throughDate: invitationCode.throughDate,
      };
    }
    return {
      data,
    };
  }

  async createInvitationCode(
    code: string,
    authorityId: number,
    fromDate: string,
    throughDate: string
  ): Promise<SaveResult<InvitationCode>> {
    const createResult = await this.client.mutate({
      mutation: InvitationCodeCreateDocument,
      variables: {
        code,
        authorityId: authorityId,
        fromDate: fromDate,
        throughDate: throughDate,
      },
      refetchQueries: [
        {
          query: InvitationCodesDocument,
          variables: this.fetchInvitationCodesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminInvitationCodeCreate?.result;
    switch (result?.__typename) {
      case "AdminInvitationCodeCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminInvitationCodeCreateProblem": {
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

  async updateInvitationCode(
    id: string,
    code: string,
    fromDate: string,
    throughDate: string
  ): Promise<SaveResult<InvitationCode>> {
    const updateResult = await this.client.mutate({
      mutation: InvitationCodeUpdateDocument,
      variables: {
        id,
        code,
        fromDate,
        throughDate,
      },
      refetchQueries: [
        {
          query: InvitationCodesDocument,
          variables: this.fetchInvitationCodesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetInvitationCodeDocument,
          variables: { id },
        });
        const invitationCodeCache = cacheItem?.invitationCode;
        if (invitationCodeCache) {
          const serverReturnValue =
            result.data?.adminInvitationCodeUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminInvitationCodeUpdateSuccess"
          ) {
            const newInvitationCodeValue = serverReturnValue.invitationCode;
            cache.writeQuery({
              query: GetInvitationCodeDocument,
              variables: { id },
              data: {
                __typename: "Query",
                invitationCode: newInvitationCodeValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminInvitationCodeUpdate?.result;
    switch (result?.__typename) {
      case "AdminInvitationCodeUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminInvitationCodeUpdateProblem": {
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

  async deleteInvitationCode(id: string) {
    console.log("delete invitation code", id);
    return { error: "" };
  }
}
