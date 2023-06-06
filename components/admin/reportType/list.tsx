import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportTypeListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton, UploadButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { ReportType } from "lib/services/reportType";
import TotalItem from "components/widgets/table/totalItem";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useTranslation } from "react-i18next";
import FormSimulationDialog from "components/admin/reportType/formSimulationDialog";
import FormSimulation from "components/admin/formBuilder/simulator/formSimulation";
import {
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  QrcodeIcon,
  TableIcon,
} from "@heroicons/react/solid";
import QrcodeDialog from "components/admin/reportType/qrcodeDialog";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: query.q as string,
    offset: query.offset ? parseInt(query.offset as string) : 0,
  };
};

const ReportTypeList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { reportTypeService, reportCategoryService, stateDefinitionService } =
    useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<AdminReportTypeListViewModel>(() => {
    const model = new AdminReportTypeListViewModel(
      reportTypeService,
      reportCategoryService,
      stateDefinitionService
    );
    model.registerDialog("confirmDelete");
    model.registerDialog("confirmPublishReportType");
    model.registerDialog("confirmUnpublishReportType");
    model.registerDialog("formSimulation");
    model.registerDialog("definitionQrcode");
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

  if (viewModel === null) {
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
            <Link href={"/admin/report_types/create"} passHref>
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
                      await viewModel.importReportType(event.target.files[0])
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
                get: record => record.id,
              },
              {
                label: t("form.label.name", "Name"),
                get: record => record.name,
              },
              {
                label: t("form.label.category", "Category"),
                get: record => record.categoryName,
              },
              {
                label: t("form.label.ordering", "Ordering"),
                get: record => record.ordering.toString(),
              },
            ]}
            onLoading={viewModel.isLoading}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/report_types/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/report_types/${record.id}/view`)
            }
            onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
            actions={record => {
              return (
                <>
                  <QrcodeIcon
                    onClick={() => {
                      viewModel.dialog("definitionQrcode")?.open({ record });
                    }}
                    className={`cursor-pointer w-5 h-5 hover:text-slate-600 `}
                  />
                  <TableIcon
                    className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => {
                      viewModel.openFormSimulationDialog(record.definition);
                    }}
                  />
                  <DownloadIcon
                    className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => viewModel.exportReportType(record.id)}
                  />

                  {!record.published && (
                    <EyeOffIcon
                      className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                      onClick={() =>
                        viewModel
                          .dialog("confirmPublishReportType")
                          ?.open(record)
                      }
                    />
                  )}
                  {record.published && (
                    <EyeIcon
                      className="w-5 h-5 text-green-600 hover:text-green-900 cursor-pointer"
                      onClick={() =>
                        viewModel
                          .dialog("confirmUnpublishReportType")
                          ?.open(record)
                      }
                    />
                  )}
                </>
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
            onYes={(record: ReportType) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />

          <ConfirmDialog
            store={viewModel.dialog("confirmPublishReportType")}
            content={t(
              "dialog.content.confirmPublishReportType",
              "Are you sure?"
            )}
            onYes={(record: ReportType) =>
              viewModel.publishReportType(record.id)
            }
            onNo={() => viewModel.dialog("confirmPublishReportType")?.close()}
          />

          <ConfirmDialog
            store={viewModel.dialog("confirmUnpublishReportType")}
            content={t(
              "dialog.content.confirmUnpublishReportType",
              "Are you sure?"
            )}
            onYes={(record: ReportType) =>
              viewModel.unpublishReportType(record.id)
            }
            onNo={() => viewModel.dialog("confirmUnpublishReportType")?.close()}
          />

          <FormSimulationDialog viewModel={viewModel.dialog("formSimulation")}>
            <FormSimulation viewModel={viewModel.formSimulationViewModel} />
          </FormSimulationDialog>

          <QrcodeDialog
            store={viewModel.dialog("definitionQrcode")}
            title={t("qr.reportTypeFormDefinition", "Form Definition QR code")}
            content={data => (
              <p className="py-5">
                {data && data.record ? (data.record as ReportType).name : ""}
              </p>
            )}
          />
        </div>
      )}
    </Observer>
  );
};

export default ReportTypeList;
