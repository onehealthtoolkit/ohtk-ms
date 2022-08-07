export type Me = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  authorityId: number;
  authorityName: string;
  avatarUrl: string;
  role: string;
  isStaff: boolean;
  isSuperUser: boolean;
};

export type ProfileUpdate = {
  avatarUrl: string;
};
