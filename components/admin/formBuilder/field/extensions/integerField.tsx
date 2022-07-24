import {
  FieldActionBar,
  FieldViewModel,
} from "components/admin/formBuilder/field";
import { AdvanceCondition } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onDelete }) => {
  const fieldExtension = field.getExtension<"integer">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <div className="flex text-sm">
        <div className="w-1/2 pr-2">
          Minimum value
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.minValue}
            onChange={e => fieldExtension.setMinValue(e.target.value)}
          />
        </div>
        <div className="w-1/2 pl-2">
          Maximum value
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.maxValue}
            onChange={e => fieldExtension.setMaxValue(e.target.value)}
          />
        </div>
      </div>
      <FieldActionBar value={field} onDelete={onDelete}>
        {field => <AdvanceCondition viewModel={field} />}
      </FieldActionBar>
    </div>
  );
};

export const IntegerField = observer(Field);
