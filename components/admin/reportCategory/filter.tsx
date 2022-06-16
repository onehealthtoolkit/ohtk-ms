import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";
import React from "react";
import { AdminReportCategoryListViewModel } from "./listViewModel";

type Props = {
  viewModel?: AdminReportCategoryListViewModel;
};
const Filter = ({ viewModel }: Props) => {
  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <div>
      <FilterTextInput
        type="text"
        value={viewModel?.searchText}
        placeholder="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          viewModel?.setSearchText(e.target.value)
        }
      />
      <SearchButton
        onClick={() => {
          viewModel?.fetch();
        }}
      >
        Search
      </SearchButton>

      <ResetButton
        onClick={() => {
          viewModel?.clearSearchText();
        }}
      >
        Reset
      </ResetButton>
    </div>
  );
};

export default observer(Filter);
