import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import React, { useState } from "react";
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
import { Field, Label, MaskingLoader, Select } from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Summary by category",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  parsing: {
    // xAxisKey: "day",
    yAxisKey: "total",
  },
};

type SummaryByCategoryViewProps = {
  authorityId: number;
};

const SummaryByCategoryView: React.FC<SummaryByCategoryViewProps> = ({
  authorityId,
}) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new SummaryByCategoryViewModel(authorityId, services.dashboardService)
  );

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <p className="text-md dark:text-gray-400">Summary by category</p>
        <div className="flex flex-row flex-wrap flex-grow mt-2">
          <div className="w-full md:w-1/4 p-6">
            <Field $size="full">
              <Label htmlFor="summaryType">Type</Label>
              <Select
                id="summaryType"
                onChange={evt => viewModel.changeSummaryType(evt.target.value)}
                value={viewModel.summaryType}
              >
                <option value="report">Reports</option>
                <option value="case">Cases</option>
              </Select>
            </Field>
            <Field $size="full">
              <Label htmlFor="fromDate">From Date</Label>
              <DatePicker
                id="fromDate"
                selected={viewModel.fromDate}
                onChange={(date: Date) => {
                  viewModel.fromDate = date;
                  viewModel.fetch();
                }}
              />
            </Field>
            <Field $size="full">
              <Label htmlFor="throughDate">Through Date</Label>
              <DatePicker
                id="throughDate"
                selected={viewModel.toDate}
                onChange={(date: Date) => {
                  viewModel.toDate = date;
                  viewModel.fetch();
                }}
              />
            </Field>
          </div>
          <div className="w-full md:w-3/4 p-6">
            {viewModel.data && <Bar options={options} data={viewModel.data} />}
          </div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(SummaryByCategoryView);
