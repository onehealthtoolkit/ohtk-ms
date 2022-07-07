import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import React from "react";

type Props<D> = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  content: string;
  onYes: (data: D) => void;
  onNo?: (data: D) => void;
};

const ConfirmDialog = <D extends Object>({
  store,
  title,
  content,
  onYes,
  onNo,
}: Props<D>) => {
  return (
    <BaseModalDialog
      store={store}
      title={title}
      renderContent={() => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-[#dc4848] mx-auto rounded-full bg-[#fbf9ea] p-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="p-4 text-lg">{content}</div>
        </>
      )}
      renderAction={(dialog: ModalDialogViewModel, data: D) => (
        <div
          className="grid 
        grid-cols-2 
        gap-4 
        "
        >
          <button
            className="p-3 bg-blue-500 rounded-md w-full text-white"
            onClick={() => {
              onYes(data);
              dialog.close();
            }}
          >
            OK
          </button>
          <button
            className="p-3 bg-gray-300 rounded-md w-full text-black"
            onClick={() => {
              onNo && onNo(data);
              dialog.close();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    />
  );
};

export default ConfirmDialog;
