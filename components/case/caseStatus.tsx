import React from "react";

type CaseStatusProps = {
  statusLabel: string;
  isFinished: boolean;
};
const CaseStatus: React.FC<CaseStatusProps> = ({ statusLabel, isFinished }) => {
  return isFinished ? (
    <div className="bg-green-400 text-white text-center rounded cursor-pointer px-2">
      Finished
    </div>
  ) : (
    <div className="text-blue-400 text-center rounded  px-2">{statusLabel}</div>
  );
};

export default CaseStatus;
