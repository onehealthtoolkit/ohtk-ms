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
  testFlag: boolean;
};

export type Image = {
  id: any;
  file: string;
  thumbnail: string;
  imageUrl: string;
};

export type ReportDetail = Report & {
  data: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
  reportTypeDefinition?: Record<string, any>;
};
