import { gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import { GetResult, IService } from "lib/services/interface";
import {
  SubmitVillageCensusInput,
  VillageCensusFormData,
  VillageCensusSnapshot,
} from "./census";

const LatestAnimalVillageCensusDocument = gql`
  query LatestAnimalVillageCensus($villageId: Int!) {
    latestVillageCensusV2(villageId: $villageId, kind: "ANIMAL") {
      id
      censusDate
      submittedAt
      villageHouseholdQuantity
      animalHouseholdQuantity
      formData
      definitionVersion {
        id
        version
      }
      reporter {
        username
      }
      facts {
        rowKey
        rowLabel
        animalQuantity
        householdQuantity
      }
    }
  }
`;

const SubmitVillageCensusSnapshotV2Document = gql`
  mutation SubmitVillageCensusSnapshotV2(
    $villageId: Int!
    $definitionVersionId: Int!
    $occurrenceId: Int
    $censusDate: Date!
    $formData: GenericScalar!
  ) {
    submitVillageCensusSnapshotV2(
      villageId: $villageId
      definitionVersionId: $definitionVersionId
      occurrenceId: $occurrenceId
      censusDate: $censusDate
      formData: $formData
    ) {
      result {
        __typename
        ... on VillageCensusSnapshotType {
          id
          censusDate
          submittedAt
          villageHouseholdQuantity
          animalHouseholdQuantity
          reporter {
            username
          }
          facts {
            rowKey
            rowLabel
            animalQuantity
            householdQuantity
          }
        }
        ... on VillageCensusSnapshotProblem {
          fields {
            name
            message
          }
          message
        }
      }
    }
  }
`;

export interface ICensusSnapshotService extends IService {
  getLatestAnimalVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>>;
  submitVillageCensusSnapshotV2(
    input: SubmitVillageCensusInput
  ): Promise<GetResult<VillageCensusSnapshot>>;
}

export class CensusSnapshotService implements ICensusSnapshotService {
  constructor(readonly client: LegacyApolloClient) {}

  async getLatestAnimalVillageCensus(
    villageId: number
  ): Promise<GetResult<VillageCensusSnapshot>> {
    try {
      const getResult = await this.client.query({
        query: LatestAnimalVillageCensusDocument,
        variables: {
          villageId,
        },
        fetchPolicy: "network-only",
      });
      const snapshot = getResult.data.latestVillageCensusV2;
      return {
        data: snapshot ? this.toSnapshot(snapshot) : undefined,
      };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  async submitVillageCensusSnapshotV2(
    input: SubmitVillageCensusInput
  ): Promise<GetResult<VillageCensusSnapshot>> {
    try {
      const result = await this.client.mutate({
        mutation: SubmitVillageCensusSnapshotV2Document,
        variables: {
          villageId: input.villageId,
          definitionVersionId: input.definitionVersionId,
          occurrenceId: input.occurrenceId,
          censusDate: input.censusDate,
          formData: input.formData,
        },
      });
      if (result.errors?.length) {
        return {
          data: undefined,
          error: result.errors.map(error => error.message).join(", "),
        };
      }
      const payload = result.data?.submitVillageCensusSnapshotV2?.result;
      if (!payload) {
        return { data: undefined, error: "Submit failed" };
      }
      if (payload.__typename === "VillageCensusSnapshotProblem") {
        const fieldMessages = (payload.fields ?? [])
          .map((field: { name?: string; message?: string }) =>
            field?.message ? `${field.name}: ${field.message}` : field?.name
          )
          .filter(Boolean);
        const message = payload.message || fieldMessages.join("; ");
        return { data: undefined, error: message || "Submit failed" };
      }
      return { data: this.toSnapshot(payload) };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  private toSnapshot(snapshot: any): VillageCensusSnapshot {
    return {
      id: snapshot.id,
      censusDate: snapshot.censusDate,
      submittedAt: snapshot.submittedAt,
      villageHouseholdQuantity: snapshot.villageHouseholdQuantity,
      animalHouseholdQuantity: snapshot.animalHouseholdQuantity,
      reporterUsername: snapshot.reporter?.username,
      definitionVersionId: snapshot.definitionVersion?.id
        ? String(snapshot.definitionVersion.id)
        : undefined,
      formData: this.toFormData(snapshot.formData),
      facts: (snapshot.facts ?? []).map((fact: any) => ({
        rowKey: fact.rowKey,
        rowLabel: fact.rowLabel,
        animalQuantity: fact.animalQuantity,
        householdQuantity: fact.householdQuantity,
      })),
    };
  }

  private toFormData(value: unknown): VillageCensusFormData | undefined {
    if (!value) {
      return undefined;
    }
    if (typeof value === "string") {
      try {
        return JSON.parse(value) as VillageCensusFormData;
      } catch {
        return undefined;
      }
    }
    if (typeof value === "object") {
      return value as VillageCensusFormData;
    }
    return undefined;
  }

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return "Unable to load census snapshot.";
  }
}
