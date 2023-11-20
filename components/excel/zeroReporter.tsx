import { observer } from "mobx-react";
import { currentExcelEndpoint } from "components/excel/filter";
import {
  DownloadButton,
  Field,
  FieldGroup,
  FormAction,
  Label,
} from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStore from "lib/store";
import Spinner from "components/widgets/spinner";
import AuthorityFilter from "components/dashboard/authorityFilter";

const ZeroReporter: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const today = new Date();
  const [authorityId, setAuthorityId] = useState<number>();
  const [authorityName, setAuthorityName] = useState<string>();

  const [monthYear, setMonthYear] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [fromDate, setFromDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [toDate, setToDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  );

  useEffect(() => {
    if (router.isReady) {
      if (store.me) {
        setAuthorityId(store.me.authorityId);
        setAuthorityName(store.me.authorityName);
      }
    }
  }, [router.isReady, store.me]);
  if (!authorityId) return <Spinner />;

  return (
    <form
      className="
    grid 
    grid-cols-2 
    gap-4 
    md:gap-8
    bg-white
    le
  "
      method="GET"
      action={`${currentExcelEndpoint()}zero_report`}
    >
      <input
        type="hidden"
        name="fromDate"
        value={fromDate?.toISOString() || ""}
      ></input>
      <input
        type="hidden"
        name="toDate"
        value={toDate?.toISOString() || ""}
      ></input>
      <input
        type="hidden"
        name="timezoneOffset"
        value={new Date().getTimezoneOffset()}
      ></input>
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="monthYear">Month/Year</Label>
          <DatePicker
            id="monthYear"
            selected={monthYear}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            onChange={(date: Date) => {
              date.setHours(0, 0, 0, 0);
              setMonthYear(date);
              setFromDate(new Date(date.getFullYear(), date.getMonth(), 1));
              setToDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
            }}
          />
        </Field>
        <Field $size="half">
          <Label htmlFor="toDate">Authority</Label>
          <AuthorityFilter
            name="authorityId"
            onChange={value => {
              setAuthorityId(parseInt(value.id));
              setAuthorityName(value.name);
            }}
            value={{
              id: authorityId?.toString() || "",
              name: authorityName || "",
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

export default observer(ZeroReporter);
