import { FieldViewModel } from "components/admin/formBuilder/field/fieldViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
  onSelect: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onSelect }) => {
  return field.isCurrent ? (
    <div className="p-4 w-full">
      {field.isLabelEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4 w-full"
          autoFocus
          value={field.label}
          onChange={e => field.setLabel(e.target.value)}
          onBlur={() => field.setIsLabelEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              field.setIsLabelEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200"
          onClick={() => field.setIsLabelEditing(true)}
        >
          {field.label}
        </button>
      )}
      {field.isNameEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4 w-full text-sm"
          autoFocus
          value={field.name}
          onChange={e => field.setName(e.target.value)}
          onBlur={() => field.setIsNameEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              field.setIsNameEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200 text-sm"
          onClick={() => field.setIsNameEditing(true)}
        >
          {field.name}
        </button>
      )}
    </div>
  ) : (
    <div className="p-4 w-full" onClick={() => onSelect(field.id)}>
      [{field.fieldType}] label:{field.label} / name:{field.name}
    </div>
  );
};

export default observer(Field);
