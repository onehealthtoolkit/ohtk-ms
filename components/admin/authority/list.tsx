import {
  FilterTextInput,
  ResetButton,
  SearchButton,
} from "components/widgets/filter";
import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AdminAuthoorityListViewModel } from "./listViewModel";

const AuthorityList = () => {
  const router = useRouter();
  const [viewModel, setViewModel] = useState<AdminAuthoorityListViewModel>();
  useEffect(() => {
    const viewModel = new AdminAuthoorityListViewModel();
    setViewModel(viewModel);
  }, []);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Authorities</div>

      <div className="flex items-center flex-wrap mb-4">
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
            try {
              viewModel?.fetch();
            } catch (e) {
              console.log(e);
            }
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

      <Table
        columns={[
          {
            label: "Id",
            get: record => record.id,
          },
          {
            label: "Name",
            get: record => record.name,
          },
        ]}
        data={viewModel?.data || []}
        onEdit={record =>
          router.push(`/settings/authorities/edit/${record.id}`)
        }
      />
    </div>
  );
};

export default observer(AuthorityList);
