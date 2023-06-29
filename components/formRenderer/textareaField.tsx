import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import TextAreaField from "lib/opsvForm/models/fields/textareaField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormTextAreaFieldProps = {
  field: TextAreaField;
};

const Component: FC<FormTextAreaFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <textarea
        rows={field.rows}
        className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full"
        value={field.value || ""}
        onChange={e => (field.value = e.target.value)}
      />
    </FormFieldValidation>
  );
};

export const FormTextAreaField = observer(Component);
