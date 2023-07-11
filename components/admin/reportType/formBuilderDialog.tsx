import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { observer } from "mobx-react";
import { PropsWithChildren } from "react";

type FormBuilderDialogProps = {
  viewModel?: ModalDialogViewModel;
  onClose: () => void;
};

const FormBuilderDialog: React.FC<
  PropsWithChildren<FormBuilderDialogProps>
> = ({ viewModel, children, onClose }) => {
  return (
    <BaseModalDialog
      store={viewModel}
      heightClassName="h-[96vh] overflow-y-auto overflow-x-hidden"
      widthClassName="w-[96vw]"
      renderContent={() => <div className="text-left">{children}</div>}
      renderAction={() => null}
      onClose={onClose}
    />
  );
};

export default observer(FormBuilderDialog);
