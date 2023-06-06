import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton, UploadButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";

import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { OutbreakPlan } from "lib/services/outbreakPlan";
import { OutbreakPlanListViewModel } from "./listViewModel";
import TotalItem from "components/widgets/table/totalItem";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "@heroicons/react/solid";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: query.q as string,
    offset: query.offset ? parseInt(query.offset as string) : 0,
  };
};

const OutbreakPlanList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { outbreakPlanService, reportTypeService, stateStepService } =
    useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<OutbreakPlanListViewModel>(() => {
    const model = new OutbreakPlanListViewModel(
      outbreakPlanService,
      reportTypeService,
      stateStepService
    );
    model.registerDialog("confirmDelete");
    return model;
  });

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
            <Link href={"/admin/outbreak_plans/create"} passHref>
              <AddButton />
            </Link>
            <div className="relative cursor-pointer inline-block overflow-visible">
              <UploadButton isSubmitting={viewModel.isSubmitting} />
              <input
                type="file"
                name="file"
                className="absolute top-0 right-0 opacity-0 cursor-pointer h-full block"
                onChange={async event => {
                  if (event.target.files && event.target.files[0]) {
                    if (
                      await viewModel.importOutbreakPlan(event.target.files[0])
                    ) {
                      viewModel.fetch();
                    }
                    event.target.value = "";
                  }
                }}
              />
            </div>
          </div>
          <ErrorDisplay message={viewModel?.submitError} />
          <Table
            columns={[
              {
                label: t("form.label.id", "Id"),
                get: record => record.id.toString(),
              },
              {
                label: t("form.label.name", "Name"),
                get: record => record.name,
              },
              {
                label: t("form.label.description", "Description"),
                get: record => record.description,
              },
              {
                label: t("form.label.reportType", {
                  defaultValue: "Report Type",
                }),
                get: record => record.reportTypeName,
              },
            ]}
            onLoading={viewModel.isLoading}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/outbreak_plans/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/outbreak_plans/${record.id}/view`)
            }
            onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
            actions={record => {
              return (
                <DownloadIcon
                  className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => viewModel.exportOutbreakPlan(+record.id)}
                />
              );
            }}
          />
          <ErrorDisplay message={viewModel?.errorMessage} />
          <Paginate
            offset={viewModel.offset}
            limit={viewModel.limit}
            totalCount={viewModel.totalCount}
            onChange={value => {
              applySearch({ offset: value });
            }}
          />

          <ConfirmDialog
            store={viewModel.dialog("confirmDelete")}
            content={t("dialog.content.confirmDelete", "Are you sure?")}
            onYes={(record: OutbreakPlan) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default OutbreakPlanList;
