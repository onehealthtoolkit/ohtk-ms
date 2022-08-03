import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

type Props = {
  codeSearch: string;
  onChange?: (value: string) => void;
};
const Filter = ({ codeSearch, onChange }: Props) => {
  const [searchText, setSearchText] = useState(codeSearch);

  useEffect(() => {
    setSearchText(codeSearch);
  }, [codeSearch]);

  return (
    <div className="table-filter">
      <FilterTextInput
        type="text"
        value={searchText}
        placeholder="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(e.target.value);
        }}
      />
      <SearchButton
        onClick={() => {
          onChange && onChange(searchText);
        }}
      >
        Search
      </SearchButton>

      <ResetButton
        onClick={() => {
          onChange && onChange("");
        }}
      >
        Reset
      </ResetButton>
    </div>
  );
};

export default observer(Filter);
