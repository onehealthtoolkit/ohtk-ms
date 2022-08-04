/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { observer, Observer } from "mobx-react";
import { MaskingLoader, TabBar, TabItem } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { CaseViewModel } from "./caseViewModel";
import getConfig from "next/config";
import CaseStateView from "components/case/caseState/view";
import { AdjustmentsIcon, CollectionIcon } from "@heroicons/react/solid";
import useStore from "lib/store";
import CaseStatus from "./caseStatus";

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

const ReportInformation = observer(
  ({ viewModel }: { viewModel: CaseViewModel }) => {
    return (
      <div className="relative overflow-x-auto mt-4">
        <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <TR
              label="Created at"
              value={viewModel.data?.createdAt?.toString() || ""}
            />

            <TR
              label="Incident date"
              value={viewModel.data?.incidentDate?.toString() || ""}
            />

            <TR label="Report by" value={viewModel.data?.reportByName || ""} />

            <TR
              label="Phone number"
              value={viewModel.data?.reportByTelephone || ""}
            />
          </tbody>
        </table>
      </div>
    );
  }
);

const ReportImage = observer(({ viewModel }: { viewModel: CaseViewModel }) => {
  return (
    <Fragment>
      {viewModel.data.images?.map((image, idx) => (
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
    </Fragment>
  );
});

const Case = (props: { id: string }) => {
  const { id } = props;
  const { me } = useStore();
  const services = useServices();
  const [viewModel] = useState(
    new CaseViewModel(id as string, me!, services.caseService)
  );

  return (
    <Observer>
      {() => {
        return (
          <MaskingLoader loading={viewModel.isLoading}>
            <>
              <div>
                <div className="flex gap-2">
                  <p className="text-md dark:text-gray-400 ">
                    Report type: {viewModel.data.reportTypeName}
                  </p>
                  <CaseStatus isFinished={viewModel.data.isFinished} />
                </div>
                <p className="text-sm pt-1 font-bold">
                  {viewModel.data.description}
                </p>
              </div>

              <ReportInformation viewModel={viewModel} />

              <ReportImage viewModel={viewModel} />

              <div>
                <TabBar>
                  <TabItem
                    id="state"
                    active={viewModel.activeTabIndex == 0}
                    onTab={() => {
                      viewModel.activeTabIndex = 0;
                    }}
                  >
                    {({ activeCss }) => (
                      <>
                        <CollectionIcon
                          className={`mr-2 w-5 h-5 ${activeCss}`}
                        />
                        <span>State</span>
                      </>
                    )}
                  </TabItem>
                  <TabItem
                    id="detail"
                    active={viewModel.activeTabIndex == 1}
                    onTab={() => {
                      viewModel.activeTabIndex = 1;
                    }}
                  >
                    {({ activeCss }) => (
                      <>
                        <AdjustmentsIcon
                          className={`mr-2 w-5 h-5 ${activeCss}`}
                        />
                        <span>Detail</span>
                      </>
                    )}
                  </TabItem>
                </TabBar>
                <div className="h-10"></div>
                {viewModel.activeTabIndex == 0 && (
                  <CaseStateView viewModel={viewModel.stateViewViewModel} />
                )}
                {viewModel.activeTabIndex == 1 && (
                  <>
                    <div className="">
                      <p className="text-md dark:text-gray-400">Form Data</p>
                    </div>
                    <div className="">
                      {viewModel.data.data && renderData(viewModel.data.data)}
                    </div>
                    <div className="flex justify-between items-start p-4 rounded-t dark:border-gray-600">
                      <p className="text-lg dark:text-gray-400">Images</p>
                    </div>
                  </>
                )}
              </div>
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Case;
