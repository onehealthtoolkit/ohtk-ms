import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { SectionViewModel } from "components/admin/formBuilder/section";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  values: SectionViewModel[];
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

const List: FC<Props> = ({
  values: sections,
  onMoveDown,
  onMoveUp,
  onSelect,
  onAdd,
}) => {
  return (
    <div className="bg-white border p-4 border-gray-200 w-full md:w-1/4">
      <div className={"flex flex-col md:min-h-[400px]"}>
        {sections.map(section => {
          return (
            <div
              key={section.id}
              className={`flex items-center text-sm font-medium border-b border-gray-200
                 ${
                   section.isCurrent
                     ? "bg-blue-600 text-white"
                     : "bg-gray-100 text-gray-900"
                 } group`}
            >
              <ChevronDownIcon
                className="text-white w-5 self-stretch bg-blue-300 invisible group-hover:visible hover:bg-blue-600 cursor-pointer"
                onClick={() => onMoveDown(section.id)}
              />
              <span
                className="p-2 w-full text-left cursor-pointer"
                onClick={() => onSelect(section.id)}
              >
                {section.label || (
                  <span className="text-gray-400">Section</span>
                )}
              </span>
              <ChevronUpIcon
                className="text-white w-5 self-stretch bg-blue-300 invisible group-hover:visible hover:bg-blue-600 cursor-pointer"
                onClick={() => onMoveUp(section.id)}
              />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onAdd()}
        className="flex flex-shrink justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
      >
        <span>Add Section</span>
      </button>
    </div>
  );
};

export const SectionList = observer(List);
