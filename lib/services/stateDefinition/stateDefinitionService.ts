import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  StateDefinitionsDocument,
  StateDefinitionCreateDocument,
  StateDefinitionUpdateDocument,
  GetStateDefinitionDocument,
  StateDefinitionDeleteDocument,
} from "lib/generated/graphql";
import { StateDefinition } from "lib/services/stateDefinition/stateDefinition";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import { StateStep } from "../stateStep";
import { StateTransition } from "../stateTransition";

export interface IStateDefinitionService extends IService {
  fetchStateDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<StateDefinition[]>>;

  getStateDefinition(id: string): Promise<GetResult<StateDefinition>>;

  createStateDefinition(
    name: string,
    isDefault: boolean
  ): Promise<SaveResult<StateDefinition>>;

  updateStateDefinition(
    id: string,
    name: string,
    isDefault: boolean
  ): Promise<SaveResult<StateDefinition>>;

  deleteStateDefinition(id: string): Promise<DeleteResult>;
}

export class StateDefinitionService implements IStateDefinitionService {
  client: ApolloClient<NormalizedCacheObject>;
  fetchStateDefinitionsQuery = {
    limit: 20,
    offset: 0,
    nameStartWith: "",
    ordering: "name,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchStateDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchStateDefinitionsQuery = {
      ...this.fetchStateDefinitionsQuery,
      limit,
      offset,
      nameStartWith: searchText,
    };
    const fetchResult = await this.client.query({
      query: StateDefinitionsDocument,
      variables: this.fetchStateDefinitionsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<StateDefinition>();
    fetchResult.data.adminStateDefinitionQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          isDefault: item.isDefault,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminStateDefinitionQuery?.totalCount,
    };
  }

  async getStateDefinition(id: string) {
    const getResult = await this.client.query({
      query: GetStateDefinitionDocument,
      variables: {
        id,
      },
    });

    let data;
    const stateDefinition = getResult.data.stateDefinitionGet;
    if (stateDefinition) {
      data = {
        id: stateDefinition.id,
        name: stateDefinition.name,
        isDefault: stateDefinition.isDefault,
        stateSteps: [] as Array<StateStep>,
        stateTransitions: [] as Array<StateTransition>,
      };
      const stateSteps = getResult.data.adminStateStepQuery;
      if (stateSteps) {
        data.stateSteps = stateSteps.map(item => {
          return {
            id: item!.id,
            name: item!.name,
            isStartState: item!.isStartState,
            isStopState: item!.isStopState,
          };
        });
      }

      const stateTransitions = getResult.data.adminStateTransitionQuery;
      if (stateTransitions) {
        data.stateTransitions = stateTransitions.map(item => {
          return {
            id: item!.id,
            fromStep: item!.fromStep,
            toStep: item!.toStep,
            formDefinition: JSON.stringify(item!.formDefinition),
          };
        });
      }
    }
    return {
      data,
    };
  }

  async createStateDefinition(
    name: string,
    isDefault: boolean
  ): Promise<SaveResult<StateDefinition>> {
    const createResult = await this.client.mutate({
      mutation: StateDefinitionCreateDocument,
      variables: {
        name,
        isDefault,
      },
      refetchQueries: [
        {
          query: StateDefinitionsDocument,
          variables: this.fetchStateDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.modify({
          fields: {
            adminStateDefinitionQuery: () => undefined,
          },
        });
      },
    });

    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

    const result = createResult.data?.adminStateDefinitionCreate?.result;
    switch (result?.__typename) {
      case "AdminStateDefinitionCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateDefinitionCreateProblem": {
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
      data: {
        id: result?.id,
        name: result?.name,
        isDefault: result?.isDefault,
      },
      success: true,
    };
  }

  async updateStateDefinition(
    id: string,
    name: string,
    isDefault: boolean
  ): Promise<SaveResult<StateDefinition>> {
    const updateResult = await this.client.mutate({
      mutation: StateDefinitionUpdateDocument,
      variables: {
        id,
        name,
        isDefault,
      },
      refetchQueries: [
        {
          query: StateDefinitionsDocument,
          variables: this.fetchStateDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        cache.modify({
          fields: {
            adminStateDefinitionQuery: () => undefined,
          },
        });
        const cacheItem = cache.readQuery({
          query: GetStateDefinitionDocument,
          variables: { id },
        });
        const stateDefinitionCache = cacheItem?.stateDefinitionGet;
        if (stateDefinitionCache) {
          const serverReturnValue =
            result.data?.adminStateDefinitionUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminStateDefinitionUpdateSuccess"
          ) {
            const newStateDefinitionValue = serverReturnValue.stateDefinition;
            cache.writeQuery({
              query: GetStateDefinitionDocument,
              variables: { id },
              data: {
                __typename: "Query",
                stateDefinitionGet: newStateDefinitionValue,
                adminStateStepQuery: cacheItem.adminStateStepQuery,
                adminStateTransitionQuery: cacheItem.adminStateTransitionQuery,
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

    const result = updateResult.data?.adminStateDefinitionUpdate?.result;
    switch (result?.__typename) {
      case "AdminStateDefinitionUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminStateDefinitionUpdateProblem": {
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
      data: {
        id: result?.stateDefinition?.id,
        name: result?.stateDefinition?.name,
        isDefault: result?.stateDefinition?.isDefault,
      },
      success: true,
    };
  }

  async deleteStateDefinition(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: StateDefinitionDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: StateDefinitionsDocument,
          variables: this.fetchStateDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminStateDefinitionQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "StateDefinitionType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
