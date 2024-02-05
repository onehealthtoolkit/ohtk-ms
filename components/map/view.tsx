import MapViewViewModel from "components/map/viewViewModel";
import Filter from "components/widgets/filter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { isoStringToDate } from "lib/utils";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import MapViewFilter from "./filter";
import { useTranslation } from "react-i18next";

const JSURL = require("jsurl");

export const Map = dynamic(() => import("./map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export const LiveMap = dynamic(() => import("./liveMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

type MapSwitchProps = {
  active: boolean;
  onChange: (active: boolean) => void;
};

const MapSwitch = ({ active, onChange }: MapSwitchProps) => {
  const { t } = useTranslation();
  return (
    <label
      htmlFor="live-toggle"
      className="inline-flex relative items-center cursor-pointer bg-white rounded-md h-10 px-3"
    >
      <input
        type="checkbox"
        value=""
        id="live-toggle"
        className="sr-only peer"
        checked={active}
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
        peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
        peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] 
        after:left-[14px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
        "
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900">
        {t("filter.liveView", "Live View")}
      </span>
    </label>
  );
};

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    authorityId: query.authorityId,
    authorityName: query.authorityName,
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    toDate: query.toDate ? isoStringToDate(query.toDate as string) : undefined,
    reportTypes: query.reportTypes ? JSURL.parse(query.reportTypes) : [],
    isLive: query.isLive ? parseInt(query.isLive as string) === 1 : false,
    includeBoundaryConnects: query.includeBoundaryConnects
      ? parseInt(query.includeBoundaryConnects as string) === 1
      : undefined,
  };
};

const MapView: React.FC = () => {
  const { setUrl, query, resetUrl } = useUrlParams();
  const router = useRouter();
  const store = useStore();
  const { reportService } = useServices();

  const [viewModel] = useState<MapViewViewModel>(() => {
    const mapViewViewModel = new MapViewViewModel(reportService);
    return mapViewViewModel;
  });

  useEffect(() => {
    if (router.isReady) {
      const filter = parseUrlParams(query);
      if (!filter.authorityId) {
        filter.authorityId = store.me!.authorityId.toString();
        filter.authorityName = store.me!.authorityName;
      }
      viewModel.setSearchValue(
        filter.isLive,
        parseInt(filter.authorityId as string),
        filter.authorityName as string,
        filter.fromDate,
        filter.toDate,
        filter.reportTypes,
        filter.includeBoundaryConnects
      );
    }
  }, [viewModel, store.me, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      authorityId: viewModel.authorityId,
      authorityName: viewModel.authorityName,
      fromDate: viewModel.fromDate?.toISOString(),
      toDate: viewModel.toDate?.toISOString(),
      reportTypes: JSURL.stringify(viewModel.reportTypes),
      isLive: viewModel.isLive ? 1 : 0,
      includeBoundaryConnects: viewModel.includeBoundaryConnects ? 1 : 0,
    });
  };

  return (
    <div className="relative w-full h-[80vh]">
      {viewModel.isLive ? (
        <LiveMap
          data={toJS(viewModel.data)}
          authorityId={store.me?.authorityId}
        />
      ) : (
        <Map
          data={toJS(viewModel.data)}
          boundaryConnect={toJS(viewModel.boundaryConnectData)}
        />
      )}
      <div className="absolute top-8 right-14 z-[1001] flex flex-row gap-2">
        <MapSwitch
          active={viewModel.isLive}
          onChange={() => {
            viewModel.toggleLiveView();
            applySearch();
          }}
        />
        {!viewModel.isLive && (
          <Filter
            onSearch={applySearch}
            onReset={() => {
              runInAction(() => {
                viewModel.periodText = "";
                resetUrl();
              });
            }}
            popPositionClass="right-0"
          >
            <MapViewFilter viewModel={viewModel} />
          </Filter>
        )}
      </div>
    </div>
  );
};

export default observer(MapView);
