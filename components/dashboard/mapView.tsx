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

type MapViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const MapView: React.FC<MapViewProps> = ({ authorityId, filter }) => {
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
        <div className="flex pt-2 pb-4">
          <div className="rounded-lg border border-gray-200 shadow-md  w-full">
            <MapContainer
              zoom={12}
              scrollWheelZoom={false}
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
                    <Popup>{item.data || "No data reported"}</Popup>
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
