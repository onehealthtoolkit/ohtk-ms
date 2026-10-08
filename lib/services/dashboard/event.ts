export type EventData = {
  reports: Array<EventItem>;
  cases: Array<EventItem>;
};

export type EventItemType = "report" | "case";

export type EventItem = {
  id: string;
  type: EventItemType;
  location: {
    lat: number;
    lng: number;
  };
  data: string;
  categoryName: string;
  categoryIcon?: string | null;
  createdAt?: string;
  imageUrl?: string | null;
  boundaryConnect?: boolean;
};
