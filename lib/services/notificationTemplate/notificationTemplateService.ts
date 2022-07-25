import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  NotificationTemplatesDocument,
  NotificationTemplateCreateDocument,
  NotificationTemplateUpdateDocument,
  GetNotificationTemplateDocument,
} from "lib/generated/graphql";
import { NotificationTemplate } from "lib/services/notificationTemplate/notificationTemplate";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface INotificationTemplateService extends IService {
  fetchNotificationTemplates(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<QueryResult<NotificationTemplate[]>>;

  getNotificationTemplate(id: string): Promise<GetResult<NotificationTemplate>>;

  createNotificationTemplate(
    name: string,
    stateTransitionId: number,
    reportTypeId: string,
    titleTemplate: string,
    bodyTemplate: string
  ): Promise<SaveResult<NotificationTemplate>>;

  updateNotificationTemplate(
    id: string,
    name: string,
    stateTransitionId: number,
    reportTypeId: string,
    titleTemplate: string,
    bodyTemplate: string
  ): Promise<SaveResult<NotificationTemplate>>;

  deleteNotificationTemplate(id: string): Promise<DeleteResult>;
}

export class NotificationTemplateService
  implements INotificationTemplateService
{
  client: ApolloClient<NormalizedCacheObject>;

  fetchNotificationTemplatesQuery = {
    limit: 20,
    offset: 0,
    nameStartWith: "",
    ordering: "name,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchNotificationTemplates(
    limit: number,
    offset: number,
    searchText: string
  ) {
    this.fetchNotificationTemplatesQuery = {
      ...this.fetchNotificationTemplatesQuery,
      limit,
      offset,
      nameStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: NotificationTemplatesDocument,
      variables: this.fetchNotificationTemplatesQuery,
    });

    const items = Array<NotificationTemplate>();
    fetchResult.data.adminNotificationTemplateQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          reportTypeId: item.reportType.id,
          reportTypeName: item.reportType.name,
          stateTransitionId: 0,
          titleTemplate: "",
          bodyTemplate: "",
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminNotificationTemplateQuery?.totalCount,
    };
  }

  async getNotificationTemplate(id: string) {
    const getResult = await this.client.query({
      query: GetNotificationTemplateDocument,
      variables: {
        id,
      },
    });

    let data;
    const notificationTemplate = getResult.data.notificationTemplateGet;
    if (notificationTemplate) {
      data = {
        id: notificationTemplate.id,
        name: notificationTemplate.name,
        reportTypeId: notificationTemplate.reportType.id,
        reportTypeName: notificationTemplate.reportType.name,
        stateTransitionId: +notificationTemplate.stateTransition.id,
        titleTemplate: notificationTemplate.titleTemplate,
        bodyTemplate: notificationTemplate.bodyTemplate,
        fromStepName: notificationTemplate.stateTransition.fromStep?.name,
        toStepName: notificationTemplate.stateTransition.toStep?.name,
      };
    }
    return {
      data,
    };
  }

  async createNotificationTemplate(
    name: string,
    stateTransitionId: number,
    reportTypeId: string,
    titleTemplate: string,
    bodyTemplate: string
  ): Promise<SaveResult<NotificationTemplate>> {
    const createResult = await this.client.mutate({
      mutation: NotificationTemplateCreateDocument,
      variables: {
        name,
        stateTransitionId,
        reportTypeId,
        titleTemplate,
        bodyTemplate,
      },
      refetchQueries: [
        {
          query: NotificationTemplatesDocument,
          variables: this.fetchNotificationTemplatesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminNotificationTemplateCreate?.result;
    switch (result?.__typename) {
      case "AdminNotificationTemplateCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminNotificationTemplateCreateProblem": {
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

  async updateNotificationTemplate(
    id: string,
    name: string,
    stateTransitionId: number,
    reportTypeId: string,
    titleTemplate: string,
    bodyTemplate: string
  ): Promise<SaveResult<NotificationTemplate>> {
    const updateResult = await this.client.mutate({
      mutation: NotificationTemplateUpdateDocument,
      variables: {
        id,
        name,
        stateTransitionId,
        reportTypeId,
        titleTemplate,
        bodyTemplate,
      },
      refetchQueries: [
        {
          query: NotificationTemplatesDocument,
          variables: this.fetchNotificationTemplatesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetNotificationTemplateDocument,
          variables: { id },
        });
        const notificationTemplateCache = cacheItem?.notificationTemplateGet;
        if (notificationTemplateCache) {
          const serverReturnValue =
            result.data?.adminNotificationTemplateUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminNotificationTemplateUpdateSuccess"
          ) {
            const newNotificationTemplateValue =
              serverReturnValue.notificationTemplate;
            cache.writeQuery({
              query: GetNotificationTemplateDocument,
              variables: { id },
              data: {
                __typename: "Query",
                notificationTemplateGet: newNotificationTemplateValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminNotificationTemplateUpdate?.result;
    switch (result?.__typename) {
      case "AdminNotificationTemplateUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminNotificationTemplateUpdateProblem": {
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

  async deleteNotificationTemplate(id: string) {
    console.log("delete Notification Template", id);
    return { error: "" };
  }
}
