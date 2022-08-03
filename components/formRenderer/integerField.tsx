import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import IntegerField from "lib/opsvForm/models/fields/integerField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormIntegerFieldProps = {
  field: IntegerField;
};

const Component: FC<FormIntegerFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <input
        type="number"
        className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full"
        value={field.value?.toString() || ""}
        onChange={e => {
          field.value = parseInt(e.target.value) || undefined;
        }}
      />
    </FormFieldValidation>
  );
};

export const FormIntegerField = observer(Component);
