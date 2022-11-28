/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { observer, Observer } from "mobx-react";
import {
  Divide,
  MaskingLoader,
  TabBar,
  TabItem,
} from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ReportViewModel } from "./reportViewModel";
import tw from "tailwind-styled-components";
import Spinner from "components/widgets/spinner";
import { useRouter } from "next/router";
import CaseLink from "components/case/caseLink";
import { RenderData, TR } from "components/widgets/renderData";
import dynamic from "next/dynamic";
import Comments from "components/widgets/comments";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";
import Back from "components/widgets/viewActionsButtons";
import FollowupList from "./followup/list";
import { formatYmdt } from "lib/datetime";

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

const ReportLocation = dynamic(() => import("../case/reportMap"), {
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
              value={formatYmdt(viewModel.data?.createdAt)}
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
        <div className="flex flex-wrap  gap-4">
          {viewModel.data.images?.map((image, idx) => (
            <div key={idx} className="w-40 h-32">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  viewModel.openGallery(image.id);
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image.thumbnail}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
);

const Report = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<ReportViewModel | undefined>();

  useEffect(() => {
    setViewModel(
      new ReportViewModel(
        id as string,
        services.reportService,
        services.caseService
      )
    );
  }, [setViewModel, id, services]);

  if (viewModel === undefined) {
    return null;
  }

  if (router.query.activeTabIndex) {
    viewModel.activeTabIndex = +router.query.activeTabIndex;
  }

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
              <TabBar>
                <TabItem
                  id="formData"
                  active={viewModel.activeTabIndex == 0}
                  onTab={() => {
                    viewModel.activeTabIndex = 0;
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { ...router.query, activeTabIndex: 0 },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  {() => (
                    <>
                      <span>Form Data</span>
                    </>
                  )}
                </TabItem>
                <TabItem
                  id="followup"
                  active={viewModel.activeTabIndex == 1}
                  onTab={() => {
                    viewModel.activeTabIndex = 1;
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { ...router.query, activeTabIndex: 1 },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  {() => (
                    <>
                      <span>Followup</span>
                    </>
                  )}
                </TabItem>
              </TabBar>

              <div className="mb-4">
                {viewModel.activeTabIndex == 0 && (
                  <RenderData
                    data={viewModel.data.data}
                    definition={viewModel.data.reportTypeDefinition}
                  />
                )}
                {viewModel.activeTabIndex == 1 && (
                  <div className="">
                    <FollowupList incidentId={viewModel.id} />
                  </div>
                )}
              </div>

              <Divide />

              {viewModel.data.threadId && (
                <Comments threadId={viewModel.data.threadId} />
              )}

              <GalleryDialog viewModel={viewModel.galleryViewModel} />

              <Back />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Report;
