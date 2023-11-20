import DatePicker from "react-datepicker";
const dateClass =
  "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker";

const datePicker = ({
  id,
  locale,
  selected,
  dateFormat,
  showMonthYearPicker,
  onChange,
}: {
  id: string;
  selected?: Date | null;
  locale?: string;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  onChange: (date: Date) => void;
}) => {
  return (
    <DatePicker
      id={id}
      locale={locale}
      className={dateClass}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      showMonthYearPicker={showMonthYearPicker}
    />
  );
};

export default datePicker;
