import { observer } from "mobx-react";
import React, { Fragment, useState } from "react";
import { Field, Label } from "components/widgets/forms";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardViewModel from "./dashboardViewModel";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, RefreshIcon } from "@heroicons/react/solid";
import AuthorityFilter from "./authorityFilter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import Filter from "components/widgets/filter";

type DashboardFilterProp = {
  viewModel: DashboardViewModel;
  onRefresh: () => void;
};

const DashboardFilter: React.FC<DashboardFilterProp> = ({
  viewModel,
  onRefresh,
}) => {
  const [authorityId, setAuthorityId] = useState<number>(viewModel.authorityId);
  const [authorityName, setAuthorityName] = useState<string>(
    viewModel.authorityName
  );
  const [fromDate, setFromDate] = useState<Date | undefined>(
    viewModel.fromDate
  );
  const [toDate, setToDate] = useState<Date | undefined>(viewModel.toDate);
  const [periodText, setPeriodText] = useState<String>();
  const { setUrl, resetUrl } = useUrlParams();

  const setThisWeek = () => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    setFromDate(new Date(curr.setDate(first)));
    setToDate(new Date());
    setPeriodText("This week");
  };

  const setThisMonth = () => {
    const curr = new Date();
    setFromDate(new Date(curr.setDate(1)));
    setToDate(new Date());
    setPeriodText("This month");
  };

  const setThisYear = () => {
    const curr = new Date();
    curr.setMonth(0);
    setFromDate(new Date(curr.setDate(1)));
    setToDate(new Date());
    setPeriodText("This year");
  };

  const applySearch = () => {
    setUrl({
      authorityId: authorityId,
      authorityName: authorityName,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
    });
  };

  const filterFields = (
    <>
      <div className="relative w-full max-w-full flex-grow flex-1 text-right">
        <Menu as="div" className="relative inline-block text-left z-[60000]">
          <div>
            <Menu.Button
              className={`${
                periodText ? "text-black" : "text-gray-400"
              } inline-flex w-full justify-center rounded-md px-4 py-0 text-sm font-medium  underline hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {periodText || "Select ..."}
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
      <Field $size="full">
        <Label htmlFor="fromDate">From Date</Label>
        <DatePicker
          id="fromDate"
          selected={fromDate}
          onChange={(date: Date) => setFromDate(date)}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="toDate">To Date</Label>
        <DatePicker
          id="toDate"
          selected={toDate}
          onChange={(date: Date) => setToDate(date)}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="toDate">Authority</Label>
        <AuthorityFilter
          value={{
            id: viewModel.authorityId.toString(),
            name: viewModel.authorityName,
          }}
          onChange={value => {
            setAuthorityId(parseInt(value.id));
            setAuthorityName(value.name);
          }}
        />
      </Field>
    </>
  );

  return (
    <div className="flex items-center justify-between">
      <div className="w-full md:w-1/4 text-xl text-slate-600">
        <div
          className={`inline-flex bg-white justify-center  rounded-2xl border-gray-200  border-2 px-4 py-2 text-xl font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          {viewModel.authorityName}
          <button
            type="button"
            className="text-[color:var(--icon-color)] hover:text-[color:var(--icon-hover-color)] focus:outline-none font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
            onClick={() => onRefresh()}
          >
            <RefreshIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="px-4">
        <Filter
          onSearch={applySearch}
          onReset={() => {
            setFromDate(undefined);
            setToDate(undefined);
            resetUrl();
          }}
          popPositionClass="right-0"
        >
          {filterFields}
        </Filter>
      </div>
    </div>
  );
};

export default observer(DashboardFilter);
