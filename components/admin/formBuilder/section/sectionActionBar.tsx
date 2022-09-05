import { TrashIcon } from "@heroicons/react/solid";
import { SectionViewModel } from "components/admin/formBuilder/section/sectionViewModel";
import { observer } from "mobx-react";
import { FC, ReactNode } from "react";

export type SectionActionBarProps = {
  children?: (section: SectionViewModel) => ReactNode;
  value: SectionViewModel;
  onDelete: (id: string) => void;
};

const Bar: FC<SectionActionBarProps> = ({
  children,
  value: section,
  onDelete,
}) => {
  return (
    <>
      <div className="pt-4 flex justify-end items-center">
        {/* Trash icon */}
        <button
          type="button"
          className="group hover:bg-white rounded-3xl w-11 h-11"
          onClick={e => {
            e.preventDefault();
            onDelete(section.id);
          }}
        >
          <TrashIcon className="mx-2 w-7 h-7 text-blue-300 group-hover:text-blue-600" />
        </button>
        <span className="inline-block border-l-2 border-blue-200 w-2">
          &nbsp;
        </span>
      </div>
      {children && children(section)}
    </>
  );
};

export const SectionActionBar = observer(Bar);
