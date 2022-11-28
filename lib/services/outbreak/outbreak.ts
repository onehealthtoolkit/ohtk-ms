export type OutbreakPlace = {
  place?: Place | null;
  zone?: number | null;
  color: string;
};

export type Place = {
  name: string;
  latitude?: number | null;
  longitude?: number | null;
};
