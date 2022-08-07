/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Observer } from "mobx-react";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ReportViewModel } from "./reportViewModel";
import getConfig from "next/config";
import tw from "tailwind-styled-components";
import Spinner from "components/widgets/spinner";
import { useRouter } from "next/router";
import CaseLink from "components/case/caseLink";
import { renderData, TR } from "components/widgets/renderData";

const { publicRuntimeConfig } = getConfig();

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

const Report = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new ReportViewModel(
      id as string,
      services.reportService,
      services.caseService
    )
  );

  return (
    <Observer>
      {() => {
        return (
          <MaskingLoader loading={viewModel.isLoading}>
            <div>
              {viewModel.data.caseId == undefined && (
                <div className="flex items-center flex-wrap mb-4">
                  <div className="flex-grow"></div>
                  <PromoteToCaseButton
                    disabled={viewModel.isLoading}
                    type="button"
                    onClick={async () => {
                      const caseId = await viewModel.promoteToCase();
                      if (caseId) router.push(`/cases/${caseId}`);
                    }}
                  >
                    {viewModel.isLoading && <Spinner />}
                    &nbsp;Promote To Case
                  </PromoteToCaseButton>
                </div>
              )}

              <div>
                <div className="flex gap-2">
                  <p className="text-md dark:text-gray-400 ">
                    Report type: {viewModel.data.reportTypeName}
                  </p>
                  <CaseLink caseId={viewModel.data.caseId} />
                </div>
                <p className="text-sm pt-1 font-bold">
                  {viewModel.data.rendererData}
                </p>
              </div>

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

                    <TR
                      label="Report type"
                      value={viewModel.data?.reportTypeName || ""}
                    />

                    <TR
                      label="Report by"
                      value={viewModel.data?.reportByName || ""}
                    />

                    <TR
                      label="Phone number"
                      value={viewModel.data?.reportByTelephone || ""}
                    />
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap pt-6 pb-4">
                {viewModel.data.images?.map((image, idx) => (
                  <div key={idx} className="">
                    <a href="#">
                      <img
                        className="w-40"
                        src={`${publicRuntimeConfig.serverUrl}/${image.thumbnail}`}
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

export default Report;
