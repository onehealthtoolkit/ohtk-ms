import ErrorDisplay from "components/widgets/errorDisplay";
import { AddButton } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import Paginate from "components/widgets/table/paginate";
import TotalItem from "components/widgets/table/totalItem";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import { Observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Filter from "./filter";
import { VillageListViewModel } from "./listViewModel";
import useStore from "lib/store";

const parseUrlParams = (query: ParsedUrlQuery) => ({
  q: query.q as string,
  offset: query.offset ? parseInt(query.offset as string) : 0,
});

const VillageList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const { villageService, censusCapabilityService } = services;
  const store = useStore();
  const { setUrl, query, resetUrl } = useUrlParams();
  const [viewModel] = useState(
    () => new VillageListViewModel(villageService, censusCapabilityService)
  );

  useEffect(() => {
    if (router.isReady) {
      const filter = parseUrlParams(query);
      viewModel.setSearchValue(filter.q, filter.offset);
    }
  }, [query, viewModel, router.isReady]);

  const applySearch = ({ q, offset }: { q?: string; offset?: number }) => {
    const filter = parseUrlParams(query);
    if (q) {
      filter.q = q;
    }
    if (Number.isInteger(offset)) {
      filter.offset = offset!;
    }
    setUrl(filter);
  };

  if (!viewModel) {
    return <Spinner />;
  }

  return (
    <Observer>
      {() => (
        <div>
          {store.isSuperUser && store.isFeatureEnable("village") && (
            <div className="mb-4 border rounded bg-white px-4 py-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-800">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={viewModel.animalCensusEnabled}
                    disabled={
                      viewModel.isUpdatingCapability ||
                      !viewModel.villageEnabled
                    }
                    onChange={evt =>
                      viewModel.setAnimalCensusEnabled(evt.target.checked)
                    }
                  />
                  <span>
                    {t(
                      "form.label.animalCensusEnabled",
                      "Animal census enabled"
                    )}
                  </span>
                </label>
                {viewModel.isUpdatingCapability && <Spinner />}
                {viewModel.capabilityError && (
                  <span className="text-sm text-red-600">
                    {viewModel.capabilityError}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center flex-wrap mb-4 gap-2">
            <TotalItem
              totalCount={viewModel.totalCount}
              onRefresh={() => viewModel.fetch(true)}
            />
            <Filter
              nameSearch={viewModel.nameSearch}
              onChange={value => {
                if (value == "") {
                  resetUrl();
                } else {
                  applySearch({ q: value, offset: 0 });
                }
              }}
            />
            <div className="flex-grow md:flex-none"></div>
            {(store.isSuperUser || store.isRoleAdmin) && (
              <Link href="/admin/villages/create" passHref>
                <AddButton />
              </Link>
            )}
          </div>

          <Table
            columns={[
              {
                label: t("form.label.code", "Code"),
                get: record => record.code,
              },
              {
                label: t("form.label.name", "Name"),
                get: record => record.name,
              },
              {
                label: t("form.label.authority", "Authority"),
                get: record => record.authorityName,
              },
              {
                label: t("form.label.active", "Active"),
                get: record => (record.active ? "Yes" : "No"),
              },
            ]}
            onLoading={viewModel.isLoading}
            data={viewModel.data || []}
            onEdit={record =>
              router.push(`/admin/villages/${record.id}/update`)
            }
            onView={record => router.push(`/admin/villages/${record.id}/view`)}
          />
          <ErrorDisplay message={viewModel.errorMessage} />
          <Paginate
            offset={viewModel.offset}
            limit={viewModel.limit}
            totalCount={viewModel.totalCount}
            onChange={value => applySearch({ offset: value })}
          />
        </div>
      )}
    </Observer>
  );
};

export default VillageList;
