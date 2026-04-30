import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react";
import React from "react";
import { Trans } from "react-i18next";
import tw from "tailwind-styled-components";

const iconClassName = "h-5 w-5 ";

const Btn = tw.button`
  btn text-gray-600 disabled:text-gray-300 px-4 py-2 rounded hover:bg-slate-50 disabled:hover:bg-white
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
      <div className="mx-4 text-sm">
        <Trans
          i18nKey="table.paginate"
          values={{
            currentPages: currentPages,
            numberOfPages: numberOfPages,
            totalCount: totalCount,
          }}
        >
          page {"{{currentPages}}"} of {"{{numberOfPages}} "}
          <span className="text-sm">[{"{{totalCount}}"} records]</span>
        </Trans>
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
