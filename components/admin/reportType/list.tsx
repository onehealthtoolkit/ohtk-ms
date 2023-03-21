import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportTypeListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
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
  QrcodeIcon,
  TableIcon,
  UploadIcon,
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

  const UploadButton = forwardRef(function UploadButton(
    props: React.ComponentPropsWithoutRef<"button">,
    ref: React.Ref<HTMLButtonElement>
  ) {
    const { t } = useTranslation();

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className="
        px-4
        py-2
        text-black
        bg-slate-50
        hover:border-gray-800
        hover:bg-gray-100
        border-slate-700
        rounded
        items-center
        inline-flex
        justify-center
        border
        "
      >
        {viewModel.isSubmitting === true && <Spinner />}
        <UploadIcon className="h-5 w-5 text-gray-500 mr-2" />
        <span>{t("form.button.import", "Import")}</span>
      </button>
    );
  });

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
            <div className="relative cursor-pointer inline-block overflow-hidden">
              <UploadButton disabled={viewModel.isSubmitting} />
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
                    <button
                      title="publish"
                      type="button"
                      onClick={() =>
                        viewModel
                          .dialog("confirmPublishReportType")
                          ?.open(record)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <path d="M9.125 16.312v-7.02l-2.146 2.146-1.208-1.209L10 6l4.229 4.229-1.208 1.209-2.146-2.146v7.02ZM3.667 6.062V4.271q0-.729.51-1.229.511-.5 1.219-.5h9.208q.708 0 1.208.5t.5 1.229v1.791h-1.729V4.271H5.396v1.791Z" />
                      </svg>
                    </button>
                  )}
                  {record.published && (
                    <button
                      title="unpublish"
                      type="button"
                      onClick={() =>
                        viewModel
                          .dialog("confirmUnpublishReportType")
                          ?.open(record)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <path d="m16.083 18.229-1.479-1.479q-1.042.688-2.208 1.052-1.167.365-2.396.365-1.688 0-3.177-.636-1.49-.635-2.604-1.75-1.115-1.114-1.75-2.604-.636-1.489-.636-3.177 0-1.229.365-2.396.364-1.166 1.052-2.208L1.854 4l1.104-1.104 14.23 14.229ZM10 16.438q.896 0 1.74-.261.843-.26 1.614-.677l-3.416-3.417-1.021 1.021-2.896-2.916 1.125-1.126 1.708 1.709-.104.104L4.5 6.646q-.417.771-.677 1.614-.261.844-.261 1.74 0 2.688 1.886 4.562Q7.333 16.438 10 16.438Zm6.812-1.917-1.27-1.25q.416-.771.656-1.583.24-.813.24-1.688 0-2.688-1.886-4.562Q12.667 3.562 10 3.562q-.875 0-1.688.24-.812.24-1.583.656l-1.25-1.27q1-.667 2.156-1.011Q8.792 1.833 10 1.833q1.688 0 3.177.636 1.49.635 2.604 1.75 1.115 1.114 1.75 2.604.636 1.489.636 3.177 0 1.208-.344 2.365-.344 1.156-1.011 2.156Zm-4.666-4.646-1.167-1.208 1.771-1.792 1.208 1.187Zm-1.084-1.104Zm-2.333 2.5Z" />
                      </svg>{" "}
                    </button>
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
            title={t("dialog.title.confirmDelete", "Confirm delete")}
            content={t("dialog.content.confirmDelete", "Are you sure?")}
            onYes={(record: ReportType) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />

          <ConfirmDialog
            store={viewModel.dialog("confirmPublishReportType")}
            title={t(
              "dialog.title.confirmPublishReportType",
              "Confirm publish report type"
            )}
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
            title={t(
              "dialog.title.confirmUnpublishReportType",
              "Confirm unpublish report type"
            )}
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
