import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { formatDate, formatDateTime } from "lib/datetime";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { CaseTableViewModel } from "./caseTableViewModel";

const styles = {
  row: "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  title:
    "w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
};
type CasesTableViewProps = {
  authorityId: number;
};

const CasesTableView: React.FC<CasesTableViewProps> = ({ authorityId }) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new CaseTableViewModel(authorityId, services.caseService)
  );
  if (!authorityId) return <Spinner></Spinner>;
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <p className="text-md dark:text-gray-400">Cases</p>
        <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Incident Date
              </th>
              <th scope="col" className="py-3 px-6">
                Report type
              </th>
              <th scope="col" className="py-3 px-6">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {viewModel.data &&
              viewModel.data.map(item => (
                <tr key={item.id} className={styles.row}>
                  <td className="px-6 py-4">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">{formatDate(item.incidentDate)}</td>
                  <td className="px-6 py-4">{item.reportTypeName}</td>
                  <td className="px-6 py-4">{item.rendererData}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </MaskingLoader>
  );
};

export default observer(CasesTableView);
