import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { StateTransitionViewViewModel } from "./viewViewModel";
import Breadcrumb from "components/layout/breadcrumb";

const StateTransitionView = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateTransitionViewViewModel(
        router.query.transition_id as string,
        services.stateTransitionService
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
            { text: "View Transition" },
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
                  Form Step
                </th>
                <td className="px-6 py-4">{viewModel.data.fromStep?.name}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  To Step
                </th>
                <td className="px-6 py-4">{viewModel.data.toStep?.name}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="align-top w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Form Definition
                </th>
                <td className="px-6 py-4">
                  <pre className="text-[13px]">
                    {viewModel.data.formDefinition}
                  </pre>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(StateTransitionView);
