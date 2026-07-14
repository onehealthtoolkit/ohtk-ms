import type { LegacyApolloClient } from "lib/services/apolloClient";
import { LatestAnimalVillageCensusDocument } from "lib/generated/graphql";
import { GetResult, IService } from "lib/services/interface";
import { VillageCensusSnapshot } from "./census";

export interface ICensusSnapshotService extends IService {
  getLatestAnimalVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>>;
}

export class CensusSnapshotService implements ICensusSnapshotService {
  constructor(readonly client: LegacyApolloClient) {}

  async getLatestAnimalVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>> {
    const getResult = await this.client.query({
      query: LatestAnimalVillageCensusDocument,
      variables: {
        villageId,
      },
      fetchPolicy: "network-only",
    });
    const snapshot = getResult.data.latestVillageCensusV2;
    return {
      data: snapshot
        ? {
            id: snapshot.id,
            censusDate: snapshot.censusDate,
            submittedAt: snapshot.submittedAt,
            villageHouseholdQuantity: snapshot.villageHouseholdQuantity,
            animalHouseholdQuantity: snapshot.animalHouseholdQuantity,
            reporterUsername: snapshot.reporter.username,
            facts: snapshot.facts.map(fact => ({
              rowKey: fact.rowKey,
              rowLabel: fact.rowLabel,
              animalQuantity: fact.animalQuantity,
              householdQuantity: fact.householdQuantity,
            })),
          }
        : undefined,
    };
  }
}
