export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone?: string;
  avatarUrl?: string;
  role?: string | null;
  authorityId?: number;
};
