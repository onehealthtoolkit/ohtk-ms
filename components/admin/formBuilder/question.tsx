import Field from "components/admin/formBuilder/field";
import { FIELD_TYPES } from "components/admin/formBuilder/fieldViewModel";
import { QuestionViewModel } from "components/admin/formBuilder/questionViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: QuestionViewModel;
};

const Question: FC<Props> = ({ value: question }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md border-2 border-gray-100">
      {question.isNameEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4 w-full"
          autoFocus
          value={question.name}
          onChange={e => question.setName(e.target.value)}
          onBlur={() => question.setIsNameEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              question.setIsNameEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200"
          onClick={() => question.setIsNameEditing(true)}
        >
          {question.name}
        </button>
      )}
      {question.isDescriptionEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4 w-full text-sm"
          autoFocus
          value={question.description}
          onChange={e => question.setDescription(e.target.value)}
          onBlur={() => question.setIsDescriptionEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              question.setIsDescriptionEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200 text-sm"
          onClick={() => question.setIsDescriptionEditing(true)}
        >
          {question.description}
        </button>
      )}
      {question.fields.length > 0 ? (
        <ul className="mt-4 bg-white rounded-md border-2 border-gray-100">
          {question.fields.map(field => (
            <li
              key={field.id}
              className="p-4 border-b border-gray-100 last:border-0"
            >
              <Field value={field} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No fields</p>
      )}
      <div className="py-4 flex justify-end relative">
        <button
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
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
          <div className="z-10 top-14 absolute bg-white divide-y divide-gray-100 rounded shadow w-44">
            <ul className="py-1 text-sm text-gray-700">
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
    </div>
  );
};

export default observer(Question);
