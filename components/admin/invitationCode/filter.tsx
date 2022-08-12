import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  codeSearch: string;
  onChange?: (value: string) => void;
};
const Filter = ({ codeSearch, onChange }: Props) => {
  const [searchText, setSearchText] = useState(codeSearch);
  const { t } = useTranslation();

  useEffect(() => {
    setSearchText(codeSearch);
  }, [codeSearch]);

  return (
    <div className="table-filter">
      <FilterTextInput
        type="text"
        value={searchText}
        placeholder={t("filter.placeholder", "search")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(e.target.value);
        }}
      />
      <SearchButton
        onClick={() => {
          onChange && onChange(searchText);
        }}
      >
        {t("filter.searchButton", "Search")}
      </SearchButton>

      <ResetButton
        onClick={() => {
          onChange && onChange("");
        }}
      >
        {t("filter.resetButton", "Reset")}
      </ResetButton>
    </div>
  );
};

export default observer(Filter);
