import {
  FieldActioBar,
  FieldViewModel,
} from "components/admin/formBuilder/field";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onDelete }) => {
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <FieldActioBar value={field} onDelete={onDelete}>
        {field => <Advance field={field} />}
      </FieldActioBar>
    </div>
  );
};

type AdvanceProps = {
  field: FieldViewModel;
};

const Advance: FC<AdvanceProps> = ({ field }) => {
  return <div>Advance condition : {field.fieldType}</div>;
};

export const LocationField = observer(Field);
