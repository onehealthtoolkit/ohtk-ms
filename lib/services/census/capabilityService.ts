import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  AnimalCensusCapabilityUpdateDocument,
  CensusCapabilitiesDocument,
} from "lib/generated/graphql";
import { GetResult, IService, SaveResult } from "lib/services/interface";

export type CensusCapabilities = {
  villageEnabled: boolean;
  animalCensusEnabled: boolean;
};

export interface ICensusCapabilityService extends IService {
  getCapabilities(force?: boolean): Promise<GetResult<CensusCapabilities>>;
  updateAnimalCensusCapability(
    enabled: boolean
  ): Promise<SaveResult<CensusCapabilities>>;
}

export class CensusCapabilityService implements ICensusCapabilityService {
  constructor(readonly client: LegacyApolloClient) {}

  async getCapabilities(
    force?: boolean
  ): Promise<GetResult<CensusCapabilities>> {
    const result = await this.client.query({
      query: CensusCapabilitiesDocument,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    return {
      data: {
        villageEnabled: result.data.villageCapabilityEnabled,
        animalCensusEnabled: result.data.animalCensusCapabilityEnabled,
      },
      error: result.errors?.map(error => error.message).join(","),
    };
  }

  async updateAnimalCensusCapability(
    enabled: boolean
  ): Promise<SaveResult<CensusCapabilities>> {
    const result = await this.client.mutate({
      mutation: AnimalCensusCapabilityUpdateDocument,
      variables: { enabled },
      refetchQueries: [{ query: CensusCapabilitiesDocument }],
      awaitRefetchQueries: true,
    });

    if (result.errors) {
      return {
        success: false,
        message: result.errors.map(error => error.message).join(","),
      };
    }

    const payload = result.data?.adminAnimalCensusCapabilityUpdate;
    if (payload?.fields?.length) {
      const fields: Record<string, string> = {};
      payload.fields.forEach(field => {
        if (field) {
          fields[field.name] = field.message;
        }
      });
      return {
        success: false,
        fields,
      };
    }

    return {
      success: true,
      data: {
        villageEnabled: true,
        animalCensusEnabled: Boolean(payload?.enabled),
      },
    };
  }
}
