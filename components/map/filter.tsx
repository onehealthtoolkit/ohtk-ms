import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { Field, Label } from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import MapViewViewModel from "components/map/viewViewModel";
import ReportTypeSelect from "components/report/reportTypeSelect";

const MapViewFilter = ({ viewModel }: { viewModel: MapViewViewModel }) => {
  const setThisWeek = () => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    viewModel.fromDate = new Date(curr.setDate(first));
    viewModel.toDate = new Date();
    viewModel.periodText = "This week";
  };

  const setThisMonth = () => {
    const curr = new Date();
    viewModel.fromDate = new Date(curr.setDate(1));
    viewModel.toDate = new Date();
    viewModel.periodText = "This month";
  };

  const setThisYear = () => {
    const curr = new Date();
    curr.setMonth(0);
    viewModel.fromDate = new Date(curr.setDate(1));
    viewModel.toDate = new Date();
    viewModel.periodText = "This year";
  };

  return (
    <div className="w-full">
      <div className="relative w-full max-w-full flex-grow flex-1 text-right z-[1]">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className={`${
                viewModel.periodText ? "text-black" : "text-gray-400"
              } inline-flex w-full justify-center rounded-md px-4 py-0 text-sm font-medium  underline hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {viewModel.periodText || "Select ..."}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-black"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setThisWeek()}
                    >
                      This week
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setThisMonth()}
                    >
                      This month
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setThisYear()}
                    >
                      This year
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <Field $size="full" className="z-0">
        <Label htmlFor="fromDate">From Date</Label>
        <DatePicker
          id="fromDate"
          selected={viewModel.fromDate}
          onChange={(date: Date) => (viewModel.fromDate = date)}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="toDate">To Date</Label>
        <DatePicker
          id="toDate"
          selected={viewModel.toDate}
          onChange={(date: Date) => (viewModel.toDate = date)}
        />
      </Field>

      <Field $size="full">
        <Label htmlFor="reportType">Report type</Label>
        <ReportTypeSelect
          value={viewModel.reportTypes}
          onChange={values => {
            viewModel.reportTypes = [
              ...values.map(it => ({
                id: it.id,
                name: it.name,
              })),
            ];
          }}
        />
      </Field>
    </div>
  );
};

export default observer(MapViewFilter);
