export type Me = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  authorityId: number;
  authorityName: string;
  avatarUrl: string;
  role: string;
  isReporter: boolean;
  isStaff: boolean;
  isSuperUser: boolean;
  email: string;
  telephone: string;
};

export type ProfileUpdate = {
  avatarUrl: string;
};
