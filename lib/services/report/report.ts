export type Report = {
  id: string;
  createdAt: string;
  incidentDate: string;
  reportTypeName: string;
  rendererData: string;
  reportByName?: string;
  reportByTelephone?: string;
  caseId?: string;
};

export type Image = {
  id: any;
  file: string;
};

export type ReportDetail = Report & {
  data: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
};
