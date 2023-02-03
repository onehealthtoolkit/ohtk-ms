import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import {
  DEFAULT_BOUNDS,
  EventMarker,
  MarkerPopup,
  SetMapBounds,
} from "components/map/markerIcon";
import L, { LatLng, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { currentWebsocketEndpoint } from "lib/client";
import { EventItem } from "lib/services/dashboard/event";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const iconRadar = L.divIcon({
  className: "radar-wink-wrapper",
  iconSize: [160, 160],
  iconAnchor: [80, 80],
  html: '<div class="radar-wink"></div>',
});

type LocationMarkerProps = {
  event: EventItem;
  onPopupClick?: (eventId: string) => void;
};

const LocationMarker = ({ event, onPopupClick }: LocationMarkerProps) => {
  const map = useMap();
  const [position, setPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    const position = new LatLng(event.location.lat, event.location.lng);
    setPosition(position);
    map.flyTo(position, 12);
  }, [event, map]);

  return position === null ? null : (
    <Marker position={position} icon={iconRadar}>
      <Popup>
        <MarkerPopup event={event} onPopupClick={onPopupClick} />
      </Popup>
    </Marker>
  );
};

type LiveMapViewProps = {
  data: Array<EventItem>;
  authorityId?: number;
};

const LiveMapView: React.FC<LiveMapViewProps> = ({ data, authorityId }) => {
  const router = useRouter();
  const [bounds, setBounds] = useState<LatLngTuple[]>(DEFAULT_BOUNDS);
  const [incomings, setIncomings] = useState<EventItem[]>([]);

  const addIncomingEvent = useCallback(
    (
      reportId: string,
      location: string,
      rendererData: string,
      categoryName: string
    ) => {
      if (location) {
        const lnglat = location.split(",");
        const event: EventItem = {
          id: reportId,
          type: "report",
          location: {
            lat: parseFloat(lnglat[1]),
            lng: parseFloat(lnglat[0]),
          },
          data: rendererData,
          categoryName,
        };

        setIncomings([...incomings, event]);
      }
    },
    [incomings]
  );

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

    /**
     * Message format:
     * String "{
        data: {[string]: any},
        report_date: string (iso),
        incident_date: string (yyyy-mm-dd),
        gps_location: string (lng,lat),
        renderer_data: string,
        report_id: string,
        report_type: {
            id: string,
            name: string,
            category: string,
        }
       }"
     */
    ws.onmessage = ev => {
      console.log(ev.data);
      const data = JSON.parse(ev.data);
      addIncomingEvent(
        data["report_id"],
        data["gps_location"],
        data["renderer_data"],
        data["report_type"]["category"]
      );
    };

    return () => ws.close();
  }, [authorityId, addIncomingEvent]);

  return (
    <MapContainer
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      bounds={bounds}
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

      {/* Pin */}
      {incomings.map(item => {
        return (
          <EventMarker
            key={`pin_${item.type}_${item.id}`}
            event={item}
            onPopupClick={id => router.push(`/reports/${id}`)}
          />
        );
      })}
      {/* Winking radar */}
      {incomings.map(item => {
        return (
          <LocationMarker
            key={`wink_${item.type}_${item.id}`}
            event={item}
            onPopupClick={id => router.push(`/reports/${id}`)}
          />
        );
      })}
    </MapContainer>
  );
};

export default memo(LiveMapView);
