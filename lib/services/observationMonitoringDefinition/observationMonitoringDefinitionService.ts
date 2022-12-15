import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ObservationMonitoringDefinitionCreateDocument,
  ObservationMonitoringDefinitionUpdateDocument,
  GetObservationMonitoringDefinitionDocument,
  ObservationMonitoringDefinitionDeleteDocument,
  GetObservationDefinitionDocument,
} from "lib/generated/graphql";
import {
  DeleteResult,
  GetResult,
  IService,
  SaveResult,
} from "lib/services/interface";
import { ObservationMonitoringDefinition } from "./observationMonitoringDefinition";

export interface IObservationMonitoringDefinitionService extends IService {
  getObservationMonitoringDefinition(
    id: string
  ): Promise<GetResult<ObservationMonitoringDefinition>>;

  createObservationMonitoringDefinition(
    definitionId: string,
    name: string,
    description: string,
    formDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string
  ): Promise<SaveResult<ObservationMonitoringDefinition>>;

  updateObservationMonitoringDefinition(
    id: string,
    definitionId: string,
    name: string,
    description: string,
    formDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string
  ): Promise<SaveResult<ObservationMonitoringDefinition>>;

  deleteObservationMonitoringDefinition(
    id: string,
    definitionId: string
  ): Promise<DeleteResult>;
}

export class ObservationMonitoringDefinitionService
  implements IObservationMonitoringDefinitionService
{
  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async getObservationMonitoringDefinition(id: string) {
    const getResult = await this.client.query({
      query: GetObservationMonitoringDefinitionDocument,
      variables: {
        id,
      },
    });

    let data;
    const observationDefinition =
      getResult.data.observationMonitoringDefinitionGet;
    if (observationDefinition) {
      data = {
        id: observationDefinition.id,
        definitionId: observationDefinition.definition.id,
        name: observationDefinition.name,
        description: observationDefinition.description || "",
        formDefinition: observationDefinition.formDefinition,
        titleTemplate: observationDefinition.titleTemplate,
        descriptionTemplate: observationDefinition.descriptionTemplate,
      };
    }
    return {
      data,
    };
  }

  async createObservationMonitoringDefinition(
    definitionId: string,
    name: string,
    description: string,
    formDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string
  ): Promise<SaveResult<ObservationMonitoringDefinition>> {
    const createResult = await this.client.mutate({
      mutation: ObservationMonitoringDefinitionCreateDocument,
      variables: {
        definitionId,
        name,
        description,
        formDefinition,
        titleTemplate,
        descriptionTemplate,
      },
      refetchQueries: [
        {
          query: GetObservationDefinitionDocument,
          variables: { id: definitionId },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.modify({
          fields: {
            adminObservationMonitoringDefinitionQuery: () => undefined,
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

    const result =
      createResult.data?.adminObservationMonitoringDefinitionCreate?.result;
    switch (result?.__typename) {
      case "AdminObservationMonitoringDefinitionCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminObservationMonitoringDefinitionCreateProblem": {
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

  async updateObservationMonitoringDefinition(
    id: string,
    definitionId: string,
    name: string,
    description: string,
    formDefinition: string,
    titleTemplate: string,
    descriptionTemplate: string
  ): Promise<SaveResult<ObservationMonitoringDefinition>> {
    const updateResult = await this.client.mutate({
      mutation: ObservationMonitoringDefinitionUpdateDocument,
      variables: {
        id,
        definitionId,
        name,
        description,
        formDefinition,
        titleTemplate,
        descriptionTemplate,
      },
      refetchQueries: [
        {
          query: GetObservationDefinitionDocument,
          variables: { id: definitionId },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        cache.modify({
          fields: {
            adminObservationMonitoringDefinitionQuery: () => undefined,
          },
        });
        const cacheItem = cache.readQuery({
          query: GetObservationMonitoringDefinitionDocument,
          variables: { id },
        });
        const observationDefinitionCache =
          cacheItem?.observationMonitoringDefinitionGet;
        if (observationDefinitionCache) {
          const serverReturnValue =
            result.data?.adminObservationMonitoringDefinitionUpdate?.result;
          if (
            serverReturnValue?.__typename ===
            "AdminObservationMonitoringDefinitionUpdateSuccess"
          ) {
            const newObservationMonitoringDefinitionValue =
              serverReturnValue.monitoringDefinition;
            cache.writeQuery({
              query: GetObservationMonitoringDefinitionDocument,
              variables: { id },
              data: {
                __typename: "Query",
                observationMonitoringDefinitionGet:
                  newObservationMonitoringDefinitionValue,
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

    const result =
      updateResult.data?.adminObservationMonitoringDefinitionUpdate?.result;
    switch (result?.__typename) {
      case "AdminObservationMonitoringDefinitionUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminObservationMonitoringDefinitionUpdateProblem": {
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
        id: result?.monitoringDefinition?.id,
        name: result?.monitoringDefinition?.name,
      },
      success: true,
    };
  }

  async deleteObservationMonitoringDefinition(
    id: string,
    definitionId: string
  ) {
    const deleteResult = await this.client.mutate({
      mutation: ObservationMonitoringDefinitionDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GetObservationDefinitionDocument,
          variables: {
            id: definitionId,
          },
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminObservationMonitoringDefinitionQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "ObservationMonitoringDefinitionType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
