export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type RiskFilterLevel = RiskLevel | "NO_ASSESSMENT";

export type RiskAssessmentActor = {
  id: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type RiskAssessment = {
  id: string;
  level: RiskLevel;
  source?: string | null;
  score?: number | null;
  factors?: unknown;
  evaluatorVersion?: string | null;
  externalAssessmentId?: string | null;
  isCurrent?: boolean | null;
  createdAt?: string | null;
  createdBy?: RiskAssessmentActor | null;
};

export type ReportRiskState = {
  currentRiskAssessment?: RiskAssessment | null;
  riskAssessmentHistory?: RiskAssessment[];
};

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
  currentRiskAssessment?: RiskAssessment | null;
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

export type AccumulatedMetric = {
  id: string;
  label?: string;
  op?: string;
  reportValue?: number;
  followupValues?: number[];
  value: number;
};

export type AccumulatedMetrics = {
  version?: number;
  metrics?: AccumulatedMetric[];
};

export type ReportDetail = Report & {
  data: Record<string, string> | Record<string, Record<string, string>>;
  images: Array<Image>;
  files: Array<UploadFile>;
  reportTypeDefinition?: Record<string, any>;
  riskAssessmentHistory?: RiskAssessment[];
  accumulatedMetrics?: AccumulatedMetrics | null;
};
