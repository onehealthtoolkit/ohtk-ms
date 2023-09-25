import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { RefreshIcon } from "@heroicons/react/solid";
import Tooltip from "../tooltip";

type TotalItemProps = {
  totalCount: number;
  onRefresh: () => void;
};

const TotalItem: React.FC<TotalItemProps> = ({ totalCount, onRefresh }) => {
  const { t } = useTranslation();
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
        <Tooltip text={`${t("filter.refresh", "Refresh")}`}>
          <RefreshIcon className="h-5 w-5" aria-hidden="true" />
        </Tooltip>
      </button>
    </div>
  );
};

export default TotalItem;
