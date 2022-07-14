import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  StateStepCreateDocument,
  StateStepUpdateDocument,
  GetStateStepDocument,
  GetStateDefinitionDocument,
  StateStepsDocument,
} from "lib/generated/graphql";
import { StateStep } from "lib/services/stateStep/stateStep";
import {
  DeleteResult,
  GetResult,
  IService,
  SaveResult,
} from "lib/services/interface";

export interface IStateStepService extends IService {
  fetchStateSteps(stateDefinitionId: string): Promise<StateStep[]>;

  getStateStep(id: string): Promise<GetResult<StateStep>>;

  createStateStep(
    name: string,
    isStartState: boolean,
    isStopState: boolean,
    stateDefinitionId: string
  ): Promise<SaveResult<StateStep>>;

  updateStateStep(
    id: string,
    name: string,
    isStartState: boolean,
    isStopState: boolean,
    stateDefinitionId: string
  ): Promise<SaveResult<StateStep>>;

  deleteStateStep(id: string): Promise<DeleteResult>;
}

export class StateStepService implements IStateStepService {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchStateSteps(stateDefinitionId: string) {
    const fetchResult = await this.client.query({
      query: StateStepsDocument,
      variables: {
        definitionId: stateDefinitionId,
      },
    });

    const items = Array<StateStep>();
    fetchResult.data.adminStateStepQuery?.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          isStartState: item.isStartState,
          isStopState: item.isStopState,
        });
      }
    });
    return items;
  }

  async getStateStep(id: string) {
    const getResult = await this.client.query({
      query: GetStateStepDocument,
      variables: {
        id,
      },
    });

    let data;
    const stateStep = getResult.data.stateStepGet;
    if (stateStep) {
      data = {
        id: stateStep.id,
        name: stateStep.name,
        isStartState: stateStep.isStartState,
        isStopState: stateStep.isStopState,
      };
    }
    return {
      data,
    };
  }

  async createStateStep(
    name: string,
    isStartState: boolean,
    isStopState: boolean,
    stateDefinitionId: string
  ): Promise<SaveResult<StateStep>> {
    const createResult = await this.client.mutate({
      mutation: StateStepCreateDocument,
      variables: {
        name,
        isStartState,
        isStopState,
        stateDefinitionId,
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

    const result = createResult.data?.adminStateStepCreate?.result;
    switch (result?.__typename) {
      case "AdminStateStepCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateStepCreateProblem": {
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

  async updateStateStep(
    id: string,
    name: string,
    isStartState: boolean,
    isStopState: boolean,
    stateDefinitionId: string
  ): Promise<SaveResult<StateStep>> {
    const updateResult = await this.client.mutate({
      mutation: StateStepUpdateDocument,
      variables: {
        id,
        name,
        isStartState,
        isStopState,
        stateDefinitionId,
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
          query: GetStateStepDocument,
          variables: { id },
        });
        const stateStepCache = cacheItem?.stateStepGet;
        if (stateStepCache) {
          const serverReturnValue = result.data?.adminStateStepUpdate?.result;
          if (serverReturnValue?.__typename === "AdminStateStepUpdateSuccess") {
            const newStateStepValue = serverReturnValue.stateStep;
            cache.writeQuery({
              query: GetStateStepDocument,
              variables: { id },
              data: {
                __typename: "Query",
                stateStepGet: newStateStepValue,
              },
            });
          }
        }
      },
    });

    const result = updateResult.data?.adminStateStepUpdate?.result;
    switch (result?.__typename) {
      case "AdminStateStepUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateStepUpdateProblem": {
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
  async deleteStateStep(id: string) {
    console.log("delete report type", id);
    return { error: "" };
  }
}
