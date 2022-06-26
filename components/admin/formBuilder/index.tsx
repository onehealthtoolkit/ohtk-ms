import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import Section from "components/admin/formBuilder/section";
import SectionList from "components/admin/formBuilder/sectionList";
import { observer } from "mobx-react";
import { FC, useState } from "react";

const FormBuilder: FC = () => {
  const [form] = useState(new FormViewModel());

  return (
    <div className="flex relative w-full flex-wrap">
      <SectionList
        values={form.sections}
        onAdd={() => form.addSection()}
        onSelect={id => form.selectSection(id)}
        onMoveDown={id => form.moveSectionDown(id)}
        onMoveUp={id => form.moveSectionUp(id)}
      />
      <Section value={form.currentSection} />
    </div>
  );
};

export default observer(FormBuilder);
