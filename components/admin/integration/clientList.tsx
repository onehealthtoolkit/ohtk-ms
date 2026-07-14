import Link from "next/link";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "react-i18next";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import { IntegrationClient } from "lib/services/integration";
import { AddButton } from "components/widgets/forms";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import ErrorDisplay from "components/widgets/errorDisplay";
import Table from "components/widgets/table";
import Paginate from "components/widgets/table/paginate";
import TotalItem from "components/widgets/table/totalItem";
import IntegrationFilter from "./filter";
import { IntegrationClientListViewModel } from "./clientListViewModel";

const parseUrlParams = (query: ParsedUrlQuery) => ({
  q: query.q as string,
  offset: query.offset ? parseInt(query.offset as string) : 0,
});

const IntegrationClientList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { setUrl, query, resetUrl } = useUrlParams();
  const services = useServices();
  const [viewModel] = useState(() => {
    const model = new IntegrationClientListViewModel(
      services.integrationService
    );
    model.registerDialog("confirmDisable");
    return model;
  });

  useEffect(() => {
    if (router.isReady) {
      const filter = parseUrlParams(query);
      viewModel.setSearchValue(filter.q, filter.offset);
    }
  }, [query, router.isReady, viewModel]);

  const applySearch = ({ q, offset }: { q?: string; offset?: number }) => {
    const filter = parseUrlParams(query);
    if (q) filter.q = q;
    if (Number.isInteger(offset)) filter.offset = offset!;
    setUrl(filter);
  };

  return (
    <Observer>
      {() => (
        <div data-testid="integration-client-list">
          <div className="flex items-center flex-wrap mb-4 gap-2">
            <TotalItem
              totalCount={viewModel.totalCount}
              onRefresh={() => viewModel.fetch(true)}
            />
            <IntegrationFilter
              testId="integration-client-search"
              searchText={viewModel.searchText}
              onChange={value => {
                if (value === "") resetUrl();
                else applySearch({ q: value, offset: 0 });
              }}
            />
            <div className="flex-grow md:flex-none"></div>
            <Link href="/admin/integrations/clients/create" passHref>
              <AddButton data-testid="integration-client-add" />
            </Link>
          </div>
          <Table
            tableTestId="integration-client-table"
            getRowTestId={record =>
              record ? `integration-client-row-${record.code}` : undefined
            }
            getActionTestId={(record, action) =>
              record ? `integration-client-${action}-${record.code}` : undefined
            }
            columns={[
              {
                label: t("form.label.code", "Code"),
                get: record => record?.code,
              },
              {
                label: t("form.label.name", "Name"),
                get: record => record?.name,
              },
              { label: "Type", get: record => record?.integrationType },
              {
                label: t("form.label.status", "Status"),
                get: record => record?.status,
              },
              {
                label: "Scopes",
                get: record => record?.scopeCodes.join(", "),
              },
              { label: "Client ID", get: record => record?.clientId },
            ]}
            data={viewModel.data}
            onLoading={viewModel.isLoading}
            onView={record =>
              router.push(`/admin/integrations/clients/${record?.id}/view`)
            }
            onEdit={record =>
              router.push(`/admin/integrations/clients/${record?.id}/update`)
            }
            onDelete={record =>
              viewModel.dialog("confirmDisable")?.open(record)
            }
          />
          <ErrorDisplay message={viewModel.errorMessage} />
          <Paginate
            offset={viewModel.offset}
            limit={viewModel.limit}
            totalCount={viewModel.totalCount}
            onChange={value => applySearch({ offset: value })}
          />
          <ConfirmDialog
            store={viewModel.dialog("confirmDisable")}
            content="Disable this integration client?"
            onYes={(record: IntegrationClient) => viewModel.disable(record.id)}
            onNo={() => viewModel.dialog("confirmDisable")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default IntegrationClientList;
