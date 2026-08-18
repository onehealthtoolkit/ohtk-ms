import DatePicker from "components/widgets/datepicker";
import { Field, Label } from "components/widgets/forms";
import { useTranslation } from "react-i18next";

type DateRangeFieldProps = {
  idPrefix: string;
  label: string;
  from?: Date | null;
  to?: Date | null;
  onFrom: (date: Date | null) => void;
  onTo: (date: Date | null) => void;
};

const DateRangeField = ({
  idPrefix,
  label,
  from,
  to,
  onFrom,
  onTo,
}: DateRangeFieldProps) => {
  const { t } = useTranslation();

  return (
    <Field $size="full">
      <Label htmlFor={`${idPrefix}From`}>{label}</Label>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <DatePicker
          id={`${idPrefix}From`}
          selected={from}
          onChange={onFrom}
          placeholderText={t("form.placeholder.dateFrom", "From")}
        />
        <span className="text-gray-400">–</span>
        <DatePicker
          id={`${idPrefix}To`}
          selected={to}
          onChange={onTo}
          placeholderText={t("form.placeholder.dateTo", "To")}
        />
      </div>
    </Field>
  );
};

export default DateRangeField;
