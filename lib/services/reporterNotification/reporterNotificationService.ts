import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ReporterNotificationsDocument,
  ReporterNotificationCreateDocument,
  ReporterNotificationUpdateDocument,
  GetReporterNotificationDocument,
  ReporterNotificationDeleteDocument,
} from "lib/generated/graphql";
import { ReporterNotification } from "lib/services/reporterNotification/reporterNotification";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IReporterNotificationService extends IService {
  fetchReporterNotifications(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<ReporterNotification[]>>;

  getReporterNotification(id: string): Promise<GetResult<ReporterNotification>>;

  createReporterNotification(
    reportTypeId: string,
    description: string,
    condition: string,
    titleTemplate: string,
    template: string
  ): Promise<SaveResult<ReporterNotification>>;

  updateReporterNotification(
    id: string,
    reportTypeId: string,
    description: string,
    condition: string,
    titleTemplate: string,
    template: string
  ): Promise<SaveResult<ReporterNotification>>;

  deleteReporterNotification(id: string): Promise<DeleteResult>;
}

export class ReporterNotificationService
  implements IReporterNotificationService
{
  client: ApolloClient<NormalizedCacheObject>;
  fetchReporterNotificationsQuery = {
    limit: 20,
    offset: 0,
    descriptionStartWith: "",
    ordering: "description,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchReporterNotifications(
    limit: number,
    offset: number,
    searchText: string
  ) {
    this.fetchReporterNotificationsQuery = {
      ...this.fetchReporterNotificationsQuery,
      limit,
      offset,
      descriptionStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: ReporterNotificationsDocument,
      variables: this.fetchReporterNotificationsQuery,
    });

    const items = Array<ReporterNotification>();
    fetchResult.data.adminReporterNotificationQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          reportType: item.reportType
            ? {
                id: item.reportType?.id,
                name: item.reportType?.name || "",
              }
            : undefined,
          description: item.description,
          condition: item.condition,
          titleTemplate: item.titleTemplate,
          template: item.template,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminReporterNotificationQuery?.totalCount,
    };
  }

  async getReporterNotification(id: string) {
    const getResult = await this.client.query({
      query: GetReporterNotificationDocument,
      variables: {
        id,
      },
    });

    let data;
    const reporterNotification = getResult.data.reporterNotification;
    if (reporterNotification) {
      data = {
        id: reporterNotification.id,
        reportType: reporterNotification.reportType
          ? {
              id: reporterNotification.reportType?.id,
              name: reporterNotification.reportType?.name || "",
            }
          : undefined,
        description: reporterNotification.description,
        condition: reporterNotification.condition,
        titleTemplate: reporterNotification.titleTemplate,
        template: reporterNotification.template,
      };
    }
    return {
      data,
    };
  }

  async createReporterNotification(
    reportTypeId: string,
    description: string,
    condition: string,
    titleTemplate: string,
    template: string
  ): Promise<SaveResult<ReporterNotification>> {
    const createResult = await this.client.mutate({
      mutation: ReporterNotificationCreateDocument,
      variables: {
        reportTypeId,
        description,
        condition,
        titleTemplate,
        template,
      },
      refetchQueries: [
        {
          query: ReporterNotificationsDocument,
          variables: this.fetchReporterNotificationsQuery,
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

    const result = createResult.data?.adminReporterNotificationCreate?.result;
    switch (result?.__typename) {
      case "AdminReporterNotificationCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminReporterNotificationCreateProblem": {
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

  async updateReporterNotification(
    id: string,
    reportTypeId: string,
    description: string,
    condition: string,
    titleTemplate: string,
    template: string
  ): Promise<SaveResult<ReporterNotification>> {
    const updateResult = await this.client.mutate({
      mutation: ReporterNotificationUpdateDocument,
      variables: {
        id,
        reportTypeId,
        description,
        condition,
        titleTemplate,
        template,
      },
      refetchQueries: [
        {
          query: ReporterNotificationsDocument,
          variables: this.fetchReporterNotificationsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetReporterNotificationDocument,
          variables: { id },
        });
        const reporterNotificationCache = cacheItem?.reporterNotification;
        if (reporterNotificationCache) {
          const serverReturnValue =
            result.data?.adminReporterNotificationUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminReporterNotificationUpdateSuccess"
          ) {
            const newReporterNotificationValue =
              serverReturnValue.reporterNotification;
            cache.writeQuery({
              query: GetReporterNotificationDocument,
              variables: { id },
              data: {
                __typename: "Query",
                reporterNotification: newReporterNotificationValue,
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

    const result = updateResult.data?.adminReporterNotificationUpdate?.result;
    switch (result?.__typename) {
      case "AdminReporterNotificationUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminReporterNotificationUpdateProblem": {
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
  async deleteReporterNotification(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: ReporterNotificationDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: ReporterNotificationsDocument,
          variables: this.fetchReporterNotificationsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminReporterNotificationQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "ReporterNotificationType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
