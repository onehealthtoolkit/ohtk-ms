import { XCircleIcon } from "@heroicons/react/solid";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { Observer } from "mobx-react";
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { setTimeout } from "timers";

type Props = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  renderContent: (data: any) => ReactNode;
  renderAction?: (
    store: ModalDialogViewModel,
    data: any
  ) => ReactElement | null;
  onClose?: (data?: unknown) => void;
  onOpen?: (data?: unknown) => void;
};

const BaseMapModalDialog: React.FC<Props> = ({
  store,
  title,
  renderContent,
  renderAction,
  onClose,
  onOpen,
}: Props) => {
  const [hidden, setHidden] = useState("hidden");

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (store?.isOpen) {
          console.log("close dialog");
          onClose && onClose();
          store?.close();
          setHidden("hidden");
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
        if (hidden.length && store.isOpen) {
          console.log("open dialog");
          onOpen && onOpen();
          // Fix warning,
          // react cannot update a component (`BaseModalDialog`)
          // while rendering a different component (`Observer`).
          setTimeout(() => {
            setHidden("");
          }, 100);
        }

        return ReactDOM.createPortal(
          <Fragment>
            <div
              className={`z-[1001] w-screen h-screen bg-[#848A97] opacity-90 top-0 absolute ${hidden}`}
              onClick={() => {
                onClose && onClose();
                store.close();
                setHidden("hidden");
              }}
            ></div>
            <div
              className={`z-[1001] h-screen w-screen
                  flex flex-col items-stretch justify-items-stretch gap-2 -translate-y-1/2 p-3 md:p-6 bg-white 
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
                className="absolute right-4 top-4 z-[1001]"
                onClick={() => {
                  onClose && onClose();
                  store.close();
                  setHidden("hidden");
                }}
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

export default BaseMapModalDialog;
