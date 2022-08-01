import { FormFieldValidation } from "components/formRenderer/fieldValidation";
import { MONTHS } from "lib/datetime";
import DateField from "lib/opsvForm/models/fields/dateField";
import { observer } from "mobx-react";
import { FC } from "react";

type Option = {
  label: string;
  value: number;
  disabled: boolean;
};

export type FormDateFieldProps = {
  field: DateField;
};

const currentYear = new Date().getFullYear();

const Component: FC<FormDateFieldProps> = ({ field }) => {
  const onSelectDay = (value: string) => {
    field.day = parseInt(value) || undefined;
  };

  const onSelectMonth = (value: string) => {
    field.month = parseInt(value) || undefined;
  };

  const onSelectYear = (value: string) => {
    field.year = parseInt(value) || undefined;
  };

  const onSelectHour = (value: string) => {
    field.hour = parseInt(value) || undefined;
  };
  const onSelectMinute = (value: string) => {
    field.minute = parseInt(value) || undefined;
  };

  // Day is from 1-31
  const days = [...Array(31)].map<Option>((_, it) => {
    const d = it + 1;
    let disabled = false;
    if (field.month) {
      if (d === 29 && field.month === 2 && field.year && field.year % 4 !== 0)
        disabled = true;
      if (d === 30 && field.month === 2) disabled = true;
      if (d === 31 && [2, 4, 6, 9, 11].includes(field.month)) disabled = true;
    }
    return {
      label: d.toString(),
      value: d,
      disabled,
    };
  });

  // month value is between 1-12
  const months = [...Array(12)].map<Option>((_, it) => {
    const m = it + 1;
    let disabled = false;
    if (field.day) {
      if (m === 2 && field.day === 29 && field.year && field.year % 4 !== 0)
        disabled = true;
      if (m === 2 && field.day === 30) disabled = true;
      if ([2, 4, 6, 9, 11].includes(m) && field.day === 31) disabled = true;
    }
    return {
      label: MONTHS[m - 1],
      value: m,
      disabled,
    };
  });

  // Year range is between +/- 10 years from now
  const years = [...Array(20)].map<Option>((_, it) => {
    const y = it + currentYear - 9;
    let disabled = false;
    if (field.month && field.day) {
      if (y % 4 !== 0 && field.month === 2 && field.day === 29) disabled = true;
    }
    return {
      label: y.toString(),
      value: y,
      disabled,
    };
  });

  const hours = [...Array(24)].map<Option>((_, it) => {
    const h = it + 1;
    return {
      label: h / 10 >= 1 ? h.toString() : "0" + it.toString(),
      value: h,
      disabled: false,
    };
  });

  const minutes = [...Array(60)].map<Option>((_, it) => {
    return {
      label: it / 10 >= 1 ? it.toString() : "0" + it.toString(),
      value: it,
      disabled: false,
    };
  });

  return (
    <FormFieldValidation field={field}>
      <h4 className="text-sm text-gray-600">{field.label}</h4>
      <div className="flex flex-row flex-wrap">
        <Select
          label="Day"
          selected={field.day}
          options={days}
          onSelect={onSelectDay}
        />
        <Select
          label="Month"
          selected={field.month}
          options={months}
          onSelect={onSelectMonth}
        />
        <Select
          label="Year"
          selected={field.year}
          options={years}
          onSelect={onSelectYear}
        />
        {field.withTime && (
          <>
            <Select
              label="Hour"
              selected={field.hour}
              options={hours}
              onSelect={onSelectHour}
            />
            <Select
              label="Minute"
              selected={field.minute}
              options={minutes}
              onSelect={onSelectMinute}
            />
          </>
        )}
      </div>
    </FormFieldValidation>
  );
};

export const FormDateField = observer(Component);

type SelectProps = {
  label: string;
  selected: number | undefined;
  options: Option[];
  onSelect: (value: string) => void;
};

const Select: FC<SelectProps> = ({ label, selected, options, onSelect }) => {
  return (
    <label className="block md:w-1/5 w-1/3 pr-2">
      <span className="text-sm text-right block px-2">{label}</span>
      <select
        className="block border rounded w-full h-10 
          py-2 px-4 border-gray-300 bg-gray-50
        "
        onChange={e => onSelect(e.target.value)}
        value={selected}
      >
        <option className="text-gray-300" value=""></option>
        {options.map(o => (
          <option key={label + o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
};
