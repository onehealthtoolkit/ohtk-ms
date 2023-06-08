/* eslint-disable @next/next/no-img-element */
import {
  DocumentAddIcon,
  DocumentIcon,
  FilmIcon,
  MusicNoteIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import FilesField from "lib/opsvForm/models/fields/filesField";
import { Observer, observer } from "mobx-react";
import { FC, ReactElement } from "react";

export type FormFilesFieldProps = {
  field: FilesField;
};

const Component: FC<FormFilesFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <div className="flex flex-row gap-2 items-start flex-wrap">
        <label
          htmlFor={"file-" + field.name}
          className="p-4 bg-gray-200 border border-transparent 
                      hover:border-gray-400 rounded shadow cursor-pointer 
                    "
        >
          <DocumentAddIcon className="w-5 h-5 fill-black" />
        </label>
        <input
          id={"file-" + field.name}
          type="file"
          accept={field.supportTypes.join(",")}
          placeholder="attachment file"
          multiple
          onChange={async evt => {
            if (evt.target.files?.length) {
              for (let i = 0; i < evt.target.files.length; i++) {
                const file = evt.target.files.item(i);
                if (file) {
                  field.addFile(file);
                }
              }
            }
          }}
          className="hidden"
        />
        {field.pendings
          ? field.pendings.map((id, index) => (
              <FileItem key={id} id={id} index={index} field={field} />
            ))
          : null}
      </div>
    </FormFieldValidation>
  );
};

export const FormFilesField = observer(Component);

type FileItemProps = {
  id: string;
  index: number;
  field: FilesField;
};

const FileItem: FC<FileItemProps> = ({ id, index, field }) => {
  const file = field.files[index];
  console.log("file type", file.type);

  const renderIcon = (fileType: string): ReactElement => {
    if (fileType.indexOf("audio") > -1) {
      return <MusicNoteIcon className="w-full h-full fill-white" />;
    } else if (fileType.indexOf("video") > -1) {
      return <FilmIcon className="w-full h-full fill-white" />;
    } else if (fileType.indexOf("application") > -1) {
      return <DocumentIcon className="w-full h-full fill-white" />;
    } else {
      return <QuestionMarkCircleIcon className="w-full h-full fill-white" />;
    }
  };

  return (
    <Observer>
      {() => (
        <div className="h-14 w-14 border rounded bg-gray-500 relative p-2">
          <button
            className="absolute -right-2 -top-2 z-10 bg-white rounded-full"
            onClick={() => field.removeFile(id)}
          >
            <XCircleIcon className="w-5 h-5 fill-red-500" />
          </button>
          {renderIcon(file.type)}
        </div>
      )}
    </Observer>
  );
};
