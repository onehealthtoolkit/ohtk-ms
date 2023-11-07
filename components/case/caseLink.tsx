import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

type CaseLinkProps = {
  caseId?: string;
};
const CaseLink: React.FC<CaseLinkProps> = ({ caseId }) => {
  const { t } = useTranslation();

  if (caseId == undefined) {
    return null;
  }
  return (
    <Link href={`/cases/${caseId}`}>
      <div className="bg-red-500 text-white text-center rounded cursor-pointer px-2 hover:bg-red-600">
        {t("status.case", "Case")}
      </div>
    </Link>
  );
};

export default CaseLink;
