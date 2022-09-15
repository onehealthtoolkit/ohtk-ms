import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import {
  DEFAULT_BOUNDS,
  MarkerIcon,
  SetMapBounds,
} from "components/map/markerIcon";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { EventItem } from "lib/services/dashboard/event";
import { memo, useEffect, useState } from "react";

type MapViewProps = {
  data: Array<EventItem>;
};

const MapView: React.FC<MapViewProps> = ({ data }) => {
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
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SetMapBounds bounds={bounds} />

      {data.map((item, index) => {
        const icon = L.divIcon({
          className: "my-div-icon",
          html: renderToStaticMarkup(
            MarkerIcon({
              categoryIcon: item.categoryIcon,
              type: item.type,
            })
          ),
        });

        return (
          <Marker
            key={item.type + "_" + index + "_" + item.id}
            position={[item.location.lat, item.location.lng]}
            icon={icon}
          >
            <Popup>{item.data || "No data reported"}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default memo(MapView);
