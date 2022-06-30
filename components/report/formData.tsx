import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { FormDataViewModel } from "./formDataViewModel";
import getConfig from "next/config";
import { formatThDate, formatThDateTime } from "lib/datetime";

const { publicRuntimeConfig } = getConfig();

const FormData = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new FormDataViewModel(router.query.id as string, services.reportService)
  );

  const renderData = (data: Record<string, any>) => {
    if (!data) {
      return "";
    }
    return (
      <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>{renderItem(data)}</tbody>
      </table>
    );
  };
  const renderItem = (data: Record<string, any>) => {
    return Object.keys(data)
      .sort()
      .filter(key => key != "images")
      .map((key: string) => {
        return (
          <tr
            key={key}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {key}
            </th>
            <td className="px-6 py-4">
              {typeof data[key] != "object" && data[key]}
              {typeof data[key] == "object" && renderData(data[key])}
            </td>
          </tr>
        );
      });
  };

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <p className="text-lg dark:text-gray-400">
            {viewModel.data.reportTypeName}
          </p>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  CREATED AT
                </th>
                <td className="px-6 py-4">
                  {formatThDateTime(viewModel.data.createdAt)}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  INCIDENT DATE
                </th>
                <td className="px-6 py-4">
                  {formatThDate(viewModel.data.incidentDate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <p className="text-lg dark:text-gray-400">Form Data</p>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {viewModel.data.data && renderData(viewModel.data.data)}
        </div>
        <div className="flex justify-between items-start p-4 rounded-t dark:border-gray-600">
          <p className="text-lg dark:text-gray-400">Images</p>
        </div>
        <div className="flex flex-wrap">
          {viewModel.data.images &&
            viewModel.data.images.map((image, idx) => (
              <div
                key={idx}
                className="max-w-sm bg-white px-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={`${publicRuntimeConfig.serverUrl}/${image.file}`}
                    alt=""
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(FormData);
