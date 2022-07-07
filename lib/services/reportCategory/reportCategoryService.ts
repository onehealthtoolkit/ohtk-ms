import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReportCategoriesDocument,
  ReportCategoryCreateDocument,
  ReportCategoryUpdateDocument,
  GetReportCategoryDocument,
} from "lib/generated/graphql";
import { ReportCategory } from "lib/services/reportCategory/reportCategory";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IReportCategoryService extends IService {
  fetchReportCategories(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<ReportCategory[]>>;
  getReportCategory(id: string): Promise<GetResult<ReportCategory>>;
  createReportCategory(
    name: string,
    ordering: number,
    icon?: File
  ): Promise<SaveResult<ReportCategory>>;
  updateReportCategory(
    id: string,
    name: string,
    ordering: number,
    icon?: File,
    clearIcon?: boolean
  ): Promise<SaveResult<ReportCategory>>;
  deleteReportCategory(id: string): Promise<DeleteResult>;
}

export class ReportCategoryService implements IReportCategoryService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchReportCategoriesQuery = {
    limit: 20,
    offset: 0,
    nameStartWith: "",
    ordering: "ordering,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReportCategories(
    limit: number,
    offset: number,
    searchText: string
  ) {
    this.fetchReportCategoriesQuery = {
      ...this.fetchReportCategoriesQuery,
      limit,
      offset,
      nameStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: ReportCategoriesDocument,
      variables: this.fetchReportCategoriesQuery,
    });

    const items = Array<ReportCategory>();
    fetchResult.data.adminCategoryQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          ordering: item.ordering,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminCategoryQuery?.totalCount,
    };
  }

  async getReportCategory(id: string) {
    const getResult = await this.client.query({
      query: GetReportCategoryDocument,
      variables: {
        id,
      },
    });

    let data;
    const reportCategory = getResult.data.category;
    if (reportCategory) {
      data = {
        id: reportCategory.id,
        name: reportCategory.name,
        ordering: reportCategory.ordering,
        icon: reportCategory.icon || "",
      };
    }
    return {
      data,
    };
  }

  async createReportCategory(
    name: string,
    ordering: number,
    icon: File
  ): Promise<SaveResult<ReportCategory>> {
    const createResult = await this.client.mutate({
      mutation: ReportCategoryCreateDocument,
      variables: {
        name,
        ordering: ordering,
        icon: icon,
      },
      context: {
        useMultipart: true,
      },
      refetchQueries: [
        {
          query: ReportCategoriesDocument,
          variables: this.fetchReportCategoriesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminCategoryCreate?.result;
    switch (result?.__typename) {
      case "AdminCategoryCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminCategoryCreateProblem": {
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

  async updateReportCategory(
    id: string,
    name: string,
    ordering: number,
    icon: File,
    clearIcon: boolean
  ): Promise<SaveResult<ReportCategory>> {
    const updateResult = await this.client.mutate({
      mutation: ReportCategoryUpdateDocument,
      variables: {
        id,
        name,
        ordering,
        icon,
        clearIcon,
      },
      context: {
        useMultipart: true,
      },
      refetchQueries: [
        {
          query: ReportCategoriesDocument,
          variables: this.fetchReportCategoriesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetReportCategoryDocument,
          variables: { id },
        });
        const categoryCache = cacheItem?.category;
        if (categoryCache) {
          const serverReturnValue = result.data?.adminCategoryUpdate?.result;
          if (serverReturnValue?.__typename === "AdminCategoryUpdateSuccess") {
            const newCategoryValue = serverReturnValue.category;
            cache.writeQuery({
              query: GetReportCategoryDocument,
              variables: { id },
              data: {
                __typename: "Query",
                category: newCategoryValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminCategoryUpdate?.result;
    switch (result?.__typename) {
      case "AdminCategoryUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminCategoryUpdateProblem": {
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

  async deleteReportCategory(id: string) {
    console.log("delete report category", id);
    return { error: "" };
  }
}
