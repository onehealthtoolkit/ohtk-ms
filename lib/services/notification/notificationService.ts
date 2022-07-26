import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  AuthorityNotificationUpsertDocument,
  NotificationTemplateAuthorityDocument,
} from "lib/generated/graphql";
import {
  AuthorityNotification,
  Notification,
} from "lib/services/notification/notification";
import { IService, SaveResult } from "lib/services/interface";

export interface INotificationService extends IService {
  fetchNotifications(reportTypeId: string): Promise<Notification[]>;

  upsertAuthorityNotification(
    reportTypeId: string,
    notificationTemplateId: number,
    to: string
  ): Promise<SaveResult<AuthorityNotification>>;
}

export class NotificationService implements INotificationService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchNotifications(reportTypeId: string) {
    const fetchResult = await this.client.query({
      query: NotificationTemplateAuthorityDocument,
      variables: {
        reportTypeId,
      },
    });

    const items = Array<Notification>();
    fetchResult.data.adminNotificationTemplateAuthorityQuery?.forEach(item => {
      if (item) {
        items.push({
          notificationTemplateId: +item.notificationTemplateId,
          notificationTemplateName: item.notificationTemplateName,
          to: item.to || undefined,
        });
      }
    });
    return items;
  }

  async upsertAuthorityNotification(
    reportTypeId: string,
    notificationTemplateId: number,
    to: string
  ): Promise<SaveResult<AuthorityNotification>> {
    const createResult = await this.client.mutate({
      mutation: AuthorityNotificationUpsertDocument,
      variables: {
        notificationTemplateId,
        to,
      },
      refetchQueries: [
        {
          query: NotificationTemplateAuthorityDocument,
          variables: {
            reportTypeId,
          },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminAuthorityNotificationUpsert?.result;
    switch (result?.__typename) {
      case "AdminAuthorityNotificationUpsertSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminAuthorityNotificationUpsertProblem": {
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
}
