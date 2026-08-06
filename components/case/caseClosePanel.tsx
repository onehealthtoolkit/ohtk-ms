import { observer } from "mobx-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "components/widgets/spinner";
import { CaseViewModel } from "./caseViewModel";
import { formatDateTime } from "lib/datetime";
import { useRouter } from "next/router";
import { FormQuestion } from "components/formRenderer/question";
import type { CaseCloseOutcome } from "lib/services/case/case";

type FinishTheme = {
  accent: string;
  sectionBg: string;
  title: string;
};

function finishTheme(
  isClosed: boolean,
  closeOutcome?: string,
  closeSource?: string
): FinishTheme {
  if (!isClosed) {
    return {
      accent: "#DC2626",
      sectionBg: "#FFFBFB",
      title: "Finish case",
    };
  }
  if (closeSource === "system") {
    return {
      accent: "#B45309",
      sectionBg: "#FFFDF7",
      title: "Finished · System timeout",
    };
  }
  if (closeOutcome === "false_positive") {
    return {
      accent: "#64748B",
      sectionBg: "#F8FAFC",
      title: "Finished · False positive — no investigation outcome",
    };
  }
  return {
    accent: "#15803D",
    sectionBg: "#F7FCF9",
    title: "Finished · Close case",
  };
}

/** True when workflow has no further non-stop steps (open case still needs Finish). */
function isWorkflowFinishedOpen(viewModel: CaseViewModel): boolean {
  if (viewModel.isCaseClosed) return false;
  const states = viewModel.data.states;
  if (!states?.length) return false;
  const last = [...states].reverse().find(s => s != null);
  if (!last?.state) return false;
  if (last.state.isStopState) return true;
  if (last.transition && last.state.isStopState) return true;
  const actionable =
    last.state.toTransitions?.filter(
      t => t && t.toStep && !t.toStep.isStopState
    ) || [];
  // Pending with no actionable transitions, or all completed with terminal path
  if (!last.transition && actionable.length === 0) return true;
  return false;
}

/**
 * Case Finish (CO2b) — design handoff §3.
 * Dynamic close form still comes from ReportType.close_definition (opsv).
 */
