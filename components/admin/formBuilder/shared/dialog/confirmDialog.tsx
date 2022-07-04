import { BaseDialog } from "components/admin/formBuilder/shared/dialog/baseDialog";
import { FormBuilderDialogViewModel } from "components/admin/formBuilder/shared/dialog/dialogViewModel";
import React from "react";

type Props<D> = {
  viewModel: FormBuilderDialogViewModel | undefined;
  title?: string;
  content: string;
  onYes: (data: D) => void;
  onNo?: (data: D) => void;
  container?: Element | DocumentFragment | null;
};

export const ConfirmDialog = <D extends Object>({
  viewModel: store,
  title,
  content,
  onYes,
  onNo,
  container,
}: Props<D>) => {
  return (
    <BaseDialog
      container={container}
      store={store}
      title={title}
      renderContent={() => (
        <>
          <div className="p-2 text-sm">{content}</div>
        </>
      )}
      renderAction={(dialog: FormBuilderDialogViewModel, data: D) => (
        <div
          className="grid 
        grid-cols-2 
        gap-4 
        "
        >
          <button
            className="p-2 text-sm bg-blue-500 rounded-sm w-full text-white"
            onClick={e => {
              e.preventDefault();
              onYes(data);
              dialog.close();
            }}
          >
            OK
          </button>
          <button
            className="p-2 text-sm bg-gray-300 rounded-sm w-full text-black"
            onClick={e => {
              e.preventDefault();
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
