import Field, { FieldViewModel } from "components/admin/formBuilder/field";
import { MovePositionBar } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  values: FieldViewModel[];
  onMoveUp: (fieldId: string) => void;
  onMoveDown: (fieldId: string) => void;
  onSelect: (fieldId: string) => void;
  onDelete: (id: string) => void;
};

const List: FC<Props> = ({
  values: fields,
  onMoveDown,
  onMoveUp,
  onSelect,
  onDelete,
}) => {
  return (
    <>
      {fields.length > 0 ? (
        <ul className="mt-4 bg-white rounded-md ">
          {fields.map(field => (
            <li
              key={field.id}
              className={`m-2 relative flex items-stretch border-2 border-gray-100 hover:border-blue-200 rounded
              ${
                field.isCurrent ? "border-l-4 border-l-blue-400 bg-gray-50" : ""
              }`}
              onMouseOver={() => (field.isHovered = true)}
              onMouseOut={() => (field.isHovered = false)}
            >
              <MovePositionBar
                targetId={field.id}
                visible={field.isHovered}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
              />
              <Field value={field} onSelect={onSelect} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4 ml-4">No fields</p>
      )}
    </>
  );
};

export const FieldList = observer(List);
