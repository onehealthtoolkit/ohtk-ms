import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useServices from "lib/services/provider";
import { SummaryByCategoryViewModel } from "./summaryByCategoryViewModel";
import { MaskingLoader } from "components/widgets/forms";
import "react-datepicker/dist/react-datepicker.css";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import useReportCategories from "lib/hooks/reportCategories";
import SelectableChips from "components/widgets/chips";
import { DashBoardFilterData } from "./dashboardViewModel";
import DashboardCard from "./card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "x" as const,
  },
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      position: "bottom" as const,
      align: "start" as const,
      onClick: () => null,
    },
    title: {
      display: false,
      text: "Summary by category",
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
  parsing: {
    // xAxisKey: "day",
    yAxisKey: "total",
  },
};

type SummaryByCategoryViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const SummaryByCategoryView: React.FC<SummaryByCategoryViewProps> = ({
  authorityId,
  filter,
}) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new SummaryByCategoryViewModel(services.dashboardService)
  );

  const categories = useReportCategories();

  useEffect(() => {
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <DashboardCard
        titleClass="bg-[#5E7284]"
        title="Reporting Trends"
        action={
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className={`text-white inline-flex w-full justify-center rounded-md px-0 py-0 text-sm font-medium  underline hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                {viewModel.summaryType == "report" ? "Reports" : "Cases"}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-slate-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-400 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => viewModel.changeSummaryType("report")}
                      >
                        Reports
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-400 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => viewModel.changeSummaryType("case")}
                      >
                        Cases
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        }
      >
        <>
          <div className="flex flex-wrap justify-start mt-2 ml-2 gap-2">
            {categories && (
              <SelectableChips
                initialChips={categories?.map(item => item.name)}
                value={categories?.map(item => item.name)}
                onChangeChips={(values: string[]) => {
                  viewModel.filterByCategory(values);
                }}
              />
            )}
          </div>
          <div className="block w-full overflow-x-auto p-2">
            {viewModel.data && <Bar options={options} data={viewModel.data} />}
          </div>
        </>
      </DashboardCard>
    </MaskingLoader>
  );
};

export default observer(SummaryByCategoryView);
