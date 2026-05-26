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
import { AnimalSpeciesListViewModel } from "./listViewModel";
import AnimalSpeciesMobileImpactNotice, {
  AnimalSpeciesSavedNotice,
} from "./mobileImpactNotice";

const parseUrlParams = (query: ParsedUrlQuery) => ({
  q: query.q as string,
  offset: query.offset ? parseInt(query.offset as string) : 0,
});

const AnimalSpeciesList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { animalSpeciesService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();
  const showSavedNotice = query.speciesSaved === "1";
  const [viewModel] = useState(
    () => new AnimalSpeciesListViewModel(animalSpeciesService)
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
          <AnimalSpeciesMobileImpactNotice />
          {showSavedNotice && <AnimalSpeciesSavedNotice />}
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
            <Link href="/admin/animal_species/create" passHref>
              <AddButton />
            </Link>
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
                label: t("form.label.sortOrder", "Sort Order"),
                get: record => record.sortOrder.toString(),
              },
              {
                label: t("form.label.active", "Active"),
                get: record => (record.active ? "Yes" : "No"),
              },
            ]}
            onLoading={viewModel.isLoading}
            data={viewModel.data || []}
            onEdit={record =>
              router.push(`/admin/animal_species/${record.id}/update`)
            }
            viewOnRowClick={false}
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

export default AnimalSpeciesList;
