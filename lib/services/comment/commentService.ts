import { gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  Attachment,
  Comment,
  CommentAttachmentKind,
} from "lib/services/comment/comment";
import { IService, QueryResult, SaveResult } from "lib/services/interface";

const QueryCommentsDocument = gql`
  query QueryComments($threadId: ID!) {
    comments(threadId: $threadId) {
      id
      body
      threadId
      attachments {
        id
        file
        thumbnail
        filename
        contentType
        kind
        createdAt
      }
      createdAt
      createdBy {
        id
        username
        firstName
        lastName
        avatarUrl
      }
    }
  }
`;

const MutationCommentCreateDocument = gql`
  mutation MutationCommentCreate(
    $body: String!
    $threadId: Int!
    $files: [Upload]
  ) {
    commentCreate(body: $body, threadId: $threadId, files: $files) {
      result {
        __typename
        ... on CommentCreateSuccess {
          id
          body
          threadId
          attachments {
            id
            file
            thumbnail
            filename
            contentType
            kind
            createdAt
          }
          createdAt
          createdBy {
            id
            username
            firstName
            lastName
            avatarUrl
          }
        }
        ... on CommentCreateProblem {
          message
          fields {
            name
            message
          }
        }
      }
    }
  }
`;

type AttachmentPayload = {
  id: string;
  file?: string | null;
  thumbnail?: string | null;
  filename?: string | null;
  contentType?: string | null;
  kind?: CommentAttachmentKind | null;
  createdAt?: string | null;
};

function mapAttachment(item: AttachmentPayload): Attachment {
  return {
    id: item.id,
    file: item.file || "",
    thumbnail: item.thumbnail,
    filename: item.filename,
    contentType: item.contentType,
    kind: item.kind,
    createdAt: item.createdAt || "",
  };
}

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
  client: LegacyApolloClient;

  constructor(client: LegacyApolloClient) {
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
          attachments: (item.attachments || [])
            .filter((it): it is AttachmentPayload => Boolean(it))
            .map(mapAttachment),
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
        attachments: (
          (result as { attachments?: AttachmentPayload[] | null })
            ?.attachments || []
        )
          .filter((it): it is AttachmentPayload => Boolean(it))
          .map(mapAttachment),
      },
    };
  }
}
