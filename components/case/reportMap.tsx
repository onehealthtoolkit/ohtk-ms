import { OutbreakZone } from "components/case/caseViewModel";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
} from "react-leaflet";

// boundary for no-location warning
const bounds: LatLngTuple[] = [
  [22.755920681486405, 115.521484375],
  [0.4061088354351594, 90.58203125000001],
];

export default function Map({
  lnglat,
  zones,
  showZones = true,
  places,
}: {
  lnglat?: string | null;
  zones?: OutbreakZone[];
  showZones?: boolean;
  places?: OutbreakPlace[];
}) {
  // center map to Thailand
  let latitude: number = 15.87;
  let longitude: number = 100.9925;
  let isValidLocation = false;

  const location = lnglat?.split(",");
  if (location && location.length === 2) {
    try {
      latitude = parseFloat(location[1]);
      longitude = parseFloat(location[0]);
      isValidLocation = true;
    } catch (e) {
      console.log("invalid location", lnglat);
    }
  }

  const icon = L.divIcon({
    className: "my-div-icon",
    html: renderToStaticMarkup(<MarkerIcon />),
  });

  const Zones = () => {
    const map = useMap();
    const featureGroupRef = useRef(null);
    useEffect(() => {
      if (!map) return;
      if (featureGroupRef.current) {
        map.fitBounds((featureGroupRef.current as L.FeatureGroup).getBounds());
      }
    }, [map, featureGroupRef]);

    return (
      <FeatureGroup ref={featureGroupRef}>
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>
            Latitude: {latitude}, longitude: {longitude}
          </Popup>
        </Marker>
        {showZones &&
          zones &&
          zones.map((zone, idx) => {
            return (
              <Circle
                key={idx + zone.color}
                center={{ lat: latitude, lng: longitude }}
                fillColor={zone.color}
                fillOpacity={0.1}
                color={zone.color}
                radius={zone.radius}
              />
            );
          })}
        {showZones &&
          places &&
          places.map((place, idx) => {
            const lat = place.place?.latitude;
            const lng = place.place?.longitude;

            const icon2 = L.divIcon({
              className: "my-div-icon2",
              html: renderToStaticMarkup(
                <MarkerIcon color={place.color} key={idx} />
              ),
            });

            return (
              lat &&
              lng && (
                <Marker
                  key={(place.zone || 0) + idx}
                  position={[lat, lng]}
                  icon={icon2}
                >
                  <Popup>
                    <p>Name: {place.place?.name}</p>
                    <p>
                      Latitude: {lat}, longitude: {lng}
                    </p>
                  </Popup>
                </Marker>
              )
            );
          })}
      </FeatureGroup>
    );
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={isValidLocation ? 13 : 3}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {isValidLocation ? (
        <Zones />
      ) : (
        <SVGOverlay attributes={{ stroke: "red" }} bounds={bounds}>
          <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
          <text x="10%" y="50%" stroke="blue" fontSize={12}>
            ยังไม่มีการระบุตำแหน่ง
          </text>
        </SVGOverlay>
      )}
    </MapContainer>
  );
}
const MarkerIcon = ({ color }: { color?: string }) => {
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
          style={{ fill: color || "#ff0000" }}
        >
          <path d="M3370 12794 c-19 -2 -87 -9 -150 -15 -1051 -99 -2031 -694 -2627 -1594 -459 -693 -674 -1584 -563 -2330 180 -1204 1094 -3603 2643 -6935 330 -710 906 -1910 917 -1910 11 0 587 1200 917 1910 1318 2835 2200 5054 2523 6350 155 621 182 978 110 1470 -122 834 -546 1611 -1185 2169 -554 484 -1211 776 -1950 867 -122 15 -556 27 -635 18z m560 -2027 c631 -150 1080 -605 1222 -1239 20 -90 23 -130 23 -313 0 -164 -4 -230 -18 -300 -132 -647 -615 -1132 -1265 -1267 -155 -32 -449 -32 -604 0 -650 135 -1133 620 -1265 1267 -28 138 -25 473 5 611 30 139 64 239 127 371 214 450 623 771 1111 872 143 30 141 30 359 26 171 -3 215 -7 305 -28z" />
        </g>
      </svg>
    </div>
  );
};
