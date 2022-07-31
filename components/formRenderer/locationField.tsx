import { LocationMarkerIcon } from "@heroicons/react/solid";
import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import LocationField from "lib/opsvForm/models/fields/locationField";
import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";

export type FormLocationFieldProps = {
  field: LocationField;
};

const FormLocationField: FC<FormLocationFieldProps> = ({ field }) => {
  // Default bounds to Chiang Mai, Thailand
  let bbox: LatLngTuple[] = [
    [18.781395, 98.978405],
    [18.796143, 98.992696],
  ];

  const [bounds, setBounds] = useState(bbox);

  const onLocation = (point: LatLngTuple, bounds: LatLngTuple[]) => {
    field.value = `${point[1]},${point[0]}`;
    setBounds(bounds);
  };

  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <button
        type="button"
        className="flex justify-center items-center px-4 py-2 text-sm 
              text-black bg-gray-200 hover:bg-gray-300
              focus:z-10 focus:ring-2 focus:ring-gray-200 mt-4
            "
        onClick={() => {
          if (!field.value) {
            field.value = "0,0";
          }
        }}
      >
        <LocationMarkerIcon className="fill-gray-600 w-5 h-5 mr-2" />
        <span>Locate current position</span>
      </button>
      <MapContainer
        scrollWheelZoom={false}
        style={{ height: 300, width: "100%" }}
        bounds={bounds}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {field.value && <CurrentMarker onLocation={onLocation} field={field} />}
      </MapContainer>
    </FormFieldValidation>
  );
};

export default observer(FormLocationField);

export type CurrentMarkerProps = {
  field: LocationField;
  onLocation: (point: LatLngTuple, bounds: LatLngTuple[]) => void;
};

const CurrentMarker: FC<CurrentMarkerProps> = observer(
  ({ field, onLocation }) => {
    const map = useMap();
    let lat = 0,
      lng = 0;

    if (field.value) {
      const lnglat = field.value.split(",").map(p => parseFloat(p));
      [lat, lng] = [lnglat[1], lnglat[0]];
    }

    const icon = L.divIcon({
      html: renderToStaticMarkup(MarkerIcon()),
    });

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        console.log("located", e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);

        try {
          const bbox = e.bounds
            .toBBoxString()
            .split(",")
            .map(point => parseFloat(point));

          const bounds = [
            [bbox[1], bbox[0]],
            [bbox[3], bbox[2]],
          ] as LatLngTuple[];

          const point = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
          onLocation(point, bounds);
        } catch (e) {
          console.log("bounding box error", e);
        }
      });
    }, [map]);

    return (
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>You are here.</Popup>
      </Marker>
    );
  }
);

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
