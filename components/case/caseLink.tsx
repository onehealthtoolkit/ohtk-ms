import Link from "next/link";
import React from "react";

type CaseLinkProps = {
  caseId?: string;
};
const CaseLink: React.FC<CaseLinkProps> = ({ caseId }) => {
  if (caseId == undefined) {
    return null;
  }
  return (
    <Link href={`/cases/${caseId}`}>
      <div className="bg-red-500 text-white text-center rounded cursor-pointer px-2">
        Case
      </div>
    </Link>
  );
};

export default CaseLink;
