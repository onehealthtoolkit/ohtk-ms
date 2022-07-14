import { CheckIcon } from "@heroicons/react/solid";
import { AddButton } from "components/widgets/forms";
import Table from "components/widgets/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { StateDefinitionUpdateViewModel } from "../updateViewModel";

export const StateStepList = ({
  viewModel,
}: {
  viewModel: StateDefinitionUpdateViewModel;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center flex-wrap mb-4">
        <p></p>
        <div className="flex-grow"></div>
        <Link
          href={{
            pathname: `/admin/state_definitions/${viewModel.id}/steps/create`,
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
            label: "Id",
            get: record => record.id,
          },
          {
            label: "Name",
            get: record => record.name,
          },
          {
            label: "Is StartState",
            get: record => {
              return record.isStartState ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                ""
              );
            },
          },
          {
            label: "Is StopState",
            get: record => {
              return record.isStopState ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                ""
              );
            },
          },
        ]}
        data={viewModel?.stateSteps || []}
        onEdit={record =>
          router.push({
            pathname: `/admin/state_definitions/${viewModel.id}/steps/${record.id}/update`,
            query: {
              definition_name: viewModel.name,
            },
          })
        }
        onView={record =>
          router.push({
            pathname: `/admin/state_definitions/${viewModel.id}/steps/${record.id}/view`,
            query: {
              definition_name: viewModel.name,
            },
          })
        }
        onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
      />
    </>
  );
};
