import { XCircleIcon } from "@heroicons/react/solid";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { Observer } from "mobx-react";
import React, { Fragment, ReactElement } from "react";
import ReactDOM from "react-dom";

type Props = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  // tailwind css ie. h-screen, min-h-[50vh], sm:h-1/3; default to "min-h-[30vh]"
  heightClassName?: string;
  // tailwind css; default to "sm:w-[385px] sm:min-w-[30vw] min-w-[80vw]"
  widthClassName?: string;
  renderContent: (data: any) => ReactElement;
  renderAction?: (
    store: ModalDialogViewModel,
    data: any
  ) => ReactElement | null;
};

const BaseModalDialog: React.FC<Props> = ({
  store,
  title,
  heightClassName,
  widthClassName,
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
              className={`z-[1001] w-screen h-screen bg-[#848A97] opacity-90 top-0 absolute ${hidden}`}
              onClick={() => store.close()}
            ></div>
            <div
              className={`z-[1001] ${heightClassName || "min-h-[30vh]"}      
                  ${
                    widthClassName ||
                    "sm:w-[385px] sm:min-w-[30vw] min-w-[80vw]"
                  }
                  flex flex-col items-stretch justify-items-stretch gap-2 -translate-y-1/2 p-6 bg-white 
                  rounded-md top-1/2 left-1/2 -translate-x-1/2 absolute ${hidden}
                `}
            >
              {title && (
                <h1 className="text-center text-xl font-medium">{title}</h1>
              )}
              <div className="h-full text-center">
                {renderContent(store.data)}
              </div>
              <button
                className="absolute right-4 top-4"
                onClick={() => store.close()}
              >
                <XCircleIcon className="w-8 h-8 fill-red-400" />
              </button>
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
