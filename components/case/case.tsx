/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { observer, Observer } from "mobx-react";
import {
  Divide,
  MaskingLoader,
  TabBar,
  TabItem,
} from "components/widgets/forms";
import useServices from "lib/services/provider";
import { CaseViewModel } from "./caseViewModel";
import CaseStateView from "components/case/caseState/view";
import { AdjustmentsIcon, CollectionIcon } from "@heroicons/react/solid";
import useStore from "lib/store";
import CaseStatus from "./caseStatus";
import { renderData, TR } from "components/widgets/renderData";
import Comments from "components/widgets/comments";
import dynamic from "next/dynamic";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";
import Back from "components/widgets/back";

const ReportLocation = dynamic(() => import("./reportLocationMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const ReportInformation = observer(
  ({ viewModel }: { viewModel: CaseViewModel }) => {
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
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              viewModel.openGallery(image.id);
            }}
          >
            <img className="w-40" src={image.thumbnail} alt="" />
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
                  <CaseStateView
                    viewModel={viewModel.stateViewViewModel}
                    onTransitionComplete={() => viewModel.fetch("network-only")}
                  />
                )}
                {viewModel.activeTabIndex == 1 && (
                  <>
                    <div className="">
                      <p className="text-md dark:text-gray-400">Form Data</p>
                    </div>
                    <div className="">
                      {viewModel.data.data && renderData(viewModel.data.data)}
                    </div>
                  </>
                )}
              </div>

              <Divide />

              <Comments threadId={viewModel.data.threadId} />

              <GalleryDialog viewModel={viewModel.galleryViewModel} />

              <Back />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Case;
