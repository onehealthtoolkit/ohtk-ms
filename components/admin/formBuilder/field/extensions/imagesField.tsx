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
  const fieldExtension = field.getExtension<"images">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <div className="flex text-sm">
        <div className="w-1/2 pr-2">
          Minimum amount
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.minValue}
            onChange={e => fieldExtension.setMinValue(e.target.value)}
          />
        </div>
        <div className="w-1/2 pl-2">
          Maximum amount
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.maxValue}
            onChange={e => fieldExtension.setMaxValue(e.target.value)}
          />
        </div>
      </div>
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

export const ImagesField = observer(Field);
