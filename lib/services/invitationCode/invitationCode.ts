export type InvitationCode = {
  id: string;
  code: string;
  authorityId?: number;
  fromDate?: string;
  throughDate?: string;
};
