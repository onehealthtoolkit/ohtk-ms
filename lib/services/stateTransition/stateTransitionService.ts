import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  StateTransitionCreateDocument,
  StateTransitionUpdateDocument,
  GetStateTransitionDocument,
  GetStateDefinitionDocument,
  StateTransistionListByReportTypeDocument,
} from "lib/generated/graphql";
import { StateTransition } from "lib/services/stateTransition/stateTransition";
import {
  DeleteResult,
  GetResult,
  IService,
  SaveResult,
} from "lib/services/interface";

export interface IStateTransitionService extends IService {
  getStateTransition(id: string): Promise<GetResult<StateTransition>>;

  createStateTransition(
    formDefinition: string,
    fromStepId: string,
    toStepId: string,
    stateDefinitionId: string
  ): Promise<SaveResult<StateTransition>>;

  updateStateTransition(
    id: string,
    formDefinition: string,
    fromStepId: string,
    toStepId: string,
    stateDefinitionId: string
  ): Promise<SaveResult<StateTransition>>;

  deleteStateTransition(id: string): Promise<DeleteResult>;
}

export class StateTransitionService implements IStateTransitionService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchStateTransitionByReportType(
    reportTypeId: string
  ): Promise<StateTransition[]> {
    const fetchResult = await this.client.query({
      query: StateTransistionListByReportTypeDocument,
      variables: {
        reportTypeId,
      },
    });

    const items: StateTransition[] = [];
    fetchResult.data.transitionListByReportType?.forEach(item => {
      items.push({
        id: item.id,
        fromStep: item.fromStep,
        toStep: item.toStep,
        formDefinition: "",
      });
    });

    return items;
  }

  async getStateTransition(id: string) {
    const getResult = await this.client.query({
      query: GetStateTransitionDocument,
      variables: {
        id,
      },
    });

    let data;
    const stateTransition = getResult.data.stateTransitionGet;
    if (stateTransition) {
      data = {
        id: stateTransition.id,
        fromStep: stateTransition.fromStep,
        toStep: stateTransition.toStep,
        formDefinition: JSON.stringify(stateTransition.formDefinition),
      };
    }
    return {
      data,
    };
  }

  async createStateTransition(
    formDefinition: string,
    fromStepId: string,
    toStepId: string,
    stateDefinitionId: string
  ): Promise<SaveResult<StateTransition>> {
    const createResult = await this.client.mutate({
      mutation: StateTransitionCreateDocument,
      variables: {
        formDefinition: formDefinition,
        fromStepId,
        toStepId,
      },
      refetchQueries: [
        {
          query: GetStateDefinitionDocument,
          variables: {
            id: stateDefinitionId,
          },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    const result = createResult.data?.adminStateTransitionCreate?.result;
    switch (result?.__typename) {
      case "AdminStateTransitionCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateTransitionCreateProblem": {
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

  async updateStateTransition(
    id: string,
    formDefinition: string,
    fromStepId: string,
    toStepId: string,
    stateDefinitionId: string
  ): Promise<SaveResult<StateTransition>> {
    const updateResult = await this.client.mutate({
      mutation: StateTransitionUpdateDocument,
      variables: {
        id,
        formDefinition,
        fromStepId,
        toStepId,
      },
      refetchQueries: [
        {
          query: GetStateDefinitionDocument,
          variables: {
            id: stateDefinitionId,
          },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetStateTransitionDocument,
          variables: { id },
        });
        const stateTransitionCache = cacheItem?.stateTransitionGet;
        if (stateTransitionCache) {
          const serverReturnValue =
            result.data?.adminStateTransitionUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminStateTransitionUpdateSuccess"
          ) {
            const newStateTransitionValue = serverReturnValue.stateTransition;
            cache.writeQuery({
              query: GetStateTransitionDocument,
              variables: { id },
              data: {
                __typename: "Query",
                stateTransitionGet: newStateTransitionValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminStateTransitionUpdate?.result;
    switch (result?.__typename) {
      case "AdminStateTransitionUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateTransitionUpdateProblem": {
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
  async deleteStateTransition(id: string) {
    console.log("delete report type", id);
    return { error: "" };
  }
}
