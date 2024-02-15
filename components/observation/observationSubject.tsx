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
import { ObservationSubjectViewModel } from "./observationSubjectViewModel";
import { useRouter } from "next/router";
import { RenderData, TR } from "components/widgets/renderData";
import dynamic from "next/dynamic";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";
import ViewActionButtons from "components/widgets/viewActionButtons";
import { formatDateTime, formatYmdt } from "lib/datetime";
import { EyeIcon } from "@heroicons/react/solid";
import Table from "components/widgets/table";
import TotalItem from "components/widgets/table/totalItem";
import { useTranslation } from "react-i18next";

const SubjectLocation = dynamic(() => import("../case/reportMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const SubjectInformation = observer(
  ({ viewModel }: { viewModel: ObservationSubjectViewModel }) => {
    return (
      <div className="relative overflow-x-auto md:w-1/2 w-full">
        <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <TR
              label="Created at"
              value={formatYmdt(viewModel.data.createdAt)}
            />
            <TR label="Definition name" value={viewModel.data.definitionName} />
            <TR label="Identity" value={viewModel.data.identity} />

            <TR label="Title" value={viewModel.data.title} />

            <TR label="Description" value={viewModel.data.description} />
          </tbody>
        </table>
      </div>
    );
  }
);

const SubjectImage = observer(
  ({ viewModel }: { viewModel: ObservationSubjectViewModel }) => {
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

const ObservationSubject = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<
    ObservationSubjectViewModel | undefined
  >();

  const { t } = useTranslation();

  useEffect(() => {
    setViewModel(
      new ObservationSubjectViewModel(id as string, services.observationService)
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
                    {t("form.label.identity", "Identity")} :{" "}
                    {viewModel.data.identity}
                  </p>
                </div>
                <p className="text-sm pt-1 font-bold">
                  {t("form.label.title", "Title")}: {viewModel.data.title}
                </p>
              </div>
              <Divide hilight={true} />

              <div className="flex flex-row gap-2 md:flex-nowrap flex-wrap ">
                <SubjectInformation viewModel={viewModel} />
                <div className="md:w-1/2 w-full h-[300px] md:h-auto">
                  <SubjectLocation lnglat={viewModel.data.gpsLocation} />
                </div>
              </div>

              <SubjectImage viewModel={viewModel} />

              <Divide />
              {viewModel.hasMonitoringRecords && (
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
                        <span>Latest Form Data</span>
                      </>
                    )}
                  </TabItem>
                  <TabItem
                    id="originFormData"
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
                        <span>Original Form Data</span>
                      </>
                    )}
                  </TabItem>
                </TabBar>
              )}
              <div className="mb-4">
                {viewModel.activeTabIndex == 0 && (
                  <RenderData
                    data={viewModel.data.formData}
                    definition={viewModel.data.registerFormDefinition}
                    imageUrlMap={viewModel.imageUrlMap}
                    fileUrlMap={viewModel.fileUrlMap}
                  />
                )}
                {viewModel.activeTabIndex == 1 &&
                  viewModel.hasMonitoringRecords && (
                    <RenderData
                      data={viewModel.data.originFormData}
                      definition={viewModel.data.registerFormDefinition}
                      imageUrlMap={viewModel.imageUrlMap}
                      fileUrlMap={viewModel.fileUrlMap}
                    />
                  )}
              </div>

              <Divide />
              <div className="flex justify-between">
                <label className="mt-4 px-4 text-gray-700 text-sm font-bold flex gap-1">
                  <EyeIcon className="w-5 h-5" />
                  <span>{t("form.label.monitoring", "Monitoring")}</span>
                </label>
                <TotalItem
                  totalCount={viewModel.data.subjectMonitorings?.length}
                  onRefresh={() => viewModel.fetch(true)}
                />
              </div>

              <div className="gap-2">
                <Table
                  columns={[
                    {
                      label: t("form.label.createdAt", "Created At"),
                      get: record =>
                        formatDateTime(record.createdAt, router.locale),
                    },
                    {
                      label: t("form.label.title", "Title"),
                      get: record => record.title,
                    },
                    {
                      label: t("form.label.description", "Description"),
                      get: record => record.description,
                    },
                  ]}
                  data={viewModel.data.subjectMonitorings || []}
                  onView={record =>
                    router.push({
                      pathname: `/observations/monitorings/${record.id}`,
                      query: router.query,
                    })
                  }
                />
              </div>
              <GalleryDialog viewModel={viewModel.galleryViewModel} />

              <ViewActionButtons />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default ObservationSubject;
