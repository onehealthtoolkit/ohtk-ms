export type ObservationEventItem = {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  title: string;
  description?: string | null;
  createdAt?: string;
  imageUrl?: string | null;
};
