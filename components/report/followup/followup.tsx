/* eslint-disable @next/next/no-img-element */
import Breadcrumb from "components/layout/breadcrumb";
import Back from "components/widgets/back";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";
import { Divide, MaskingLoader } from "components/widgets/forms";
import { formatDateTime } from "lib/datetime";
import useServices from "lib/services/provider";
import { observer, Observer } from "mobx-react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FollowupViewModel } from "./followupViewModel";

export const FollowupImage = observer(
  ({ viewModel }: { viewModel: FollowupViewModel }) => {
    return (
      <Fragment>
        <div className="flex flex-wrap  gap-4">
          {viewModel.data.images?.map((image, idx) => (
            <div key={idx} className="">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  viewModel.openGallery(image.id);
                }}
              >
                <img className="w-40 h-32" src={image.thumbnail} alt="" />
              </a>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
);

const Followup = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<FollowupViewModel | undefined>();

  useEffect(() => {
    setViewModel(new FollowupViewModel(id as string, services.followupService));
  }, [setViewModel, id, services]);

  if (viewModel === undefined) {
    return null;
  }

  return (
    <Observer>
      {() => {
        return (
          <MaskingLoader loading={viewModel.isLoading}>
            <>
              <Breadcrumb
                crumbs={[
                  { text: "Reports", href: "/reports" },
                  {
                    text: `${router.query.incidentId}`,
                    href: `/reports/${router.query.incidentId}`,
                  },
                  { text: `${id}` },
                ]}
              />
              <div>
                <div className="flex gap-2">
                  <p className="text-md dark:text-gray-400 ">
                    Created At:{" "}
                    {formatDateTime(viewModel.data.createdAt, router.locale)}
                  </p>
                </div>
                <p className="text-sm pt-1 font-bold">
                  {viewModel.data.rendererData}
                </p>
              </div>
              <Divide />

              <FollowupImage viewModel={viewModel} />

              <GalleryDialog viewModel={viewModel.galleryViewModel} />

              <Back />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default Followup;
