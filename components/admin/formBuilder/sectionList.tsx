import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { SectionViewModel } from "components/admin/formBuilder/sectionViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  values: SectionViewModel[];
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

const SectionList: FC<Props> = ({
  values: sections,
  onMoveDown,
  onMoveUp,
  onSelect,
  onAdd,
}) => {
  return (
    <div className="text-gray-900 bg-white border p-4 border-gray-200 w-full md:w-1/4">
      <div className={"flex flex-col min-h-[400px] "}>
        {sections.map(section => {
          return (
            <div
              key={section.id}
              className={`flex items-center text-sm font-medium border-b border-gray-200
                 ${
                   section.isCurrent
                     ? "bg-blue-600 text-white"
                     : "bg-gray-100 text-black"
                 } hover:border-gray-200 `}
            >
              <ChevronDownIcon
                className="text-white w-5 h-5 bg-blue-600 hover:bg-blue-800  cursor-pointer"
                onClick={() => onMoveDown(section.id)}
              />
              <span
                className="px-2 w-full text-left cursor-pointer"
                onClick={() => onSelect(section.id)}
              >
                {section.name}
              </span>
              <ChevronUpIcon
                className="text-white w-5 h-5 bg-blue-600 hover:bg-blue-800  cursor-pointer"
                onClick={() => onMoveUp(section.id)}
              />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="flex flex-shrink justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
      >
        <span onClick={() => onAdd()}>Add Section</span>
      </button>
    </div>
  );
};

export default observer(SectionList);
