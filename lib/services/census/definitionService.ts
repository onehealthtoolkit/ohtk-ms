import { gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import { GetResult, IService, SaveResult } from "lib/services/interface";
import {
  CensusDefinition,
  CensusDefinitionAdminState,
  CensusDefinitionAuthoredSchema,
  CensusDefinitionValidationProblem,
  CensusDefinitionVersion,
  CensusKind,
} from "./definition";

export interface ICensusDefinitionService extends IService {
  fetchAdminState(
    force?: boolean
  ): Promise<GetResult<CensusDefinitionAdminState>>;
  ensureDefaults(
    resetSchema?: boolean
  ): Promise<SaveResult<CensusDefinitionAdminState>>;
  publishVersion(
    kind: CensusKind,
    definitionSchema: CensusDefinitionAuthoredSchema,
    enabled?: boolean
  ): Promise<SaveResult<CensusDefinitionVersion>>;
  saveDraft(
    kind: CensusKind,
    definitionSchema: CensusDefinitionAuthoredSchema
  ): Promise<SaveResult<CensusDefinitionVersion>>;
  setEnabled(
    kind: CensusKind,
    enabled: boolean
  ): Promise<SaveResult<CensusDefinitionVersion | undefined>>;
}

const CensusDefinitionFields = gql`
  fragment CensusDefinitionFields on CensusDefinitionType {
    id
    kind
    enabled
    sortOrder
  }
`;

const CensusDefinitionVersionFields = gql`
  fragment CensusDefinitionVersionFields on CensusDefinitionVersionType {
    id
    definition {
      ...CensusDefinitionFields
    }
    version
    status
    schema
    definitionSchema
    runtimeSchema
    publishedAt
  }
  ${CensusDefinitionFields}
`;

const CensusDefinitionAdminStateDocument = gql`
  query CensusDefinitionAdminState {
    censusDefinitions {
      ...CensusDefinitionFields
    }
    animal: activeCensusDefinitionVersion(kind: "ANIMAL") {
      ...CensusDefinitionVersionFields
    }
    human: activeCensusDefinitionVersion(kind: "HUMAN") {
      ...CensusDefinitionVersionFields
    }
    animalDraft: draftCensusDefinitionVersion(kind: "ANIMAL") {
      ...CensusDefinitionVersionFields
    }
    humanDraft: draftCensusDefinitionVersion(kind: "HUMAN") {
      ...CensusDefinitionVersionFields
    }
  }
  ${CensusDefinitionVersionFields}
`;

const CensusDefinitionsEnsureDefaultsDocument = gql`
  mutation CensusDefinitionsEnsureDefaults(
    $seedSpecies: Boolean = true
    $resetSchema: Boolean = false
  ) {
    adminCensusDefinitionsEnsureDefaults(
      seedSpecies: $seedSpecies
      resetSchema: $resetSchema
    ) {
      definitions {
        ...CensusDefinitionFields
      }
      versions {
        ...CensusDefinitionVersionFields
      }
      fields {
        name
        message
      }
    }
  }
  ${CensusDefinitionVersionFields}
`;

const CensusDefinitionVersionPublishDocument = gql`
  mutation CensusDefinitionVersionPublish(
    $kind: String!
    $definitionSchema: GenericScalar
    $enabled: Boolean = true
  ) {
    adminCensusDefinitionVersionPublish(
      kind: $kind
      definitionSchema: $definitionSchema
      enabled: $enabled
    ) {
      definition {
        ...CensusDefinitionFields
      }
      version {
        ...CensusDefinitionVersionFields
      }
      fields {
        name
        message
      }
    }
  }
  ${CensusDefinitionVersionFields}
`;

const CensusDefinitionVersionSaveDraftDocument = gql`
  mutation CensusDefinitionVersionSaveDraft(
    $kind: String!
    $definitionSchema: GenericScalar!
  ) {
    adminCensusDefinitionVersionSaveDraft(
      kind: $kind
      definitionSchema: $definitionSchema
    ) {
      definition {
        ...CensusDefinitionFields
      }
      version {
        ...CensusDefinitionVersionFields
      }
      fields {
        name
        message
      }
    }
  }
  ${CensusDefinitionVersionFields}
`;

const CensusDefinitionSetEnabledDocument = gql`
  mutation CensusDefinitionSetEnabled($kind: String!, $enabled: Boolean!) {
    adminCensusDefinitionSetEnabled(kind: $kind, enabled: $enabled) {
      definition {
        ...CensusDefinitionFields
      }
      version {
        ...CensusDefinitionVersionFields
      }
      fields {
        name
        message
      }
    }
  }
  ${CensusDefinitionVersionFields}
`;

export class CensusDefinitionService implements ICensusDefinitionService {
  constructor(readonly client: LegacyApolloClient) {}

  async fetchAdminState(
    force?: boolean
  ): Promise<GetResult<CensusDefinitionAdminState>> {
    try {
      const result = await this.client.query({
        query: CensusDefinitionAdminStateDocument,
        fetchPolicy: force ? "network-only" : "cache-first",
      });
      return { data: this.toAdminState(result.data) };
    } catch (error) {
      return { data: undefined, error: this.toErrorMessage(error) };
    }
  }

  async ensureDefaults(
    resetSchema: boolean = false
  ): Promise<SaveResult<CensusDefinitionAdminState>> {
    try {
      const result = await this.client.mutate({
        mutation: CensusDefinitionsEnsureDefaultsDocument,
        variables: { seedSpecies: true, resetSchema },
        refetchQueries: [{ query: CensusDefinitionAdminStateDocument }],
        awaitRefetchQueries: true,
      });
      const payload = result.data?.adminCensusDefinitionsEnsureDefaults;
      const problem = this.toProblem(payload?.fields);
      if (problem) {
        return problem;
      }
      return {
        success: true,
        data: this.toAdminState({
          censusDefinitions: payload?.definitions ?? [],
          animal: payload?.versions?.find(
            (version: any) => version?.definition?.kind === "ANIMAL"
          ),
          human: payload?.versions?.find(
            (version: any) => version?.definition?.kind === "HUMAN"
          ),
          animalDraft: undefined,
          humanDraft: undefined,
        }),
      };
    } catch (error) {
      return { success: false, message: this.toErrorMessage(error) };
    }
  }

  async publishVersion(
    kind: CensusKind,
    definitionSchema: CensusDefinitionAuthoredSchema,
    enabled: boolean = true
  ): Promise<SaveResult<CensusDefinitionVersion>> {
    try {
      const result = await this.client.mutate({
        mutation: CensusDefinitionVersionPublishDocument,
        variables: { kind, definitionSchema, enabled },
        refetchQueries: [{ query: CensusDefinitionAdminStateDocument }],
        awaitRefetchQueries: true,
      });
      const payload = result.data?.adminCensusDefinitionVersionPublish;
      const problem = this.toProblem(payload?.fields);
      if (problem) {
        return problem;
      }
      return { success: true, data: this.toVersion(payload?.version) };
    } catch (error) {
      return { success: false, message: this.toErrorMessage(error) };
    }
  }

  async saveDraft(
    kind: CensusKind,
    definitionSchema: CensusDefinitionAuthoredSchema
  ): Promise<SaveResult<CensusDefinitionVersion>> {
    try {
      const result = await this.client.mutate({
        mutation: CensusDefinitionVersionSaveDraftDocument,
        variables: { kind, definitionSchema },
        refetchQueries: [{ query: CensusDefinitionAdminStateDocument }],
        awaitRefetchQueries: true,
      });
      const payload = result.data?.adminCensusDefinitionVersionSaveDraft;
      const problem = this.toProblem(payload?.fields);
      if (problem) {
        return problem;
      }
      return { success: true, data: this.toVersion(payload?.version) };
    } catch (error) {
      return { success: false, message: this.toErrorMessage(error) };
    }
  }

  async setEnabled(
    kind: CensusKind,
    enabled: boolean
  ): Promise<SaveResult<CensusDefinitionVersion | undefined>> {
    try {
      const result = await this.client.mutate({
        mutation: CensusDefinitionSetEnabledDocument,
        variables: { kind, enabled },
        refetchQueries: [{ query: CensusDefinitionAdminStateDocument }],
        awaitRefetchQueries: true,
      });
      const payload = result.data?.adminCensusDefinitionSetEnabled;
      const problem = this.toProblem(payload?.fields);
      if (problem) {
        return problem;
      }
      return {
        success: true,
        data: payload?.version ? this.toVersion(payload.version) : undefined,
      };
    } catch (error) {
      return { success: false, message: this.toErrorMessage(error) };
    }
  }

  private toAdminState(data: any): CensusDefinitionAdminState {
    return {
      definitions: (data?.censusDefinitions ?? []).map((item: any) =>
        this.toDefinition(item)
      ),
      activeVersions: {
        ANIMAL: data?.animal ? this.toVersion(data.animal) : undefined,
        HUMAN: data?.human ? this.toVersion(data.human) : undefined,
      },
      draftVersions: {
        ANIMAL: data?.animalDraft
          ? this.toVersion(data.animalDraft)
          : undefined,
        HUMAN: data?.humanDraft ? this.toVersion(data.humanDraft) : undefined,
      },
    };
  }

  private toDefinition(item: any): CensusDefinition {
    return {
      id: item.id,
      kind: item.kind,
      enabled: item.enabled,
      sortOrder: item.sortOrder,
    };
  }

  private toVersion(item: any): CensusDefinitionVersion {
    return {
      id: item.id,
      definition: this.toDefinition(item.definition),
      version: item.version,
      status: item.status,
      schema: this.normalizeSchema(item.schema),
      definitionSchema: this.normalizeSchema<CensusDefinitionAuthoredSchema>(
        item.definitionSchema
      ),
      runtimeSchema: this.normalizeSchema(item.runtimeSchema),
      publishedAt: item.publishedAt,
    };
  }

  private normalizeSchema<T extends object = any>(value: unknown): T {
    if (!value) {
      return {} as T;
    }
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return {} as T;
      }
    }
    return value as T;
  }

  private toProblem(
    fields?: CensusDefinitionValidationProblem[] | null
  ): SaveResult<any> | undefined {
    if (!fields?.length) {
      return undefined;
    }
    return {
      success: false,
      message: fields
        .map(field => `${field.name}: ${field.message}`)
        .join(", "),
    };
  }

  private toErrorMessage(error: unknown): string {
    if (this.isUnsupportedFieldError(error)) {
      return "Census definition admin is not available on this server revision.";
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "Unable to load census definition admin data.";
  }

  private isUnsupportedFieldError(error: unknown): boolean {
    const text = JSON.stringify(error);
    return (
      text.includes("Cannot query field") &&
      (text.includes("censusDefinitions") ||
        text.includes("activeCensusDefinitionVersion") ||
        text.includes("draftCensusDefinitionVersion") ||
        text.includes("adminCensusDefinitionsEnsureDefaults") ||
        text.includes("adminCensusDefinitionVersionPublish") ||
        text.includes("adminCensusDefinitionVersionSaveDraft") ||
        text.includes("adminCensusDefinitionSetEnabled"))
    );
  }
}
