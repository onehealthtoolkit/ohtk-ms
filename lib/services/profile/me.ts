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
  address: string;
  features: Array<string>;
  aiSummaryEnabled: boolean;
};

export type ProfileUpdate = {
  avatarUrl: string;
};
