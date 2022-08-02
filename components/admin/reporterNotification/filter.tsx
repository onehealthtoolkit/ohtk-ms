import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

type Props = {
  nameSearch: string;
  onChange?: (value: string) => void;
};
const Filter = ({ nameSearch, onChange }: Props) => {
  const [searchText, setSearchText] = useState(nameSearch);

  useEffect(() => {
    setSearchText(nameSearch);
  }, [nameSearch]);

  return (
    <div className="table-filter">
      <FilterTextInput
        type="text"
        value={searchText}
        placeholder="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
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
