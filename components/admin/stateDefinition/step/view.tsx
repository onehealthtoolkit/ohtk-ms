import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { StateStepViewViewModel } from "./viewViewModel";
import CheckIcon from "@heroicons/react/solid/CheckIcon";
import Breadcrumb from "components/layout/breadcrumb";

const StateStepView = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateStepViewViewModel(
        router.query.step_id as string,
        services.stateStepService
      )
  );

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <Breadcrumb
          crumbs={[
            {
              text: "State Definitions",
              href: "/admin/state_definitions",
            },
            {
              text: `${router.query.definition_name}`,
              href: `/admin/state_definitions/${router.query.id}/update/`,
            },
            { text: "View Step" },
          ]}
        />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Id
                </th>
                <td className="px-6 py-4">{viewModel.data.id}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Name
                </th>
                <td className="px-6 py-4">{viewModel.data.name}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Is StartState
                </th>
                <td className="px-6 py-4">
                  {viewModel.data.isStartState && (
                    <CheckIcon className="h-5 w-5" />
                  )}
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Is StopState
                </th>
                <td className="px-6 py-4">
                  {viewModel.data.isStopState && (
                    <CheckIcon className="h-5 w-5" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(StateStepView);
