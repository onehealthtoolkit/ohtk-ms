import { forwardRef, useState } from "react";
import { Observer } from "mobx-react";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { CaseViewModel } from "./caseViewModel";
import getConfig from "next/config";
import Breadcrumb from "components/layout/breadcrumb";
import tw from "tailwind-styled-components";

const { publicRuntimeConfig } = getConfig();

const renderData = (data: Record<string, any>) => {
  if (!data) {
    return "";
  }
  return (
    <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>{renderItem(data)}</tbody>
    </table>
  );
};
const renderItem = (data: Record<string, any>) => {
  return Object.keys(data)
    .sort()
    .filter(key => key != "images" && data[key] != null)
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
            {(typeof data[key] != "object" || typeof data[key] == "boolean") &&
              data[key].toString()}
            {typeof data[key] == "object" && renderData(data[key])}
          </td>
        </tr>
      );
    });
};

const TR = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <tr className="flex bg-white border even:bg-slate-50 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {label}
      </th>
      <td className="px-6 py-4">{value}</td>
    </tr>
  );
};

export const PromoteToCaseButtonx = forwardRef(function addButton(
  props: React.PropsWithoutRef<{}>,
  ref: React.Ref<HTMLAnchorElement>
) {
  return (
    <a
      ref={ref}
      {...props}
      className="
        px-4 
        py-2 
        border
      text-white
      bg-blue-500 
      border-blue-300
      hover:border-blue-500
        rounded
        flex 
        justify-center 
        items-center
        cursor-pointer
      "
    >
      <span>Promote To Case</span>
    </a>
  );
});

export const PromoteToCaseButton = tw.button`
  px-4 
  py-2 
  border
  text-white
  bg-blue-500 
  border-blue-300
  hover:border-blue-500
  rounded
  flex 
  justify-center 
  items-center
`;

const Case = (props: { id: string }) => {
  const { id } = props;
  const services = useServices();
  const [viewModel] = useState(
    new CaseViewModel(id as string, services.caseService)
  );

  return (
    <Observer>
      {() => {
        return (
          <MaskingLoader loading={viewModel.isLoading}>
            <div>
              <div className="flex items-center flex-wrap mb-4">
                <Breadcrumb
                  crumbs={[
                    { text: "Cases", href: "/cases" },
                    { text: viewModel.id },
                  ]}
                />
              </div>

              <div>
                <p className="text-md dark:text-gray-400">
                  Report type: {viewModel.data.reportTypeName}
                </p>
                <p className="text-sm pt-1 font-bold">
                  {viewModel.data.rendererData}
                </p>
              </div>

              <div className="relative overflow-x-auto mt-4">
                <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    <TR
                      label="Created at"
                      value={
                        viewModel.data && viewModel.data.createdAt
                          ? viewModel.data.createdAt.toString()
                          : ""
                      }
                    />

                    <TR
                      label="Incident date"
                      value={
                        viewModel.data && viewModel.data.incidentDate
                          ? viewModel.data.incidentDate.toString()
                          : ""
                      }
                    />

                    <TR
                      label="Case type"
                      value={
                        viewModel.data && viewModel.data.reportTypeName
                          ? viewModel.data.reportTypeName
                          : ""
                      }
                    />

                    <TR
                      label="Case by"
                      value={
                        viewModel.data && viewModel.data.reportByName
                          ? viewModel.data.reportByName
                          : ""
                      }
                    />

                    <TR
                      label="Phone number"
                      value={
                        viewModel.data && viewModel.data.reportByTelephone
                          ? viewModel.data.reportByTelephone
                          : ""
                      }
                    />
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap pt-6 pb-4">
                {viewModel.data.images &&
                  viewModel.data.images.map((image, idx) => (
                    <div key={idx} className="">
                      <a href="#">
                        <img
                          className="w-40"
                          src={`${publicRuntimeConfig.serverUrl}/${image.file}`}
                          alt=""
                        />
                      </a>
                    </div>
                  ))}
              </div>
              <div className="mt-4">
                <p className="text-md dark:text-gray-400">Form Data</p>
              </div>
              <div className="">
                {viewModel.data.data && renderData(viewModel.data.data)}
              </div>
              <div className="flex justify-between items-start p-4 rounded-t dark:border-gray-600">
                <p className="text-lg dark:text-gray-400">Images</p>
              </div>
            </div>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Case;
