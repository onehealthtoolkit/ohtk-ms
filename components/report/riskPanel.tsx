import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Spinner from "components/widgets/spinner";
import RiskBadge, {
  getRiskLabel,
  RISK_LEVEL_OPTIONS,
  RISK_BADGE_TONES,
} from "components/risk/RiskBadge";
import { formatDateTime } from "lib/datetime";
import {
  ReportRiskState,
  RiskAssessment,
  RiskFilterLevel,
} from "lib/services/report/report";

const riskSourceLabel = (source?: string | null) => {
  if (!source) return "";
  if (source === "HUMAN") return "Human";
  if (source === "RULE_ENGINE") return "Rule engine";
  if (source === "EXTERNAL_RISK_EVALUATOR") return "External evaluator";
  if (source === "AI") return "AI";
  return source;
};

const riskActorLabel = (assessment?: RiskAssessment | null) => {
  if (!assessment) return "";
  const actor = assessment.createdBy;
  if (actor) {
    const fullName = [actor.firstName, actor.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    if (fullName) return fullName;
    if (actor.username) return actor.username;
  }
  return riskSourceLabel(assessment.source);
};

const riskMetaLabel = (
  assessment: RiskAssessment | null | undefined,
  locale?: string,
  emptyLabel?: string
) => {
  if (!assessment) {
    return emptyLabel || "No risk level has been set.";
  }
  const actor = riskActorLabel(assessment);
  const timestamp = formatDateTime(assessment.createdAt || undefined, locale);
  return [actor ? `Set by ${actor}` : "", timestamp]
    .filter(Boolean)
    .join(" · ");
};

/** Design handoff: click-to-save levels (no separate Save). */
const EDITABLE_LEVELS: RiskFilterLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

const LEVEL_HINTS: Record<string, string> = {
  LOW: "monitor only",
  MEDIUM: "follow up",
  HIGH: "act within 24h",
  CRITICAL: "escalate now",
};

type RiskPanelViewModel = {
  data: ReportRiskState;
  riskSaving: boolean;
  setRiskLevel: (level: RiskFilterLevel) => Promise<boolean>;
};

type ReportRiskPanelProps = {
  viewModel: RiskPanelViewModel;
  /** case = assessment card (handoff); stack = report page / legacy */
  variant?: "case" | "stack";
};

const ReportRiskPanel = ({
  viewModel,
  variant = "stack",
}: ReportRiskPanelProps) => {
  const { t, i18n } = useTranslation();
  const currentRisk = viewModel.data.currentRiskAssessment;
  const [isEditing, setIsEditing] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [draftLevel, setDraftLevel] =
    useState<RiskFilterLevel>("NO_ASSESSMENT");
  const [saveError, setSaveError] = useState<string | undefined>();
  const recentChanges =
    viewModel.data.riskAssessmentHistory?.filter(
      item => item.id !== currentRisk?.id
    ) || [];

  useEffect(() => {
    setDraftLevel(currentRisk?.level || "NO_ASSESSMENT");
  }, [currentRisk?.level]);

  const emptyMeta = t(
    "risk.notSet",
    "No risk level has been set."
  );

  const pickLevel = async (level: RiskFilterLevel) => {
    setSaveError(undefined);
    setDraftLevel(level);
    const saved = await viewModel.setRiskLevel(level);
    if (saved) {
      setIsEditing(false);
      return;
    }
    setSaveError(t("risk.saveError", "Unable to save risk level"));
  };

  const saveRisk = async () => {
    setSaveError(undefined);
    const saved = await viewModel.setRiskLevel(draftLevel);
    if (saved) {
      setIsEditing(false);
      return;
    }
    setSaveError(t("risk.saveError", "Unable to save risk level"));
  };

  if (variant === "case") {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-[15px]">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[13px] font-medium text-gray-700">
            {t("risk.levelLabel", "Risk level")}
            <span className="font-light text-gray-400">
              {" "}
              · {t("risk.editable", "editable")}
            </span>
          </div>
          {!isEditing ? (
            <button
              type="button"
              className="shrink-0 rounded-md border border-blue-200 bg-white px-[11px] py-[7px] text-xs font-medium text-blue-700 hover:bg-blue-50"
              onClick={() => {
                setDraftLevel(currentRisk?.level || "NO_ASSESSMENT");
                setSaveError(undefined);
                setIsEditing(true);
              }}
            >
              {t("risk.edit", "Edit risk")}
            </button>
          ) : null}
        </div>

        {!isEditing ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RiskBadge level={currentRisk?.level} />
            <span className="text-[12.5px] font-light text-gray-500">
              {riskMetaLabel(currentRisk, i18n.language, emptyMeta)}
            </span>
          </div>
        ) : (
          <div className="mt-3 animate-[fadein_0.15s_ease]">
            <div className="flex flex-col gap-[7px]">
              {EDITABLE_LEVELS.map(level => {
                const tone = RISK_BADGE_TONES[level];
                return (
                  <button
                    key={level}
                    type="button"
                    disabled={viewModel.riskSaving}
                    onClick={() => pickLevel(level)}
                    className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left disabled:opacity-60"
                    style={{
                      color: tone.text,
                      background: tone.background,
                      borderColor: tone.border,
                    }}
                  >
                    <span
                      className="inline-block h-[9px] w-[9px] shrink-0 rounded-full"
                      style={{ background: tone.dot }}
                    />
                    <span className="flex-1 text-[13px] font-medium">
                      {getRiskLabel(t, level)}
                    </span>
                    <span className="text-[11px] font-light opacity-75">
                      {t(`risk.hint.${level.toLowerCase()}`, LEVEL_HINTS[level])}
                    </span>
                    {viewModel.riskSaving && draftLevel === level ? (
                      <Spinner />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {saveError ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {saveError}
              </p>
            ) : null}
            <button
              type="button"
              className="mt-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-normal text-gray-500 hover:bg-gray-50"
              onClick={() => setIsEditing(false)}
              disabled={viewModel.riskSaving}
            >
              {t("form.button.cancel", "Cancel")}
            </button>
          </div>
        )}

        {!isEditing && recentChanges.length > 0 ? (
          <div className="mt-3">
            <button
              type="button"
              className="text-xs font-normal text-blue-700 hover:underline"
              aria-expanded={isHistoryExpanded}
              onClick={() => setIsHistoryExpanded(v => !v)}
            >
              {isHistoryExpanded
                ? t("risk.hideHistory", "Hide history")
                : t("risk.showHistory", "Show {{count}} earlier assessments", {
                    count: recentChanges.length,
                  })}
            </button>
            {isHistoryExpanded ? (
              <div className="mt-2 border-t border-dashed border-gray-200 pt-2">
                {recentChanges.slice(0, 5).map(item => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-baseline gap-2 py-1 text-xs font-light text-gray-500"
                  >
                    <span className="min-w-[58px] font-normal text-gray-700">
                      {getRiskLabel(t, item.level)}
                    </span>
                    <span className="flex-1">
                      {riskActorLabel(item) || riskSourceLabel(item.source)}
                    </span>
                    <span className="ml-auto">
                      {formatDateTime(item.createdAt || undefined, i18n.language)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  // —— stack (report detail / legacy) ——
  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {t("risk.title", "Risk")}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <RiskBadge level={currentRisk?.level} />
            <span className="text-sm text-gray-500">
              {riskMetaLabel(currentRisk, i18n.language, emptyMeta)}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded border border-blue-700 bg-white px-4 py-2 text-sm font-medium text-blue-500 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => {
            setDraftLevel(currentRisk?.level || "NO_ASSESSMENT");
            setSaveError(undefined);
            setIsEditing(true);
          }}
        >
          <PencilSquareIcon className="h-4 w-4 text-blue-500" />
          {t("risk.edit", "Edit risk")}
        </button>
      </div>

      {recentChanges.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            className="text-xs font-normal text-blue-700 hover:underline"
            aria-expanded={isHistoryExpanded}
            onClick={() => setIsHistoryExpanded(value => !value)}
          >
            {isHistoryExpanded
              ? t("risk.hideHistory", "Hide history")
              : t("risk.showHistory", "Show {{count}} earlier assessments", {
                  count: recentChanges.length,
                })}
          </button>

          {isHistoryExpanded && (
            <div className="mt-2 flex flex-col gap-2 border-t border-dashed border-gray-200 pt-2">
              {recentChanges.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-2 text-xs text-gray-500"
                >
                  <RiskBadge level={item.level} />
                  <span>{riskMetaLabel(item, i18n.language)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="absolute right-4 top-14 z-[2000] w-80 border border-gray-200 bg-white p-4 shadow-lg md:right-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="text-sm font-semibold text-gray-900">
              {t("risk.edit", "Edit risk")}
            </div>
            <div className="flex-grow" />
            <button
              type="button"
              className="rounded p-1 text-gray-500 hover:bg-gray-100"
              onClick={() => setIsEditing(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {RISK_LEVEL_OPTIONS.map(level => (
              <label
                key={level}
                htmlFor={`risk-level-${level}`}
                className="flex cursor-pointer items-center gap-3 rounded border border-gray-100 px-3 py-2 hover:bg-gray-50"
              >
                <input
                  id={`risk-level-${level}`}
                  type="radio"
                  name="risk-level"
                  className="h-4 w-4 text-blue-600"
                  checked={draftLevel === level}
                  onChange={() => setDraftLevel(level)}
                />
                <RiskBadge level={level} />
                <span className="sr-only">{getRiskLabel(t, level)}</span>
              </label>
            ))}
          </div>

          {saveError && (
            <div className="mt-3 text-sm text-red-600">{saveError}</div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsEditing(false)}
              disabled={viewModel.riskSaving}
            >
              <XMarkIcon className="h-4 w-4" />
              {t("form.button.cancel", "Cancel")}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              onClick={saveRisk}
              disabled={viewModel.riskSaving}
            >
              {viewModel.riskSaving ? (
                <Spinner />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
              {t("form.button.save", "Save")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default observer(ReportRiskPanel);
