import { User } from "lib/services/user";

export type Comment = {
  id: string;
  body: string;
  createdBy: Pick<User, "id" | "username" | "firstName" | "lastName">;
  attachments?: Array<Attachment> | null;
  threadId?: number | null;
};

export type Attachment = {
  id: string;
  createdAt: string;
  file: string;
};
