import useServices from "lib/services/provider";
import { Observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatDateTime } from "lib/datetime";
import { currentWebsocketEndpoint } from "lib/client";
import { FollowupListViewModel } from "./listViewModel";
import Table from "components/widgets/table";
import ErrorDisplay from "components/widgets/errorDisplay";
import { useTranslation } from "react-i18next";

type FollowupListProps = {
  incidentId: string;
};

const FollowupList: React.FC<FollowupListProps> = ({ incidentId }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { followupService } = useServices();
  const [viewModel] = useState(
    new FollowupListViewModel(followupService, incidentId)
  );

  useEffect(() => {
    const ws = new WebSocket(
      `${currentWebsocketEndpoint()}/followups/${incidentId}/`
    );

    ws.onmessage = ev => {
      console.log(ev.data);
      viewModel.fetch();
    };

    return () => ws.close();
  }, [viewModel, incidentId]);

  if (!incidentId) return null;
  return (
    <Observer>
      {() => (
        <>
          <Table
            columns={[
              {
                label: t("form.label.createdAt", "Created At"),
                get: record => formatDateTime(record.createdAt, router.locale),
              },
              {
                label: t("form.label.data", "Data"),
                get: record => record.rendererData,
              },
            ]}
            data={viewModel.data || []}
            onView={record =>
              router.push({
                pathname: `/reports/followups/${record.id}`,
                query: {
                  incidentId: incidentId,
                },
              })
            }
          />
          <ErrorDisplay message={viewModel.errorMessage} />
        </>
      )}
    </Observer>
  );
};

export default memo(FollowupList);
