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
  bg-[color:var(--button-bg-color)]
  border-[color:var(--button-border-color)]
  hover:border-[color:var(--button-border-hover-color)]
  hover:bg-[color:var(--button-hover-color)]
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
      hover:bg-gray-100
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
  px-4 py-2 flex-1 md:max-w-xs border-gray-300 border mr-2 rounded
`;

export const FilterButton = tw.button`
  px-4
  py-2
  text-white
  bg-[color:var(--button-bg-color)]
  border-[color:var(--button-border-color)]
  hover:border-[color:var(--button-border-hover-color)]
  hover:bg-[color:var(--button-hover-color)]
  flex items-center justify-center  
  rounded
  border-l
  mr-1
`;

type FilterProps = {
  children: JSX.Element;
  onSearch: () => void;
  onReset: () => void;
  popPositionClass?: string;
};

const Filter: React.FC<FilterProps> = ({
  children,
  onSearch,
  onReset,
  popPositionClass = "left-0",
}) => {
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
            <Popover.Panel
              className={`${popPositionClass} absolute top-full  z-[60000] mt-2 px-4 sm:px-0 min-w-[400px]`}
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                <div className="px-6 py-4 flex items-center justify-between border-b-2 border-gray-300">
                  <div className="text-2xl font-display font-semibold">
                    Filter
                  </div>
                  <button type="button" onClick={() => close()}>
                    <XIcon className="w-5 h-5 hover:bg-gray-100" />
                  </button>
                </div>
                <div className="p-6 space-y-3">{children}</div>
                <div className="bg-gray-50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <div></div>
                    <div className="flex flex-row">
                      <SearchButton
                        className="mr-2"
                        onClick={() => {
                          onSearch();
                          close();
                        }}
                      >
                        Apply
                      </SearchButton>
                      <button
                        type="button"
                        className="text-link underline px-2 py-2 hover:bg-gray-100"
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
