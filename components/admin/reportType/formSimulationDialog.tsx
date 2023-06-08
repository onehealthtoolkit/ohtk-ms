import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { observer } from "mobx-react";
import { PropsWithChildren } from "react";

type FormSimulationDialogProps = {
  viewModel?: ModalDialogViewModel;
  onClose?: () => void;
};

const FormSimulationDialog: React.FC<
  PropsWithChildren<FormSimulationDialogProps>
> = ({ viewModel, children, onClose }) => {
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

export default observer(FormSimulationDialog);
