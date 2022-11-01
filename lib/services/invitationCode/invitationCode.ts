export type InvitationCode = {
  id: string;
  code: string;
  authorityId?: number;
  authorityName?: string;
  fromDate?: string;
  throughDate?: string;
  role?: string;
};
