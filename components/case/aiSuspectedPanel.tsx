import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { CaseViewModel } from "./caseViewModel";

/** Read-only AI assessment — not part of close_definition / close_payload. */
const AiSuspectedPanel = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const aiSuspected = (viewModel.data.aiSuspected || "").trim();

  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {t("case.aiSuspected.title", "AI suspected")}
      </div>
      <div className="mt-3 max-h-40 overflow-y-auto rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 whitespace-pre-wrap">
        {aiSuspected
          ? aiSuspected
          : t("case.aiSuspected.empty", "No AI assessment yet")}
      </div>
    </section>
  );
};

export default observer(AiSuspectedPanel);
