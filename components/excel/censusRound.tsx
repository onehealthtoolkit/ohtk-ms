import { Observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  DownloadButton,
  Field,
  FieldGroup,
  FormAction,
  Label,
  Select,
} from "components/widgets/forms";
import AuthorityFilter from "components/dashboard/authorityFilter";
import { useTranslation } from "react-i18next";
import useStore from "lib/store";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { CensusRoundMode, CensusRoundOccurrence } from "lib/services/census";
import { currentExcelEndpoint } from "components/excel/filter";
import i18n from "i18n";

const modeOptions: { value: CensusRoundMode; label: string }[] = [
  { value: "PRODUCTION", label: "Production" },
  { value: "TRAINING", label: "Training" },
];

const CensusRoundExcel: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const { censusRoundService } = useServices();

  const [authorityId, setAuthorityId] = useState<number>();
  const [authorityName, setAuthorityName] = useState<string>();
  const [mode, setMode] = useState<CensusRoundMode>("PRODUCTION");
  const [occurrences, setOccurrences] = useState<CensusRoundOccurrence[]>([]);
  const [occurrenceId, setOccurrenceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [language] = useState(i18n.language);
  let url = `${currentExcelEndpoint()}/excels/census_round`;
  if (language === "la") {
    url = `${currentExcelEndpoint()}/${language}/excels/census_round`;
  }

  useEffect(() => {
    if (router.isReady && store.me) {
      setAuthorityId(store.me.authorityId);
      setAuthorityName(store.me.authorityName);
    }
  }, [router.isReady, store.me]);

  useEffect(() => {
    let cancelled = false;
    async function loadOccurrences() {
      setLoading(true);
      setError("");
      const result = await censusRoundService.getAnimalOccurrences(mode);
      if (cancelled) {
        return;
      }
      if (result.data) {
        setOccurrences(result.data);
        const open =
          result.data.find(item => item.status === "OPEN") ??
          result.data.find(item => item.status === "LATE_WINDOW") ??
          result.data[0];
        setOccurrenceId(open?.id ?? "");
      } else {
        setOccurrences([]);
        setOccurrenceId("");
        setError(result.error || "Unable to load census rounds.");
      }
      setLoading(false);
    }
    loadOccurrences();
    return () => {
      cancelled = true;
    };
  }, [mode, censusRoundService]);

  if (!authorityId) {
    return <Spinner />;
  }

  return (
    <Observer>
      {() => (
        <form
          className="grid grid-cols-2 gap-4 md:gap-8 bg-white p-4"
          method="GET"
          action={url}
        >
          <FieldGroup>
            <Field $size="half">
              <Label htmlFor="mode">{t("censusCoverage.mode", "Mode")}</Label>
              <Select
                id="mode"
                value={mode}
                onChange={event =>
                  setMode(event.target.value as CensusRoundMode)
                }
              >
                {modeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(`censusCoverage.mode.${option.value}`, option.label)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field $size="half">
              <Label htmlFor="occurrenceId">
                {t("censusCoverage.occurrence", "Round")}
              </Label>
              {loading ? (
                <Spinner />
              ) : (
                <Select
                  id="occurrenceId"
                  name="occurrenceId"
                  required
                  value={occurrenceId}
                  onChange={event => setOccurrenceId(event.target.value)}
                >
                  <option disabled value="">
                    {t("form.label.selectItem", "Select item ...")}
                  </option>
                  {occurrences.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.occurrenceKey}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field $size="half">
              <Label htmlFor="authorityId">
                {t("form.label.authority", "Authority")}
              </Label>
              <AuthorityFilter
                name="authorityId"
                onChange={value => {
                  setAuthorityId(parseInt(value.id, 10));
                  setAuthorityName(value.name);
                }}
                value={{
                  id: authorityId?.toString() || "",
                  name: authorityName || "",
                }}
              />
              <p className="mt-1 text-xs text-gray-500">
                {t(
                  "censusCoverage.exportAuthorityHelp",
                  "Export includes villages under this authority hierarchy (inherits-down)."
                )}
              </p>
            </Field>
          </FieldGroup>

          {error ? (
            <div className="col-span-2 text-sm text-red-600">{error}</div>
          ) : null}

          <div className="col-span-2 text-sm text-gray-600">
            {t(
              "censusCoverage.exportHelp",
              "The Excel file has one village per row, authority hierarchy columns on the left, and metric counts (households, total animals, species) as columns."
            )}
          </div>

          <FormAction>
            <DownloadButton type="submit" disabled={!occurrenceId || loading}>
              {t("form.button.downloadExcel", "Download Excel")}
            </DownloadButton>
          </FormAction>
        </form>
      )}
    </Observer>
  );
};

export default CensusRoundExcel;
