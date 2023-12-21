import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReportTypesDocument,
  ReportTypeCreateDocument,
  ReportTypeUpdateDocument,
  GetReportTypeDocument,
  MyReportTypesDocument,
  ReportTypeSelectionsDocument,
  ReportTypeDeleteDocument,
  PublicReportTypeDocument,
  UnpublicReportTypeDocument,
  ReportTypeByNameDocument,
  SubmitEvaluateReportSimulationDocument,
} from "lib/generated/graphql";
import {
  ReportType,
  SimulationReportType,
} from "lib/services/reportType/reportType";
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
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<ReportType[]>>;

  fetchReportTypeSelections(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<ReportType[]>>;

  fetchMyReportTypes(): Promise<ReportType[]>;

  getReportType(id: string): Promise<GetResult<ReportType>>;

  findByName(name: string): Promise<ReportType | undefined>;

  createReportType(
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number,
    rendererDataTemplate?: string,
    followupDefinition?: string,
    rendererFollowupDataTemplate?: string,
    isFollowable?: boolean
  ): Promise<SaveResult<ReportType>>;

  updateReportType(
    id: string,
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number,
    rendererDataTemplate?: string,
    followupDefinition?: string,
    rendererFollowupDataTemplate?: string,
    isFollowable?: boolean
  ): Promise<SaveResult<ReportType>>;

  deleteReportType(id: string): Promise<DeleteResult>;

  publishReportType(id: string): Promise<String>;

  unpublishReportType(id: string): Promise<String>;

  submitSimulationReport(
    data: any,
    incidentDate: string,
    rendererDataTemplate: string,
    reportId?: string,
    reportTypeId?: string
  ): Promise<SimulationReportType>;
}

export class ReportTypeService implements IReportTypeService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchReportTypesQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "category__ordering,asc ordering,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReportTypes(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchReportTypesQuery = {
      ...this.fetchReportTypesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: ReportTypesDocument,
      variables: this.fetchReportTypesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
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
          published: item.published,
          rendererDataTemplate: item.rendererDataTemplate || "",
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminReportTypeQuery?.totalCount,
    };
  }

  async fetchReportTypeSelections(
    limit: number,
    offset: number,
    searchText: string
  ) {
    this.fetchReportTypesQuery = {
      ...this.fetchReportTypesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: ReportTypeSelectionsDocument,
      variables: this.fetchReportTypesQuery,
    });

    const items = Array<ReportType>();
    fetchResult.data.adminReportTypeQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          definition: "",
          categoryId: 0,
          categoryName: "",
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
          definition: "",
          categoryId: item.category ? parseInt(item.category.id) : 0,
          categoryName: "",
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
        categoryId: reportType.category ? parseInt(reportType.category.id) : 0,
        categoryName: reportType.category ? reportType.category.name : "",
        definition: JSON.stringify(reportType.definition),
        ordering: reportType.ordering,
        stateDefinitionId: reportType.stateDefinition
          ? +reportType.stateDefinition?.id
          : undefined,
        stateDefinitionName: reportType.stateDefinition?.name,
        rendererDataTemplate: reportType.rendererDataTemplate
          ? reportType.rendererDataTemplate
          : undefined, // get rid of null
        followupDefinition: reportType.followupDefinition
          ? JSON.stringify(reportType.followupDefinition)
          : "",
        rendererFollowupDataTemplate:
          reportType.rendererFollowupDataTemplate || undefined,
        isFollowable: reportType.isFollowable,
      };
    }
    return {
      data,
    };
  }

  async findByName(name: string) {
    const fetchResult = await this.client.query({
      query: ReportTypeByNameDocument,
      variables: { name },
    });
    const reportType = fetchResult.data.reportTypeByName;
    return reportType
      ? {
          id: reportType.id,
          name: reportType.name,
          definition: "",
          categoryId: reportType.category
            ? parseInt(reportType.category.id)
            : 0,
          categoryName: reportType.category ? reportType.category.name : "",
          ordering: reportType.ordering,
        }
      : undefined;
  }

  async createReportType(
    name: string,
    categoryId: number,
    definition: string,
    ordering: number,
    stateDefinitionId?: number,
    rendererDataTemplate?: string,
    followupDefinition?: string,
    rendererFollowupDataTemplate?: string,
    isFollowable?: boolean
  ): Promise<SaveResult<ReportType>> {
    const createResult = await this.client.mutate({
      mutation: ReportTypeCreateDocument,
      variables: {
        name,
        categoryId: categoryId,
        definition: definition,
        ordering: ordering,
        stateDefinitionId: stateDefinitionId || undefined,
        rendererDataTemplate: rendererDataTemplate,
        followupDefinition,
        rendererFollowupDataTemplate,
        isFollowable,
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

    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

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
    stateDefinitionId?: number,
    rendererDataTemplate?: string,
    followupDefinition?: string,
    rendererFollowupDataTemplate?: string,
    isFollowable?: boolean
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
        rendererDataTemplate,
        followupDefinition,
        rendererFollowupDataTemplate,
        isFollowable,
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

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

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
    const deleteResult = await this.client.mutate({
      mutation: ReportTypeDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: this.fetchReportTypesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminReportTypeQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "ReportTypeType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }

  async publishReportType(reportTypeId: string) {
    const result = await this.client.mutate({
      mutation: PublicReportTypeDocument,
      variables: {
        reportTypeId,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: this.fetchReportTypesQuery,
          fetchPolicy: "network-only",
        },
        {
          query: GetReportTypeDocument,
          variables: { id: reportTypeId },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    return result.data?.publishReportType?.reportType?.id;
  }

  async unpublishReportType(reportTypeId: string) {
    const result = await this.client.mutate({
      mutation: UnpublicReportTypeDocument,
      variables: {
        reportTypeId,
      },
      refetchQueries: [
        {
          query: ReportTypesDocument,
          variables: this.fetchReportTypesQuery,
          fetchPolicy: "network-only",
        },
        {
          query: GetReportTypeDocument,
          variables: { id: reportTypeId },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    return result.data?.unpublishReportType?.reportType?.id;
  }

  async submitSimulationReport(
    data: any,
    incidentDate: string,
    rendererDataTemplate: string,
    reportId: string,
    reportTypeId: string
  ): Promise<SimulationReportType> {
    const submitResult = await this.client.mutate({
      mutation: SubmitEvaluateReportSimulationDocument,
      variables: {
        data,
        incidentDate,
        rendererDataTemplate,
        reportId,
        reportTypeId,
      },
    });
    const result = submitResult.data?.evaluateReportSimulation?.result;
    return {
      rendererData: result?.rendererData || "",
      reporterNotifications: result?.reporterNotifications as [],
      caseDefinitions: result?.caseDefinitions as [],
    };
  }
}
