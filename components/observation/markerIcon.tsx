/* eslint-disable @next/next/no-img-element */
import { PhotographIcon } from "@heroicons/react/solid";
import { MapPin } from "components/widgets/mapPin";
import L, { LatLngTuple } from "leaflet";
import { formatDateTime } from "lib/datetime";
import { ObservationEventItem } from "lib/services/observation/event";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup, useMap } from "react-leaflet";

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
  icon?: string | null;
};

export const MarkerIcon = ({ icon }: MarkerIconProps) => {
  let color = "fill-blue-800";

  return (
    <div className="w-[36px] h-[36px] relative top-[-30px] left-[-5px]">
      <MapPin color={color} />
      <div
        style={
          icon
            ? {
                position: "absolute",
                top: "0px",
                left: "2px",
                zIndex: 1000,
                width: "18px",
                height: "18px",
                backgroundImage: `url("${icon}")`,
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
  event: ObservationEventItem;
  onPopupClick?: (eventId: string) => void;
};

export const EventMarker = ({ event, onPopupClick }: EventMarkerProps) => {
  const icon = L.divIcon({
    className: "my-div-icon",
    html: renderToStaticMarkup(
      MarkerIcon({
        icon: event.imageUrl,
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
      className="flex items-start gap-2 cursor-pointer"
      onClick={e => {
        e.preventDefault();
        onPopupClick && onPopupClick(event.id);
      }}
    >
      <div className="flex-none overflow-hidden relative w-10  bg-gray-200 rounded-full">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-10 object-cover"
          />
        ) : (
          <PhotographIcon className="w-full fill-gray-400 p-2" />
        )}
      </div>
      <div className="flex flex-col grow">
        <h1 className="font-bold">{event.title}</h1>
        <div className="text-[0.65rem] text-gray-500">
          {formatDateTime(event.createdAt, router.locale)}
        </div>
        <div className="mb-1">{event.description || "No data reported"}</div>
      </div>
    </div>
  );
};
