import { LocationMarkerIcon } from "@heroicons/react/solid";
import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import LocationField from "lib/opsvForm/models/fields/locationField";
import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "components/widgets/mapPin";

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <MapPin color="fill-red-400" />
    </div>
  );
};
