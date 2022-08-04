import { Popover, Transition } from "@headlessui/react";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { RefreshIcon } from "@heroicons/react/solid";
import { forwardRef } from "react";
import tw from "tailwind-styled-components";

export const SearchButton = tw.button`
  px-4
  py-2
  text-white
  bg-blue-500
  border-blue-300
  hover:border-blue-500
  rounded
  border-l
  mr-1
`;

export const ResetButton = forwardRef(function ResetButton(
  props: React.ComponentPropsWithoutRef<"button">,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className="
      px-4
      py-2
      text-black
      bg-slate-50
      hover:border-gray-800
      border-slate-700
      rounded
      items-center
      inline-flex
      justify-center
      border
      "
    >
      <RefreshIcon className="h-5 w-5 text-black mr-2" />
      <span>{props.children}</span>
    </button>
  );
});

export const FilterTextInput = tw.input`
  px-4 py-2 md:w-80 border-gray-300 border mr-2
`;

export const FilterButton = tw.button`
  px-4
  py-2
  text-white
  bg-blue-500
  border-blue-300
  hover:border-blue-500
  flex items-center justify-center  
  rounded
  border-l
  mr-1
`;

type FilterProps = {
  children: JSX.Element;
  onSearch: () => void;
  onReset: () => void;
};

const Filter: React.FC<FilterProps> = ({ children, onSearch, onReset }) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button as="div" className="w-20">
            <FilterButton className={`${open ? "open" : ""}`}>
              <AdjustmentsIcon className="w-5 h-5 mr-2 transform rotate-90" />
              <span>Filter</span>
            </FilterButton>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-full left-0 z-60000 mt-2 px-4 sm:px-0 min-w-[400px]">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                <div className="px-6 py-4 flex items-center justify-between border-b-2 border-gray-300">
                  <div className="text-2xl font-display font-semibold">
                    Filter
                  </div>
                  <button type="button" onClick={() => close()}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-3">{children}</div>
                <div className="bg-gray-50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <div></div>
                    <div className="flex flex-row">
                      <SearchButton
                        className="mr-4"
                        onClick={() => {
                          onSearch();
                          close();
                        }}
                      >
                        Apply
                      </SearchButton>
                      <button
                        type="button"
                        className="text-link underline"
                        onClick={() => {
                          onReset();
                          close();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Filter;
