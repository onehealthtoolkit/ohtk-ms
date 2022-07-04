import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import {
  FieldActioBar,
  FieldViewModel,
} from "components/admin/formBuilder/field";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onDelete }) => {
  const fieldExtension = field.getExtension<"singlechoices">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <ul>
        {fieldExtension.choices.length > 0 ? (
          fieldExtension.choices.map(choice => {
            return (
              <li
                key={choice.id}
                className="flex text-sm items-center mt-2 relative"
                onMouseOver={() => choice.setIsHovered(true)}
                onMouseOut={() => choice.setIsHovered(false)}
              >
                {choice.isHovered ? (
                  <button
                    type="button"
                    className="group hover:bg-white rounded-full w-5 h-5 mr-2"
                    onClick={() => {
                      fieldExtension.deleteChoice(choice.id);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 text-blue-300 group-hover:text-blue-600" />
                  </button>
                ) : (
                  <div className="mr-2 rounded-full w-5 h-5 border border-gray-400 bg-white"></div>
                )}
                <input
                  className="block border-b border-gray-200 py-2 px-4 flex-grow rounded mr-2"
                  type={"text"}
                  value={choice.label}
                  placeholder="Label"
                  onChange={e => choice.setLabel(e.target.value)}
                />
                <input
                  className="block border-b border-gray-200 py-2 px-4 w-28 rounded mr-2"
                  type={"text"}
                  value={choice.value}
                  placeholder="Value"
                  onChange={e => choice.setValue(e.target.value)}
                />
                <label
                  htmlFor={"textInput" + choice.id}
                  className="flex flex-col items-center pl-2 text-xs"
                >
                  <input
                    id={"textInput" + choice.id}
                    className="w-4 h-4"
                    type={"checkbox"}
                    checked={choice.hasTextInput}
                    onChange={() =>
                      choice.setHasTextInput(!choice.hasTextInput)
                    }
                  />
                  <span>Text</span>
                </label>
              </li>
            );
          })
        ) : (
          <li className="text-gray-500 mt-4 ml-4">No choices</li>
        )}
        <li className="py-4 flex justify-start">
          <button
            type="button"
            className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
            onClick={() => fieldExtension.addChoice()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>Add Choice</span>
          </button>
        </li>
      </ul>
      <FieldActioBar value={field} onDelete={onDelete}>
        {field => <Advance field={field} />}
      </FieldActioBar>
    </div>
  );
};

type AdvanceProps = {
  field: FieldViewModel;
};

const Advance: FC<AdvanceProps> = ({ field }) => {
  return <div>Advance condition : {field.fieldType}</div>;
};

export const SinglechoicesField = observer(Field);
