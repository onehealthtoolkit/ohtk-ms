import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CaseViewModel } from "./caseViewModel";

type AiSuspectedPanelProps = {
  viewModel: CaseViewModel;
  /** case = assessment card (handoff); stack = legacy full-width block */
  variant?: "case" | "stack";
};

/** Read-only AI assessment — not part of close_definition / close_payload. */
const AiSuspectedPanel = ({
  viewModel,
  variant = "stack",
}: AiSuspectedPanelProps) => {
  const { t } = useTranslation();
  const aiSuspected = (viewModel.data.aiSuspected || "").trim();
  const hasNote = aiSuspected.length > 0;
  const [expanded, setExpanded] = useState(false);

  if (variant === "case") {
    return (
      <div className="rounded-lg border border-gray-200 bg-[#FAFAFA] px-4 py-[15px]">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[13px] font-medium text-gray-700">
            {t("case.aiSuspected.title", "AI suspected")}
            <span className="font-light text-gray-400">
              {" "}
              · {t("case.aiSuspected.readOnly", "read-only")}
            </span>
          </div>
          {hasNote ? (
            <button
              type="button"
              className="shrink-0 text-xs font-normal text-blue-700 hover:underline"
              onClick={() => setExpanded(v => !v)}
            >
              {expanded
                ? t("case.aiSuspected.hide", "Hide AI note")
                : t("case.aiSuspected.show", "Show AI note")}
            </button>
          ) : null}
        </div>

        {!hasNote ? (
          <p className="mt-2 text-[12.5px] font-light leading-snug text-gray-400">
            {t(
              "case.aiSuspected.empty",
              "No AI assessment for this report."
            )}
          </p>
        ) : expanded ? (
          <div className="mt-2 animate-[fadein_0.15s_ease]">
            <div className="max-h-[132px] overflow-y-auto whitespace-pre-wrap text-[12.5px] font-light leading-relaxed text-gray-600">
              {aiSuspected}
            </div>
            <p className="mt-2 text-[11px] font-light text-gray-400">
              {t(
                "case.aiSuspected.footnote",
                "Informational only — not part of close data."
              )}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  // Legacy stack layout (if reused elsewhere)
  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {t("case.aiSuspected.title", "AI suspected")}
      </div>
      <div className="mt-3 max-h-40 overflow-y-auto rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 whitespace-pre-wrap">
        {aiSuspected
          ? aiSuspected
          : t("case.aiSuspected.empty", "No AI assessment for this report.")}
      </div>
    </section>
  );
};

export default observer(AiSuspectedPanel);
