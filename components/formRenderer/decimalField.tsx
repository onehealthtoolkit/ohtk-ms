import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import Decimal from "decimal.js";
import DecimalField from "lib/opsvForm/models/fields/decimalField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormDecimalFieldProps = {
  field: DecimalField;
};

const Component: FC<FormDecimalFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <input
        type="number"
        className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full"
        value={field.value?.toString() || ""}
        onChange={e => {
          try {
            field.value = new Decimal(e.target.value);
          } catch (e) {
            console.log(e);
            field.value = undefined;
          }
        }}
      />
    </FormFieldValidation>
  );
};

export const FormDecimalField = observer(Component);
