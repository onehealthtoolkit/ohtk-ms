import { FIELD_TYPES } from "components/admin/formBuilder/field";
import { QuestionViewModel } from "components/admin/formBuilder/question";
import { observer } from "mobx-react";
import { FC } from "react";

type FieldMenusProps = {
  value: QuestionViewModel;
};

const Menus: FC<FieldMenusProps> = ({ value: question }) => {
  return (
    <div className="py-4 flex justify-end relative">
      <button
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
      {question.isFieldMenusOpen && (
        <div className="z-10 top-14 absolute bg-white divide-y divide-gray-100 rounded shadow-md w-44">
          <ul className="py-1 text-sm text-gray-700 ">
            {FIELD_TYPES.map(fieldType => (
              <li key={fieldType}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={e => {
                    e.preventDefault();
                    question.addField(fieldType);
                    question.toggleFieldMenus();
                  }}
                >
                  {fieldType}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const FieldMenus = observer(Menus);
