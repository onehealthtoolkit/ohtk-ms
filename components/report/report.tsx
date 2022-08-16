/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { observer, Observer } from "mobx-react";
import { Divide, MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ReportViewModel } from "./reportViewModel";
import getConfig from "next/config";
import tw from "tailwind-styled-components";
import Spinner from "components/widgets/spinner";
import { useRouter } from "next/router";
import CaseLink from "components/case/caseLink";
import { renderData, TR } from "components/widgets/renderData";
import dynamic from "next/dynamic";
import Comments from "components/widgets/comments";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";

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

const ReportLocation = dynamic(() => import("../case/reportLocationMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const ReportInformation = observer(
  ({ viewModel }: { viewModel: ReportViewModel }) => {
    return (
      <div className="relative overflow-x-auto md:w-1/2 w-full">
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

const ReportImage = observer(
  ({ viewModel }: { viewModel: ReportViewModel }) => {
    return (
      <Fragment>
        {viewModel.data.images?.map((image, idx) => (
          <div key={idx} className="">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                viewModel.openGallery(image.id);
              }}
            >
              <img
                className="w-40"
                src={`${publicRuntimeConfig.serverUrl}/${image.thumbnail}`}
                alt=""
              />
            </a>
          </div>
        ))}
      </Fragment>
    );
  }
);

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
            <>
              {viewModel.data.caseId == undefined && (
                <div className="flex items-center flex-wrap absolute right-0 top-12">
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
              <Divide hilight />

              <div className="flex flex-row gap-2 md:flex-nowrap flex-wrap ">
                <ReportInformation viewModel={viewModel} />
                <div className="md:w-1/2 w-full h-[300px] md:h-auto">
                  <ReportLocation lnglat={viewModel.data.gpsLocation} />
                </div>
              </div>

              <ReportImage viewModel={viewModel} />

              <Divide />

              <div className="mb-4">
                <div className="">
                  <p className="text-md dark:text-gray-400">Form Data</p>
                </div>
                <div className="">
                  {viewModel.data.data && renderData(viewModel.data.data)}
                </div>
              </div>

              <Divide />

              <Comments threadId={viewModel.data.threadId} />

              <GalleryDialog viewModel={viewModel.galleryViewModel} />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Report;
