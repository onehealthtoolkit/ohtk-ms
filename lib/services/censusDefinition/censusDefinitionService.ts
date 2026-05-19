import { gql } from "@apollo/client";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import { GetResult, IService, SaveResult } from "lib/services/interface";
import {
  CensusDefinition,
  CensusDefinitionAdminState,
  CensusDefinitionValidationProblem,
  CensusDefinitionVersion,
  CensusKind,
  CensusSchema,
} from "./censusDefinition";

const CENSUS_DEFINITION_FIELDS = gql`
  fragment CensusDefinitionFields on CensusDefinitionType {
    id
    kind
    enabled
    sortOrder
  }
`;

const CENSUS_DEFINITION_VERSION_FIELDS = gql`
  ${CENSUS_DEFINITION_FIELDS}
  fragment CensusDefinitionVersionFields on CensusDefinitionVersionType {
    id
    definition {
      ...CensusDefinitionFields
    }
    version
    status
    schema
    runtimeSchema
    publishedAt
  }
`;

const CENSUS_DEFINITION_ADMIN_STATE = gql`
  ${CENSUS_DEFINITION_VERSION_FIELDS}
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
  }
`;

const CENSUS_DEFINITIONS_ENSURE_DEFAULTS = gql`
  ${CENSUS_DEFINITION_VERSION_FIELDS}
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
`;

const CENSUS_DEFINITION_VERSION_PUBLISH = gql`
  ${CENSUS_DEFINITION_VERSION_FIELDS}
  mutation CensusDefinitionVersionPublish(
    $kind: String!
    $schema: GenericScalar
    $enabled: Boolean = true
  ) {
    adminCensusDefinitionVersionPublish(
      kind: $kind
      schema: $schema
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
`;

export interface ICensusDefinitionService extends IService {
  fetchAdminState(
    force?: boolean
  ): Promise<GetResult<CensusDefinitionAdminState>>;
  ensureDefaults(
    resetSchema?: boolean
  ): Promise<SaveResult<CensusDefinitionAdminState>>;
  publishVersion(
    kind: CensusKind,
    schema: CensusSchema,
    enabled?: boolean
  ): Promise<SaveResult<CensusDefinitionVersion>>;
}

export class CensusDefinitionService implements ICensusDefinitionService {
  constructor(readonly client: LegacyApolloClient) {}

  async fetchAdminState(
    force?: boolean
  ): Promise<GetResult<CensusDefinitionAdminState>> {
    try {
      const result = await this.client.query({
        query: CENSUS_DEFINITION_ADMIN_STATE,
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
        mutation: CENSUS_DEFINITIONS_ENSURE_DEFAULTS,
        variables: { seedSpecies: true, resetSchema },
        refetchQueries: [{ query: CENSUS_DEFINITION_ADMIN_STATE }],
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
        }),
      };
    } catch (error) {
      return { success: false, message: this.toErrorMessage(error) };
    }
  }

  async publishVersion(
    kind: CensusKind,
    schema: CensusSchema,
    enabled: boolean = true
  ): Promise<SaveResult<CensusDefinitionVersion>> {
    try {
      const result = await this.client.mutate({
        mutation: CENSUS_DEFINITION_VERSION_PUBLISH,
        variables: { kind, schema, enabled },
        refetchQueries: [{ query: CENSUS_DEFINITION_ADMIN_STATE }],
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

  private toAdminState(data: any): CensusDefinitionAdminState {
    return {
      definitions: (data?.censusDefinitions ?? []).map((item: any) =>
        this.toDefinition(item)
      ),
      activeVersions: {
        ANIMAL: data?.animal ? this.toVersion(data.animal) : undefined,
        HUMAN: data?.human ? this.toVersion(data.human) : undefined,
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
      runtimeSchema: this.normalizeSchema(item.runtimeSchema),
      publishedAt: item.publishedAt,
    };
  }

  private normalizeSchema(value: unknown): CensusSchema {
    if (!value) {
      return {};
    }
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return {};
      }
    }
    return value as CensusSchema;
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
        text.includes("adminCensusDefinitionsEnsureDefaults") ||
        text.includes("adminCensusDefinitionVersionPublish"))
    );
  }
}
