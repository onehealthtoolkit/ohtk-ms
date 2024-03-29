import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  CaseDefinitionsDocument,
  CaseDefinitionCreateDocument,
  CaseDefinitionUpdateDocument,
  GetCaseDefinitionDocument,
  CaseDefinitionDeleteDocument,
} from "lib/generated/graphql";
import { CaseDefinition } from "lib/services/caseDefinition/caseDefinition";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface ICaseDefinitionService extends IService {
  fetchCaseDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<CaseDefinition[]>>;

  getCaseDefinition(id: string): Promise<GetResult<CaseDefinition>>;

  createCaseDefinition(
    reportTypeId: string,
    description: string,
    condition: string
  ): Promise<SaveResult<CaseDefinition>>;

  updateCaseDefinition(
    id: string,
    reportTypeId: string,
    description: string,
    condition: string
  ): Promise<SaveResult<CaseDefinition>>;

  deleteCaseDefinition(id: string): Promise<DeleteResult>;
}

export class CaseDefinitionService implements ICaseDefinitionService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchCaseDefinitionsQuery = {
    limit: 20,
    offset: 0,
    descriptionContains: "",
    ordering:
      "reportType__category__ordering reportType__ordering,asc description,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchCaseDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchCaseDefinitionsQuery = {
      ...this.fetchCaseDefinitionsQuery,
      limit,
      offset,
      descriptionContains: searchText,
    };
    const fetchResult = await this.client.query({
      query: CaseDefinitionsDocument,
      variables: this.fetchCaseDefinitionsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<CaseDefinition>();
    fetchResult.data.adminCaseDefinitionQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          description: item.description,
          condition: item.condition,
          reportTypeId: item.reportType.id,
          reportTypeName: item.reportType.name,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminCaseDefinitionQuery?.totalCount,
    };
  }

  async getCaseDefinition(id: string) {
    const getResult = await this.client.query({
      query: GetCaseDefinitionDocument,
      variables: {
        id,
      },
    });

    let data;
    const caseDefinition = getResult.data.caseDefinitionGet;
    if (caseDefinition) {
      data = {
        id: caseDefinition.id,
        description: caseDefinition.description,
        condition: caseDefinition.condition,
        reportTypeId: caseDefinition.reportType.id,
        reportTypeName: caseDefinition.reportType.name,
      };
    }
    return {
      data,
    };
  }

  async createCaseDefinition(
    reportTypeId: string,
    description: string,
    condition: string
  ): Promise<SaveResult<CaseDefinition>> {
    const createResult = await this.client.mutate({
      mutation: CaseDefinitionCreateDocument,
      variables: {
        reportTypeId: reportTypeId,
        description: description,
        condition: condition,
      },
      refetchQueries: [
        {
          query: CaseDefinitionsDocument,
          variables: this.fetchCaseDefinitionsQuery,
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

    const result = createResult.data?.adminCaseDefinitionCreate?.result;
    switch (result?.__typename) {
      case "AdminCaseDefinitionCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminCaseDefinitionCreateProblem": {
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

  async updateCaseDefinition(
    id: string,
    reportTypeId: string,
    description: string,
    condition: string
  ): Promise<SaveResult<CaseDefinition>> {
    const updateResult = await this.client.mutate({
      mutation: CaseDefinitionUpdateDocument,
      variables: {
        id,
        reportTypeId,
        description,
        condition,
      },
      refetchQueries: [
        {
          query: CaseDefinitionsDocument,
          variables: this.fetchCaseDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetCaseDefinitionDocument,
          variables: { id },
        });
        const caseDefinitionCache = cacheItem?.caseDefinitionGet;
        if (caseDefinitionCache) {
          const serverReturnValue =
            result.data?.adminCaseDefinitionUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminCaseDefinitionUpdateSuccess"
          ) {
            const newCaseDefinitionValue = serverReturnValue.caseDefinition;
            cache.writeQuery({
              query: GetCaseDefinitionDocument,
              variables: { id },
              data: {
                __typename: "Query",
                caseDefinitionGet: newCaseDefinitionValue,
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

    const result = updateResult.data?.adminCaseDefinitionUpdate?.result;
    switch (result?.__typename) {
      case "AdminCaseDefinitionUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminCaseDefinitionUpdateProblem": {
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
  async deleteCaseDefinition(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: CaseDefinitionDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: CaseDefinitionsDocument,
          variables: this.fetchCaseDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminCaseDefinitionQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "CaseDefinitionType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
