import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";

import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { NotificationTemplate } from "lib/services/notificationTemplate";
import { NotificationTemplateListViewModel } from "./listViewModel";
import TotalItem from "components/widgets/table/totalItem";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useTranslation } from "react-i18next";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    q: query.q as string,
    offset: query.offset ? parseInt(query.offset as string) : 0,
  };
};

const NotificationTemplateList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { notificationTemplateService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<NotificationTemplateListViewModel>(() => {
    const model = new NotificationTemplateListViewModel(
      notificationTemplateService
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
            <Link href={"/admin/notification_templates/create"} passHref>
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
                label: t("form.label.name", "Name"),
                get: record => record.name,
              },
              {
                label: t("form.label.reportType", {
                  defaultValue: "Report Type",
                }),
                get: record => record.reportTypeName,
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/notification_templates/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/notification_templates/${record.id}/view`)
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
            onYes={(record: NotificationTemplate) =>
              viewModel.delete(record.id)
            }
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default NotificationTemplateList;
