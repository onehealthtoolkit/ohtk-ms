import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  InvitationCodesDocument,
  InvitationCodeCreateDocument,
  InvitationCodeUpdateDocument,
  GetInvitationCodeDocument,
} from "lib/generated/graphql";
import { InvitationCode } from "lib/services/invitationCode/invitationCode";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IInvitationCodeService extends IService {
  fetchInvitationCodes(
    searchText: string
  ): Promise<QueryResult<InvitationCode[]>>;
  getInvitationCode(id: string): Promise<GetResult<InvitationCode>>;
  createInvitationCode(code: string): Promise<SaveResult<InvitationCode>>;
  updateInvitationCode(
    id: string,
    code: string
  ): Promise<SaveResult<InvitationCode>>;
}

export class InvitationCodeService implements IInvitationCodeService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchInvitationCodes(searchText: string) {
    const fetchResult = await this.client.query({
      query: InvitationCodesDocument,
      variables: {
        limit: 20,
        offset: 0,
        codeStartWith: searchText,
      },
    });

    const items = Array<InvitationCode>();
    fetchResult.data.adminInvitationCodeQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          code: item.code,
        });
      }
    });
    return {
      items,
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
      };
    }
    return {
      data,
    };
  }

  async createInvitationCode(
    code: string
  ): Promise<SaveResult<InvitationCode>> {
    const createResult = await this.client.mutate({
      mutation: InvitationCodeCreateDocument,
      variables: {
        code,
        authorityId: 0,
      },
      refetchQueries: [
        {
          query: InvitationCodesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
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
    code: string
  ): Promise<SaveResult<InvitationCode>> {
    const updateResult = await this.client.mutate({
      mutation: InvitationCodeUpdateDocument,
      variables: {
        id,
        code,
      },
      refetchQueries: [
        {
          query: InvitationCodesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
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
}
