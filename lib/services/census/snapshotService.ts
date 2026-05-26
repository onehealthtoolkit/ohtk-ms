import type { LegacyApolloClient } from "lib/services/apolloClient";
import { LatestVillageCensusDocument } from "lib/generated/graphql";
import { GetResult, IService } from "lib/services/interface";
import { VillageCensusSnapshot } from "./census";

export interface ICensusSnapshotService extends IService {
  getLatestVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>>;
}

export class CensusSnapshotService implements ICensusSnapshotService {
  constructor(readonly client: LegacyApolloClient) {}

  async getLatestVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>> {
    const getResult = await this.client.query({
      query: LatestVillageCensusDocument,
      variables: {
        villageId,
      },
      fetchPolicy: "network-only",
    });
    const snapshot = getResult.data.latestVillageCensus;
    return {
      data: snapshot
        ? {
            id: snapshot.id,
            censusDate: snapshot.censusDate,
            submittedAt: snapshot.submittedAt,
            reporterUsername: snapshot.reporter.username,
            facts: snapshot.facts.map(fact => ({
              speciesId: fact.species.id,
              speciesCode: fact.species.code,
              speciesName: fact.species.name,
              animalQuantity: fact.animalQuantity,
              householdQuantity: fact.householdQuantity,
            })),
          }
        : undefined,
    };
  }
}
