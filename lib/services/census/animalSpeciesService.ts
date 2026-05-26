import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  AnimalSpeciesCreateDocument,
  AnimalSpeciesDocument,
  AnimalSpeciesUpdateDocument,
} from "lib/generated/graphql";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import { AnimalSpecies } from "./animalSpecies";

export interface IAnimalSpeciesService extends IService {
  fetchAnimalSpecies(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<AnimalSpecies[]>>;

  getAnimalSpecies(id: number): Promise<GetResult<AnimalSpecies>>;

  createAnimalSpecies(
    code: string,
    name: string,
    active: boolean,
    sortOrder: number
  ): Promise<SaveResult<AnimalSpecies>>;

  updateAnimalSpecies(
    id: number,
    code: string,
    name: string,
    active: boolean,
    sortOrder: number
  ): Promise<SaveResult<AnimalSpecies>>;
}

export class AnimalSpeciesService implements IAnimalSpeciesService {
  client: LegacyApolloClient;

  fetchAnimalSpeciesQuery = {
    limit: 20,
    offset: 0,
    q: "",
    active: undefined as boolean | undefined,
    ordering: "sort_order,asc",
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  async fetchAnimalSpecies(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<AnimalSpecies[]>> {
    this.fetchAnimalSpeciesQuery = {
      ...this.fetchAnimalSpeciesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: AnimalSpeciesDocument,
      variables: this.fetchAnimalSpeciesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<AnimalSpecies>();
    fetchResult.data.adminAnimalSpeciesQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          code: item.code,
          name: item.name,
          active: item.active,
          sortOrder: item.sortOrder,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminAnimalSpeciesQuery?.totalCount,
    };
  }

  async getAnimalSpecies(id: number): Promise<GetResult<AnimalSpecies>> {
    const result = await this.fetchAnimalSpecies(500, 0, "", true);
    return {
      data: result.items?.find(item => item.id === id.toString()),
      error: result.error,
    };
  }

  async createAnimalSpecies(
    code: string,
    name: string,
    active: boolean,
    sortOrder: number
  ): Promise<SaveResult<AnimalSpecies>> {
    const createResult = await this.client.mutate({
      mutation: AnimalSpeciesCreateDocument,
      variables: {
        code,
        name,
        active,
        sortOrder,
      },
      refetchQueries: [
        {
          query: AnimalSpeciesDocument,
          variables: this.fetchAnimalSpeciesQuery,
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

    const result = createResult.data?.adminAnimalSpeciesCreate?.result;
    if (result?.__typename === "AdminAnimalSpeciesCreateProblem") {
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
    return { success: true };
  }

  async updateAnimalSpecies(
    id: number,
    code: string,
    name: string,
    active: boolean,
    sortOrder: number
  ): Promise<SaveResult<AnimalSpecies>> {
    const updateResult = await this.client.mutate({
      mutation: AnimalSpeciesUpdateDocument,
      variables: {
        id,
        code,
        name,
        active,
        sortOrder,
      },
      refetchQueries: [
        {
          query: AnimalSpeciesDocument,
          variables: this.fetchAnimalSpeciesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const result = updateResult.data?.adminAnimalSpeciesUpdate?.result;
    if (result?.__typename === "AdminAnimalSpeciesUpdateProblem") {
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
    return { success: true };
  }
}
