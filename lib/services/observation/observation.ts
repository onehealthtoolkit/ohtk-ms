import { Image, UploadFile } from "../report/report";

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
  files: Array<UploadFile>;
  registerFormDefinition?: Record<string, any>;
  subjectMonitorings: Array<ObservationSubjectMonitoring>;
};

export type ObservationSubjectMonitoring = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
};

export type ObservationSubjectMonitoringDetail =
  ObservationSubjectMonitoring & {
    subjectTitle: string;
    subjectDescription: string;
    formData: Record<string, string> | Record<string, Record<string, string>>;
    formDefinition?: Record<string, any>;
    images: Array<Image>;
    files: Array<UploadFile>;
  };
