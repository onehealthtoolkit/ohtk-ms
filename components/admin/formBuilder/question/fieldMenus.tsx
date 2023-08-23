import { FIELD_TYPES } from "components/admin/formBuilder/field";
import { QuestionViewModel } from "components/admin/formBuilder/question";
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { getFieldIcon } from "../field/fieldIcons";
import { usePopper } from "react-popper";

type FieldMenusProps = {
  value: QuestionViewModel;
};

const Menus: FC<FieldMenusProps> = ({ value: question }) => {
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "auto",
    }
  );
  return (
    <div className="py-4 flex justify-end relative">
      <button
        ref={referenceRef}
        type="button"
        className="flex items-center rounded px-4 py-2 text-sm font-medium text-white bg-blue-600 
            hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 
        "
        onClick={() => question.toggleFieldMenus()}
      >
        <span>Add Field</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        ref={popperRef}
        style={{
          ...styles.popper,
          visibility: question.isFieldMenusOpen ? "visible" : "hidden",
        }}
        // {...styles.popper}
        {...attributes.popper}
        className="z-10 top-14 absolute bg-white divide-y divide-gray-100 rounded shadow-md w-44"
      >
        <ul className="py-1 text-sm text-gray-700 ">
          {FIELD_TYPES.map(fieldType => (
            <li key={fieldType}>
              <a
                href="#"
                className="flex flex-row  px-2 py-2 hover:bg-gray-100"
                onClick={e => {
                  e.preventDefault();
                  question.addField(fieldType);
                  question.toggleFieldMenus();
                }}
              >
                {getFieldIcon(fieldType)}
                <div className="flex items-center px-2">{fieldType}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FieldMenus = observer(Menus);
