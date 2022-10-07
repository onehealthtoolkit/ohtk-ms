/* eslint-disable @next/next/no-img-element */
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";
import { observer } from "mobx-react";

type GalleryDialogProps = {
  viewModel?: GalleryDialogViewModel;
};

const GalleryDialog: React.FC<GalleryDialogProps> = ({ viewModel }) => {
  if (!viewModel) {
    return null;
  }
  return (
    <BaseModalDialog
      store={viewModel}
      heightClassName="h-[96vh]"
      widthClassName="w-[96vw]"
      renderContent={() => (
        <div className="flex flex-col items-center h-full">
          <div className="flex-grow h-[calc(100%-6rem)]">
            {viewModel.currentImage ? (
              <img
                src={viewModel.currentImage.imageUrl}
                className="max-h-full w-auto object-contain relative top-1/2 -translate-y-1/2"
                alt={viewModel.currentImage.imageUrl}
              />
            ) : (
              <span className="relative top-1/2 -translate-y-1/2">
                Please select image
              </span>
            )}
          </div>
          {viewModel.hasMultipleItems && (
            <>
              <button
                className="rounded-full bg-black hover:bg-slate-400 text-white p-2 
                        absolute left-4 top-1/2 -translate-y-16
                      "
                onClick={() => viewModel.previous()}
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <button
                className="rounded-full bg-black hover:bg-slate-400 text-white p-2 
                        absolute right-4 top-1/2 -translate-y-16
                      "
                onClick={() => viewModel.next()}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </>
          )}
          {viewModel.hasMultipleItems && (
            <div className="flex space-x-2 mt-4 overflow-x-auto w-full">
              {viewModel.images.map((image, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx === viewModel._currentIndex
                      ? "border-red-400 border-2 p-0 shadow shadow-black"
                      : "border-transparent p-1 border"
                  } h-20 w-20 cursor-pointer flex-shrink-0`}
                >
                  <img
                    onClick={() => viewModel.select(idx)}
                    src={image.thumbnailUrl}
                    className="w-full h-full object-cover"
                    alt={image.imageUrl}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      renderAction={() => null}
    />
  );
};

export default observer(GalleryDialog);
