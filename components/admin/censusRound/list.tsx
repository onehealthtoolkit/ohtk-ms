import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import { CensusRoundListViewModel } from "./listViewModel";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import {
  CensusRoundDefinition,
  CensusRoundMode,
} from "lib/services/census";
import TotalItem from "components/widgets/table/totalItem";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "react-i18next";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: (query.q as string) || "",
    offset: query.offset ? parseInt(query.offset as string) : 0,
    mode: (query.mode as CensusRoundMode | "ALL") || "ALL",
  };
};

const CensusRoundList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { censusRoundService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<CensusRoundListViewModel>(() => {
    const model = new CensusRoundListViewModel(censusRoundService);
    model.registerDialog("confirmDisable");
    return model;
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const filter = parseUrlParams(query);
    viewModel.codeSearch = filter.q;
    viewModel.offset = filter.offset;
    viewModel.modeFilter = filter.mode;
    viewModel.fetch();
  }, [query, viewModel, router.isReady]);

  const applySearch = ({
    q,
    offset,
    mode,
  }: {
    q?: string;
    offset?: number;
    mode?: CensusRoundMode | "ALL";
  }) => {
    const filter = parseUrlParams(query);
    if (q !== undefined) {
      filter.q = q;
    }
    if (Number.isInteger(offset)) {
      filter.offset = offset!;
    }
    if (mode !== undefined) {
      filter.mode = mode;
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
              onRefresh={() => viewModel.fetch()}
            />
            <Filter
              codeSearch={viewModel.codeSearch}
              modeFilter={viewModel.modeFilter}
              onChange={({ q, mode }) => {
                if (q === "" && mode === "ALL") {
                  resetUrl();
                } else {
                  applySearch({ q, mode, offset: 0 });
                }
              }}
            />
            <div className="flex-grow md:flex-none"></div>
            <Link href={"/admin/census_rounds/create"} passHref>
              <AddButton />
            </Link>
          </div>

          <Table
            columns={[
              {
                label: t("form.label.id", "Id"),
                get: record => record.id,
              },
              {
                label: t("form.label.code", "Code"),
                get: record => record.code,
              },
              {
                label: t("form.label.name", "Name"),
                get: record => record.name,
              },
              {
                label: t("form.label.mode", "Mode"),
                get: record => record.mode,
              },
              {
                label: t("form.label.submissionWindow", "Submission window"),
                get: record =>
                  `${record.startDate} → ${record.hardFinishDate}`,
              },
              {
                label: t("form.label.censusPeriod", "Census period"),
                get: record =>
                  `${record.censusPeriodStart} → ${record.censusPeriodEnd}`,
              },
              {
                label: t("form.label.enabled", "Enabled"),
                get: record =>
                  record.enabled
                    ? t("form.label.yes", "Yes")
                    : t("form.label.no", "No"),
              },
            ]}
            onLoading={viewModel.isLoading}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/census_rounds/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/census_rounds/${record.id}/view`)
            }
            onDelete={record =>
              record.enabled
                ? viewModel.dialog("confirmDisable")?.open(record)
                : undefined
            }
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
            store={viewModel.dialog("confirmDisable")}
            content={t(
              "dialog.content.confirmDisableCensusRound",
              "Disable this census round definition? Yearly occurrences will stop being used for new production materialization."
            )}
            onYes={(record: CensusRoundDefinition) =>
              viewModel.disable(record)
            }
            onNo={() => viewModel.dialog("confirmDisable")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default CensusRoundList;
