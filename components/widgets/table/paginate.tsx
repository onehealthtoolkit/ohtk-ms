import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react";
import React from "react";
import tw from "tailwind-styled-components";

const iconClassName = "h-5 w-5 text-gray-300";

const Btn = tw.button`
  btn text-white bg-blue-400 disabled:bg-slate-50 px-4 py-2
`;

type PaginateProps = {
  limit: number;
  offset: number;
  totalCount: number;
  onChange?: (value: number) => void;
};

const Paginate: React.FC<PaginateProps> = ({
  limit,
  offset,
  totalCount,
  onChange,
}) => {
  let numberOfPages = Math.floor(totalCount / limit);
  if (totalCount % limit > 0) {
    numberOfPages = numberOfPages + 1;
  }
  const currentPages = Math.floor(offset / limit) + 1;
  const hasPrevious = currentPages > 1;
  const hasNext = currentPages < numberOfPages;

  return (
    <div className="flex items-center">
      <Btn
        onClick={() => {
          const startIndex = offset - limit;
          onChange && onChange(startIndex);
        }}
        disabled={!hasPrevious}
      >
        <ChevronLeftIcon className={iconClassName} />
      </Btn>
      <div className="mx-4">
        page {currentPages} of {numberOfPages}{" "}
        <span className="text-sm">[{totalCount} records]</span>
      </div>
      <Btn
        onClick={() => {
          const startIndex = offset + limit;
          onChange && onChange(startIndex);
        }}
        disabled={!hasNext}
      >
        <ChevronRightIcon className={iconClassName} />
      </Btn>
    </div>
  );
};

export default observer(Paginate);
