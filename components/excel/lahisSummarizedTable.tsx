import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  DownloadButton,
  Field,
  FieldGroup,
  FormAction,
  Label,
} from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { currentExcelEndpoint } from "components/excel/filter";
import i18n from "i18n";

/**
 * LAHIS site-specific FAO summarized table export.
 * Fixed report type (Animal Sick/Death) + all authorities on the server.
 * UI only offers an optional date range.
 * Backend: GET /excels/lahis_summarized_table
 */
const LahisSummarizedTable: React.FC = () => {
  const { t } = useTranslation();
  const today = new Date();
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().setDate(today.getDate() - 30))
  );
  const [toDate, setToDate] = useState<Date>(today);

  const language = i18n.language;
  let url = `${currentExcelEndpoint()}/excels/lahis_summarized_table`;
  if (language == "la") {
    url = `${currentExcelEndpoint()}/${language}/excels/lahis_summarized_table`;
  }

  return (
    <form
      className="grid grid-cols-2 gap-4 md:gap-8 bg-white"
      method="GET"
      action={url}
    >
      <input
        type="hidden"
        name="fromDate"
        value={fromDate?.toISOString() || ""}
      />
      <input type="hidden" name="toDate" value={toDate?.toISOString() || ""} />
      <input
        type="hidden"
        name="timezoneOffset"
        value={new Date().getTimezoneOffset()}
      />
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="fromDate">
            {t("form.label.fromDate", "From Date")}
          </Label>
          <DatePicker
            id="fromDate"
            selected={fromDate}
            onChange={(date: Date | null) => {
              if (!date) return;
              date.setHours(0, 0, 0, 0);
              setFromDate(date);
            }}
          />
        </Field>
        <Field $size="half">
          <Label htmlFor="toDate">{t("form.label.toDate", "To Date")}</Label>
          <DatePicker
            id="toDate"
            selected={toDate}
            onChange={(date: Date | null) => {
              if (!date) return;
              date.setHours(23, 59, 59, 999);
              setToDate(date);
            }}
          />
        </Field>
      </FieldGroup>
      <FormAction>
        <DownloadButton type="submit">
          {t("form.button.downloadExcel", "Download Excel")}
        </DownloadButton>
      </FormAction>
    </form>
  );
};

export default observer(LahisSummarizedTable);
