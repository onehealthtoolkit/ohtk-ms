import { DeepStateDefinition } from "lib/services/stateDefinition/stateDefinition";
import { DeepStateStep } from "lib/services/stateStep/stateStep";
import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";

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
  threadId?: number;
};

export type Image = {
  id: any;
  file: string;
  thumbnail: string;
};

export type CaseDetail = Case & {
  data?: Record<string, string> | Record<string, Record<string, string>>;
  images?: Array<Image>;
  stateDefinition?: DeepStateDefinition | null;
  states?: Array<CaseState | null> | null;
};

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
