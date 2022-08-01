import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import TextField from "lib/opsvForm/models/fields/textField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormTextFieldProps = {
  field: TextField;
};

const Component: FC<FormTextFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <input
        type="text"
        className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full"
        value={field.value || ""}
        onChange={e => (field.value = e.target.value)}
      />
    </FormFieldValidation>
  );
};

export const FormTextField = observer(Component);
