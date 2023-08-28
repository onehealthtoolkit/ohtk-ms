import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapViewModel } from "./mapViewModel";
import { renderToStaticMarkup } from "react-dom/server";

import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import turfBbox from "@turf/bbox";
import { points as turfPoints } from "@turf/helpers";
import { EventItemType } from "lib/services/dashboard/event";
import { DashBoardFilterData } from "./dashboardViewModel";
import { MarkerPopup } from "components/map/markerIcon";
import { useRouter } from "next/router";
import { MapPin } from "components/widgets/mapPin";

type MapViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const MapView: React.FC<MapViewProps> = ({ authorityId, filter }) => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new MapViewModel(services.dashboardService)
  );
  useEffect(() => {
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  // Default bounds to Chiang Mai, Thailand
  let bounds: LatLngTuple[] = [
    [18.781395, 98.978405],
    [18.796143, 98.992696],
  ];

  const points: LatLngTuple[] = viewModel.data.map(it => [
    it.location.lng,
    it.location.lat,
  ]);
  const collection = turfPoints(points);

  if (collection.features.length > 0) {
    const bboxArray = turfBbox(collection);
    const corner1 = [bboxArray[1], bboxArray[0]] as LatLngTuple;
    const corner2 = [bboxArray[3], bboxArray[2]] as LatLngTuple;
    bounds = [corner1, corner2];
  }

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <div className="flex">
          <div className="rounded-lg border border-gray-200 shadow-md  w-full">
            <MapContainer
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: 300, width: "100%" }}
              bounds={bounds}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {viewModel.data.map((item, index) => {
                const icon = L.divIcon({
                  className: "my-div-icon",
                  html: renderToStaticMarkup(
                    MarkerIcon({
                      categoryIcon: item.categoryIcon,
                      type: item.type,
                    })
                  ),
                });

                return (
                  <Marker
                    key={item.type + "_" + index + "_" + item.id}
                    position={[item.location.lat, item.location.lng]}
                    icon={icon}
                  >
                    <Popup>
                      <MarkerPopup
                        event={item}
                        onPopupClick={(id, type) =>
                          router.push(
                            `${type == "report" ? "reports" : "cases"}/${id}`
                          )
                        }
                      />
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(MapView);

type MarkerIconProps = { categoryIcon?: string | null; type: EventItemType };

const MarkerIcon = ({ categoryIcon, type }: MarkerIconProps) => {
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
