import { XCircleIcon } from "@heroicons/react/solid";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { Observer } from "mobx-react";
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";

type Props = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  // tailwind css ie. h-screen, min-h-[50vh], sm:h-1/3; default to "min-h-[30vh]"
  heightClassName?: string;
  // tailwind css; default to "sm:w-[385px] sm:min-w-[30vw] min-w-[80vw]"
  widthClassName?: string;
  renderContent: (data: any) => ReactNode;
  renderAction?: (
    store: ModalDialogViewModel,
    data: any
  ) => ReactElement | null;
  onClose?: (data?: unknown) => void;
};

const BaseModalDialog: React.FC<Props> = ({
  store,
  title,
  heightClassName,
  widthClassName,
  renderContent,
  renderAction,
  onClose,
}: Props) => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (store?.isOpen) {
          console.log("close dialog");
          onClose && onClose();
          store?.close();
        }
      }
    },
    [store, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
      console.log("remove listener esc");
    };
  }, [escFunction]);

  if (!store) {
    return null;
  }

  return (
    <Observer>
      {() => {
        return store.isOpen
          ? ReactDOM.createPortal(
              <Fragment>
                <div
                  className={`z-[1001] w-screen h-screen bg-[#848A97] opacity-90 top-0 absolute`}
                  onClick={() => {
                    onClose && onClose();
                    store.close();
                  }}
                ></div>
                <div
                  className={`z-[1001] ${
                    heightClassName || "min-h-[30vh]"
                  }      
                  ${
                    widthClassName ||
                    "sm:w-[385px] sm:min-w-[30vw] min-w-[80vw]"
                  }
                  flex flex-col items-stretch justify-items-stretch gap-2 -translate-y-1/2 p-3 md:p-6 bg-white 
                  rounded-md top-1/2 left-1/2 -translate-x-1/2 absolute
                `}
                >
                  {title && (
                    <h1 className="text-left text-base font-medium">{title}</h1>
                  )}
                  <div className="flex h-full">
                    <div className="m-auto h-full">
                      {renderContent(store.data)}
                    </div>
                  </div>
                  <button
                    className="absolute right-4 top-4 z-[1001]"
                    onClick={() => {
                      onClose && onClose();
                      store.close();
                    }}
                  >
                    <XCircleIcon className="w-8 h-8 fill-red-400" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2">
                    {renderAction && renderAction(store, store.data)}
                  </div>
                </div>
              </Fragment>,
              document.body
            )
          : null;
      }}
    </Observer>
  );
};

export default BaseModalDialog;
