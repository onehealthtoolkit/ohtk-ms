import MapViewViewModel from "components/map/viewViewModel";
import Filter from "components/widgets/filter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { isoStringToDate } from "lib/utils";
import { Observer, observer } from "mobx-react";
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

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    authorityId: query.authorityId,
    authorityName: query.authorityName,
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    toDate: query.toDate ? isoStringToDate(query.toDate as string) : undefined,
    reportTypes: query.reportTypes ? JSURL.parse(query.reportTypes) : [],
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
    });
  };

  return (
    <Observer>
      {() => (
        <div className="relative w-full h-screen">
          <Map isLoading={viewModel.isLoading} data={viewModel.data} />
          <div className="absolute top-8 right-10 z-[1001]">
            <Filter
              onSearch={applySearch}
              onReset={() => {
                resetUrl();
              }}
              popPositionClass="right-0"
            >
              <MapViewFilter viewModel={viewModel} />
            </Filter>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default observer(MapView);
