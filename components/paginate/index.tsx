import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Spinner from "components/widgets/spinner";
import { BaseViewModel } from "lib/baseViewModel";
import { observer } from "mobx-react";
import React from "react";
import tw from "tailwind-styled-components";

const iconClassName = "h-5 w-5 text-gray-300";

const Btn = tw.button`
  btn text-white bg-blue-400 disabled:bg-slate-50 px-4 py-2
`;

type PaginateProps = {
  viewModel?: BaseViewModel;
  onQueryChange?: (name: string, value: string | null | undefined) => void;
};

const Paginate: React.FC<PaginateProps> = ({ viewModel, onQueryChange }) => {
  // const [_, setOffset, offsetQuery] = useSearchParam("offset", NumberParam);

  if (!viewModel) {
    return <Spinner />;
  }

  let numberOfPages = Math.floor(viewModel.totalCount / viewModel.limit);
  if (viewModel.totalCount % viewModel.limit > 0) {
    numberOfPages = numberOfPages + 1;
  }
  const currentPages = Math.floor(viewModel.offset / viewModel.limit) + 1;
  const hasPrevious = currentPages > 1;
  const hasNext = currentPages < numberOfPages;

  return (
    <div className="flex items-center">
      <Btn
        onClick={() => {
          viewModel.offset = viewModel.offset - viewModel.limit;
          onQueryChange && onQueryChange("offset", viewModel.offset + "");
        }}
        disabled={!hasPrevious}
      >
        <ChevronLeftIcon className={iconClassName} />
      </Btn>
      <div className="mx-4">
        page {currentPages} of {numberOfPages}{" "}
        <span className="text-sm">[{viewModel.totalCount} records]</span>
      </div>
      <Btn
        onClick={() => {
          viewModel.offset = viewModel.offset + viewModel.limit;
          onQueryChange && onQueryChange("offset", viewModel.offset + "");
        }}
        disabled={!hasNext}
      >
        <ChevronRightIcon className={iconClassName} />
      </Btn>
    </div>
  );
};

export default observer(Paginate);
