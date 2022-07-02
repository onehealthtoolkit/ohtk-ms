import { FormBuilderDialogViewModel } from "components/admin/formBuilder/shared/dialog/dialogViewModel";
import { Observer } from "mobx-react";
import React, { Fragment, ReactElement } from "react";
import ReactDOM from "react-dom";

type Props = {
  store: FormBuilderDialogViewModel | undefined;
  title?: string;
  renderContent: (data: any) => ReactElement;
  renderAction?: (store: FormBuilderDialogViewModel, data: any) => ReactElement;
  container?: Element | DocumentFragment | null;
};

export const BaseDialog: React.FC<Props> = ({
  store,
  title,
  renderContent,
  renderAction,
  container,
}: Props) => {
  if (!store) {
    return null;
  }
  return (
    <Observer>
      {() => {
        const hidden = !store.isOpen ? "hidden" : "";

        return ReactDOM.createPortal(
          <Fragment>
            <div
              className={`z-30 w-full h-full bg-[#848A97] opacity-90 top-0 absolute ${hidden}`}
              onClick={() => store.close()}
            ></div>
            <div
              className={`z-30 min-w-[20vw] min-h-[5vh]
                  flex flex-col items-stretch justify-items-stretch gap-2 -translate-y-1/2 p-6 bg-white 
                  rounded-md top-1/2 left-1/2 -translate-x-1/2 absolute ${hidden}
                `}
            >
              {title && (
                <h1 className="text-center text-base font-medium">{title}</h1>
              )}
              <div className="text-center">{renderContent(store.data)}</div>
              <div>{renderAction && renderAction(store, store.data)}</div>
            </div>
          </Fragment>,
          container || document.body
        );
      }}
    </Observer>
  );
};
