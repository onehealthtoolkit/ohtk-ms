export type Report = {
  id: string;
  createdAt: string;
  incidentDate: string;
  reportTypeName: string;
  rendererData: string;
  reportByName?: string;
  reportByTelephone?: string;
  caseId?: string;
  gpsLocation?: string | null;
  threadId?: number | null;
  categoryName?: string | null;
  categoryIcon?: string | null;
  imageUrl?: string | null;
  authorityName?: string;
  testFlag: boolean;
};

export type Image = {
  id: string;
  file: string;
  thumbnail: string;
  imageUrl: string;
};

export type UploadFile = {
  id: string;
  file: string;
  fileType: string;
  fileUrl: string;
};

export type ReportDetail = Report & {
  data: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
  files: Array<UploadFile>;
  reportTypeDefinition?: Record<string, any>;
};
