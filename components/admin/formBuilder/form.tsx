import {
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
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "components/admin/formBuilder/shared";

export type FormBuilderProps = {
  viewModel: FormViewModel;
};

const FormBuilder: FC<FormBuilderProps> = ({ viewModel: form }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  return (
    <div className="w-full" ref={elementRef}>
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
                onTab={() => {
                  if (form.currentForm.isIdEditing) {
                    form.currentForm.setChangeId();
                  }
                  form.selectForm(form.id);
                }}
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
                    className={`${subform.isIdEditing ? "p-2" : ""}`}
                    onTab={() => {
                      if (form.currentForm.isIdEditing) {
                        form.currentForm.setChangeId();
                      }
                      form.selectForm(subform.id);
                      form.currentForm.isIdEditing = true;
                    }}
                  >
                    {() => (
                      <div className="group w-full flex flex-col relative">
                        <XCircleIcon
                          onClick={e => {
                            console.log("XCircleIcon");
                            e.stopPropagation();
                            form.registerDialog("confirmDelete")?.open(subform);
                          }}
                          className="absolute -right-2 -top-2 text-red-400 -mt-2 w-4 h-4 opacity-0 group-hover:opacity-100"
                        />
                        {subform.isIdEditing ? (
                          <div className="">
                            <input
                              className="py-2 px-4 rounded text-sm cursor-pointer"
                              size={subform.id.length}
                              onChange={evt => {
                                subform.idEdit = evt.target.value;
                              }}
                              autoFocus={true}
                              defaultValue={subform.id}
                              onKeyDown={e => {
                                e.stopPropagation();
                                if (e.key === "Enter") {
                                  subform.setChangeId();
                                } else if (e.key === "Escape") {
                                  subform.cancelChangeId();
                                }
                              }}
                            />
                          </div>
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

      <ConfirmDialog
        viewModel={form.dialog("confirmDelete")}
        content={t("dialog.content.confirmDelete", "Are you sure?")}
        onYes={(subform: FormViewModel) => form.removeSubform(subform)}
        onNo={() => form.dialog("confirmDelete")?.close()}
        container={elementRef.current?.parentElement}
      />
    </div>
  );
};

export default observer(FormBuilder);
