export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone?: string;
  address?: string;
  avatarUrl?: string;
  role?: string | null;
  authorityId?: number;
  authorityName?: string;
};
