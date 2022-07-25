import { PhotographIcon, PlusIcon } from "@heroicons/react/solid";
import {
  DateField,
  DecimalField,
  ImagesField,
  IntegerField,
  LocationField,
  MultiplechoicesField,
  SinglechoicesField,
  TextField,
} from "components/admin/formBuilder/field/extensions";
import {
  FieldViewModel,
  TFieldValueType,
} from "components/admin/formBuilder/field/fieldViewModel";
import { ConfirmDialog } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import Image from "next/image";
import { FC, useRef } from "react";

type Props = {
  value: FieldViewModel;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onSelect, onDelete }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onDeleteConfirm = () => {
    field.registerDialog("confirmDelete")?.open(field);
  };

  function renderEditingFieldTypeComponent(type: TFieldValueType) {
    switch (type) {
      case "text":
        return <TextField value={field} onDelete={onDeleteConfirm} />;
      case "integer":
        return <IntegerField value={field} onDelete={onDeleteConfirm} />;
      case "decimal":
        return <DecimalField value={field} onDelete={onDeleteConfirm} />;
      case "date":
        return <DateField value={field} onDelete={onDeleteConfirm} />;
      case "images":
        return <ImagesField value={field} onDelete={onDeleteConfirm} />;
      case "location":
        return <LocationField value={field} onDelete={onDeleteConfirm} />;
      case "singlechoices":
        return <SinglechoicesField value={field} onDelete={onDeleteConfirm} />;
      case "multiplechoices":
        return (
          <MultiplechoicesField value={field} onDelete={onDeleteConfirm} />
        );
      default:
        return "Undefined field type component: " + field.fieldType;
    }
  }

  function renderDisplayFieldTypeComponent(type: TFieldValueType) {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            className="mt-2 border border-gray-200 py-2 px-4 w-full rounded-sm bg-gray-50"
            placeholder="Text answer"
            value=""
            readOnly
          />
        );
      case "integer":
        return (
          <input
            type="number"
            className="mt-2 border border-gray-200 py-2 px-4 w-full rounded-sm bg-gray-50"
            placeholder="Integer answer"
            value=""
            readOnly
          />
        );
      case "decimal":
        return (
          <input
            type="number"
            className="mt-2 border border-gray-200 py-2 px-4 w-full rounded-sm bg-gray-50"
            placeholder="Decimal answer"
            value=""
            readOnly
          />
        );
      case "date":
        return (
          <div className="flex mt-2 ">
            <input
              type="number"
              className="border border-gray-200 py-2 px-4 w-1/3 mr-2 rounded-sm bg-gray-50"
              placeholder="Day"
              value=""
              readOnly
            />
            <input
              type="number"
              className="border border-gray-200 py-2 px-4 w-1/3 mr-2 rounded-sm bg-gray-50"
              placeholder="Month"
              value=""
              readOnly
            />
            <input
              type="number"
              className="border border-gray-200 py-2 px-4 w-1/3 rounded-sm bg-gray-50"
              placeholder="Year"
              value=""
              readOnly
            />
          </div>
        );
      case "images":
        return (
          <div className="flex flex-wrap mt-2">
            <div className="w-20 h-20 border rounded-sm border-gray-200 bg-gray-50 flex items-center justify-center mr-2">
              <PhotographIcon className="w-8 h-8 text-gray-300" />
            </div>
            <div className="w-20 h-20 border rounded-sm border-gray-200 bg-gray-50 flex items-center justify-center mr-2">
              <PhotographIcon className="w-8 h-8 text-gray-300" />
            </div>
            <div className="w-20 h-20 border rounded-sm border-gray-200 bg-gray-50 flex items-center justify-center">
              <PlusIcon className="w-8 h-8 text-gray-300" />
            </div>
          </div>
        );
      case "location":
        return (
          <div className="flex flex-col items-stretch w-1/2 mt-2">
            <Image
              src="/gmap.jpeg"
              alt="gmap"
              width="100%"
              height="100"
              className="grayscale"
            />
          </div>
        );
      case "singlechoices": {
        const fieldExtension = field.getExtension<"singlechoices">();
        return (
          <ul>
            {fieldExtension.choices.length > 0 ? (
              fieldExtension.choices.map(choice => {
                return (
                  <li
                    key={choice.id}
                    className="flex text-sm items-center mt-2 ml-2 relative"
                  >
                    <div className="rounded-full w-5 h-5 border border-gray-400 bg-white"></div>
                    <input
                      className="block border-0 py-2 px-4 flex-grow rounded mr-2"
                      type={"text"}
                      value={choice.label}
                      placeholder="Label"
                      readOnly
                    />
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500 mt-4 ml-2">No choices</li>
            )}
          </ul>
        );
      }
      case "multiplechoices": {
        const fieldExtension = field.getExtension<"multiplechoices">();
        return (
          <ul>
            {fieldExtension.choices.length > 0 ? (
              fieldExtension.choices.map(choice => {
                return (
                  <li
                    key={choice.id}
                    className="flex text-sm items-center mt-2 ml-2 relative"
                  >
                    <div className="rounded-sm w-5 h-5 border border-gray-400 bg-white"></div>
                    <input
                      className="block border-0 py-2 px-4 flex-grow rounded mr-2"
                      type={"text"}
                      value={choice.label}
                      placeholder="Label"
                      readOnly
                    />
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500 mt-4 ml-2">No choices</li>
            )}
          </ul>
        );
      }
      default:
        return "Undefined " + field.fieldType;
    }
  }

  return field.isCurrent ? (
    <div className="pt-4 pr-4 pb-4 w-full" ref={elementRef}>
      <h4 className="text-sm text-gray-600">Field Label (optional)</h4>
      <div className="flex">
        <div className="flex-grow">
          {field.isLabelEditing ? (
            <input
              className="bg-blue-50 py-2 px-4 w-full"
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
            <input
              className="border-b border-gray-200 hover:border-blue-600 py-2 px-4 rounded w-full cursor-pointer"
              type={"text"}
              value={field.label}
              placeholder="Field Label"
              readOnly
              onClick={() => field.setIsLabelEditing(true)}
            />
          )}
        </div>
        <div className="border border-gray-200 rounded  p-2 ml-4 text-blue-600 font-medium">
          {field.fieldTypeName}
        </div>
      </div>
      <div className="mt-1">
        <h4 className="text-sm text-gray-600">Variable name *</h4>
        {field.isNameEditing ? (
          <input
            className="bg-blue-50 py-2 px-4 w-full text-sm"
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
          <input
            className="border-b border-gray-200 hover:border-blue-600 py-2 px-4 rounded w-full text-sm cursor-pointer"
            type={"text"}
            value={field.name}
            placeholder="Name"
            readOnly
            onClick={() => field.setIsNameEditing(true)}
          />
        )}
      </div>
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
      <label className="p-2">
        {field.label || <span className="text-gray-400">Field Label</span>}
      </label>
      {renderDisplayFieldTypeComponent(field.fieldType)}
    </div>
  );
};

export default observer(Field);
