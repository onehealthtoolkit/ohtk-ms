/* eslint-disable @next/next/no-img-element */
import { CameraIcon, XCircleIcon } from "@heroicons/react/solid";
import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import "leaflet/dist/leaflet.css";
import ImagesField from "lib/opsvForm/models/fields/imagesField";
import { Observer, observer } from "mobx-react";
import { FC } from "react";

export type FormImagesFieldProps = {
  field: ImagesField;
};

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const Component: FC<FormImagesFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <div className="flex flex-row gap-2 items-start flex-wrap">
        <label
          htmlFor="caseTransition"
          className="p-4 bg-gray-200 border border-transparent 
                      hover:border-gray-400 rounded shadow cursor-pointer 
                    "
        >
          <CameraIcon className="w-5 h-5 fill-black" />
        </label>
        <input
          id="caseTransition"
          type="file"
          accept="image/*"
          placeholder="attachment"
          multiple
          onChange={async evt => {
            if (evt.target.files?.length) {
              for (let i = 0; i < evt.target.files.length; i++) {
                const file = evt.target.files.item(i);
                if (file) {
                  const base64 = await toBase64(file);
                  field.addImage(base64);
                }
              }
            }
          }}
          className="hidden"
        />
        {field.pendings
          ? field.pendings.map((id, index) => (
              <ImageFile key={id} id={id} index={index} field={field} />
            ))
          : null}
      </div>
    </FormFieldValidation>
  );
};

export const FormImagesField = observer(Component);

type ImageFileProps = {
  id: string;
  index: number;
  field: ImagesField;
};

const ImageFile: FC<ImageFileProps> = ({ id, index, field }) => {
  return (
    <Observer>
      {() => (
        <div className="h-14 w-14 border rounded bg-gray-300 relative">
          <button
            className="absolute -right-2 -top-2 z-10 bg-white rounded-full"
            onClick={() => field.removeImage(id)}
          >
            <XCircleIcon className="w-5 h-5 fill-red-500" />
          </button>
          <img
            src={field.images[index]}
            className="h-full w-full object-cover"
            alt="image"
          />
        </div>
      )}
    </Observer>
  );
};
