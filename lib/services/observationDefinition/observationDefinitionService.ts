import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ObservationDefinitionsDocument,
  ObservationDefinitionCreateDocument,
  ObservationDefinitionUpdateDocument,
  GetObservationDefinitionDocument,
  ObservationDefinitionDeleteDocument,
} from "lib/generated/graphql";
import { ObservationDefinition } from "lib/services/observationDefinition/observationDefinition";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import { ObservationMonitoringDefinition } from "../observationMonitoringDefinition";

export interface IObservationDefinitionService extends IService {
  fetchObservationDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<ObservationDefinition[]>>;

  getObservationDefinition(
    id: string
  ): Promise<GetResult<ObservationDefinition>>;

  createObservationDefinition(
    name: string,
    description: string,
    registerFormDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string,
    identityTemplate: string
  ): Promise<SaveResult<ObservationDefinition>>;

  updateObservationDefinition(
    id: string,
    name: string,
    description: string,
    registerFormDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string,
    identityTemplate: string
  ): Promise<SaveResult<ObservationDefinition>>;

  deleteObservationDefinition(id: string): Promise<DeleteResult>;
}

export class ObservationDefinitionService
  implements IObservationDefinitionService
{
  client: ApolloClient<NormalizedCacheObject>;
  fetchObservationDefinitionsQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "name,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchObservationDefinitions(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchObservationDefinitionsQuery = {
      ...this.fetchObservationDefinitionsQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: ObservationDefinitionsDocument,
      variables: this.fetchObservationDefinitionsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<ObservationDefinition>();
    fetchResult.data.adminObservationDefinitionQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          description: item.description || "",
          registerFormDefinition: "",
          titleTemplate: "",
          descriptionTemplate: "",
          identityTemplate: "",
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminObservationDefinitionQuery?.totalCount,
    };
  }

  async getObservationDefinition(id: string) {
    const getResult = await this.client.query({
      query: GetObservationDefinitionDocument,
      variables: {
        id,
      },
    });

    let data;
    const observationDefinition = getResult.data.observationDefinitionGet;
    if (observationDefinition) {
      data = {
        id: observationDefinition.id,
        name: observationDefinition.name,
        description: observationDefinition.description || "",
        registerFormDefinition: observationDefinition.registerFormDefinition,
        titleTemplate: observationDefinition.titleTemplate,
        descriptionTemplate: observationDefinition.descriptionTemplate,
        identityTemplate: observationDefinition.identityTemplate,
        monitoringDefinitions: [] as Array<ObservationMonitoringDefinition>,
      };
      const monitoringDefinitions =
        getResult.data.adminObservationMonitoringDefinitionQuery;
      if (monitoringDefinitions) {
        data.monitoringDefinitions = monitoringDefinitions.map(item => {
          return {
            id: item!.id,
            name: item!.name,
            description: item!.description || "",
            definitionId: "",
            formDefinition: "",
            descriptionTemplate: "",
            titleTemplate: "",
          };
        });
      }
    }
    return {
      data,
    };
  }

  async createObservationDefinition(
    name: string,
    description: string,
    registerFormDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string,
    identityTemplate: string
  ): Promise<SaveResult<ObservationDefinition>> {
    const createResult = await this.client.mutate({
      mutation: ObservationDefinitionCreateDocument,
      variables: {
        name,
        description,
        registerFormDefinition,
        titleTemplate,
        descriptionTemplate,
        identityTemplate,
      },
      refetchQueries: [
        {
          query: ObservationDefinitionsDocument,
          variables: this.fetchObservationDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.modify({
          fields: {
            adminObservationDefinitionQuery: () => undefined,
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

    const result = createResult.data?.adminObservationDefinitionCreate?.result;
    switch (result?.__typename) {
      case "AdminObservationDefinitionCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminObservationDefinitionCreateProblem": {
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
      },
      success: true,
    };
  }

  async updateObservationDefinition(
    id: string,
    name: string,
    description: string,
    registerFormDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string,
    identityTemplate: string
  ): Promise<SaveResult<ObservationDefinition>> {
    const updateResult = await this.client.mutate({
      mutation: ObservationDefinitionUpdateDocument,
      variables: {
        id,
        name,
        description,
        registerFormDefinition,
        titleTemplate,
        descriptionTemplate,
        identityTemplate,
      },
      refetchQueries: [
        {
          query: ObservationDefinitionsDocument,
          variables: this.fetchObservationDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        cache.modify({
          fields: {
            adminObservationDefinitionQuery: () => undefined,
          },
        });
        const cacheItem = cache.readQuery({
          query: GetObservationDefinitionDocument,
          variables: { id },
        });
        const observationDefinitionCache = cacheItem?.observationDefinitionGet;
        if (observationDefinitionCache) {
          const serverReturnValue =
            result.data?.adminObservationDefinitionUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminObservationDefinitionUpdateSuccess"
          ) {
            const newObservationDefinitionValue = serverReturnValue.definition;
            cache.writeQuery({
              query: GetObservationDefinitionDocument,
              variables: { id },
              data: {
                __typename: "Query",
                observationDefinitionGet: newObservationDefinitionValue,
                adminObservationMonitoringDefinitionQuery:
                  cacheItem.adminObservationMonitoringDefinitionQuery,
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

    const result = updateResult.data?.adminObservationDefinitionUpdate?.result;
    switch (result?.__typename) {
      case "AdminObservationDefinitionUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminObservationDefinitionUpdateProblem": {
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
        id: result?.definition?.id,
        name: result?.definition?.name,
      },
      success: true,
    };
  }

  async deleteObservationDefinition(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: ObservationDefinitionDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: ObservationDefinitionsDocument,
          variables: this.fetchObservationDefinitionsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminObservationDefinitionQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "ObservationDefinitionType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
