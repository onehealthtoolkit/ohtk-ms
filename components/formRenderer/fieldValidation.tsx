import Field from "lib/opsvForm/models/fields";
import { observer } from "mobx-react";
import { FC, ReactElement } from "react";

export type FormFieldValidationProps = {
  field: Field;
  children: ReactElement | ReactElement[];
};

const Component: FC<FormFieldValidationProps> = ({ field, children }) => {
  return (
    <div
      className={`px-4 rounded border ${
        field.isValid ? "border-white" : "border-red-500"
      } `}
    >
      {children}
      <p className="text-red-500 text-sm italic">{field.invalidMessage}</p>
    </div>
  );
};

export const FormFieldValidation = observer(Component);
