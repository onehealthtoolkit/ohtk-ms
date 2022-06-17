import useSearchParam, { StringParam } from "components/hooks/searchParam";
import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import React from "react";
import { AdminAuthorityListViewModel } from "./listViewModel";

type Props = {
  viewModel?: AdminAuthorityListViewModel;
  queryName?: string;
  onQueryChange?: (name: string, value: string | null | undefined) => void;
};

const Filter = ({ viewModel, queryName = "q", onQueryChange }: Props) => {
  const [, setSearchText, searchTextQuery] = useSearchParam(
    queryName,
    StringParam
  );

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <div>
      <FilterTextInput
        type="text"
        value={viewModel.searchText}
        placeholder="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          viewModel.setSearchText(e.target.value);
          setSearchText(e.target.value);
        }}
      />
      <SearchButton
        onClick={() => {
          viewModel.offset = 0;
          viewModel.fetch();
          onQueryChange && onQueryChange(queryName, searchTextQuery);
        }}
      >
        Search
      </SearchButton>

      <ResetButton
        onClick={() => {
          viewModel.clearSearchText();
          viewModel.fetch();
          onQueryChange && onQueryChange(queryName, undefined);
        }}
      >
        Reset
      </ResetButton>
    </div>
  );
};

export default observer(Filter);