const CaseClosePanel = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Design: no default outcome selected
  const [outcome, setOutcome] = useState<CaseCloseOutcome | null>(null);
  const [fpReason, setFpReason] = useState("");

  const theme = finishTheme(
    viewModel.isCaseClosed,
    viewModel.data.closeOutcome,
    viewModel.data.closeSource
  );

  const reportTypeName = viewModel.data.reportTypeName || "";
  const workflowDone = isWorkflowFinishedOpen(viewModel);

  const finishEnabled =
    !!outcome &&
    !viewModel.caseClosing &&
    !(outcome === "close_case" && viewModel.closeFormError);

  const helperText = !outcome
    ? t("case.finish.chooseFirst", "Choose an outcome first.")
    : outcome === "close_case"
      ? t(
          "case.finish.willConfirm",
          "You will be asked to confirm before the case is finished."
        )
      : t(
          "case.finish.fpNoLab",
          "False positive needs no lab or stamp-out data."
        );

  const openConfirm = () => {
    setError(undefined);
    if (!outcome) return;
    if (outcome === "close_case") {
      if (viewModel.closeFormError) {
        setError(
          t(
            "case.close.formError",
            "Error reading close form definition for this report type."
          )
        );
        return;
      }
      if (viewModel.hasCloseForm && !viewModel.validateCloseForm()) {
        setError(
          t(
            "case.finish.formIncomplete",
            "Please complete the close form before finishing."
          )
        );
        return;
      }
    }
    setConfirmOpen(true);
  };

  const doFinish = async () => {
    if (!outcome) return;
    setError(undefined);
    const payload =
      outcome === "false_positive"
        ? fpReason.trim()
          ? { reason: fpReason.trim() }
          : {}
        : undefined;
    const ok = await viewModel.closeCase(outcome, payload);
    if (!ok) {
      setError(
        viewModel.errorMessage ||
          t("case.finish.error", "Unable to finish case")
      );
      setConfirmOpen(false);
      return;
    }
    setConfirmOpen(false);
  };

  // —— Finished (read-only) ——
  if (viewModel.isCaseClosed) {
    const source =
      viewModel.data.closeSource === "system"
        ? t("case.close.sourceSystem", "System")
        : t("case.close.sourceOfficer", "Officer");
    const outcomeLabel =
      viewModel.data.closeSource === "system"
        ? t("case.finish.systemTimeout", "System timeout")
        : viewModel.data.closeOutcome === "false_positive"
          ? t("case.finish.falsePositive", "False positive")
          : viewModel.data.closeOutcome === "close_case"
            ? t("case.finish.closeCase", "Close case")
            : viewModel.data.closeOutcome || "—";
    const isFp = viewModel.data.closeOutcome === "false_positive";
    const isSystem = viewModel.data.closeSource === "system";
    const isCloseCase = !isFp && !isSystem;

    return (
      <section
        id="finish"
        className="scroll-mt-[70px] border-b border-gray-100 px-[26px] py-[22px] pb-[26px]"
        style={{ background: theme.sectionBg }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-[18px] w-1 shrink-0 rounded-sm"
            style={{ background: theme.accent }}
          />
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: theme.accent }}
          >
            {t(`case.finish.theme.${theme.title}`, theme.title)}
          </h2>
        </div>

        <div className="ml-3.5 mt-4 max-w-[820px]">
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-gray-200 md:grid-cols-4"
            style={{ gap: "1px" }}
          >
            <SummaryCell
              label={t("case.finish.outcome", "Outcome")}
              value={outcomeLabel}
            />
            <SummaryCell
              label={t("case.close.source", "Source")}
              value={source}
            />
            <SummaryCell
              label={t("case.close.closedBy", "Finished by")}
              value={isSystem ? "—" : viewModel.data.closedByName || "—"}
            />
            <SummaryCell
              label={t("case.close.stoppedAt", "Finished at")}
              value={
                viewModel.data.stoppedAt
                  ? formatDateTime(viewModel.data.stoppedAt, router.locale)
                  : "—"
              }
            />
          </div>

          {isCloseCase && (
            <div className="mt-4 max-w-[820px] overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-[15px] py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                {t("case.close.dataReadonly", "Close data · read-only")}
              </div>
              <CloseDataReadonly viewModel={viewModel} />
            </div>
          )}

          {isFp && (
            <div className="mt-4 max-w-[820px] rounded-lg border border-dashed border-gray-200 bg-[#FAFAFA] px-[17px] py-[15px]">
              <div className="text-[13px] font-normal text-gray-700">
                {t("case.finish.reason", "Reason")}{" "}
                <span className="font-light text-gray-400">
                  ({t("form.label.optional", "optional")})
                </span>
              </div>
              <p className="mt-1 text-[13.5px] text-gray-800">
                {viewModel.data.closePayload?.reason
                  ? String(viewModel.data.closePayload.reason)
                  : "—"}
              </p>
              <p className="mt-2 text-xs font-light text-gray-500">
                {t(
                  "case.finish.fpNoLabRequired",
                  "No lab result or stamp-out required for a false positive."
                )}
              </p>
            </div>
          )}

          {isSystem && (
            <div className="mt-4 max-w-[820px] rounded-lg bg-gray-50 px-4 py-3 text-[13.5px] text-gray-700">
              <p>
                {t(
                  "case.finish.systemBody",
                  "Finished automatically after inactivity with no officer action."
                )}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {t(
                  "case.finish.systemNoData",
                  "No officer outcome and no close data were recorded."
                )}
              </p>
            </div>
          )}

          <p className="mt-3.5 text-xs font-light text-gray-400">
            {t(
              "case.finish.cannotReopen",
              "Finished cases cannot be reopened here. Contact an administrator if this was a mistake."
            )}
          </p>
        </div>
      </section>
    );
  }

  // —— Open ——
  return (
    <section
      id="finish"
      className="scroll-mt-[70px] border-b border-gray-100 px-[26px] py-[22px] pb-[26px]"
      style={{ background: theme.sectionBg }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-[18px] w-1 shrink-0 rounded-sm"
          style={{ background: theme.accent }}
        />
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: theme.accent }}
        >
          {t("case.finish.title", "Finish case")}
        </h2>
      </div>

      <div className="ml-3.5 mt-4">
        <p className="max-w-[660px] text-[13px] font-light leading-relaxed text-gray-600">
          {t(
            "case.finish.ledePrefix",
            "This is the only place a case ends. Finishing is"
          )}{" "}
          <strong className="font-medium text-gray-900">
            {t("case.finish.notReversible", "not reversible")}
          </strong>{" "}
          {t("case.finish.ledeSuffix", "from this screen.")}
        </p>

        {workflowDone && (
          <div className="mt-4 max-w-[660px] rounded-[7px] border border-amber-200 bg-amber-50 px-3.5 py-3">
            <p className="text-[12.5px] font-light leading-snug text-amber-900">
              <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-xs font-semibold text-amber-700">
                !
              </span>
              <span className="font-medium text-amber-950">
                {t(
                  "case.finish.workflowDoneLead",
                  "Workflow finished — case still open."
                )}
              </span>{" "}
              {t(
                "case.finish.workflowDoneBody",
                "All work steps are done, but the case stays open until an officer finishes it here."
              )}
            </p>
          </div>
        )}

        <p className="mt-5 text-[12.5px] font-medium text-gray-700">
          {t("case.finish.chooseOutcome", "Choose an outcome")}
        </p>

        <div className="mt-3 grid max-w-[760px] grid-cols-1 gap-3 md:grid-cols-2">
          <OutcomeCard
            selected={outcome === "close_case"}
            title={t("case.finish.closeCase", "Close case")}
            help={t(
              "case.finish.closeCaseHelp",
              "Real investigation end. Requires the close fields for this report type."
            )}
            onSelect={() => setOutcome("close_case")}
            name="finish-outcome"
            value="close_case"
          />
          <OutcomeCard
            selected={outcome === "false_positive"}
            title={t("case.finish.falsePositive", "False positive")}
            help={t(
              "case.finish.falsePositiveHelp",
              "Not a real case. Optional reason only — no lab or stamp-out data."
            )}
            onSelect={() => setOutcome("false_positive")}
            name="finish-outcome"
            value="false_positive"
          />
        </div>

        {outcome === "close_case" && (
          <div className="mt-4 max-w-[760px] animate-[fadein_0.15s_ease] rounded-lg border border-gray-200 bg-white px-[17px] py-4">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              {t("case.close.dataTitle", "Close data")}
              {reportTypeName ? ` · ${reportTypeName}` : ""}
            </div>
            {viewModel.closeFormError && (
              <p className="text-sm text-red-600" role="alert">
                {t(
                  "case.close.formError",
                  "Error reading close form definition for this report type."
                )}
              </p>
            )}
            {!viewModel.closeFormError && viewModel.hasCloseForm && (
              <div className="-mx-1">
                <CloseFormFields viewModel={viewModel} />
              </div>
            )}
            {!viewModel.closeFormError && !viewModel.hasCloseForm && (
              <p className="text-sm font-light text-gray-500">
                {t(
                  "case.close.noFields",
                  "No close fields are required for this report type."
                )}
              </p>
            )}
            <p className="mt-3 text-xs font-light text-gray-400">
              {t(
                "case.close.storedOnCase",
                "Close data is stored on the case. It does not change the original report in the Detail tab."
              )}
            </p>
          </div>
        )}

        {outcome === "false_positive" && (
          <div className="mt-4 max-w-[760px] animate-[fadein_0.15s_ease] rounded-lg border border-dashed border-gray-200 bg-[#FAFAFA] px-[17px] py-[15px]">
            <label
              className="text-[13px] font-normal text-gray-700"
              htmlFor="fp-reason"
            >
              {t("case.finish.reason", "Reason")}
              <span className="font-light text-gray-400">
                {" "}
                · {t("form.label.optional", "optional")}
              </span>
            </label>
            <textarea
              id="fp-reason"
              className="mt-2 min-h-[58px] w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-[13px] font-light text-gray-800 placeholder:text-gray-400"
              placeholder={t(
                "case.finish.fpPlaceholder",
                "Why is this not a real case?"
              )}
              value={fpReason}
              onChange={e => setFpReason(e.target.value)}
              disabled={viewModel.caseClosing}
            />
            <p className="mt-2 text-xs font-light text-gray-500">
              {t(
                "case.finish.fpNoLabRequired",
                "No lab result or stamp-out is required for a false positive."
              )}
            </p>
          </div>
        )}

        <div className="mt-[18px] flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center rounded-[7px] px-[26px] py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed"
            style={{
              background: finishEnabled ? "#DC2626" : "#FCA5A5",
            }}
            disabled={!finishEnabled}
            onClick={openConfirm}
          >
            {viewModel.caseClosing && (
              <span className="mr-2">
                <Spinner />
              </span>
            )}
            {t("case.finish.button", "Finish case")}
          </button>
          <span className="text-[12.5px] font-light text-gray-500">
            {helperText}
          </span>
          {error && (
            <span className="text-sm text-red-600" role="alert">
              {error}
            </span>
          )}
        </div>
      </div>

      {confirmOpen && outcome && (
        <FinishConfirmModal
          outcome={outcome}
          fpReason={fpReason}
          viewModel={viewModel}
          busy={viewModel.caseClosing}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={doFinish}
        />
      )}
    </section>
  );
};

