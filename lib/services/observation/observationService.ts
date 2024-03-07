import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GetResult, IService, QueryResult } from "lib/services/interface";
import {
  ObservationSubject,
  ObservationSubjectDetail,
  ObservationSubjectMonitoring,
  ObservationSubjectMonitoringDetail,
} from "./observation";
import {
  GetObservationSubjectDocument,
  GetObservationSubjectMonitoringDocument,
  ObservationSubjectsDocument,
} from "lib/generated/graphql";
import { Image, UploadFile } from "../report/report";

export type ObservationFilterData = {
  definitionId?: number;
  fromDate?: Date;
  throughDate?: Date;
  q?: string;
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
    id: string,
    force?: boolean
  ): Promise<GetResult<ObservationSubjectDetail>>;

  getObservationSubjectMonitoring(
    id: string
  ): Promise<GetResult<ObservationSubjectMonitoringDetail>>;
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
        q: filter.q,
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
          gpsLocation: item.gpsLocation,
          imageUrl:
            item.images && item.images.length
              ? item.images[0]!.thumbnail
              : undefined,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.observationSubjects?.totalCount,
    };
  }

  async getObservationSubject(
    id: string,
    force?: boolean
  ): Promise<GetResult<ObservationSubjectDetail>> {
    const getResult = await this.client.query({
      query: GetObservationSubjectDocument,
      variables: {
        id,
      },
      fetchPolicy: force ? "network-only" : "cache-first",
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
        images: observationSubject.images as Image[],
        files: observationSubject.uploadFiles as UploadFile[],
        registerFormDefinition:
          observationSubject.definition?.registerFormDefinition,
        formData: observationSubject.formData,
        originFormData: observationSubject.originFormData,
        gpsLocation: observationSubject.gpsLocation,
        subjectMonitorings:
          observationSubject.monitoringRecords as ObservationSubjectMonitoring[],
      };
    }
    return {
      data,
    };
  }

  async getObservationSubjectMonitoring(
    id: string
  ): Promise<GetResult<ObservationSubjectMonitoringDetail>> {
    const getResult = await this.client.query({
      query: GetObservationSubjectMonitoringDocument,
      variables: {
        id,
      },
    });

    let data;
    const observationSubjectMonitoring =
      getResult.data.observationSubjectMonitoringRecord;
    if (observationSubjectMonitoring) {
      data = {
        id: observationSubjectMonitoring.id,
        createdAt: observationSubjectMonitoring.createdAt,
        subjectTitle: observationSubjectMonitoring.subject.title,
        subjectDescription: observationSubjectMonitoring.subject.description,
        title: observationSubjectMonitoring.title,
        description: observationSubjectMonitoring.description,
        images: observationSubjectMonitoring.images as Image[],
        files: observationSubjectMonitoring.uploadFiles as UploadFile[],
        formDefinition:
          observationSubjectMonitoring.monitoringDefinition?.formDefinition,
        formData: observationSubjectMonitoring.formData,
      };
    }
    return {
      data,
    };
  }
}
