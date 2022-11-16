import React from "react";
import { Trans } from "react-i18next";
import { RefreshIcon } from "@heroicons/react/solid";

type TotalItemProps = {
  totalCount: number;
  onRefresh: () => void;
};

const TotalItem: React.FC<TotalItemProps> = ({ totalCount, onRefresh }) => {
  return (
    <div className="text-sm inline-flex items-center w-full md:w-auto rounded-lg bg-gray-100 p-3">
      <Trans
        i18nKey="table.totalItems"
        count={totalCount}
        transKeepBasicHtmlNodesFor={["span"]}
      >
        รายการทั้งหมด
        <span className="ml-2 font-bold">{"{{count}}"}รายการ </span>
      </Trans>
      <div className="flex-grow"></div>
      <button
        type="button"
        className="text-black  px-1.5 hover:text-blue-700"
        onClick={() => onRefresh()}
      >
        <RefreshIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TotalItem;
