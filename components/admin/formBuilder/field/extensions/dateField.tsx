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
  const fieldExtension = field.getExtension<"date">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <div className="text-sm grid md:grid-cols-2 grid-cols-none gap-4">
        <div className="w-full">
          <label
            htmlFor={`withTimeCheckbox-${field.id}`}
            className="inline-flex relative items-center cursor-pointer w-full"
          >
            <input
              type="checkbox"
              value=""
              id={`withTimeCheckbox-${field.id}`}
              checked={fieldExtension.withTime}
              onChange={e => fieldExtension.setWithTime(e.target.checked)}
            />
            <span className="ml-2">Show time selection</span>
          </label>
          <small className="text-gray-500">
            When checked, both backward and forward days offset cannot be 0 at
            the same time.
          </small>
        </div>
        <div className="w-full">
          <label
            htmlFor={`separatedFieldsCheckbox-${field.id}`}
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id={`separatedFieldsCheckbox-${field.id}`}
              checked={fieldExtension.separatedFields}
              onChange={e =>
                fieldExtension.setSeparatedFields(e.target.checked)
              }
            />
            <span className="ml-2">Enable separated fields</span>
          </label>
        </div>
        <div className="w-full">
          Backward days offset
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            step="1"
            min={0}
            value={fieldExtension.backwardDaysOffset}
            onChange={e => fieldExtension.setBackwardDaysOffset(e.target.value)}
          />
          <small className="text-gray-500">
            Leave blank for any day in the past. Enter 0 for no past day.
          </small>
        </div>
        <div className="w-full">
          Forward days offset
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            step="1"
            min={0}
            value={fieldExtension.forwardDaysOffset}
            onChange={e => fieldExtension.setForwarDaysOffset(e.target.value)}
          />
          <small className="text-gray-500">
            Leave blank for any day in future. Enter 0 for no future day.
          </small>
        </div>
      </div>
      <FieldActionBar value={field} onDelete={onDelete}>
        {field => <AdvanceCondition viewModel={field} />}
      </FieldActionBar>
    </div>
  );
};

export const DateField = observer(Field);
