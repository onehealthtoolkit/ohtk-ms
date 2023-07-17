import { TableIcon } from "@heroicons/react/solid";
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

  return (
    <>
      <FormFieldValidation field={field}>
        <h4 className="text-sm text-gray-600">{field.label}</h4>
        <div className="flex items-center flex-wrap mb-4 gap-2">
          <div className="flex-grow"></div>
          <button
            type="button"
            className="flex flex-row items-center justify-center
            gap-2 rounded text-sm font-medium py-1 px-4 
           bg-gray-200 hover:bg-gray-300
           focus:z-10 focus:ring-2 focus:ring-gray-400 
          "
            onClick={e => {
              e.preventDefault();
              viewModel.openFormSimulationDialog(definition);
            }}
          >
            <TableIcon className="w-5 h-5" />
          </button>
        </div>
      </FormFieldValidation>

      <FormSimulationDialog viewModel={viewModel.dialog("subformFieldDialog")}>
        <FormSimulation viewModel={viewModel.formSimulationViewModel} />
      </FormSimulationDialog>
    </>
  );
};

export const FormSubformField = observer(Component);
