import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import { InvitaionCodeListViewModel } from "./listViewModel";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { InvitationCode } from "lib/services/invitationCode";
import { formatDate } from "lib/datetime";
import TotalItem from "components/widgets/table/totalItem";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "react-i18next";
import { getRoleName } from "../user/list";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: query.q as string,
    offset: query.offset ? parseInt(query.offset as string) : 0,
  };
};

const InvitaionCodeList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { invitationCodeService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<InvitaionCodeListViewModel>(() => {
    const model = new InvitaionCodeListViewModel(invitationCodeService);
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
              codeSearch={viewModel.codeSearch}
              onChange={value => {
                if (value == "") {
                  resetUrl();
                } else {
                  applySearch({ q: value, offset: 0 });
                }
              }}
            />

            <div className="flex-grow md:flex-none"></div>
            <Link href={"/admin/invitation_codes/create"} passHref>
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
                label: t("form.label.fromDate", "From Date"),
                get: record => formatDate(record.fromDate, router.locale),
              },
              {
                label: t("form.label.throughDate", {
                  defaultValue: "Through Date",
                }),
                get: record => formatDate(record.throughDate, router.locale),
              },
              {
                label: t("form.label.role", "Role"),
                get: record => getRoleName(record.role || ""),
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/invitation_codes/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/invitation_codes/${record.id}/view`)
            }
            onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
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
            onYes={(record: InvitationCode) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default InvitaionCodeList;
