import type { Village } from "lib/services/village";
import { AccountsVillageReporterAssignmentCensusRoleChoices } from "lib/generated/graphql";

export type UserVillageAssignment = {
  id?: string;
  villageId: number;
  code: string;
  name: string;
  active: boolean;
  censusRole: AccountsVillageReporterAssignmentCensusRoleChoices;
};

export type UserGender = "male" | "female" | "other" | "";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone?: string;
  address?: string;
  gender?: UserGender | string | null;
  age?: number | null;
  avatarUrl?: string;
  role?: string | null;
  authorityId?: number;
  authorityName?: string;
  assignedVillages?: Pick<Village, "id" | "code" | "name" | "active">[];
  villageAssignments?: UserVillageAssignment[];
};
