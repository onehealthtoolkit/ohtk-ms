import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  querySearch: string;
  onChange?: (value: string) => void;
};
const ObservationFilterQuery = ({ querySearch, onChange }: Props) => {
  const [searchText, setSearchText] = useState(querySearch);
  const { t } = useTranslation();

  useEffect(() => {
    setSearchText(querySearch);
  }, [querySearch]);

  return (
    <div className="table-filter">
      <FilterTextInput
        type="text"
        value={searchText}
        placeholder={t("filter.placeholder", "search")}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            onChange && onChange(searchText);
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
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

export default observer(ObservationFilterQuery);
