import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import { ObservationEventItem } from "lib/services/observation/event";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { EventMarker, SetMapBounds } from "./markerIcon";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { DEFAULT_BOUNDS } from "components/map/markerIcon";
import Spinner from "components/widgets/spinner";

type MapViewProps = {
  data: Array<ObservationEventItem>;
};
const defaultCenter: LatLngTuple = [13.8297474, 100.564744];

const MapView: React.FC<MapViewProps> = ({ data }) => {
  const router = useRouter();
  const [bounds, setBounds] = useState<LatLngTuple[]>(DEFAULT_BOUNDS);
  const [center, setCenter] = useState<LatLngTuple>();

  useEffect(() => {
    const mark = () => {
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
    };
    if (navigator.geolocation && !center) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setBounds([
            [position.coords.latitude - 0.5, position.coords.longitude - 0.5],
            [position.coords.latitude, position.coords.longitude],
          ]);
          setTimeout(() => {
            mark();
          }, 100);
        },
        () => {
          setCenter(defaultCenter);
          mark();
        }
      );
    } else {
      setCenter(defaultCenter);
      mark();
    }
  }, [data, center]);

  if (!center) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="relative w-full h-[80vh]">
      <MapContainer
        zoom={12}
        scrollWheelZoom={true}
        center={center}
        style={{ height: "100%", width: "100%" }}
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
              key={`${item.id}`}
              onPopupClick={id =>
                router.push({
                  pathname: `/observations/${id}`,
                  query: {
                    definitionId: router.query.definitionId,
                    definitionName: router.query.definitionName as string,
                  },
                })
              }
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default memo(MapView);
