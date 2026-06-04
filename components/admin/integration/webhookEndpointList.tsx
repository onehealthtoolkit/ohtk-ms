import Link from "next/link";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "react-i18next";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import useServices from "lib/services/provider";
import { WebhookEndpoint } from "lib/services/integration";
import { AddButton } from "components/widgets/forms";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import ErrorDisplay from "components/widgets/errorDisplay";
import Table from "components/widgets/table";
import Paginate from "components/widgets/table/paginate";
import TotalItem from "components/widgets/table/totalItem";
import IntegrationFilter from "./filter";
import { WebhookEndpointListViewModel } from "./webhookEndpointListViewModel";

const parseUrlParams = (query: ParsedUrlQuery) => ({
  q: query.q as string,
  offset: query.offset ? parseInt(query.offset as string) : 0,
});

const WebhookEndpointList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { setUrl, query, resetUrl } = useUrlParams();
  const services = useServices();
  const [viewModel] = useState(() => {
    const model = new WebhookEndpointListViewModel(services.integrationService);
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
        <div data-testid="webhook-endpoint-list">
          <div className="flex items-center flex-wrap mb-4 gap-2">
            <TotalItem
              totalCount={viewModel.totalCount}
              onRefresh={() => viewModel.fetch(true)}
            />
            <IntegrationFilter
              testId="webhook-endpoint-search"
              searchText={viewModel.searchText}
              onChange={value => {
                if (value === "") resetUrl();
                else applySearch({ q: value, offset: 0 });
              }}
            />
            <div className="flex-grow md:flex-none"></div>
            <Link href="/admin/integrations/webhook_endpoints/create" passHref>
              <AddButton data-testid="webhook-endpoint-add" />
            </Link>
          </div>
          <Table
            tableTestId="webhook-endpoint-table"
            getRowTestId={record =>
              record ? `webhook-endpoint-row-${record.id}` : undefined
            }
            getActionTestId={(record, action) =>
              record ? `webhook-endpoint-${action}-${record.id}` : undefined
            }
            columns={[
              {
                label: t("form.label.name", "Name"),
                get: record => record?.name,
              },
              {
                label: "Client",
                get: record => record?.integrationClient?.code,
              },
              { label: "URL", get: record => record?.url },
              {
                label: t("form.label.status", "Status"),
                get: record => record?.status,
              },
              {
                label: "Events",
                get: record => record?.eventTypes.join(", "),
              },
              {
                label: "Timeout",
                get: record => String(record?.timeoutSeconds || ""),
              },
            ]}
            data={viewModel.data}
            onLoading={viewModel.isLoading}
            onView={record =>
              router.push(
                `/admin/integrations/webhook_endpoints/${record?.id}/view`
              )
            }
            onEdit={record =>
              router.push(
                `/admin/integrations/webhook_endpoints/${record?.id}/update`
              )
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
            content="Disable this webhook endpoint?"
            onYes={(record: WebhookEndpoint) => viewModel.disable(record.id)}
            onNo={() => viewModel.dialog("confirmDisable")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default WebhookEndpointList;
