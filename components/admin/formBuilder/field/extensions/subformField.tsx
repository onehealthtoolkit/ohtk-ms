import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  FieldActionBar,
  FieldViewModel,
} from "components/admin/formBuilder/field";
import { AdvanceCondition } from "components/admin/formBuilder/shared";
import DataTemplateField from "components/admin/reportType/dataTemplateField";
import { observer } from "mobx-react";
import { FC, Fragment } from "react";

type Props = {
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onDelete }) => {
  const fieldExtension = field.getExtension<"subform">();
  const subforms = field.question.section.form.parent
    ? field.question.section.form.parent.subforms.filter(
        item => item.id != field.question.section.form.id
      )
    : field.question.section.form.subforms;

  const getSubForm = () => {
    if (fieldExtension.formRef) {
      const subform = subforms.find(item => item.id == fieldExtension.formRef);
      return subform;
    }
    return null;
  };
  return (
    <div className="pt-4 pr-4 pb-4 w-full">
      <Menu as="div" className="relative inline-block text-left mb-2">
        <div>
          <Menu.Button
            className="flex items-center rounded px-4 py-2 text-sm font-medium text-white bg-blue-600 
          hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 
      "
          >
            {fieldExtension.formRef || "Select sub form"}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-slate-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-[10] absolute left-0 mt-0 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {subforms.map(subform => (
                <Menu.Item key={subform.id}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => fieldExtension.setFormRef(subform.id)}
                    >
                      {subform.id}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <h4 className="text-sm text-gray-600">Title Template</h4>
      <input
        className="border border-gray-200 py-2 px-4 w-full rounded-sm"
        type={"text"}
        value={fieldExtension.titleTemplate}
        onChange={e => fieldExtension.setTitleTemplate(e.target.value)}
      />
      <h4 className="text-sm text-gray-600">DescriptionTemplate</h4>
      <DataTemplateField
        className="h-[80px]"
        placeholder="Description Template"
        value={fieldExtension.descriptionTemplate || ""}
        onChange={value => fieldExtension.setDescriptionTemplate(value)}
        mentionType={"label"}
        variableList={getSubForm()?.variableList || []}
      />
      <FieldActionBar value={field} onDelete={onDelete}>
        {field => <AdvanceCondition viewModel={field} />}
      </FieldActionBar>
    </div>
  );
};

export const SubformField = observer(Field);
