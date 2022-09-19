export type EventData = {
  reports: Array<EventItem>;
  cases: Array<EventItem>;
};

const eventType = ["report", "case"] as const;
export type EventItemType = typeof eventType[number];

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
};
