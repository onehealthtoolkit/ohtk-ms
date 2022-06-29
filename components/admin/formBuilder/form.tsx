import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import Section, { SectionList } from "components/admin/formBuilder/section";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormBuilderProps = {
  viewModel: FormViewModel;
};

const FormBuilder: FC<FormBuilderProps> = ({ viewModel: form }) => {
  return (
    <div className="flex relative w-full flex-wrap">
      <SectionList
        values={form.sections}
        onAdd={() => form.addSection()}
        onSelect={id => form.selectSection(id)}
        onMoveDown={id => form.moveItemDown(id)}
        onMoveUp={id => form.moveItemUp(id)}
      />
      <Section value={form.currentSection} />
    </div>
  );
};

export default observer(FormBuilder);
