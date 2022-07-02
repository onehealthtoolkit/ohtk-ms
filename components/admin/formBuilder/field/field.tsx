import {
  DecimalField,
  IntegerField,
  TextField,
} from "components/admin/formBuilder/field/extensions";
import {
  FieldViewModel,
  TFieldValueType,
} from "components/admin/formBuilder/field/fieldViewModel";
import { ConfirmDialog } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC, useRef } from "react";

type Props = {
  value: FieldViewModel;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onSelect, onDelete }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  function renderEditingFieldTypeComponent(type: TFieldValueType) {
    switch (type) {
      case "text":
        return (
          <TextField
            value={field}
            onDelete={() => {
              field.registerDialog("confirmDelete")?.open(field);
            }}
          />
        );
      case "integer":
        return (
          <IntegerField
            value={field}
            onDelete={() => {
              field.registerDialog("confirmDelete")?.open(field);
            }}
          />
        );
      case "decimal":
        return (
          <DecimalField
            value={field}
            onDelete={() => {
              field.registerDialog("confirmDelete")?.open(field);
            }}
          />
        );
      default:
        return "TODO more field type editing component: " + field.fieldType;
    }
  }

  function renderDisplayFieldTypeComponent(type: TFieldValueType) {
    switch (type) {
      case "text":
        return (
          <>
            <label className="p-2">{field.label}</label>
            <input
              type="text"
              className="mt-2 border border-gray-200 py-2 px-4 w-full"
              placeholder="Text answer"
              readOnly
            />
          </>
        );
      case "integer":
        return (
          <>
            <label className="p-2">{field.label}</label>
            <input
              type="number"
              className="mt-2 border border-gray-200 py-2 px-4 w-full"
              placeholder="Integer answer"
              readOnly
            />
          </>
        );
      case "decimal":
        return (
          <>
            <label className="p-2">{field.label}</label>
            <input
              type="number"
              className="mt-2 border border-gray-200 py-2 px-4 w-full"
              placeholder="Decimal answer"
              readOnly
            />
          </>
        );
      default:
        return "TODO more field type display: " + field.fieldType;
    }
  }

  return field.isCurrent ? (
    <div className="pt-4 pr-4 pb-4 w-full" ref={elementRef}>
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
      {renderEditingFieldTypeComponent(field.fieldType)}
      <ConfirmDialog
        viewModel={field.dialog("confirmDelete")}
        title="Confirm delete"
        content="Are you sure?"
        onYes={(field: FieldViewModel) => onDelete(field.id)}
        onNo={() => field.dialog("confirmDelete")?.close()}
        container={elementRef.current?.parentElement}
      />
    </div>
  ) : (
    <div className="pt-4 pr-4 pb-4 w-full" onClick={() => onSelect(field.id)}>
      {renderDisplayFieldTypeComponent(field.fieldType)}
    </div>
  );
};

export default observer(Field);
