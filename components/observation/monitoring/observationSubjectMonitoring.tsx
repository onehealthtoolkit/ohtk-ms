/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { observer, Observer } from "mobx-react";
import { Divide, MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ObservationSubjectMonitoringViewModel } from "./observationSubjectMonitoringViewModel";
import { useRouter } from "next/router";
import { RenderData, TR } from "components/widgets/renderData";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";
import ViewActionButtons from "components/widgets/viewActionButtons";
import { formatYmdt } from "lib/datetime";

const SubjectMonitoringInformation = observer(
  ({ viewModel }: { viewModel: ObservationSubjectMonitoringViewModel }) => {
    return (
      <div className="relative overflow-x-auto w-full">
        <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <TR
              label="Created at"
              value={formatYmdt(viewModel.data.createdAt)}
            />

            <TR label="Subject Title" value={viewModel.data.subjectTitle} />
            <TR
              label="Subject Description"
              value={viewModel.data.subjectDescription}
            />
            <TR label="Title" value={viewModel.data.title} />

            <TR label="Description" value={viewModel.data.description} />
          </tbody>
        </table>
      </div>
    );
  }
);

const SubjectMonitoringImage = observer(
  ({ viewModel }: { viewModel: ObservationSubjectMonitoringViewModel }) => {
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

const ObservationSubjectMonitoring = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<
    ObservationSubjectMonitoringViewModel | undefined
  >();

  useEffect(() => {
    setViewModel(
      new ObservationSubjectMonitoringViewModel(
        id as string,
        services.observationService
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
              <div>
                <div className="flex gap-2">
                  <p className="text-md dark:text-gray-400 ">
                    Title: {viewModel.data.title}
                  </p>
                </div>
                <p className="text-sm pt-1 font-bold">
                  {viewModel.data.description}
                </p>
              </div>
              <Divide hilight={true} />

              <div className="flex flex-row gap-2 md:flex-nowrap flex-wrap ">
                <SubjectMonitoringInformation viewModel={viewModel} />
              </div>

              <SubjectMonitoringImage viewModel={viewModel} />

              <Divide />

              <div className="mb-4">
                <RenderData
                  data={viewModel.data.formData}
                  definition={viewModel.data.formDefinition}
                  imageUrlMap={viewModel.imageUrlMap}
                  fileUrlMap={viewModel.fileUrlMap}
                />
              </div>

              <Divide />
              <GalleryDialog viewModel={viewModel.galleryViewModel} />

              <ViewActionButtons />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default ObservationSubjectMonitoring;
