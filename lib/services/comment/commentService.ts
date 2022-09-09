import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  MutationCommentCreateDocument,
  QueryCommentsDocument,
} from "lib/generated/graphql";
import { Attachment, Comment } from "lib/services/comment/comment";
import { IService, QueryResult, SaveResult } from "lib/services/interface";

export interface ICommentService extends IService {
  fetchComments(
    threadId: number,
    force?: boolean
  ): Promise<QueryResult<Comment[]>>;

  createComment(
    body: string,
    threadId: number,
    files: File[]
  ): Promise<SaveResult<Comment>>;
}

export class CommentService implements ICommentService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchComments(
    threadId: number,
    force?: boolean
  ): Promise<QueryResult<Comment[]>> {
    const fetchResult = await this.client.query({
      query: QueryCommentsDocument,
      variables: { threadId: threadId.toString() },
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    console.log("fetch", force);

    const items = Array<Comment>();
    fetchResult.data.comments?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          body: item.body,
          createdBy: {
            id: item.createdBy.id,
            username: item.createdBy.username,
            firstName: item.createdBy.firstName,
            lastName: item.createdBy.lastName,
            avatarUrl: item.createdBy.avatarUrl
              ? item.createdBy.avatarUrl
              : undefined,
          },
          createdAt: item.createdAt,
          threadId: item.threadId,
          attachments: item.attachments?.filter(
            it => it !== null
          ) as Attachment[],
        });
      }
    });
    return {
      items,
    };
  }

  async createComment(
    body: string,
    threadId: number,
    files: File[]
  ): Promise<SaveResult<Comment>> {
    const createResult = await this.client.mutate({
      mutation: MutationCommentCreateDocument,
      variables: {
        body,
        threadId,
        files,
      },
      context: {
        useMultipart: true,
      },
    });

    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

    const result = createResult.data?.commentCreate?.result;
    switch (result?.__typename) {
      case "CommentCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "CommentCreateProblem": {
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
      data: {
        id: result?.id,
        attachments: result?.attachments as Attachment[],
      },
    };
  }
}
