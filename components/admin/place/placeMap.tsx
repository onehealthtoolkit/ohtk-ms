import { observer } from "mobx-react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { useMemo, useRef } from "react";

type MapViewProps = {
  lat: number;
  lng: number;
  onMarkerChange: (latLng: L.LatLng) => void;
};

const PlaceMap: React.FC<MapViewProps> = ({ lat, lng, onMarkerChange }) => {
  const markerRef = useRef<L.Marker>(null);
  const icon = L.divIcon({
    html: renderToStaticMarkup(MarkerIcon()),
  });

  let latitude: number = lat || 15.87;
  let longitude: number = lng || 100.9925;

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onMarkerChange(marker.getLatLng());
        }
      },
    }),
    [onMarkerChange]
  );

  return (
    <div className="flex">
      <div className="rounded-lg border border-gray-200 shadow-md  w-full">
        <MapContainer
          center={[latitude, longitude]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: 300, width: "100%" }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[latitude, longitude]}
            icon={icon}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
          ></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default observer(PlaceMap);

const MarkerIcon = () => {
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
          className="fill-red-400"
        >
          <path d="M3370 12794 c-19 -2 -87 -9 -150 -15 -1051 -99 -2031 -694 -2627 -1594 -459 -693 -674 -1584 -563 -2330 180 -1204 1094 -3603 2643 -6935 330 -710 906 -1910 917 -1910 11 0 587 1200 917 1910 1318 2835 2200 5054 2523 6350 155 621 182 978 110 1470 -122 834 -546 1611 -1185 2169 -554 484 -1211 776 -1950 867 -122 15 -556 27 -635 18z m560 -2027 c631 -150 1080 -605 1222 -1239 20 -90 23 -130 23 -313 0 -164 -4 -230 -18 -300 -132 -647 -615 -1132 -1265 -1267 -155 -32 -449 -32 -604 0 -650 135 -1133 620 -1265 1267 -28 138 -25 473 5 611 30 139 64 239 127 371 214 450 623 771 1111 872 143 30 141 30 359 26 171 -3 215 -7 305 -28z" />
        </g>
      </svg>
    </div>
  );
};
