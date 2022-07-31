import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import { ChoiceOption } from "lib/opsvForm/models/fields/singleChoicesField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormMultipleChoicesFieldProps = {
  field: MultipleChoicesField;
};

const Component: FC<FormMultipleChoicesFieldProps> = ({ field }) => {
  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <div className="flex flex-col gap-2">
        {field.options.length > 0 &&
          field.options.map(option => {
            return <Option key={option.value} field={field} option={option} />;
          })}
      </div>
    </FormFieldValidation>
  );
};

const Option = observer(
  ({
    field,
    option,
  }: {
    field: MultipleChoicesField;
    option: ChoiceOption;
  }) => {
    const checkValue = field.valueFor(option.value);
    const text = field.textValueFor(option.value) ?? "";
    const invalidTextMessage = field._invalidTextMessage[option.value];
    return (
      <>
        <label className="flex items-center ml-2">
          <input
            className="mr-2"
            type={"checkbox"}
            value={option.value}
            checked={checkValue}
            onChange={() => {
              field.setSelectedFor(option.value, !checkValue);
              field.setTextValuefor(option.value, "");
            }}
          />
          {option.label}
          {option.textInput && checkValue && (
            <input
              type="text"
              className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full ml-4"
              value={text}
              onChange={e =>
                field.setTextValuefor(option.value, e.target.value)
              }
              onFocus={() => field.setTextValuefor(option.value, text)}
            />
          )}
        </label>
        <p className="ml-8 text-red-500 text-sm italic">{invalidTextMessage}</p>
      </>
    );
  }
);

export const FormMultipleChoicesField = observer(Component);
