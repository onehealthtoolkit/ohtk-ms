import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReportTypesDocument,
  ReportTypeCreateDocument,
  ReportTypeUpdateDocument,
  GetReportTypeDocument,
} from "lib/generated/graphql";
import { ReportType } from "lib/services/reportType/reportType";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IReportTypeService extends IService {
  fetchReportTypes(searchText: string): Promise<QueryResult<ReportType[]>>;
  getReportType(id: string): Promise<GetResult<ReportType>>;
  createReportType(
    name: string,
    categoryId: number,
    definition: string,
    ordering: number
  ): Promise<SaveResult<ReportType>>;
  updateReportType(
    id: string,
    name: string,
    categoryId: number,
    definition: string,
    ordering: number
  ): Promise<SaveResult<ReportType>>;
}

export class ReportTypeService implements IReportTypeService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReportTypes(searchText: string) {
    const fetchResult = await this.client.query({
      query: ReportTypesDocument,
      variables: {
        limit: 20,
        offset: 0,
        nameStartWith: searchText,
      },
    });

    const items = Array<ReportType>();
    fetchResult.data.adminReportTypeQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          definition: item.definition,
          categoryId: +item.category.id,
          ordering: item.ordering,
        });
      }
    });
    return {
      items,
    };
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
        definition: JSON.stringify(reportType.definition),
        ordering: reportType.ordering,
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
    ordering: number
  ): Promise<SaveResult<ReportType>> {
    const createResult = await this.client.mutate({
      mutation: ReportTypeCreateDocument,
      variables: {
        name,
        categoryId: categoryId,
        definition: definition,
        ordering: ordering,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
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
    ordering: number
  ): Promise<SaveResult<ReportType>> {
    const updateResult = await this.client.mutate({
      mutation: ReportTypeUpdateDocument,
      variables: {
        id,
        name,
        categoryId: categoryId,
        definition: definition,
        ordering: ordering,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: {
            limit: 20,
            offset: 0,
            nameStartWith: "",
          },
        },
      ],
      awaitRefetchQueries: true,
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
}
