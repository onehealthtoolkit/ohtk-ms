import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReportCategoriesDocument,
  ReportCategoryCreateDocument,
  ReportCategoryUpdateDocument,
  GetReportCategoryDocument,
} from "lib/generated/graphql";
import { ReportCategory } from "lib/services/reportCategory/reportCategory";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IReportCategoryService extends IService {
  fetchReportCategories(
    searchText: string
  ): Promise<QueryResult<ReportCategory[]>>;
  getReportCategory(id: string): Promise<GetResult<ReportCategory>>;
  createReportCategory(
    code: string,
    name: string
  ): Promise<SaveResult<ReportCategory>>;
  updateReportCategory(
    id: string,
    code: string,
    name: string
  ): Promise<SaveResult<ReportCategory>>;
}

export class ReportCategoryService implements IReportCategoryService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReportCategories(searchText: string) {
    const fetchResult = await this.client.query({
      query: ReportCategoriesDocument,
      variables: {
        limit: 20,
        offset: 0,
        nameStartWith: searchText,
      },
    });

    const items = Array<ReportCategory>();
    fetchResult.data.adminCategoryQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
        });
      }
    });
    return {
      items,
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
      };
    }
    return {
      data,
    };
  }

  async createReportCategory(
    code: string,
    name: string
  ): Promise<SaveResult<ReportCategory>> {
    const createResult = await this.client.mutate({
      mutation: ReportCategoryCreateDocument,
      variables: {
        code,
        name,
        ordering: 0,
      },
      refetchQueries: [
        {
          query: ReportCategoriesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
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
    code: string,
    name: string
  ): Promise<SaveResult<ReportCategory>> {
    const updateResult = await this.client.mutate({
      mutation: ReportCategoryUpdateDocument,
      variables: {
        id,
        name,
        ordering: 0,
      },
      refetchQueries: [
        {
          query: ReportCategoriesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
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
}