const SummaryCell = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white px-[15px] py-[13px]">
    <div className="mb-1.5 text-[11px] font-light text-gray-400">{label}</div>
    <div className="text-[13.5px] font-medium text-gray-900">{value}</div>
  </div>
);

const OutcomeCard = ({
  selected,
  title,
  help,
  onSelect,
  name,
  value,
}: {
  selected: boolean;
  title: string;
  help: string;
  onSelect: () => void;
  name: string;
  value: string;
}) => (
  <label
    className={`flex cursor-pointer gap-3 rounded-lg border-[1.5px] px-[15px] py-3.5 transition-colors ${
      selected
        ? "border-blue-600 bg-blue-50"
        : "border-gray-200 bg-white hover:border-gray-300"
    }`}
  >
    <input
      type="radio"
      name={name}
      value={value}
      className="mt-1 h-[15px] w-[15px] shrink-0 accent-blue-600"
      checked={selected}
      onChange={onSelect}
    />
    <span>
      <span className="block text-sm font-medium text-gray-900">{title}</span>
      <span className="mt-1 block text-[12.5px] font-light text-gray-500">
        {help}
      </span>
    </span>
  </label>
);

/** Dynamic opsv close form — same as before, wrapped for design card. */
const CloseFormFields = observer(
  ({ viewModel }: { viewModel: CaseViewModel }) => {
    const form = viewModel.closeForm;
    if (!form) {
      return null;
    }
    return (
      <>
        {form.sections.map((section, sIdx) => (
          <div key={sIdx + section.label}>
            {section.label && form.sections.length > 1 && (
              <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
                {section.label}
              </div>
            )}
            {section.description && (
              <p className="px-1 pt-2 text-xs text-gray-500">
                {section.description}
              </p>
            )}
            {section.questions.map((question, qIdx) => (
              <FormQuestion
                key={qIdx + question.label}
                question={question}
                definition={viewModel.closeFormDefinitionJson}
              />
            ))}
          </div>
        ))}
      </>
    );
  }
);

