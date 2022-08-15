import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminUserListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { User } from "lib/services/user";
import TotalItem from "components/widgets/table/totalItem";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useTranslation } from "react-i18next";
import { AccountsAuthorityUserRoleChoices } from "lib/generated/graphql";

export const getRoleName = (role: string) => {
  switch (role) {
    case AccountsAuthorityUserRoleChoices.Rep:
      return "Reporter";
    case AccountsAuthorityUserRoleChoices.Ofc:
      return "Officer";
    case AccountsAuthorityUserRoleChoices.Adm:
      return "Admin";

    default:
      break;
  }
  return "";
};

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: query.q as string,
    offset: query.offset ? parseInt(query.offset as string) : 0,
  };
};

const UserList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { userService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<AdminUserListViewModel>(() => {
    const model = new AdminUserListViewModel(userService);
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
    if (offset) {
      filter.offset = offset;
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
            <TotalItem totalCount={viewModel.totalCount} />
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
            <Link href={"/admin/users/create"} passHref>
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
                label: t("form.label.username", "User Name"),
                get: record => record.username,
              },
              {
                label: t("form.label.firstName", "First Name"),
                get: record => record.firstName,
              },
              {
                label: t("form.label.lastName", "Last Name"),
                get: record => record.lastName,
              },
              {
                label: t("form.label.email", "Email"),
                get: record => record.email,
              },
              {
                label: t("form.label.role", "Role"),
                get: record => getRoleName(record.role || ""),
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record => router.push(`/admin/users/${record.id}/update`)}
            onView={record => router.push(`/admin/users/${record.id}/view`)}
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
            onYes={(record: User) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default UserList;
