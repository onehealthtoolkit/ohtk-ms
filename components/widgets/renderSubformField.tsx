import { PropsWithChildren, useState } from "react";
import { RenderSubformFieldViewModel } from "./renderSubformFieldViewModel";
import SubformField from "lib/opsvForm/models/fields/subformField";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import BaseModalDialog from "./dialogs/baseModalDialog";
import { RenderFormData } from "./renderData";
import Form from "lib/opsvForm/models/form";

type FormDialogProps = {
  viewModel?: ModalDialogViewModel;
  onClose?: () => void;
};

const FormDialog: React.FC<PropsWithChildren<FormDialogProps>> = ({
  viewModel,
  children,
  onClose,
}) => {
  return (
    <BaseModalDialog
      store={viewModel}
      heightClassName="h-[96vh] overflow-y-auto"
      widthClassName="w-[96vw]"
      renderContent={() => (
        <div className="text-left min-w-[80vw]">{children}</div>
      )}
      renderAction={() => null}
      onClose={onClose}
    />
  );
};

type RenderSubformFieldProps = {
  form: Form;
  data: Record<string, any>;
  field: SubformField;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
};

const RenderSubformField: React.FC<RenderSubformFieldProps> = ({
  form,
  data,
  imageUrlMap,
  fileUrlMap,
}) => {
  const [viewModel] = useState(
    new RenderSubformFieldViewModel().registerDialog("formDataDialog")
  );

  return (
    <>
      <div className="flex gap-2 m-2">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex-1">{data.subformTitle}</div>
          <div className="flex-1">{data.subformDescription}</div>
        </div>
        <div>
          <button
            className=" px-4 py-2 border text-blue-500 border-blue-700 hover:border-blue-500 rounded"
            onClick={e => {
              e.preventDefault();
              form?.loadJsonValue(data);
              viewModel.dialog("formDataDialog")?.open(null);
            }}
          >
            View
          </button>
        </div>
      </div>

      <FormDialog
        viewModel={viewModel.dialog("formDataDialog")}
        onClose={() => true}
      >
        <RenderFormData
          form={form}
          data={data}
          imageUrlMap={imageUrlMap}
          fileUrlMap={fileUrlMap}
        />
      </FormDialog>
    </>
  );
};

export default RenderSubformField;
