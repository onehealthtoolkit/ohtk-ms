import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ConfigurationsDocument,
  ConfigurationCreateDocument,
  ConfigurationUpdateDocument,
  GetConfigurationDocument,
  ConfigurationDeleteDocument,
} from "lib/generated/graphql";
import { Configuration } from "lib/services/configuration/configuration";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IConfigurationService extends IService {
  fetchConfigurations(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<Configuration[]>>;

  getConfiguration(key: string): Promise<GetResult<Configuration>>;

  createConfiguration(
    key: string,
    value: string
  ): Promise<SaveResult<Configuration>>;

  updateConfiguration(
    id: string,
    key: string,
    value: string
  ): Promise<SaveResult<Configuration>>;

  deleteConfiguration(id: string): Promise<DeleteResult>;
}

export class ConfigurationService implements IConfigurationService {
  client: ApolloClient<NormalizedCacheObject>;

  fetchConfigurationsQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "key,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchConfigurations(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchConfigurationsQuery = {
      ...this.fetchConfigurationsQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: ConfigurationsDocument,
      variables: this.fetchConfigurationsQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Configuration>();
    fetchResult.data.adminConfigurationQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.key,
          key: item.key,
          value: item.value,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminConfigurationQuery?.totalCount,
    };
  }

  async getConfiguration(key: string) {
    const getResult = await this.client.query({
      query: GetConfigurationDocument,
      variables: {
        key,
      },
    });

    let data;
    const configuration = getResult.data.configurationGet;
    if (configuration) {
      data = {
        id: configuration.key,
        key: configuration.key,
        value: configuration.value,
      };
    }
    return {
      data,
    };
  }

  async createConfiguration(
    key: string,
    value: string
  ): Promise<SaveResult<Configuration>> {
    const createResult = await this.client.mutate({
      mutation: ConfigurationCreateDocument,
      variables: {
        key,
        value,
      },
      refetchQueries: [
        {
          query: ConfigurationsDocument,
          variables: this.fetchConfigurationsQuery,
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

    const result = createResult.data?.adminConfigurationCreate?.result;
    switch (result?.__typename) {
      case "AdminConfigurationCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminConfigurationCreateProblem": {
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

  async updateConfiguration(
    id: string,
    key: string,
    value: string
  ): Promise<SaveResult<Configuration>> {
    const updateResult = await this.client.mutate({
      mutation: ConfigurationUpdateDocument,
      variables: {
        id,
        key,
        value,
      },
      refetchQueries: [
        {
          query: ConfigurationsDocument,
          variables: this.fetchConfigurationsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetConfigurationDocument,
          variables: { key },
        });
        const configurationCache = cacheItem?.configurationGet;
        if (configurationCache) {
          const serverReturnValue =
            result.data?.adminConfigurationUpdate?.result;
          if (
            serverReturnValue?.__typename === "AdminConfigurationUpdateSuccess"
          ) {
            const newConfigurationValue = serverReturnValue;
            cache.writeQuery({
              query: GetConfigurationDocument,
              variables: { key },
              data: {
                __typename: "Query",
                configurationGet: {
                  ...newConfigurationValue,
                  __typename: "ConfigurationType",
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

    const result = updateResult.data?.adminConfigurationUpdate?.result;
    switch (result?.__typename) {
      case "AdminConfigurationUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminConfigurationUpdateProblem": {
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

  async deleteConfiguration(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: ConfigurationDeleteDocument,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: ConfigurationsDocument,
          variables: this.fetchConfigurationsQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminConfigurationQueryType",
            id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "ConfigurationType",
            id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
