import { FieldViewModel } from "components/admin/formBuilder/fieldViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
};

const Field: FC<Props> = ({ value: field }) => {
  return (
    <div className="">
      [{field.fieldType}] {field.name}
    </div>
  );
};

export default observer(Field);
