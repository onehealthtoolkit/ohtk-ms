import { observer } from "mobx-react";
import React from "react";
import { SearchButton } from "components/widgets/filter";
import { Field, Label } from "components/widgets/forms";
import useServices from "lib/services/provider";
import AsyncSelect from "react-select/async";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CaseListViewModel } from "./listViewModel";
import { Authority } from "lib/services/authority";

export const defaultOptions: Authority[] = [];

const CaseFilter = ({ viewModel }: { viewModel: CaseListViewModel }) => {
  const { authorityService } = useServices();

  const loadAuthorityOptions = (inputValue: string) =>
    authorityService
      .lookupAuthorities(100, 0, inputValue)
      .then(result => (result.items ? result.items : []));

  return (
    <div className="md:w-1/4 w-full m-4">
      <Field $size="full">
        <Label htmlFor="fromDate">From Date</Label>
        <DatePicker
          id="fromDate"
          selected={viewModel.filter.fromDate}
          onChange={(date: Date) => (viewModel.filter.fromDate = date)}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="throughDate">Through Date</Label>
        <DatePicker
          id="throughDate"
          selected={viewModel.filter.throughDate}
          onChange={(date: Date) => (viewModel.filter.throughDate = date)}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="throughDate">Authority</Label>
        <AsyncSelect
          cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={loadAuthorityOptions}
          isMulti={true}
          getOptionValue={item => item.id}
          getOptionLabel={item => item.name}
          onChange={values =>
            (viewModel.filter.authorities = values.map(item => item.id))
          }
        />
      </Field>

      <SearchButton onClick={() => viewModel.fetch()}>Search</SearchButton>
    </div>
  );
};

export default observer(CaseFilter);
