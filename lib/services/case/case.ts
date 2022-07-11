export type Case = {
  id: string;
  createdAt?: string;
  incidentDate?: string;
  reportTypeName?: string;
  rendererData?: string;
  reportByName?: string;
  reportByTelephone?: string;
};

export type Image = {
  id: any;
  file: string;
};

export type CaseDetail = Case & {
  data?: Record<string, string> | Record<string, Record<string, string>>;
  images?: Array<Image>;
};
