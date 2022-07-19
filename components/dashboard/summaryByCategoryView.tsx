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
import { MaskingLoader } from "components/widgets/forms";

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
      display: true,
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
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const data = {
  labels,
  datasets: [
    {
      label: "Catagory 1",
      data: labels.map(() => randomIntFromInterval(0, 300)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Catagory 2",
      data: labels.map(() => randomIntFromInterval(0, 300)),
      backgroundColor: "rgba(203, 240, 249, 1)",
    },
    {
      label: "Catagory 3",
      data: labels.map(() => randomIntFromInterval(0, 300)),
      backgroundColor: "rgba(119, 154, 231, 1)",
    },
  ],
};
type SummaryByCategoryViewProps = {
  authorityId: number;
};

const SummaryByCategoryView: React.FC<SummaryByCategoryViewProps> = ({
  authorityId,
}) => {
  const services = useServices();
  const [viewModel] = useState(
    new SummaryByCategoryViewModel(authorityId, services.dashboardService)
  );

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <p className="text-md dark:text-gray-400">Summary by category</p>
        <Bar options={options} data={data} />
      </>
    </MaskingLoader>
  );
};

export default observer(SummaryByCategoryView);