/** Finished close data as key/value — not disabled inputs (design). */
const CloseDataReadonly = observer(
  ({ viewModel }: { viewModel: CaseViewModel }) => {
    const payload = viewModel.data.closePayload || {};
    const rows = useMemo(() => {
      const skip = new Set(["close_outcome"]);
      const form = viewModel.closeForm;
      const labelByName: Record<string, string> = {};
      if (form) {
        for (const section of form.sections) {
          for (const q of section.questions) {
            for (const f of q.fields || []) {
              if (f.name) labelByName[f.name] = q.label || f.name;
            }
          }
        }
      }
      return Object.entries(payload)
        .filter(
          ([k, v]) => !skip.has(k) && v !== undefined && v !== null && v !== ""
        )
        .map(([k, v]) => ({
          label: labelByName[k] || k.replace(/_/g, " "),
          value: String(v),
        }));
    }, [payload, viewModel.closeForm]);

    if (rows.length === 0) {
      return <p className="px-[15px] py-3 text-sm text-gray-500">—</p>;
    }

    return (
      <dl className="grid gap-x-[18px] gap-y-3 px-[15px] py-3 sm:grid-cols-[170px_1fr]">
        {rows.map(row => (
          <div key={row.label} className="contents">
            <dt className="text-[13px] font-light capitalize text-gray-500">
              {row.label}
            </dt>
            <dd className="text-[13.5px] font-medium text-gray-900 whitespace-pre-wrap">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
);

const FinishConfirmModal = ({
  outcome,
  fpReason,
  viewModel,
  busy,
  onCancel,
  onConfirm,
}: {
  outcome: CaseCloseOutcome;
  fpReason: string;
  viewModel: CaseViewModel;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();
  const isFp = outcome === "false_positive";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const receipt = useMemo(() => {
    if (isFp) {
      return [
        {
          k: t("case.finish.outcome", "Outcome"),
          v: t("case.finish.falsePositive", "False positive"),
        },
        {
          k: t("case.finish.reason", "Reason"),
          v: fpReason.trim()
            ? fpReason.trim()
            : t("case.finish.reasonEmpty", "— (optional, not given)"),
        },
      ];
    }
    const live =
      typeof viewModel.getClosePayload === "function"
        ? viewModel.getClosePayload()
        : viewModel.data.closePayload || {};
    const rows = [
      {
        k: t("case.finish.outcome", "Outcome"),
        v: t("case.finish.closeCase", "Close case"),
      },
    ];
    const form = viewModel.closeForm;
    if (form) {
      for (const section of form.sections) {
        for (const q of section.questions) {
          for (const f of q.fields || []) {
            if (!f.name) continue;
            const val = live[f.name];
            if (val === undefined || val === null || val === "") continue;
            rows.push({
              k: q.label || f.name,
              v: String(val),
            });
          }
        }
      }
    } else {
      Object.entries(live).forEach(([k, v]) => {
        if (k === "close_outcome" || v === "" || v == null) return;
        rows.push({ k, v: String(v) });
      });
    }
    return rows;
  }, [isFp, fpReason, viewModel, t]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/55 animate-[fadein_0.12s_ease]"
        onClick={onCancel}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[81] w-full max-w-[520px] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.3)] animate-[fadein_0.15s_ease]"
      >
        <div className="px-6 pt-6 pb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            {t("case.finish.confirmEyebrow", "Confirm — cannot be undone")}
          </div>
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            {isFp
              ? t(
                  "case.finish.confirmTitleFp",
                  "Finish this case as a false positive?"
                )
              : t(
                  "case.finish.confirmTitleClose",
                  "Finish and close this case?"
                )}
          </h3>
          <p className="mt-2 text-[13.5px] font-light leading-relaxed text-gray-600">
            {isFp
              ? t(
                  "case.finish.confirmBodyFp",
                  "The case will be marked Finished · False positive. It cannot be reopened from this screen."
                )
              : t(
                  "case.finish.confirmBodyClose",
                  "The case will be marked Finished · Close case and the close data below will be stored on the case. It cannot be reopened from this screen."
                )}
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            {receipt.map((row, i) => (
              <div
                key={row.k + i}
                className={`flex gap-3 px-3.5 py-2.5 text-[12.5px] ${
                  i > 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <span className="min-w-[120px] font-light text-gray-500">
                  {row.k}
                </span>
                <span className="font-normal text-gray-900 whitespace-pre-wrap">
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            type="button"
            className="rounded-[7px] border border-gray-300 bg-white px-[18px] py-3 text-[13.5px] font-normal text-gray-700 hover:bg-gray-50"
            onClick={onCancel}
            disabled={busy}
          >
            {t("form.button.cancel", "Cancel")}
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-[7px] bg-red-600 px-[22px] py-3 text-[13.5px] font-medium text-white hover:bg-red-700 disabled:opacity-60"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy && (
              <span className="mr-2">
                <Spinner />
              </span>
            )}
            {isFp
              ? t("case.finish.confirmCtaFp", "Finish as false positive")
              : t("case.finish.confirmCtaClose", "Finish case")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(CaseClosePanel);
