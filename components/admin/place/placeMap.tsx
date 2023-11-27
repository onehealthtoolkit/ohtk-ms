import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { observer } from "mobx-react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { useMemo, useRef } from "react";
import { MapPin } from "components/widgets/mapPin";

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
      <MapPin color="fill-red-400" />
    </div>
  );
};
