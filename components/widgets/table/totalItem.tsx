import React from "react";
import { Trans } from "react-i18next";

type TotalItemProps = {
  totalCount: number;
};

const TotalItem: React.FC<TotalItemProps> = ({ totalCount }) => {
  return (
    <div className="text-sm flex-initial w-full md:w-auto rounded-lg bg-gray-100 p-3">
      <Trans
        i18nKey="table.totalItems"
        count={totalCount}
        transKeepBasicHtmlNodesFor={["span"]}
      >
        รายการทั้งหมด
        <span className="ml-2 font-bold">{"{{count}}"}รายการ </span>
      </Trans>
    </div>
  );
};

export default TotalItem;
