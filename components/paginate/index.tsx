import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import tw from "tailwind-styled-components";

const iconClassName = "h-5 w-5 text-gray-300";

export type PaginateQueryVariableState = {
  limit: number;
  offset: number;
};

export const initPaginateQueryVariableState: PaginateQueryVariableState = {
  limit: 20,
  offset: 0,
};

const Btn = tw.button`
  btn text-white bg-blue-400 disabled:bg-slate-50 px-4 py-2
`;

type PaginateProps = {
  queryState: PaginateQueryVariableState;
  totalCount: number;
  setQueryState: (state: PaginateQueryVariableState) => void;
};

const Paginate: React.FC<PaginateProps> = ({
  queryState,
  totalCount,
  setQueryState,
}) => {
  const { limit, offset } = queryState;
  let numberOfPages = Math.floor(totalCount / limit);
  if (totalCount % limit > 0) {
    numberOfPages = numberOfPages + 1;
  }
  const currentPages = offset / limit + 1;
  const hasPrevious = currentPages > 1;
  const hasNext = currentPages < numberOfPages;

  return (
    <div className="flex items-center">
      <Btn
        onClick={() => {
          setQueryState({
            limit,
            offset: offset - limit,
          });
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
          setQueryState({
            limit,
            offset: offset + limit,
          });
        }}
        disabled={!hasNext}
      >
        <ChevronRightIcon className={iconClassName} />
      </Btn>
    </div>
  );
};

export default Paginate;
