import React from "react";
import { useTranslation } from "react-i18next";

type CaseStatusProps = {
  statusLabel: string;
  isFinished: boolean;
};
const CaseStatus: React.FC<CaseStatusProps> = ({ statusLabel, isFinished }) => {
  const { t } = useTranslation();
  return isFinished ? (
    <div className="bg-green-400 text-white text-center rounded cursor-pointer px-2">
      {t("status.finished", "Finished")}
    </div>
  ) : (
    <div className="text-blue-400 text-center rounded  px-2">{statusLabel}</div>
  );
};

export default CaseStatus;
