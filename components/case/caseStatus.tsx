import React from "react";

type CaseStatusProps = {
  isFinished: boolean;
};
const CaseStatus: React.FC<CaseStatusProps> = ({ isFinished }) => {
  return isFinished ? (
    <div className="bg-green-400 text-white text-center rounded cursor-pointer px-2">
      Finished
    </div>
  ) : null;
};

export default CaseStatus;
