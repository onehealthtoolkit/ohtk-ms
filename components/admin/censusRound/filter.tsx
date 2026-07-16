import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CensusRoundMode } from "lib/services/census";

type Props = {
  codeSearch: string;
  modeFilter: CensusRoundMode | "ALL";
  onChange?: (value: {
    q: string;
    mode: CensusRoundMode | "ALL";
  }) => void;
};

const Filter = ({ codeSearch, modeFilter, onChange }: Props) => {
  const [searchText, setSearchText] = useState(codeSearch);
  const [mode, setMode] = useState<CensusRoundMode | "ALL">(modeFilter);
  const { t } = useTranslation();

  useEffect(() => {
    setSearchText(codeSearch);
  }, [codeSearch]);

  useEffect(() => {
    setMode(modeFilter);
  }, [modeFilter]);

  return (
    <div className="table-filter flex flex-wrap items-center gap-2">
      <FilterTextInput
        type="text"
        value={searchText}
        placeholder={t("filter.placeholder", "search")}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            onChange && onChange({ q: searchText, mode });
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(e.target.value);
        }}
      />
      <select
        className="border border-gray-300 rounded px-2 py-1 text-sm"
        value={mode}
        onChange={e => setMode(e.target.value as CensusRoundMode | "ALL")}
      >
        <option value="ALL">{t("form.label.allModes", "All modes")}</option>
        <option value="PRODUCTION">
          {t("form.label.production", "Production")}
        </option>
        <option value="TRAINING">
          {t("form.label.training", "Training")}
        </option>
      </select>
      <SearchButton
        onClick={() => {
          onChange && onChange({ q: searchText, mode });
        }}
      >
        {t("filter.searchButton", "Search")}
      </SearchButton>
      <ResetButton
        onClick={() => {
          setSearchText("");
          setMode("ALL");
          onChange && onChange({ q: "", mode: "ALL" });
        }}
      >
        {t("filter.resetButton", "Reset")}
      </ResetButton>
    </div>
  );
};

export default observer(Filter);
