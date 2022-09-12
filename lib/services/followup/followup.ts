import { Image } from "../report/report";

export type Followup = {
  id: string;
  rendererData: string;
  createdAt: string;
};

export type FollowupDetail = Followup & {
  data: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
};
