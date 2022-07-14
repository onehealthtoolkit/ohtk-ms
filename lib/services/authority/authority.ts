export type Authority = {
  id: string;
  name: string;
  code: string;
  area?: PolygonData;
  inherits?: Authority[];
};

export type PolygonData = GeoJSON.Polygon | GeoJSON.MultiPolygon;
