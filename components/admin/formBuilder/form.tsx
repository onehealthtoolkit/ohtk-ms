import {
  PencilIcon,
  PlusIcon,
  TableIcon,
  TemplateIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import Section, { SectionList } from "components/admin/formBuilder/section";
import FormSimulation from "components/admin/formBuilder/simulator/formSimulation";
import { TabBar, TabItem } from "components/widgets/forms";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormBuilderProps = {
  viewModel: FormViewModel;
};

const FormBuilder: FC<FormBuilderProps> = ({ viewModel: form }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-black text-xl ">{form.label}</h3>
        <button
          type="button"
          className="flex flex-row items-center justify-center
            gap-2 rounded text-sm font-medium py-1 px-4 mr-5
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
          <div className="bg-white  w-full">
            <TabBar>
              <TabItem
                id="masterform"
                active={form.isCurrent}
                onTab={() => form.selectForm(form.id)}
              >
                {() => (
                  <>
                    <span>form</span>
                  </>
                )}
              </TabItem>
              <>
                {form.subforms.map(subform => (
                  <TabItem
                    id={"subform-" + subform.id}
                    key={"subform-" + subform.id}
                    active={subform.isCurrent}
                    onTab={() => form.selectForm(subform.id)}
                  >
                    {() => (
                      <div className="group w-full">
                        <XCircleIcon
                          onClick={() => {
                            form.removeSubform(subform);
                          }}
                          className="float-right text-red-400 -mt-2 w-4 h-4 opacity-0 group-hover:opacity-100"
                        />
                        <PencilIcon
                          onClick={() => {
                            subform.isIdEditing = true;
                          }}
                          className="float-right text-blue-500  -mt-2 w-4 h-4 opacity-0 group-hover:opacity-100"
                        />
                        {subform.isIdEditing ? (
                          <input
                            className="py-2 px-4 rounded w-full text-sm cursor-pointer"
                            onChange={evt => {
                              subform.idEdit = evt.target.value;
                            }}
                            autoFocus={true}
                            defaultValue={subform.id}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                subform.setChangeId();
                              }
                            }}
                          />
                        ) : (
                          subform.id
                        )}
                      </div>
                    )}
                  </TabItem>
                ))}
              </>

              <TabItem id="transition" active={false} onTab={() => {}}>
                {({ activeCss }) => (
                  <>
                    <PlusIcon
                      onClick={() => {
                        form.addSubform();
                      }}
                      className={`mr-2 w-5 h-5 ${activeCss}`}
                    />
                  </>
                )}
              </TabItem>
            </TabBar>
          </div>
          {form.currentForm.isIdEditing ? (
            <div
              className="w-full p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              Change a few things up and try enter key for exit.
            </div>
          ) : null}
          <SectionList
            values={form.currentForm.sections}
            onAdd={() => form.currentForm.addSection()}
            onSelect={id => form.currentForm.selectSection(id)}
            onMoveDown={id => form.currentForm.moveItemDown(id)}
            onMoveUp={id => form.currentForm.moveItemUp(id)}
          />
          <Section
            value={form.currentForm.currentSection}
            onDelete={sectionId => form.currentForm.deleteSection(sectionId)}
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
