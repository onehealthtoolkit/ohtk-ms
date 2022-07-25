import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReportTypesDocument,
  ReportTypeCreateDocument,
  ReportTypeUpdateDocument,
  GetReportTypeDocument,
  MyReportTypesDocument,
} from "lib/generated/graphql";
import { ReportType } from "lib/services/reportType/reportType";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IReportTypeService extends IService {
  fetchReportTypes(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<ReportType[]>>;
  fetchMyReportTypes(): Promise<ReportType[]>;
  getReportType(id: string): Promise<GetResult<ReportType>>;
  createReportType(
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number
  ): Promise<SaveResult<ReportType>>;
  updateReportType(
    id: string,
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number
  ): Promise<SaveResult<ReportType>>;
  deleteReportType(id: string): Promise<DeleteResult>;
}

export class ReportTypeService implements IReportTypeService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchReportTypesQuery = {
    limit: 20,
    offset: 0,
    nameStartWith: "",
    ordering: "category__ordering,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReportTypes(limit: number, offset: number, searchText: string) {
    this.fetchReportTypesQuery = {
      ...this.fetchReportTypesQuery,
      limit,
      offset,
      nameStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: ReportTypesDocument,
      variables: this.fetchReportTypesQuery,
    });

    const items = Array<ReportType>();
    fetchResult.data.adminReportTypeQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          definition: item.definition,
          categoryId: +item.category.id,
          categoryName: item.category.name,
          ordering: item.ordering,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminReportTypeQuery?.totalCount,
    };
  }

  async fetchMyReportTypes() {
    const fetchResult = await this.client.query({
      query: MyReportTypesDocument,
    });

    const items = Array<ReportType>();
    fetchResult.data.myReportTypes?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          definition: item.definition,
          categoryId: +item.category.id,
          categoryName: item.category.name,
          ordering: item.ordering,
        });
      }
    });
    return items;
  }

  async getReportType(id: string) {
    const getResult = await this.client.query({
      query: GetReportTypeDocument,
      variables: {
        id,
      },
    });

    let data;
    const reportType = getResult.data.reportType;
    if (reportType) {
      data = {
        id: reportType.id,
        name: reportType.name,
        categoryId: +reportType.category.id,
        categoryName: reportType.category.name,
        definition: JSON.stringify(reportType.definition),
        ordering: reportType.ordering,
        stateDefinitionId: reportType.stateDefinition
          ? +reportType.stateDefinition?.id
          : undefined,
        stateDefinitionName: reportType.stateDefinition?.name,
      };
    }
    return {
      data,
    };
  }

  async createReportType(
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number
  ): Promise<SaveResult<ReportType>> {
    const createResult = await this.client.mutate({
      mutation: ReportTypeCreateDocument,
      variables: {
        name,
        categoryId: categoryId,
        definition: definition,
        ordering: ordering,
        stateDefinitionId: stateDefinitionId || undefined,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: this.fetchReportTypesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminReportTypeCreate?.result;
    switch (result?.__typename) {
      case "AdminReportTypeCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminReportTypeCreateProblem": {
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

  async updateReportType(
    id: string,
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number
  ): Promise<SaveResult<ReportType>> {
    const updateResult = await this.client.mutate({
      mutation: ReportTypeUpdateDocument,
      variables: {
        id,
        name,
        categoryId: categoryId,
        definition: definition,
        ordering: ordering,
        stateDefinitionId: stateDefinitionId || undefined,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: this.fetchReportTypesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetReportTypeDocument,
          variables: { id },
        });
        const reportTypeCache = cacheItem?.reportType;
        if (reportTypeCache) {
          const serverReturnValue = result.data?.adminReportTypeUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminReportTypeUpdateSuccess"
          ) {
            const newReportTypeValue = serverReturnValue.reportType;
            cache.writeQuery({
              query: GetReportTypeDocument,
              variables: { id },
              data: {
                __typename: "Query",
                reportType: newReportTypeValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminReportTypeUpdate?.result;
    switch (result?.__typename) {
      case "AdminReportTypeUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminReportTypeUpdateProblem": {
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
  async deleteReportType(id: string) {
    console.log("delete report type", id);
    return { error: "" };
  }
}
