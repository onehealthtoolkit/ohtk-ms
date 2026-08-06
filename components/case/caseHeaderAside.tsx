import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { formatDateTime } from "lib/datetime";
import { CaseViewModel } from "./caseViewModel";

type AsideVariant = "open" | "close_case" | "false_positive" | "system";

function resolveVariant(viewModel: CaseViewModel): AsideVariant {
  if (!viewModel.isCaseClosed) return "open";
  if (viewModel.data.closeSource === "system") return "system";
  if (viewModel.data.closeOutcome === "false_positive") return "false_positive";
  return "close_case";
}

/**
 * Header top-right block (design handoff §1).
 * Open: jump link to #finish (not a second door).
 * Finished: summary card for close_case / false_positive / system.
 */
const CaseHeaderAside = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const variant = resolveVariant(viewModel);

  if (variant === "open") {
    return (
      <div className="w-full shrink-0 md:w-[250px]">
        <a
          href="#finish"
          className="block rounded-[7px] bg-red-600 px-4 py-[13px] text-center text-sm font-medium text-white shadow-[0_1px_2px_rgba(185,28,28,0.35)] hover:bg-red-700 hover:text-white"
        >
          {t("case.finish.jumpButton", "Finish case ↓")}
        </a>
        <p className="mt-2 text-center text-[11.5px] font-light leading-snug text-gray-500">
          {t(
            "case.finish.jumpCaption",
            "Ends the case for good. Workflow steps do not close a case."
          )}
        </p>
      </div>
    );
  }

  const styles: Record<
    Exclude<AsideVariant, "open">,
    { bg: string; border: string; titleColor: string; title: string }
  > = {
    close_case: {
      bg: "#F0FDF4",
      border: "#BBF7D0",
      titleColor: "#15803D",
      title: t("case.finish.aside.closed", "Case closed"),
    },
    false_positive: {
      bg: "#F8FAFC",
      border: "#E2E8F0",
      titleColor: "#64748B",
      title: t("case.finish.aside.discarded", "Discarded — false positive"),
    },
    system: {
      bg: "#FFFBEB",
      border: "#FDE68A",
      titleColor: "#B45309",
      title: t("case.finish.aside.system", "Closed by system"),
    },
  };

  const s = styles[variant];
  const byName =
    variant === "system" ? null : viewModel.data.closedByName?.trim() || null;
  const outcomeLine =
    variant === "system"
      ? t("case.finish.systemTimeout", "System timeout")
      : variant === "false_positive"
        ? t("case.finish.falsePositive", "False positive")
        : t("case.finish.closeCase", "Close case");
  const when = viewModel.data.stoppedAt
    ? formatDateTime(viewModel.data.stoppedAt, router.locale)
    : "—";

  return (
    <div
      className="w-full shrink-0 rounded-[7px] px-3.5 py-3 md:w-[250px]"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: s.titleColor }}
      >
        {s.title}
      </div>
      <div className="mt-1.5 text-[12.5px] font-light text-gray-700">
        {variant === "system" ? (
          outcomeLine
        ) : (
          <>
            {byName
              ? t("case.finish.aside.by", "By {{name}}", { name: byName })
              : t("case.close.sourceOfficer", "Officer")}
            {" · "}
            {outcomeLine}
          </>
        )}
      </div>
      <div className="mt-0.5 text-[12.5px] font-light text-gray-700">
        {when}
      </div>
    </div>
  );
};

export default observer(CaseHeaderAside);
