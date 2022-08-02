import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  GetCaseDocument,
  CasesDocument,
  PromoteReportToCaseDocument,
  StateForwardDocument,
} from "lib/generated/graphql";
import { Image, Case, CaseDetail, CaseState } from "lib/services/case/case";
import { GetResult, IService, QueryResult } from "lib/services/interface";

export type CaseFilterData = {
  fromDate: Date | null;
  throughDate: Date | null;
  authorities: string[];
};

export type CaseFilter = CaseFilterData & {
  limit: number;
  offset: number;
};

export interface ICaseService extends IService {
  fetchCases(
    limit: number,
    offset: number,
    filter: CaseFilterData
  ): Promise<QueryResult<Case[]>>;

  promoteToCase(reportId: string): Promise<String>;

  getCase(id: string): Promise<GetResult<CaseDetail>>;

  forwardState(
    caseId: string,
    transitionId: string,
    formData?: Record<string, any>
  ): Promise<GetResult<CaseState>>;
}

export class CaseService implements ICaseService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchCasesQuery: CaseFilter = {
    fromDate: null,
    throughDate: null,
    limit: 20,
    offset: 0,
    authorities: [],
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchCases(limit: number, offset: number, filter: CaseFilterData) {
    this.fetchCasesQuery = {
      ...this.fetchCasesQuery,
      authorities: filter.authorities,
      fromDate: filter.fromDate,
      throughDate: filter.throughDate,
      limit,
      offset,
    };
    const fetchResult = await this.client.query({
      query: CasesDocument,
      variables: this.fetchCasesQuery,
    });

    const items = Array<Case>();
    fetchResult.data.casesQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          createdAt: item.report?.createdAt,
          incidentDate: item.report?.incidentDate,
          rendererData: item.report?.rendererData as string,
          reportTypeName: item.report?.reportType.name as string,
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

  async getCase(id: string): Promise<GetResult<CaseDetail>> {
    const getResult = await this.client.query({
      query: GetCaseDocument,
      variables: {
        id,
      },
    });

    let data;
    const incidentCase = getResult.data.caseGet;
    if (incidentCase) {
      data = {
        id: incidentCase.id,
        createdAt: incidentCase.report?.createdAt,
        incidentDate: incidentCase.report?.incidentDate,
        reportTypeName: incidentCase.report?.reportType?.name,
        rendererData: incidentCase.report?.rendererData,
        data: incidentCase.report?.data,
        images: incidentCase.report?.images as Image[],
        reportByName: `${incidentCase.report?.reportedBy?.firstName} ${incidentCase.report?.reportedBy?.lastName}`,
        reportByTelephone: incidentCase.report?.reportedBy?.telephone || "",
        stateDefinition: incidentCase.stateDefinition,
        states: incidentCase.states,
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
