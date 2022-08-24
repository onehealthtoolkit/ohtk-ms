import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { formatDate, formatDateTime } from "lib/datetime";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { ReportTableViewModel } from "./reportsTableViewModel";

const styles = {
  row: "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  title:
    "w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
};
type ReportsTableViewProps = {
  authorityId: number;
};

const ReportsTableView: React.FC<ReportsTableViewProps> = ({ authorityId }) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new ReportTableViewModel(authorityId, services.reportService)
  );
  if (!authorityId) return <Spinner></Spinner>;
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg ">
        <div className="rounded-t-lg mb-0 px-4 py-2 h-[45px] bg-[#DA3535]">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <span className="font-['Kanit'] font-semibold text-xl text-white">
                Reports [{viewModel?.totalCount}]
              </span>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="text-white underline active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {"See all >"}
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto p-2">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-[#E0E5EB] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Created At
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Incident Date
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Report type
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal font-['Bai_Jamjuree']">
              {viewModel.data &&
                viewModel.data.map(item => (
                  <tr key={item.id} className={styles.row}>
                    <td className="px-6 py-4">
                      {formatDateTime(item.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(item.incidentDate)}
                    </td>
                    <td className="px-6 py-4">{item.reportTypeName}</td>
                    <td className="px-6 py-4">{item.rendererData}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(ReportsTableView);
