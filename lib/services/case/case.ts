import { Image, RiskAssessment, UploadFile } from "lib/services/report/report";
import { DeepStateDefinition } from "lib/services/stateDefinition/stateDefinition";
import { DeepStateStep } from "lib/services/stateStep/stateStep";
import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";
import type { FormType } from "lib/opsvForm/models/json";

export type Case = {
  id: string;
  description?: string;
  createdAt?: string;
  incidentDate?: string;
  reportTypeName?: string;
  rendererData?: string;
  reportByName?: string;
  reportByTelephone?: string;
  isFinished: boolean;
  statusLabel: string;
  /** Officer finish outcome: close_case | false_positive | "" */
  closeOutcome?: string;
  closeSource?: string;
  threadId?: number | null;
  gpsLocation?: string | null;
  reportId?: string;
  authorityName?: string;
  currentRiskAssessment?: RiskAssessment | null;
};

export type CaseDetail = Case & {
  reportTypeDefinition?: string;
  data?: Record<string, string> | Record<string, Record<string, string>>;
  images?: Array<Image>;
  files: Array<UploadFile>;
  stateDefinition?: DeepStateDefinition | null;
  states?: Array<CaseState | null> | null;
  outbreakInfo?: string | null;
  riskAssessmentHistory?: RiskAssessment[];
  /** Excel "suspected" — AI comment body; read-only in UI */
  aiSuspected?: string;
  /** Layer2 projection — officer free text (close_payload.test_result) */
  testResult?: string;
  stoppedAt?: string | null;
  closeSource?: string;
  /** Officer finish outcome: close_case | false_positive | "" */
  closeOutcome?: string;
  closePayload?: Record<string, any>;
  /**
   * ReportType.close_definition — full opsv form JSON for "close case" outcome.
   * Null/empty ⇒ no Layer2 fields required for that outcome.
   */
  closeDefinition?: FormType | null;
  closedByName?: string;
};

/** CO2b officer finish outcomes */
export type CaseCloseOutcome = "close_case" | "false_positive";

export type CaseState = {
  id: string;
  state: DeepStateStep;
  transition?: CaseStateTransition | null;
};

export type CaseStateTransition = {
  id: string;
  createdAt: string;
  transition: StateTransitionRef;
  formData?: string;
  createdBy: CaseUser;
};

export type CaseUser = {
  id: string;
  firstName: string;
  lastName: string;
};
