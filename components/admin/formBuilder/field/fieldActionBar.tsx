import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { FieldViewModel } from "components/admin/formBuilder/field/fieldViewModel";
import { observer } from "mobx-react";
import { FC, ReactNode } from "react";

export type FieldActionBarProps = {
  children: (field: FieldViewModel) => ReactNode;
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Bar: FC<FieldActionBarProps> = ({ children, value: field, onDelete }) => {
  return (
    <>
      <div className="w-full pt-4 mt-8 border-t border-blue-200 flex justify-end items-center">
        {/* Trash icon */}
        <button
          type="button"
          className="group hover:bg-white rounded-3xl w-11 h-11"
          onClick={e => {
            e.preventDefault();
            onDelete(field.id);
          }}
        >
          <TrashIcon className="mx-2 w-7 h-7 text-blue-300 group-hover:text-blue-600" />
        </button>
        <span className="inline-block border-l-2 border-blue-200 w-2">
          &nbsp;
        </span>
        {/* Switch button */}
        <label
          htmlFor="required-toggle"
          className="inline-flex relative items-center cursor-pointe"
        >
          <input
            type="checkbox"
            value=""
            id="required-toggle"
            className="sr-only peer"
            checked={field.isRequired}
            onChange={() => field.toggleRequired()}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
            "
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            Required
          </span>
        </label>
        {/* More advance menu */}
        <button
          type="button"
          className="group hover:bg-white rounded-full w-10 h-10 ml-4"
          onClick={e => {
            e.preventDefault();
            field.toggleAdvanceOn();
          }}
        >
          <span className="m-2 w-6 h-6 text-blue-300 group-hover:text-blue-600 inline-block">
            {field.isAdvanceOn ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>
      </div>
      {field.isAdvanceOn && (
        <div className="rounded-md py-4">{children(field)}</div>
      )}
    </>
  );
};

export const FieldActioBar = observer(Bar);
