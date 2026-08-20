import { User } from "lib/services/user";

export type Comment = {
  id: string;
  body: string;
  createdBy: Omit<User, "email">;
  attachments?: Array<Attachment> | null;
  createdAt: string;
  threadId?: number | null;
};

export type CommentAttachmentKind = "IMAGE" | "DOCUMENT";

export type Attachment = {
  id: string;
  createdAt: string;
  file: string;
  thumbnail?: string | null;
  filename?: string | null;
  contentType?: string | null;
  kind?: CommentAttachmentKind | null;
};

export function isImageAttachment(attachment: Attachment): boolean {
  if (attachment.kind === "DOCUMENT") {
    return false;
  }
  if (attachment.kind === "IMAGE") {
    return true;
  }
  if (attachment.filename && /\.pdf$/i.test(attachment.filename)) {
    return false;
  }
  return Boolean(attachment.thumbnail);
}

export function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) {
    return true;
  }
  if (/\.pdf$/i.test(file.name)) {
    return false;
  }
  return file.type === "";
}
