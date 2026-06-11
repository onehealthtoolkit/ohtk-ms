import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Circle,
  GeoJSON,
  MapContainer,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";

const DEFAULT_CENTER: LatLngTuple = [15.87, 100.9925];
const DEFAULT_BOUNDS: LatLngTuple[] = [
  [22.755920681486405, 115.521484375],
  [0.4061088354351594, 90.58203125000001],
];

type GeoJsonPoint = {
  type: "Point";
  coordinates: [number, number];
};

const isGeoJsonPoint = (geometry: unknown): geometry is GeoJsonPoint => {
  if (!geometry || typeof geometry !== "object") return false;
  const candidate = geometry as { type?: unknown; coordinates?: unknown };
  return (
    candidate.type === "Point" &&
    Array.isArray(candidate.coordinates) &&
    candidate.coordinates.length >= 2 &&
    typeof candidate.coordinates[0] === "number" &&
    typeof candidate.coordinates[1] === "number"
  );
};

const centerFromGeometry = (geometry: unknown): LatLngTuple | undefined => {
  if (!isGeoJsonPoint(geometry)) return undefined;
  return [geometry.coordinates[1], geometry.coordinates[0]];
};

export default function ClusterMap({
  geometry,
  radiusMeters,
}: {
  geometry?: unknown;
  radiusMeters?: number | null;
}) {
  const center = centerFromGeometry(geometry);
  const mapCenter = center || DEFAULT_CENTER;

  return (
    <MapContainer
      center={mapCenter}
      zoom={center ? 10 : 4}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Circle
          center={center}
          radius={radiusMeters || 1000}
          pathOptions={{
            color: "#1d4ed8",
            fillColor: "#3b82f6",
            fillOpacity: 0.14,
            weight: 2,
          }}
        />
      )}
      {!!geometry && !isGeoJsonPoint(geometry) && (
        <GeoJSON
          data={geometry as any}
          style={{
            color: "#1d4ed8",
            fillColor: "#3b82f6",
            fillOpacity: 0.14,
            weight: 2,
          }}
        />
      )}
      {!center && !geometry && (
        <SVGOverlay attributes={{ stroke: "red" }} bounds={DEFAULT_BOUNDS}>
          <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
          <text x="10%" y="50%" stroke="blue" fontSize={12}>
            No location
          </text>
        </SVGOverlay>
      )}
    </MapContainer>
  );
}
