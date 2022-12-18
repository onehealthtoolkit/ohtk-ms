import { Image } from "../report/report";

export type ObservationSubject = {
  id: string;
  createdAt: string;
  identity: string;
  title: string;
  description: string;
  gpsLocation?: string | null;
  imageUrl?: string | null;
};

export type ObservationSubjectDetail = ObservationSubject & {
  definitionName: string;
  definitionDescription: string;
  formData: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
  registerFormDefinition?: Record<string, any>;
};
