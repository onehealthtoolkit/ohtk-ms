import ErrorDisplay from "components/widgets/errorDisplay";
import Table from "components/widgets/table";
import Paginate from "components/widgets/table/paginate";
import TotalItem from "components/widgets/table/totalItem";
import AuthroitySelect from "components/widgets/authoritySelect";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import {
  CensusCoverageStatus,
  CensusRoundCoverageRow,
  CensusRoundMode,
} from "lib/services/census";
import { currentExcelEndpoint } from "components/excel/filter";
import { observer } from "mobx-react";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18n";
import {
  AnimalCensusCoverageViewModel,
  CensusCoverageFilter,
} from "./viewViewModel";

const statusOptions: { value: CensusCoverageFilter; label: string }[] = [
  { value: "MISSING", label: "Missing villages" },
  { value: "SUBMITTED_ON_TIME", label: "Submitted villages" },
  { value: "SUBMITTED_LATE", label: "Late submissions" },
  { value: "ALL", label: "All target villages" },
];

const modeOptions: { value: CensusRoundMode; label: string }[] = [
  { value: "PRODUCTION", label: "Production" },
  { value: "TRAINING", label: "Training" },
];

const formatQuantity = (value?: number | null) =>
  typeof value === "number" ? value.toString() : "-";

const formatDate = (value?: string) => value || "-";

const formatStatus = (status: CensusCoverageStatus) => {
  if (status === "SUBMITTED_ON_TIME") {
    return "Submitted";
  }
  if (status === "SUBMITTED_LATE") {
    return "Late";
  }
  return "Missing";
};

