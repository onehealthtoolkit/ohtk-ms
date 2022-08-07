import { User } from "lib/services/user";

export type Comment = {
  id: string;
  body: string;
  createdBy: Omit<User, "email">;
  attachments?: Array<Attachment> | null;
  createdAt: string;
  threadId?: number | null;
};

export type Attachment = {
  id: string;
  createdAt: string;
  file: string;
  thumbnail: string;
};
