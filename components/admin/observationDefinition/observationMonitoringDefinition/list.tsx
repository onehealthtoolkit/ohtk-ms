import { AddButton } from "components/widgets/forms";
import Table from "components/widgets/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { Observer } from "mobx-react";
import { ObservationMonitoringDefinition } from "lib/services/observationMonitoringDefinition";
import { ObservationDefinitionUpdateViewModel } from "../updateViewModel";

export const ObservationMonitoringDefinitionList = ({
  viewModel,
}: {
  viewModel: ObservationDefinitionUpdateViewModel;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center flex-wrap mb-4">
        <div className="flex items-center flex-wrap mb-4 mt-4">
          <p>
            {t(
              "breadcrumb.observationMonitoringDefinitions",
              "Monitoring Definitions"
            )}
          </p>
        </div>
        <div className="flex-grow"></div>
        <Link
          href={{
            pathname: `/admin/observation_definitions/${viewModel.id}/observation_monitoring_definitions/create`,
            query: {
              definition_name: viewModel.name,
            },
          }}
          passHref
        >
          <AddButton />
        </Link>
      </div>
      <Observer>
        {() => (
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
                label: t("form.label.description", "Description"),
                get: record => record.description,
              },
            ]}
            data={viewModel?.monitoringDefinitions || []}
            onEdit={record =>
              router.push({
                pathname: `/admin/observation_definitions/${viewModel.id}/observation_monitoring_definitions/${record.id}/update`,
                query: {
                  definition_name: viewModel.name,
                },
              })
            }
            onView={record =>
              router.push({
                pathname: `/admin/observation_definitions/${viewModel.id}/observation_monitoring_definitions/${record.id}/view`,
                query: {
                  definition_name: viewModel.name,
                },
              })
            }
            onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
          />
        )}
      </Observer>
      <ConfirmDialog
        store={viewModel.dialog("confirmDelete")}
        content={t("dialog.content.confirmDelete", "Are you sure?")}
        onYes={(record: ObservationMonitoringDefinition) =>
          viewModel.deleteMonitoringDefinition(record.id)
        }
        onNo={() => viewModel.dialog("confirmDelete")?.close()}
      />
    </div>
  );
};
