import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import ReportRiskPanel from "components/report/riskPanel";
import AiSuspectedPanel from "components/case/aiSuspectedPanel";
import {
  ReportRiskState,
  RiskFilterLevel,
} from "lib/services/report/report";

type AssessmentRiskViewModel = {
  data: ReportRiskState;
  riskSaving: boolean;
  setRiskLevel: (level: RiskFilterLevel) => Promise<boolean>;
};

type ReportAssessmentSectionProps = {
  riskViewModel: AssessmentRiskViewModel;
  aiSuspected?: string | null;
};

/**
 * Same Assessment layout as case page: Risk + AI side by side.
 */
const ReportAssessmentSection = ({
  riskViewModel,
  aiSuspected,
}: ReportAssessmentSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="border-b border-gray-100 px-[26px] py-5 md:px-[26px]">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
        {t("case.assessment.title", "Assessment")}
      </div>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.15fr_1fr]">
        <ReportRiskPanel viewModel={riskViewModel} variant="case" />
        <AiSuspectedPanel aiSuspected={aiSuspected} variant="case" />
      </div>
    </section>
  );
};

export default observer(ReportAssessmentSection);
