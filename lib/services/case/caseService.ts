import {
  ApolloClient,
  FetchPolicy,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  GetCaseDocument,
  CasesDocument,
  PromoteReportToCaseDocument,
  StateForwardDocument,
} from "lib/generated/graphql";
import { Case, CaseDetail, CaseState } from "lib/services/case/case";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { Authority } from "../authority";
import { ReportType } from "../reportType";
import { Image, UploadFile } from "lib/services/report/report";

export type CaseFilterData = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: Pick<Authority, "id" | "code" | "name">[];
  reportTypes?: Pick<ReportType, "id" | "name">[];
};

export type CaseFilter = {
  fromDate?: Date;
  throughDate?: Date;
  authorities?: string[];
  reportTypes?: string[];
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

  promoteToCase(reportId: string): Promise<String>;

  getCase(
    id: string,
    fetchPolicy?: FetchPolicy
  ): Promise<GetResult<CaseDetail>>;

  forwardState(
    caseId: string,
    transitionId: string,
    formData?: Record<string, any>
  ): Promise<GetResult<CaseState>>;
}

export class CaseService implements ICaseService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchCasesQuery: CaseFilter = {
    fromDate: undefined,
    throughDate: undefined,
    limit: 20,
    offset: 0,
    authorities: undefined,
    reportTypes: undefined,
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
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
      limit,
      offset,
    };
    const fetchResult = await this.client.query({
      query: CasesDocument,
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
          authorityName: item.report?.authorities
            ?.map(item => item?.name)
            .join(", "),
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.casesQuery?.totalCount,
    };
  }

  async promoteToCase(reportId: string): Promise<String> {
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

    return promoteToCaseResult.data?.promoteToCase?.case?.id;
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
        stateDefinition: incidentCase.stateDefinition,
        states: incidentCase.states,
        outbreakInfo: incidentCase.outbreakPlanInfo,
        statusLabel: incidentCase.statusLabel || "",
      };
    }
    return {
      data,
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
