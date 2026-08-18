import DatePicker from "react-datepicker";
const dateClass =
  "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker";

const datePicker = ({
  id,
  locale,
  selected,
  dateFormat,
  showMonthYearPicker,
  placeholderText,
  onChange,
}: {
  id: string;
  selected?: Date | null;
  locale?: string;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  placeholderText?: string;
  onChange: (date: Date | null) => void;
}) => {
  return (
    <DatePicker
      id={id}
      locale={locale}
      className={dateClass}
      wrapperClassName="w-full"
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      showMonthYearPicker={showMonthYearPicker}
      placeholderText={placeholderText}
    />
  );
};

export default datePicker;
