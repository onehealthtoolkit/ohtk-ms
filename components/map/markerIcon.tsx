/* eslint-disable @next/next/no-img-element */
import { PhotographIcon } from "@heroicons/react/solid";
import { MapPin } from "components/widgets/mapPin";
import L, { LatLngTuple } from "leaflet";
import { formatDateTime } from "lib/datetime";
import { EventItem, EventItemType } from "lib/services/dashboard/event";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

// Default bounds, let see the whole world
export const DEFAULT_BOUNDS: LatLngTuple[] = [
  [18.836723528017718, -122.0840462],
  [40.669181691432776, 139.77587699890137],
];

// Fix issue when set bounds directly into MapContainer
// https://github.com/PaulLeCam/react-leaflet/issues/799
export function SetMapBounds({ bounds }: { bounds: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [bounds, map]);

  return null;
}

type MarkerIconProps = {
  categoryIcon?: string | null;
  type: EventItemType;
  boundaryConnect?: boolean;
};

export const MarkerIcon = ({
  categoryIcon,
  type,
  boundaryConnect,
}: MarkerIconProps) => {
  let color = "fill-black";
  switch (type) {
    case "report":
      color = !boundaryConnect ? "fill-yellow-400" : "fill-purple-600";
      break;
    case "case":
      color = !boundaryConnect ? "fill-red-500" : "fill-purple-600";
      break;
  }

  return (
    <div className="w-[36px] h-[36px] relative top-[-30px] left-[-5px]">
      <MapPin color={color} />
      <div
        style={
          categoryIcon
            ? {
                position: "absolute",
                top: "0px",
                left: "2px",
                zIndex: 1000,
                width: "18px",
                height: "18px",
                backgroundImage: `url("${categoryIcon}")`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }
            : {}
        }
      ></div>
    </div>
  );
};

type EventMarkerProps = {
  event: EventItem;
  onPopupClick?: (eventId: string, type: string) => void;
};

export const EventMarker = ({ event, onPopupClick }: EventMarkerProps) => {
  const icon = L.divIcon({
    className: "my-div-icon",
    html: renderToStaticMarkup(
      MarkerIcon({
        categoryIcon: event.categoryIcon,
        type: event.type,
        boundaryConnect: event.boundaryConnect,
      })
    ),
  });

  return (
    <Marker position={[event.location.lat, event.location.lng]} icon={icon}>
      <Popup>
        <MarkerPopup event={event} onPopupClick={onPopupClick} />
      </Popup>
    </Marker>
  );
};

export const MarkerPopup = ({ event, onPopupClick }: EventMarkerProps) => {
  const router = useRouter();
  return (
    <div
      className={`flex items-start gap-2 ${
        event.boundaryConnect ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={e => {
        e.preventDefault();
        onPopupClick && onPopupClick(event.id, event.type);
      }}
    >
      <div className="flex-none overflow-hidden relative w-10  bg-gray-200 rounded-md">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.categoryName}
            className="w-full h-10 object-cover"
          />
        ) : (
          <PhotographIcon className="w-full fill-gray-400 p-2" />
        )}
      </div>
      <div className="flex flex-col grow">
        <h1 className="font-bold">{event.categoryName}</h1>
        <div className="text-[0.65rem] text-gray-500">
          {formatDateTime(event.createdAt, router.locale)}
        </div>
        <div className="mb-1">{event.data || "No data reported"}</div>
      </div>
    </div>
  );
};
