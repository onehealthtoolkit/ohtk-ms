import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  DownloadButton,
  Field,
  FieldGroup,
  FormAction,
  Label,
  Select,
} from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthorityFilter from "components/dashboard/authorityFilter";
import { useTranslation } from "react-i18next";
import { BACKEND_DOMAIN, getSubDomain } from "lib/client";
import useStore from "lib/store";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import useReportTypes from "lib/hooks/reportTypes";

export function currentExcelEndpoint() {
  const subdomain = getSubDomain() || BACKEND_DOMAIN;
  return `https://${subdomain}/excels/`;
}

type ExcelFilterProp = {
  action?: string;
  reportType?: boolean;
};

const ExcelFilter: React.FC<ExcelFilterProp> = ({ action, reportType }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const today = new Date();
  const [authorityId, setAuthorityId] = useState<number>();
  const [authorityName, setAuthorityName] = useState<string>();
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().setDate(today.getDate() - 30))
  );
  const [toDate, setToDate] = useState<Date>(today);
  const reportTypes = useReportTypes();

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
      action={`${currentExcelEndpoint()}${action}`}
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
          <Label htmlFor="fromDate">From Date</Label>
          <DatePicker
            id="fromDate"
            selected={fromDate}
            onChange={(date: Date) => {
              date.setHours(0, 0, 0, 0);
              setFromDate(date);
            }}
          />
        </Field>
        <Field $size="half">
          <Label htmlFor="toDate">To Date</Label>
          <DatePicker
            id="toDate"
            selected={toDate}
            onChange={(date: Date) => {
              date.setHours(23, 59, 59, 999);
              setToDate(date);
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
        <>
          {reportType && (
            <>
              <Field $size="half">
                <Label htmlFor="reportType">
                  {t("form.label.reportType", "Report Type")}
                </Label>
                <Select id="reportType" name="reportTypeId" required>
                  <option disabled value={""}>
                    {t("form.label.selectItem", "Select item ...")}
                  </option>
                  {reportTypes?.map(item => (
                    <option key={`option-${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field $size="half">
                <Checkbox
                  id="columnSplit"
                  name="columnSplit"
                  value="True"
                  label={t("form.label.columnSplit", "column split")}
                  disabled={false}
                />
              </Field>
            </>
          )}
        </>
      </FieldGroup>
      <FormAction>
        <DownloadButton type="submit">
          {t("form.button.downloadExcel", "Download Excel")}
        </DownloadButton>
      </FormAction>
    </form>
  );
};

export default observer(ExcelFilter);
