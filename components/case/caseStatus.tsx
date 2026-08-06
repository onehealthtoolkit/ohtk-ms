import React from "react";
import { useTranslation } from "react-i18next";

type CaseStatusProps = {
  statusLabel: string;
  isFinished: boolean;
  /** close_case | false_positive | empty */
  closeOutcome?: string;
  /** officer | system */
  closeSource?: string;
};

/**
 * List/detail status chip.
 * Finished cases: distinguish False positive / System / Close case (design).
 */
const CaseStatus: React.FC<CaseStatusProps> = ({
  statusLabel,
  isFinished,
  closeOutcome,
  closeSource,
}) => {
  const { t } = useTranslation();

  if (!isFinished) {
    return (
      <div className="inline-flex items-center rounded px-2 py-0.5 text-center text-sm font-medium text-blue-700">
        {statusLabel || t("status.open", "Open")}
      </div>
    );
  }

  if (closeSource === "system") {
    return (
      <div className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-center text-sm font-medium text-amber-800">
        {t("case.finish.systemTimeout", "Automatic close")}
      </div>
    );
  }

  if (closeOutcome === "false_positive") {
    return (
      <div className="inline-flex items-center rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-center text-sm font-medium text-slate-600">
        {t("case.finish.falsePositive", "False positive")}
      </div>
    );
  }

  // close_case or legacy finished without outcome
  return (
    <div className="inline-flex items-center rounded bg-green-500 px-2 py-0.5 text-center text-sm font-medium text-white">
      {closeOutcome === "close_case"
        ? t("case.finish.closeCase", "Close case")
        : t("status.finished", "Finished")}
    </div>
  );
};

export default CaseStatus;
