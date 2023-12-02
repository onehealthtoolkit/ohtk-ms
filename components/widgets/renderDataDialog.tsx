import BaseMapModalDialog from "components/widgets/dialogs/baseMapModalDialog";
import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import { PropsWithChildren, useState } from "react";
import { RenderDataDialogViewModel } from "./renderDataDialogViewModel";
import Form from "lib/opsvForm/models/form";
import { RenderForms } from "./renderDataAsForm";

type RenderDataDialogProps = {
  viewModel: RenderDataDialogViewModel;
  form: Form;
  data: Record<string, any>;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
  onClose?: () => void;
};

const RenderDataDialog: React.FC<PropsWithChildren<RenderDataDialogProps>> = ({
  viewModel,
  form,
  data,
  imageUrlMap,
  fileUrlMap,
  onClose,
}) => {
  const [screen, setScreen] = useState(false);

  return (
    <BaseMapModalDialog
      store={viewModel}
      renderContent={() => (
        <div className="w-full h-full relative overflow-scroll">
          {screen ? (
            <div className="text-left">
              <RenderForms
                form={form}
                data={data}
                imageUrlMap={imageUrlMap}
                fileUrlMap={fileUrlMap}
              ></RenderForms>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <div
                className="flex flex-col justify-center items-center
                bg-gray-50 border-2 border-gray-200 rounded-md p-4"
              >
                <p>Loading</p>
                <Spinner />
              </div>
            </div>
          )}
        </div>
      )}
      renderAction={() => null}
      onClose={onClose}
      onOpen={() => {
        setTimeout(() => {
          // Fix issue when leaflet map is inside dialog, map renders partially.
          setScreen(true);
        }, 100);
      }}
    />
  );
};

export default observer(RenderDataDialog);
