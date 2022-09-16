import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import {
  DEFAULT_BOUNDS,
  MarkerIcon,
  SetMapBounds,
} from "components/map/markerIcon";
import L, { LatLng, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { currentWebsocketEndpoint } from "lib/client";
import { EventItem } from "lib/services/dashboard/event";
import { memo, useEffect, useState } from "react";

const iconRadar = L.divIcon({
  className: "radar-wink-wrapper",
  iconSize: [160, 160],
  iconAnchor: [80, 80],
  html: '<div class="radar-wink"></div>',
});

type LocationMarkerProps = {
  location: { lat: number; lng: number };
};

const LocationMarker = ({ location }: LocationMarkerProps) => {
  const map = useMap();
  const [position, setPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    const position = new LatLng(location.lat, location.lng);
    setPosition(position);
    map.flyTo(position, 12);
  }, [location, map]);

  return position === null ? null : (
    <Marker position={position} icon={iconRadar}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

type LiveMapViewProps = {
  data: Array<EventItem>;
  authorityId?: number;
};

const LiveMapView: React.FC<LiveMapViewProps> = ({ data, authorityId }) => {
  const [bounds, setBounds] = useState<LatLngTuple[]>(DEFAULT_BOUNDS);
  const [incomings, setIncomings] = useState<EventItem[]>([]);

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

  useEffect(() => {
    const ws = new WebSocket(
      `${currentWebsocketEndpoint()}/reports/${authorityId}/`
    );

    ws.onmessage = ev => {
      console.log(ev.data);
    };

    return () => ws.close();
  }, [authorityId]);

  function test() {
    setIncomings([
      ...incomings,
      {
        id: new Date().getMilliseconds().toString(),
        type: "report",
        location: {
          lat: 18.796143,
          lng: 98.992696,
        },
        data: "hello",
        categoryName: "human",
      },
    ]);
  }

  return (
    <>
      <button
        className="absolute top-10 left-20 p-4 bg-green-200 z-[1001]"
        onClick={() => test()}
      >
        test
      </button>
      <MapContainer
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        bounds={bounds}
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

        {incomings.map(item => {
          return <LocationMarker key={item.id} location={item.location} />;
        })}
      </MapContainer>
    </>
  );
};

export default memo(LiveMapView);
