import { AddButton } from "components/widgets/forms";
import Table from "components/widgets/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { StateDefinitionUpdateViewModel } from "../updateViewModel";

export const StateTransitionList = ({
  viewModel,
}: {
  viewModel: StateDefinitionUpdateViewModel;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center flex-wrap mb-4">
        <p></p>
        <div className="flex-grow"></div>
        <Link
          href={{
            pathname: `/admin/state_definitions/${viewModel.id}/transitions/create`,
            query: {
              definition_name: viewModel.name,
            },
          }}
          passHref
        >
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
            label: t("form.label.fromStep", "From Step"),
            get: record => record.fromStep.name,
          },
          {
            label: t("form.label.toStep", "To Step"),
            get: record => record.toStep.name,
          },
        ]}
        data={viewModel?.stateTransitions || []}
        onEdit={record =>
          router.push({
            pathname: `/admin/state_definitions/${viewModel.id}/transitions/${record.id}/update`,
            query: {
              definition_name: viewModel.name,
            },
          })
        }
        onView={record =>
          router.push({
            pathname: `/admin/state_definitions/${viewModel.id}/transitions/${record.id}/view`,
            query: {
              definition_name: viewModel.name,
            },
          })
        }
        onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
      />
    </div>
  );
};
