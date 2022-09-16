import L, { LatLngTuple } from "leaflet";
import { EventItem, EventItemType } from "lib/services/dashboard/event";
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
};

export const MarkerIcon = ({ categoryIcon, type }: MarkerIconProps) => {
  let color = "fill-black";
  switch (type) {
    case "report":
      color = "fill-yellow-400";
      break;
    case "case":
      color = "fill-red-500";
      break;
  }

  return (
    <div className="w-[36px] h-[36px] relative top-[-30px] left-[-5px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 718 1280"
        preserveAspectRatio="xMidYMid meet"
        className="absolute h-full"
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g
          transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
          stroke="none"
          className={color}
        >
          <path d="M3370 12794 c-19 -2 -87 -9 -150 -15 -1051 -99 -2031 -694 -2627 -1594 -459 -693 -674 -1584 -563 -2330 180 -1204 1094 -3603 2643 -6935 330 -710 906 -1910 917 -1910 11 0 587 1200 917 1910 1318 2835 2200 5054 2523 6350 155 621 182 978 110 1470 -122 834 -546 1611 -1185 2169 -554 484 -1211 776 -1950 867 -122 15 -556 27 -635 18z m560 -2027 c631 -150 1080 -605 1222 -1239 20 -90 23 -130 23 -313 0 -164 -4 -230 -18 -300 -132 -647 -615 -1132 -1265 -1267 -155 -32 -449 -32 -604 0 -650 135 -1133 620 -1265 1267 -28 138 -25 473 5 611 30 139 64 239 127 371 214 450 623 771 1111 872 143 30 141 30 359 26 171 -3 215 -7 305 -28z" />
        </g>
      </svg>

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

export const EventMarker = ({ event }: { event: EventItem }) => {
  const icon = L.divIcon({
    className: "my-div-icon",
    html: renderToStaticMarkup(
      MarkerIcon({
        categoryIcon: event.categoryIcon,
        type: event.type,
      })
    ),
  });

  return (
    <Marker position={[event.location.lat, event.location.lng]} icon={icon}>
      <Popup>{event.data || "No data reported"}</Popup>
    </Marker>
  );
};
