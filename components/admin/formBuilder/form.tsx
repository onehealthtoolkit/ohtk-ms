import { TableIcon, TemplateIcon } from "@heroicons/react/solid";
import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import Section, { SectionList } from "components/admin/formBuilder/section";
import FormSimulation from "components/admin/formBuilder/simulator/formSimulation";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormBuilderProps = {
  viewModel: FormViewModel;
};

const FormBuilder: FC<FormBuilderProps> = ({ viewModel: form }) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-gray-500 ">{form.label}</h3>
        <button
          type="button"
          className="flex flex-row items-center justify-center
            gap-2 rounded text-sm font-medium py-1 px-4 
           bg-gray-200 hover:bg-gray-300 w-48 
           focus:z-10 focus:ring-2 focus:ring-gray-400 
          "
          onClick={() => (form.isSimulationMode = !form.isSimulationMode)}
        >
          {form.isSimulationMode ? (
            <>
              <TemplateIcon className="w-5 h-5" />
              <span>Builder mode &laquo; </span>
            </>
          ) : (
            <>
              <span>&raquo; Simulator mode </span>
              <TableIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
      {!form.isSimulationMode ? (
        <div className="flex relative w-full flex-wrap">
          <SectionList
            values={form.sections}
            onAdd={() => form.addSection()}
            onSelect={id => form.selectSection(id)}
            onMoveDown={id => form.moveItemDown(id)}
            onMoveUp={id => form.moveItemUp(id)}
          />
          <Section
            value={form.currentSection}
            onDelete={sectionId => form.deleteSection(sectionId)}
          />
        </div>
      ) : (
        form.formSimulation && (
          <FormSimulation viewModel={form.formSimulation} />
        )
      )}
    </div>
  );
};

export default observer(FormBuilder);
