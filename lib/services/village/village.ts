export type Village = {
  id: string;
  code: string;
  name: string;
  active: boolean;
  latitude?: number;
  longitude?: number;
  authorityId: number;
  authorityName?: string;
};
