import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  OutbreakPlansDocument,
  OutbreakPlanCreateDocument,
  OutbreakPlanUpdateDocument,
  GetOutbreakPlanDocument,
  OutbreakPlanDeleteDocument,
} from "lib/generated/graphql";
import { OutbreakPlan } from "lib/services/outbreakPlan/outbreakPlan";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IOutbreakPlanService extends IService {
  fetchOutbreakPlans(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<OutbreakPlan[]>>;

  getOutbreakPlan(id: number): Promise<GetResult<OutbreakPlan>>;

  createOutbreakPlan(
    name: string,
    description: string,
    reportTypeId: string,
    stateStepId: number,
    zone1Radius?: number,
    zone1Color?: string,
    zone1MessageTitle?: string,
    zone1MessageBody?: string,
    zone2Radius?: number,
    zone2Color?: string,
    zone2MessageTitle?: string,
    zone2MessageBody?: string,
    zone3Radius?: number,
    zone3Color?: string,
    zone3MessageTitle?: string,
    zone3MessageBody?: string
  ): Promise<SaveResult<OutbreakPlan>>;

  updateOutbreakPlan(
    id: number,
    name: string,
    description: string,
    reportTypeId: string,
    stateStepId: number,
    zone1Radius?: number,
    zone1Color?: string,
    zone1MessageTitle?: string,
    zone1MessageBody?: string,
    zone2Radius?: number,
    zone2Color?: string,
    zone2MessageTitle?: string,
    zone2MessageBody?: string,
    zone3Radius?: number,
    zone3Color?: string,
    zone3MessageTitle?: string,
    zone3MessageBody?: string
  ): Promise<SaveResult<OutbreakPlan>>;

  deleteOutbreakPlan(id: string): Promise<DeleteResult>;
}

export class OutbreakPlanService implements IOutbreakPlanService {
  client: ApolloClient<NormalizedCacheObject>;

  fetchOutbreakPlansQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "name,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchOutbreakPlans(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchOutbreakPlansQuery = {
      ...this.fetchOutbreakPlansQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: OutbreakPlansDocument,
      variables: this.fetchOutbreakPlansQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<OutbreakPlan>();
    fetchResult.data.adminOutbreakPlanQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          description: item.description,
          reportTypeId: "",
          stateStepId: 0,
          reportTypeName: item.reportType.name,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminOutbreakPlanQuery?.totalCount,
    };
  }

  async getOutbreakPlan(id: number) {
    const getResult = await this.client.query({
      query: GetOutbreakPlanDocument,
      variables: {
        id,
      },
    });

    let data;
    const outbreakPlan = getResult.data.outbreakPlanGet;
    if (outbreakPlan) {
      data = {
        id: outbreakPlan.id,
        name: outbreakPlan.name,
        description: outbreakPlan.description,
        reportTypeId: outbreakPlan.reportType.id as string,
        stateStepId: parseInt(outbreakPlan.stateStep.id),
        zone1Radius: outbreakPlan.zone1Radius || undefined,
        zone1Color: outbreakPlan.zone1Color || undefined,
        zone1MessageTitle: outbreakPlan.zone1MessageTitle || undefined,
        zone1MessageBody: outbreakPlan.zone1MessageBody || undefined,
        zone2Radius: outbreakPlan.zone2Radius || undefined,
        zone2Color: outbreakPlan.zone2Color || undefined,
        zone2MessageTitle: outbreakPlan.zone2MessageTitle || undefined,
        zone2MessageBody: outbreakPlan.zone2MessageBody || undefined,
        zone3Radius: outbreakPlan.zone3Radius || undefined,
        zone3Color: outbreakPlan.zone3Color || undefined,
        zone3MessageTitle: outbreakPlan.zone3MessageTitle || undefined,
        zone3MessageBody: outbreakPlan.zone3MessageBody || undefined,
        reportTypeName: outbreakPlan.reportType.name,
        stateStepName: outbreakPlan.stateStep.name,
      };
    }
    return {
      data,
    };
  }

  async createOutbreakPlan(
    name: string,
    description: string,
    reportTypeId: string,
    stateStepId: number,
    zone1Radius?: number,
    zone1Color?: string,
    zone1MessageTitle?: string,
    zone1MessageBody?: string,
    zone2Radius?: number,
    zone2Color?: string,
    zone2MessageTitle?: string,
    zone2MessageBody?: string,
    zone3Radius?: number,
    zone3Color?: string,
    zone3MessageTitle?: string,
    zone3MessageBody?: string
  ): Promise<SaveResult<OutbreakPlan>> {
    const createResult = await this.client.mutate({
      mutation: OutbreakPlanCreateDocument,
      variables: {
        name,
        description,
        reportTypeId,
        stateStepId,
        zone1Radius,
        zone1Color,
        zone1MessageTitle,
        zone1MessageBody,
        zone2Radius,
        zone2Color,
        zone2MessageTitle,
        zone2MessageBody,
        zone3Radius,
        zone3Color,
        zone3MessageTitle,
        zone3MessageBody,
      },
      refetchQueries: [
        {
          query: OutbreakPlansDocument,
          variables: this.fetchOutbreakPlansQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

    const result = createResult.data?.adminOutbreakPlanCreate?.result;
    switch (result?.__typename) {
      case "AdminOutbreakPlanCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminOutbreakPlanCreateProblem": {
        console.log("problem", result);
        const fields: any = {};
        // field validation errors, show specifiic error for each fields
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });
        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async updateOutbreakPlan(
    id: number,
    name: string,
    description: string,
    reportTypeId: string,
    stateStepId: number,
    zone1Radius?: number,
    zone1Color?: string,
    zone1MessageTitle?: string,
    zone1MessageBody?: string,
    zone2Radius?: number,
    zone2Color?: string,
    zone2MessageTitle?: string,
    zone2MessageBody?: string,
    zone3Radius?: number,
    zone3Color?: string,
    zone3MessageTitle?: string,
    zone3MessageBody?: string
  ): Promise<SaveResult<OutbreakPlan>> {
    const updateResult = await this.client.mutate({
      mutation: OutbreakPlanUpdateDocument,
      variables: {
        id,
        name,
        description,
        reportTypeId,
        stateStepId,
        zone1Radius,
        zone1Color,
        zone1MessageTitle,
        zone1MessageBody,
        zone2Radius,
        zone2Color,
        zone2MessageTitle,
        zone2MessageBody,
        zone3Radius,
        zone3Color,
        zone3MessageTitle,
        zone3MessageBody,
      },
      refetchQueries: [
        {
          query: OutbreakPlansDocument,
          variables: this.fetchOutbreakPlansQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetOutbreakPlanDocument,
          variables: { id },
        });
        const outbreakPlanCache = cacheItem?.outbreakPlanGet;
        if (outbreakPlanCache) {
          const serverReturnValue =
            result.data?.adminOutbreakPlanUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminOutbreakPlanUpdateSuccess"
          ) {
            const newOutbreakPlanValue = serverReturnValue;
            cache.writeQuery({
              query: GetOutbreakPlanDocument,
              variables: { id },
              data: {
                __typename: "Query",
                outbreakPlanGet: {
                  ...newOutbreakPlanValue,
                  __typename: "OutbreakPlanType",
                },
              },
            });
          }
        }
      },
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const result = updateResult.data?.adminOutbreakPlanUpdate?.result;
    switch (result?.__typename) {
      case "AdminOutbreakPlanUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminOutbreakPlanUpdateProblem": {
        console.log("problem", result);
        const fields: any = {};
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });

        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async deleteOutbreakPlan(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: OutbreakPlanDeleteDocument,
      variables: {
        id: parseInt(id),
      },
      refetchQueries: [
        {
          query: OutbreakPlansDocument,
          variables: this.fetchOutbreakPlansQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminOutbreakPlanQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "OutbreakPlanType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
