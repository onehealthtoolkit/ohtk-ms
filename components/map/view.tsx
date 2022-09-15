import MapViewViewModel from "components/map/viewViewModel";
import Filter from "components/widgets/filter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { isoStringToDate } from "lib/utils";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import MapViewFilter from "./filter";

const JSURL = require("jsurl");

export const Map = dynamic(() => import("./map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export const LiveMap = dynamic(() => import("./liveMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

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
  };
};

const MapView: React.FC = () => {
  const { setUrl, query, resetUrl } = useUrlParams();
  const router = useRouter();
  const store = useStore();
  const { dashboardService } = useServices();

  const [viewModel] = useState<MapViewViewModel>(() => {
    const mapViewViewModel = new MapViewViewModel(dashboardService);
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
        filter.reportTypes
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
        <Map data={toJS(viewModel.data)} />
      )}
      <div className="absolute top-8 right-10 z-[1001] flex flex-row">
        <label
          htmlFor="live-toggle"
          className="inline-flex relative items-center cursor-pointer bg-white rounded-md h-10"
        >
          <input
            type="checkbox"
            value=""
            id="live-toggle"
            className="sr-only peer"
            checked={viewModel.isLive}
            onChange={() => {
              viewModel.toggleLiveView();
              applySearch();
            }}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] 
            after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
            "
          ></div>
          <span className="mx-2 text-sm font-medium text-gray-900">
            Live View
          </span>
        </label>
        {!viewModel.isLive && (
          <Filter
            onSearch={applySearch}
            onReset={() => {
              resetUrl();
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
