import { FetchPolicy, gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  GetCaseDocument,
  CasesDocument,
  PromoteReportToCaseDocument,
  StateForwardDocument,
  UpdateCaseTestResultDocument,
  CloseCaseDocument,
  CompleteAfterAutoCloseDocument,
  UpdateFinishedCloseDataDocument,
} from "lib/generated/graphql";
import {
  Case,
  CaseCloseOutcome,
  CaseDetail,
  CaseState,
} from "lib/services/case/case";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { graphqlErrorMessage } from "lib/graphqlError";
import { Authority } from "../authority";
import { ReportType } from "../reportType";
import { Image, UploadFile } from "lib/services/report/report";
import {
  isRiskAssessment,
  mapRiskAssessment,
} from "lib/services/report/reportService";
import type { FormType } from "lib/opsvForm/models/json";
import { toLocalIsoDate } from "lib/utils";

export const CASE_STATUS_FILTERS = [
  { value: "OPEN", label: "Open" },
  { value: "CLOSE_CASE", label: "Close case" },
  { value: "FALSE_POSITIVE", label: "False positive" },
  { value: "AUTOMATIC_CLOSE", label: "Automatic close" },
] as const;

export type CaseStatusFilterValue =
  (typeof CASE_STATUS_FILTERS)[number]["value"];

const CasesListDocument = gql`
  fragment CaseListRiskAssessmentFields on RiskAssessmentProjectionType {
    id
    level
    source
    score
    factors
    evaluatorVersion
    externalAssessmentId
    isCurrent
    createdAt
    createdBy {
      id
      username
      firstName
      lastName
    }
  }
  query CasesList(
    $limit: Int!
    $offset: Int!
    $fromDate: DateTime
    $throughDate: DateTime
    $incidentFromDate: Date
    $incidentThroughDate: Date
    $authorities: [ID]
    $reportTypes: [UUID]
    $includeChildAuthorities: Boolean
    $q: String
    $caseStatuses: String
  ) {
    casesQuery(
      report_CreatedAt_Gte: $fromDate
      report_CreatedAt_Lte: $throughDate
      report_IncidentDate_Gte: $incidentFromDate
      report_IncidentDate_Lte: $incidentThroughDate
      report_RelevantAuthorities_Id_In: $authorities
      report_ReportType_Id_In: $reportTypes
      includeChildAuthorities: $includeChildAuthorities
      q: $q
      caseStatuses: $caseStatuses
      limit: $limit
      offset: $offset
    ) {
      totalCount
      results {
        id
        isFinished
        statusLabel
        closeOutcome
        closeSource
        report {
          createdAt
          incidentDate
          rendererData
          reportType {
            id
            name
          }
          reportedBy {
            username
            firstName
            lastName
            telephone
          }
          authorities {
            name
          }
          currentRiskAssessment {
            ...CaseListRiskAssessmentFields
          }
        }
      }
    }
  }
`;

function parseCloseDefinition(raw: unknown): FormType | null {
  if (raw == null || raw === "") {
    return null;
  }
  let value: unknown = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const obj = value as Record<string, unknown>;
  // Full opsv form must have sections; ignore empty/malformed.
  if (!Array.isArray(obj.sections)) {
    return null;
  }
  return value as FormType;
}

export type CaseTestResultUpdate = {
  id: string;
  testResult: string;
  aiSuspected: string;
};

export type CaseFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  incidentFromDate?: Date;
  incidentThroughDate?: Date;
  authorities?: Pick<Authority, "id" | "code" | "name">[];
  reportTypes?: Pick<ReportType, "id" | "name">[];
  includeChildAuthorities?: boolean;
  q?: string;
  caseStatuses?: CaseStatusFilterValue[];
};

export type CaseFilter = {
  fromDate?: Date;
  throughDate?: Date;
  incidentFromDate?: string;
  incidentThroughDate?: string;
  authorities?: string[];
  reportTypes?: string[];
  includeChildAuthorities?: boolean;
  q?: string;
  caseStatuses?: string;
  limit: number;
  offset: number;
};

