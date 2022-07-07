import { CheckCircleIcon } from "@heroicons/react/solid";
import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import React from "react";

type Props<D> = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  content: string;
  onOk?: (data: D) => void;
};

const AlertDialog = <D extends Object>({
  store,
  title,
  content,
  onOk,
}: Props<D>) => {
  return (
    <BaseModalDialog
      store={store}
      title={title}
      renderContent={() => (
        <>
          <CheckCircleIcon className="text-green-400 w-20 h-20 m-auto" />
          <div className="p-2 text-lg">{content}</div>
        </>
      )}
      renderAction={(dialog: ModalDialogViewModel, data: D) => (
        <div
          className="grid 
        grid-cols-1 
        gap-4 
        "
        >
          <button
            className="p-3 bg-blue-500 rounded-md w-full text-white"
            onClick={() => {
              onOk && onOk(data);
              dialog.close();
            }}
          >
            OK
          </button>
        </div>
      )}
    />
  );
};

export default AlertDialog;
