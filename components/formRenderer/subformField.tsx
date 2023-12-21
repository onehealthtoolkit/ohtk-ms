import { PlusCircleIcon } from "@heroicons/react/solid";
import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import SubformField from "lib/opsvForm/models/fields/subformField";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { SubformFieldViewModel } from "./subformFieldViewModel";
import FormSimulation from "components/admin/formBuilder/simulator/formSimulation";
import FormSimulationDialog from "components/admin/reportType/formSimulationDialog";

export type FormSubformFieldProps = {
  field: SubformField;
  definition: string;
};

const Component: FC<FormSubformFieldProps> = ({ field, definition }) => {
  const [viewModel] = useState(() =>
    new SubformFieldViewModel(field).registerDialog("subformFieldDialog")
  );

  const TR = (props: { label: string; value: string }) => {
    const { label, value } = props;
    return (
      <tr className="flex bg-white border even:bg-slate-50 dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white"
        >
          {label}
        </th>
        <td className="px-6 py-4">{value}</td>
      </tr>
    );
  };

  return (
    <>
      <FormFieldValidation field={field}>
        <h4 className="text-sm text-gray-600">{field.label}</h4>
        <div className="flex items-center flex-wrap mb-4 gap-2">
          <div className="flex-1">
            <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {viewModel.values.map((item, index) => (
                  <TR
                    key={`subfield-v-${index}`}
                    label={item.title}
                    value={item.description}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="self-start flex flex-row items-center justify-center
            gap-2 rounded text-sm font-medium py-2 px-4 
           bg-gray-200 hover:bg-gray-300
           focus:z-10 focus:ring-2 focus:ring-gray-400 
          "
            onClick={e => {
              e.preventDefault();
              viewModel.openFormSimulationDialog(definition);
            }}
          >
            <PlusCircleIcon className="w-5 h-5" /> Add
          </button>
        </div>
      </FormFieldValidation>

      <FormSimulationDialog
        viewModel={viewModel.dialog("subformFieldDialog")}
        onClose={() => {
          viewModel.supplantValues();
        }}
      >
        <FormSimulation
          viewModel={viewModel.formSimulationViewModel}
          rendererDataTemplate=""
          onSubmit={() => {
            viewModel.supplantValues();
            viewModel.dialog("subformFieldDialog")?.close();
          }}
        />
      </FormSimulationDialog>
    </>
  );
};

export const FormSubformField = observer(Component);