const AnimalCensusCoverageView = () => {
  const { t } = useTranslation();
  const store = useStore();
  const services = useServices();
  const [viewModel] = useState(
    () => new AnimalCensusCoverageViewModel(services.censusRoundService)
  );

  const exportUrl = (() => {
    let base = `${currentExcelEndpoint()}/excels/census_round`;
    if (i18n.language === "la") {
      base = `${currentExcelEndpoint()}/la/excels/census_round`;
    }
    const params = new URLSearchParams();
    if (viewModel.selectedOccurrenceId) {
      params.set("occurrenceId", viewModel.selectedOccurrenceId);
    }
    if (viewModel.authorityId) {
      params.set("authorityId", String(viewModel.authorityId));
    }
    return `${base}?${params.toString()}`;
  })();

  return (
    <div>
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <div className="rounded border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase text-gray-500">
            {t("censusCoverage.submitted", "Submitted")}
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {viewModel.coverage.submittedCount}
          </div>
        </div>
        <div className="rounded border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase text-gray-500">
            {t("censusCoverage.missing", "Missing")}
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {viewModel.coverage.missingCount}
          </div>
        </div>
        <div className="rounded border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase text-gray-500">
            {t("censusCoverage.late", "Late")}
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {viewModel.coverage.lateCount}
          </div>
        </div>
        <div className="rounded border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase text-gray-500">
            {t("censusCoverage.rows", "Rows")}
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {viewModel.coverage.totalCount}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("censusCoverage.mode", "Mode")}
          </label>
          <select
            value={viewModel.mode}
            onChange={event =>
              viewModel.setMode(event.target.value as CensusRoundMode)
            }
            className="min-w-[150px] rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {modeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {t(`censusCoverage.mode.${option.value}`, option.label)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("censusCoverage.occurrence", "Round")}
          </label>
          <select
            value={viewModel.selectedOccurrenceId}
            onChange={event => viewModel.setOccurrence(event.target.value)}
            className="min-w-[220px] rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {viewModel.occurrences.map(occurrence => (
              <option key={occurrence.id} value={occurrence.id}>
                {occurrence.occurrenceKey}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("form.label.status", "Status")}
          </label>
          <select
            value={viewModel.status}
            onChange={event =>
              viewModel.setStatus(event.target.value as CensusCoverageFilter)
            }
            className="min-w-[190px] rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {t(`censusCoverage.${option.value}`, option.label)}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[220px]">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("form.label.authority", "Authority")}
          </label>
          <AuthroitySelect
            roleRequired={!store.isSuperUser}
            isClearable
            value={viewModel.authorityId ?? undefined}
            onChange={value => {
              const id = parseInt(String(value.id), 10);
              viewModel.setAuthorityId(
                !Number.isNaN(id) ? id : null
              );
            }}
            onClear={() => viewModel.setAuthorityId(null)}
          />
          <p className="mt-1 text-xs text-gray-500">
            {t(
              "censusCoverage.authorityHelp",
              "Optional. Leave empty for your full authority hierarchy. Villages outside your inherits permission are never shown."
            )}
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("form.label.search", "Search")}
          </label>
          <input
            value={viewModel.q}
            onChange={event => viewModel.setSearch(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter") {
                viewModel.setOffset(0);
              }
            }}
            className="min-w-[220px] rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => viewModel.setOffset(0)}
          className="rounded border border-blue-300 bg-[#4C81F1] px-4 py-2 text-sm text-white hover:border-blue-500"
        >
          {t("form.button.refresh", "Refresh")}
        </button>
        <a
          href={
            viewModel.selectedOccurrenceId ? exportUrl : undefined
          }
          className={`inline-flex h-10 items-center rounded border border-blue-300 bg-[#4C81F1] px-4 text-sm text-white hover:border-blue-500 ${
            !viewModel.selectedOccurrenceId
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          {t("form.button.downloadExcel", "Download Excel")}
        </a>
        <TotalItem
          totalCount={viewModel.coverage.totalCount}
          onRefresh={() => viewModel.fetchCoverage()}
        />
      </div>

      <ErrorDisplay message={viewModel.errorMessage} />

      <Table
        columns={[
          {
            label: t("form.label.authority", "Authority"),
            get: record => record.authorityName ?? "-",
          },
          {
            label: t("form.label.code", "Code"),
            get: record => record.villageCode,
          },
          {
            label: t("form.label.name", "Name"),
            get: record => record.villageName,
          },
          {
            label: t("form.label.status", "Status"),
            get: record => formatStatus(record.status),
          },
          {
            label: t("form.label.censusDate", "Census date"),
            get: record => formatDate(record.censusDate),
          },
          {
            label: t("form.label.submittedAt", "Submitted at"),
            get: record => formatDate(record.submittedAt),
          },
          {
            label: t(
              "form.label.villageHouseholdQuantity",
              "Village households"
            ),
            get: record => formatQuantity(record.villageHouseholdQuantity),
          },
          {
            label: t(
              "form.label.animalHouseholdQuantity",
              "Households with animals"
            ),
            get: record => formatQuantity(record.animalHouseholdQuantity),
          },
          {
            label: t("form.label.animals", "Animals"),
            get: record => formatQuantity(record.totalAnimalQuantity),
          },
        ]}
        data={viewModel.rows}
        onLoading={viewModel.isLoading}
        onView={row => viewModel.selectRow(row)}
        viewOnRowClick={false}
      />
      <Paginate
        limit={viewModel.limit}
        offset={viewModel.offset}
        totalCount={viewModel.coverage.totalCount}
        onChange={value => viewModel.setOffset(value)}
      />

      {viewModel.selectedRow && (
        <CoverageDetailDrawer
          row={viewModel.selectedRow}
          onClose={() => viewModel.closeDetail()}
        />
      )}
    </div>
  );
};

const CoverageDetailDrawer = ({
  row,
  onClose,
}: {
  row: CensusRoundCoverageRow;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20">
      <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {row.villageName}
            </div>
            <div className="text-sm text-gray-500">{row.villageCode}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-3 py-1 text-sm"
          >
            {t("form.button.close", "Close")}
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <DetailValue label={t("form.label.status", "Status")}>
            {formatStatus(row.status)}
          </DetailValue>
          <DetailValue label={t("censusCoverage.occurrence", "Round")}>
            {row.occurrence.occurrenceKey}
          </DetailValue>
          <DetailValue label={t("form.label.censusDate", "Census date")}>
            {formatDate(row.censusDate)}
          </DetailValue>
          <DetailValue label={t("form.label.submittedAt", "Submitted at")}>
            {formatDate(row.submittedAt)}
          </DetailValue>
          <DetailValue
            label={t(
              "form.label.villageHouseholdQuantity",
              "Village households"
            )}
          >
            {formatQuantity(row.villageHouseholdQuantity)}
          </DetailValue>
          <DetailValue
            label={t(
              "form.label.animalHouseholdQuantity",
              "Households with animals"
            )}
          >
            {formatQuantity(row.animalHouseholdQuantity)}
          </DetailValue>
          <DetailValue label={t("form.label.reporter", "Reporter")}>
            {row.reporterUsername ?? "-"}
          </DetailValue>
          <DetailValue label={t("form.label.animals", "Animals")}>
            {formatQuantity(row.totalAnimalQuantity)}
          </DetailValue>
        </div>

        <Table
          contained
          columns={[
            {
              label: t("form.label.species", "Species (heads)"),
              get: record => record.rowLabel,
            },
            {
              label: t("form.label.animals", "Animals"),
              get: record => record.animalQuantity.toString(),
            },
          ]}
          data={row.speciesSummary
            // Backend species_summary already skips group HH rows; filter as safety.
            .filter(item => !item.rowKey.startsWith("group:"))
            .map(item => ({
              id: item.rowKey,
              ...item,
            }))}
          viewOnRowClick={false}
        />
      </div>
    </div>
  );
};

const DetailValue = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded border border-gray-200 p-3">
    <div className="text-xs uppercase text-gray-500">{label}</div>
    <div className="mt-1 text-gray-900">{children}</div>
  </div>
);

export default observer(AnimalCensusCoverageView);
