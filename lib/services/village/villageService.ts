import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  VillageCreateDocument,
  VillagesDocument,
  VillageUpdateDocument,
} from "lib/generated/graphql";
import {
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";
import { Village } from "./village";

export interface IVillageService extends IService {
  fetchVillages(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<Village[]>>;

  getVillage(id: number): Promise<GetResult<Village>>;

  createVillage(
    code: string,
    name: string,
    authorityId: number,
    latitude: number | null,
    longitude: number | null,
    active: boolean
  ): Promise<SaveResult<Village>>;

  updateVillage(
    id: number,
    code: string,
    name: string,
    authorityId: number,
    latitude: number | null,
    longitude: number | null,
    active: boolean
  ): Promise<SaveResult<Village>>;
}

export class VillageService implements IVillageService {
  client: LegacyApolloClient;

  fetchVillagesQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "code,asc",
  };

  constructor(client: LegacyApolloClient) {
    this.client = client;
  }

  private toVillage(item: {
    id: string;
    code: string;
    name: string;
    active: boolean;
    latitude?: number | null;
    longitude?: number | null;
    authority: { id: string; name: string };
  }): Village {
    return {
      id: item.id,
      code: item.code,
      name: item.name,
      active: item.active,
      latitude: item.latitude || undefined,
      longitude: item.longitude || undefined,
      authorityId: parseInt(item.authority.id),
      authorityName: item.authority.name,
    };
  }

  async fetchVillages(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<Village[]>> {
    this.fetchVillagesQuery = {
      ...this.fetchVillagesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: VillagesDocument,
      variables: this.fetchVillagesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Village>();
    fetchResult.data.adminVillageQuery?.results.forEach(item => {
      if (item) {
        items.push(this.toVillage(item));
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminVillageQuery?.totalCount,
    };
  }

  async getVillage(id: number): Promise<GetResult<Village>> {
    const result = await this.fetchVillages(500, 0, "", true);
    return {
      data: result.items?.find(item => item.id === id.toString()),
      error: result.error,
    };
  }

  async createVillage(
    code: string,
    name: string,
    authorityId: number,
    latitude: number | null,
    longitude: number | null,
    active: boolean
  ): Promise<SaveResult<Village>> {
    const createResult = await this.client.mutate({
      mutation: VillageCreateDocument,
      variables: {
        code,
        name,
        authorityId,
        latitude,
        longitude,
        active,
      },
      refetchQueries: [
        {
          query: VillagesDocument,
          variables: this.fetchVillagesQuery,
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

    const result = createResult.data?.adminVillageCreate?.result;
    if (result?.__typename === "AdminVillageCreateProblem") {
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

  async updateVillage(
    id: number,
    code: string,
    name: string,
    authorityId: number,
    latitude: number | null,
    longitude: number | null,
    active: boolean
  ): Promise<SaveResult<Village>> {
    const updateResult = await this.client.mutate({
      mutation: VillageUpdateDocument,
      variables: {
        id,
        code,
        name,
        authorityId,
        latitude,
        longitude,
        active,
      },
      refetchQueries: [
        {
          query: VillagesDocument,
          variables: this.fetchVillagesQuery,
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

    const result = updateResult.data?.adminVillageUpdate?.result;
    if (result?.__typename === "AdminVillageUpdateProblem") {
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
