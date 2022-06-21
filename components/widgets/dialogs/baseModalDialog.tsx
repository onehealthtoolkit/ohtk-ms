import { ModalDialogStore } from "lib/dialogViewModel";
import { Observer } from "mobx-react";
import React, { Fragment, ReactElement } from "react";
import ReactDOM from "react-dom";

type Props = {
  store: ModalDialogStore | undefined;
  title?: string;
  renderContent: (data: any) => ReactElement;
  renderAction?: (store: ModalDialogStore, data: any) => ReactElement;
};

const BaseModalDialog: React.FC<Props> = ({
  store,
  title,
  renderContent,
  renderAction,
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
              className={`z-30 w-screen h-screen bg-[#848A97] opacity-90 top-0 absolute ${hidden}`}
              onClick={() => store.close()}
            ></div>
            <div
              className={`z-30 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[20vh]
                  flex flex-col items-stretch justify-items-stretch gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] 
                  rounded-md top-1/2 left-1/2 -translate-x-1/2 absolute ${hidden}
                `}
            >
              {title && (
                <h1 className="text-center text-2xl font-medium">{title}</h1>
              )}
              <div className="text-center">{renderContent(store.data)}</div>
              <div>{renderAction && renderAction(store, store.data)}</div>
            </div>
          </Fragment>,
          document.body
        );
      }}
    </Observer>
  );
};

export default BaseModalDialog;
