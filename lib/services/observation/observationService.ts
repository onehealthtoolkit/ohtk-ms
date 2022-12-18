import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import { ObservationSubject, ObservationSubjectDetail } from "./observation";
import {
  GetObservationSubjestDocument,
  ObservationSubjectsDocument,
} from "lib/generated/graphql";

export type ObservationFilterData = {
  definitionId?: number;
  fromDate?: Date;
  throughDate?: Date;
};

export type ObservationFilter = ObservationFilterData & {
  limit: number;
  offset: number;
};

export interface IObservationService extends IService {
  fetchObservationSubjects(
    limit: number,
    offset: number,
    filter: ObservationFilterData,
    force?: boolean
  ): Promise<QueryResult<ObservationSubject[]>>;

  getObservationSubject(
    id: string
  ): Promise<GetResult<ObservationSubjectDetail>>;
}

export class ObservationService implements IObservationService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchObservationSubjects(
    limit: number,
    offset: number,
    filter: ObservationFilterData,
    force?: boolean
  ) {
    const fetchResult = await this.client.query({
      query: ObservationSubjectsDocument,
      variables: {
        limit: limit,
        offset: offset,
        definitionId: filter.definitionId,
        fromDate: filter.fromDate,
        throughDate: filter.throughDate,
      },
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<ObservationSubject>();
    fetchResult.data.observationSubjects?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          identity: item.identity,
          createdAt: item.createdAt,
          title: item.title,
          description: item.description,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.observationSubjects?.totalCount,
    };
  }

  async getObservationSubject(
    id: string
  ): Promise<GetResult<ObservationSubjectDetail>> {
    const getResult = await this.client.query({
      query: GetObservationSubjestDocument,
      variables: {
        id,
      },
    });

    let data;
    const observationSubject = getResult.data.observationSubject;
    if (observationSubject) {
      data = {
        id: observationSubject.id,
        identity: observationSubject.identity,
        definitionName: observationSubject.definition?.name || "",
        definitionDescription: observationSubject.definition?.description || "",
        createdAt: observationSubject.createdAt,
        title: observationSubject.title,
        description: observationSubject.description,
        images: [],
        registerFormDefinition:
          observationSubject.definition?.registerFormDefinition,
        formData: observationSubject.formData,
      };
    }
    return {
      data,
    };
  }
}
