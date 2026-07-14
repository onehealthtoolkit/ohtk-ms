import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const IntegrationFilter = ({
  searchText,
  onChange,
  testId,
}: {
  searchText: string;
  onChange: (value: string) => void;
  testId?: string;
}) => {
  const [inputText, setInputText] = useState(searchText);
  const { t } = useTranslation();

  useEffect(() => {
    setInputText(searchText);
  }, [searchText]);

  return (
    <div className="table-filter">
      <FilterTextInput
        type="text"
        data-testid={testId}
        value={inputText}
        placeholder={t("filter.placeholder", "search")}
        onKeyPress={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") onChange(inputText);
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInputText(event.target.value)
        }
      />
      <SearchButton
        data-testid={testId ? `${testId}-button` : undefined}
        onClick={() => onChange(inputText)}
      >
        {t("filter.searchButton", "Search")}
      </SearchButton>
      <ResetButton
        data-testid={testId ? `${testId}-reset` : undefined}
        onClick={() => onChange("")}
      >
        {t("filter.resetButton", "Reset")}
      </ResetButton>
    </div>
  );
};

export default observer(IntegrationFilter);
