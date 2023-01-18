import { observer } from "mobx-react";
import React from "react";
import { Field, Label } from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ObservationListViewModel, ObservationViewMode } from "./listViewModel";
import { Authority } from "lib/services/authority";

export const defaultOptions: Authority[] = [];

const ObservationFilter = ({
  viewModel,
}: {
  viewModel: ObservationListViewModel;
}) => {
  return (
    <div className="w-full">
      {viewModel.viewMode != ObservationViewMode.calendar && (
        <>
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
        </>
      )}
    </div>
  );
};

export default observer(ObservationFilter);