export interface ICaseService extends IService {
  fetchCases(
    limit: number,
    offset: number,
    filter: CaseFilterData,
    force?: boolean
  ): Promise<QueryResult<Case[]>>;

  promoteToCase(reportId: string): Promise<GetResult<{ id: string }>>;

  getCase(
    id: string,
    fetchPolicy?: FetchPolicy
  ): Promise<GetResult<CaseDetail>>;

  updateCaseTestResult(
    caseId: string,
    testResult: string
  ): Promise<GetResult<CaseTestResultUpdate>>;

  closeCase(
    caseId: string,
    payload?: Record<string, any>,
    outcome?: CaseCloseOutcome
  ): Promise<GetResult<CaseDetail>>;

  completeAfterAutoClose(
    caseId: string,
    payload?: Record<string, any>
  ): Promise<GetResult<CaseDetail>>;

  updateFinishedCloseData(
    caseId: string,
    payload?: Record<string, any>
  ): Promise<GetResult<CaseDetail>>;

  forwardState(
    caseId: string,
    transitionId: string,
    formData?: Record<string, any>
  ): Promise<GetResult<CaseState>>;
}

export class CaseService implements ICaseService {
  client: LegacyApolloClient;
  fetchCasesQuery: CaseFilter = {
    fromDate: undefined,
    throughDate: undefined,
    limit: 20,
    offset: 0,
    authorities: undefined,
    reportTypes: undefined,
    includeChildAuthorities: undefined,
    q: undefined,
    caseStatuses: undefined,
    incidentFromDate: undefined,
    incidentThroughDate: undefined,
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  async fetchCases(
    limit: number,
    offset: number,
    filter: CaseFilterData,
    force?: boolean
  ) {
    this.fetchCasesQuery = {
      ...this.fetchCasesQuery,
      authorities: filter.authorities?.map(a => a.id),
      reportTypes: filter.reportTypes?.map(a => a.id),
      fromDate: filter.fromDate,
      throughDate: filter.throughDate,
      incidentFromDate: toLocalIsoDate(filter.incidentFromDate),
      incidentThroughDate: toLocalIsoDate(filter.incidentThroughDate),
      includeChildAuthorities: filter.includeChildAuthorities,
      q: filter.q?.trim() || undefined,
      caseStatuses:
        filter.caseStatuses && filter.caseStatuses.length > 0
          ? filter.caseStatuses.join(",")
          : undefined,
      limit,
      offset,
    };
    const fetchResult = await this.client.query({
      query: CasesListDocument,
      variables: this.fetchCasesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Case>();
    fetchResult.data.casesQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          createdAt: item.report?.createdAt,
          incidentDate: item.report?.incidentDate,
          rendererData: item.report?.rendererData as string,
          reportTypeName: item.report?.reportType?.name,
          isFinished: item.isFinished,
          statusLabel: item.statusLabel || "",
          closeOutcome: (item as any).closeOutcome || "",
          closeSource: (item as any).closeSource || "",
          authorityName: item.report?.authorities
            ?.map(item => item?.name)
            .join(", "),
          currentRiskAssessment: mapRiskAssessment(
            item.report?.currentRiskAssessment
          ),
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.casesQuery?.totalCount,
    };
  }

  async promoteToCase(reportId: string): Promise<GetResult<{ id: string }>> {
    try {
      const promoteToCaseResult = await this.client.mutate({
        mutation: PromoteReportToCaseDocument,
        variables: {
          reportId,
        },
        refetchQueries: [
          {
            query: CasesDocument,
            variables: this.fetchCasesQuery,
            fetchPolicy: "network-only",
          },
        ],
        awaitRefetchQueries: true,
      });
      const error = graphqlErrorMessage(promoteToCaseResult);
      const id = promoteToCaseResult.data?.promoteToCase?.case?.id;
      if (!id) {
        return {
          data: undefined,
          error: error || "Unable to promote report to case",
        };
      }
      return { data: { id }, error };
    } catch (thrown) {
      return {
        data: undefined,
        error: graphqlErrorMessage(
          undefined,
          thrown,
          "Unable to promote report to case"
        ),
      };
    }
  }

  async getCase(
    id: string,
    fetchPolicy: FetchPolicy = "cache-first"
  ): Promise<GetResult<CaseDetail>> {
    const getResult = await this.client.query({
      query: GetCaseDocument,
      variables: {
        id,
      },
      fetchPolicy,
    });

    let data: CaseDetail | undefined;
    const incidentCase = getResult.data.caseGet;
    if (incidentCase) {
      data = {
        id: incidentCase.id,
        description: incidentCase.description,
        isFinished: incidentCase.isFinished,
        threadId: incidentCase.threadId,
        createdAt: incidentCase.report?.createdAt,
        incidentDate: incidentCase.report?.incidentDate,
        reportTypeName: incidentCase.report?.reportType?.name,
        reportTypeDefinition: incidentCase.report?.reportType?.definition,
        reportId: incidentCase.report?.id,
        rendererData: incidentCase.report?.rendererData,
        data: incidentCase.report?.data,
        images: incidentCase.report?.images as Image[],
        files: incidentCase.report?.uploadFiles as UploadFile[],
        reportByName: `${incidentCase.report?.reportedBy?.firstName} ${incidentCase.report?.reportedBy?.lastName}`,
        reportByTelephone: incidentCase.report?.reportedBy?.telephone || "",
        gpsLocation: incidentCase.report?.gpsLocation,
        currentRiskAssessment: mapRiskAssessment(
          incidentCase.report?.currentRiskAssessment
        ),
        riskAssessmentHistory:
          incidentCase.report?.riskAssessmentHistory
            ?.map(mapRiskAssessment)
            .filter(isRiskAssessment) || [],
        stateDefinition: incidentCase.stateDefinition,
        states: incidentCase.states,
        outbreakInfo: incidentCase.outbreakPlanInfo,
        statusLabel: incidentCase.statusLabel || "",
        authorityName: incidentCase.report?.authorities
          ?.map(item => item?.name)
          .join(", "),
        villageName:
          (
            incidentCase.report as {
              village?: { name?: string | null } | null;
            } | null
          )?.village?.name || undefined,
        aiSuspected:
          incidentCase.aiSuspected || incidentCase.report?.aiSuspected || "",
        testResult: incidentCase.testResult || "",
        stoppedAt: incidentCase.stoppedAt,
        closeSource: incidentCase.closeSource || "",
        closeOutcome: (incidentCase as any).closeOutcome || "",
        closePayload: (incidentCase.closePayload as Record<string, any>) || {},
        closeDefinition: parseCloseDefinition(
          incidentCase.report?.reportType?.closeDefinition
        ),
        closedByName: incidentCase.closedBy
          ? [incidentCase.closedBy.firstName, incidentCase.closedBy.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() ||
            incidentCase.closedBy.username ||
            ""
          : "",
      };
    }
    return {
      data,
    };
  }

  async updateCaseTestResult(
    caseId: string,
    testResult: string
  ): Promise<GetResult<CaseTestResultUpdate>> {
    const result = await this.client.mutate({
      mutation: UpdateCaseTestResultDocument,
      variables: {
        caseId,
        testResult,
      },
    });

    const payload = result.data?.adminCaseTestResultUpdate?.result;
    if (!payload) {
      return {
        data: undefined,
        error:
          result.errors?.map(e => e.message).join(", ") ||
          "Unable to save test result",
      };
    }

    return {
      data: {
        id: payload.id,
        testResult: payload.testResult || "",
        aiSuspected: payload.aiSuspected || "",
      },
      error: result.errors?.map(e => e.message).join(", "),
    };
  }

  async closeCase(
    caseId: string,
    payload?: Record<string, any>,
    outcome: CaseCloseOutcome = "close_case"
  ): Promise<GetResult<CaseDetail>> {
    const result = await this.client.mutate({
      mutation: CloseCaseDocument,
      variables: {
        caseId,
        payload: payload ?? null,
        outcome,
      },
    });

    const closed = result.data?.adminCaseClose?.result;
    if (!closed) {
      return {
        data: undefined,
        error:
          result.errors?.map(e => e.message).join(", ") ||
          "Unable to close case",
      };
    }

    return {
      data: {
        id: closed.id,
        isFinished: closed.isFinished,
        statusLabel: closed.statusLabel || "",
        testResult: closed.testResult || "",
        aiSuspected: closed.aiSuspected || "",
        stoppedAt: closed.stoppedAt,
        closeSource: closed.closeSource || "",
        closeOutcome: (closed as any).closeOutcome || outcome || "",
        closePayload: (closed.closePayload as Record<string, any>) || {},
        closedByName: closed.closedBy
          ? [closed.closedBy.firstName, closed.closedBy.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() ||
            closed.closedBy.username ||
            ""
          : "",
        files: [],
      },
      error: result.errors?.map(e => e.message).join(", "),
    };
  }

  async completeAfterAutoClose(
    caseId: string,
    payload?: Record<string, any>
  ): Promise<GetResult<CaseDetail>> {
    const result = await this.client.mutate({
      mutation: CompleteAfterAutoCloseDocument,
      variables: {
        caseId,
        payload: payload ?? null,
      },
    });

    const completed = result.data?.adminCaseCompleteAfterAutoClose?.result;
    if (!completed) {
      return {
        data: undefined,
        error:
          result.errors?.map(e => e.message).join(", ") ||
          "Unable to save close data",
      };
    }

    return {
      data: {
        id: completed.id,
        isFinished: completed.isFinished,
        statusLabel: completed.statusLabel || "",
        testResult: completed.testResult || "",
        aiSuspected: completed.aiSuspected || "",
        stoppedAt: completed.stoppedAt,
        closeSource: completed.closeSource || "",
        closeOutcome: completed.closeOutcome || "",
        closePayload: (completed.closePayload as Record<string, any>) || {},
        closedByName: completed.closedBy
          ? [completed.closedBy.firstName, completed.closedBy.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() ||
            completed.closedBy.username ||
            ""
          : "",
        files: [],
      },
      error: result.errors?.map(e => e.message).join(", "),
    };
  }

  async updateFinishedCloseData(
    caseId: string,
    payload?: Record<string, any>
  ): Promise<GetResult<CaseDetail>> {
    const result = await this.client.mutate({
      mutation: UpdateFinishedCloseDataDocument,
      variables: {
        caseId,
        payload: payload ?? null,
      },
    });

    const updated = result.data?.adminCaseCloseDataUpdate?.result;
    if (!updated) {
      return {
        data: undefined,
        error:
          result.errors?.map(e => e.message).join(", ") ||
          "Unable to update close data",
      };
    }

    return {
      data: {
        id: updated.id,
        isFinished: updated.isFinished,
        statusLabel: updated.statusLabel || "",
        testResult: updated.testResult || "",
        aiSuspected: updated.aiSuspected || "",
        stoppedAt: updated.stoppedAt,
        closeSource: updated.closeSource || "",
        closeOutcome: updated.closeOutcome || "",
        closePayload: (updated.closePayload as Record<string, any>) || {},
        closedByName: updated.closedBy
          ? [updated.closedBy.firstName, updated.closedBy.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() ||
            updated.closedBy.username ||
            ""
          : "",
        files: [],
      },
      error: result.errors?.map(e => e.message).join(", "),
    };
  }

  async forwardState(
    caseId: string,
    transitionId: string,
    formData?: Record<string, any>
  ): Promise<GetResult<CaseState>> {
    const forwardStateResult = await this.client.mutate({
      mutation: StateForwardDocument,
      variables: {
        caseId,
        transitionId,
        formData,
      },
    });

    const data = forwardStateResult.data?.forwardState?.result as CaseState;
    return {
      data,
      error: forwardStateResult.errors?.map(e => e.message).join(","),
    };
  }
}
