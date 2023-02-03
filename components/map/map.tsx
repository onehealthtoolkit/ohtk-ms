import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import {
  DEFAULT_BOUNDS,
  EventMarker,
  SetMapBounds,
} from "components/map/markerIcon";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { EventItem } from "lib/services/dashboard/event";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

type MapViewProps = {
  data: Array<EventItem>;
};

const MapView: React.FC<MapViewProps> = ({ data }) => {
  const router = useRouter();
  const [bounds, setBounds] = useState<LatLngTuple[]>(DEFAULT_BOUNDS);

  useEffect(() => {
    const points: LatLngTuple[] = data.map(it => [
      it.location.lng,
      it.location.lat,
    ]);
    const collection = turfPoints(points);

    if (collection.features.length > 0) {
      const bboxArray = turfBbox(collection);
      const corner1 = [bboxArray[1], bboxArray[0]] as LatLngTuple;
      const corner2 = [bboxArray[3], bboxArray[2]] as LatLngTuple;
      setBounds([corner1, corner2]);
    }
  }, [data]);

  return (
    <MapContainer
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SetMapBounds bounds={bounds} />

      {data.map(item => {
        return (
          <EventMarker
            event={item}
            key={`${item.type}_${item.id}`}
            onPopupClick={id => router.push(`/reports/${id}`)}
          />
        );
      })}
    </MapContainer>
  );
};

export default memo(MapView);
