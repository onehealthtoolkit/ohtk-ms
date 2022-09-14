import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import useServices from "lib/services/provider";
import { MaskingLoader } from "components/widgets/forms";
import "react-datepicker/dist/react-datepicker.css";
import { DashBoardFilterData } from "./dashboardViewModel";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { SummaryByCategoryPieViewModel } from "./summaryByCategoryPieViewModel";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

ChartJS.register(ArcElement, ChartDataLabels);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
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

type SummaryByCategoryPieViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
  showFilter?: boolean;
};

const SummaryByCategoryPieView: React.FC<SummaryByCategoryPieViewProps> = ({
  authorityId,
  filter,
}) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new SummaryByCategoryPieViewModel(services.dashboardService)
  );

  useEffect(() => {
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-lg ">
        <div className="rounded-t-lg mb-0 px-4 py-2 h-[45px] bg-[#5E7284]">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <span className="font-['Kanit'] font-semibold text-sm text-white">
                Total reports
              </span>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
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
                              active
                                ? "bg-gray-400 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() =>
                              viewModel.changeSummaryType("report")
                            }
                          >
                            Reports
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-400 text-white"
                                : "text-gray-900"
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
            </div>
          </div>
        </div>

        <div className="h-full w-full flex items-center overflow-x-auto p-2">
          <Doughnut
            plugins={[
              {
                id: "doughnutlabel",
                beforeDatasetDraw: function (chart) {
                  const ctx = chart.ctx;

                  ctx.restore();
                  ctx.font = "30px Kanit";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "#000";

                  const text = chart.config.data.datasets[0]?.label || "";
                  let centerX =
                    (chart.chartArea.left + chart.chartArea.right) / 2;
                  const centerY =
                    (chart.chartArea.top + chart.chartArea.bottom) / 2;

                  centerX -= ctx.measureText(text).width / 1.98;
                  ctx.fillText(text, centerX, centerY);
                  ctx.save();
                },
              },
            ]}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right" as const,
                  align: "start" as const,
                  onClick: () => null,
                },
                datalabels: {
                  color: "#1D1E1E",
                },
              },
            }}
            data={viewModel.data}
          />
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(SummaryByCategoryPieView);
