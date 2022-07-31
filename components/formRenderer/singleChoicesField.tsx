import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import SingleChoicesField, {
  ChoiceOption,
} from "lib/opsvForm/models/fields/singleChoicesField";
import { observer } from "mobx-react";
import { FC } from "react";

export type FormSingleChoicesFieldProps = {
  field: SingleChoicesField;
};

const Component: FC<FormSingleChoicesFieldProps> = ({ field }) => {
  const onSelect = (value: string) => {
    field.value = value;
  };

  const onSetInputValue = (value: string) => {
    field.text = value;
  };

  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <div className="flex flex-col gap-2">
        {field.options.length > 0 &&
          field.options.map(option => {
            return (
              <Radio
                key={option.value}
                field={field}
                option={option}
                onSelect={onSelect}
                onSetInputValue={onSetInputValue}
              />
            );
          })}
      </div>
    </FormFieldValidation>
  );
};

export const FormSingleChoicesField = observer(Component);

const Radio = observer(
  ({
    field,
    option,
    onSelect,
    onSetInputValue,
  }: {
    field: SingleChoicesField;
    option: ChoiceOption;
    onSelect: (value: string) => void;
    onSetInputValue: (value: string) => void;
  }) => {
    return (
      <label className="flex items-center ml-2">
        <input
          className="mr-2"
          type={"radio"}
          value={option.value}
          checked={option.value === field.value}
          onChange={e => onSelect(e.target.value)}
        />
        {option.label}
        {option.textInput && option.value === field.value && (
          <input
            type="text"
            className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full ml-4"
            value={field.text?.toString() || ""}
            onChange={e => onSetInputValue(e.target.value)}
            onFocus={() => field.clearError()}
          />
        )}
      </label>
    );
  }
);
