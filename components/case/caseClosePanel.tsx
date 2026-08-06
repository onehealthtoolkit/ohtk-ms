import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "components/widgets/spinner";
import { CaseViewModel } from "./caseViewModel";
import { formatDateTime } from "lib/datetime";
import { useRouter } from "next/router";
import { FormQuestion } from "components/formRenderer/question";
import type { CaseCloseOutcome } from "lib/services/case/case";

/**
 * Case Finish (CO2b): one officer door — choose outcome, fill form if needed, finish.
 * Workflow no longer closes cases (WF1).
 */
const CaseClosePanel = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [confirming, setConfirming] = useState(false);
  const [outcome, setOutcome] = useState<CaseCloseOutcome>("close_case");
  const [fpReason, setFpReason] = useState("");

  if (viewModel.isCaseClosed) {
    const source =
      viewModel.data.closeSource === "system"
        ? t("case.close.sourceSystem", "System")
        : t("case.close.sourceOfficer", "Officer");
    const outcomeLabel =
      viewModel.data.closeOutcome === "false_positive"
        ? t("case.finish.falsePositive", "False positive")
        : viewModel.data.closeOutcome === "close_case"
          ? t("case.finish.closeCase", "Close case")
          : viewModel.data.closeOutcome || "—";
    return (
      <section className="relative my-4 bg-white px-4 py-3 md:px-8">
        <div className="text-xs font-bold uppercase tracking-wider text-green-700">
          {t("case.finish.closedTitle", "Finished")}
        </div>
        <dl className="mt-2 grid gap-1 text-sm text-gray-700">
          <div>
            <span className="font-medium">
              {t("case.close.stoppedAt", "Stopped date")}:{" "}
            </span>
            {viewModel.data.stoppedAt
              ? formatDateTime(viewModel.data.stoppedAt, router.locale)
              : "—"}
          </div>
          <div>
            <span className="font-medium">
              {t("case.close.source", "Close source")}:{" "}
            </span>
            {source}
          </div>
          <div>
            <span className="font-medium">
              {t("case.finish.outcome", "Outcome")}:{" "}
            </span>
            {outcomeLabel}
          </div>
          {viewModel.data.closedByName ? (
            <div>
              <span className="font-medium">
                {t("case.close.closedBy", "Closed by")}:{" "}
              </span>
              {viewModel.data.closedByName}
            </div>
          ) : null}
        </dl>

        {viewModel.data.closeOutcome === "close_case" &&
          viewModel.hasCloseForm && (
            <div className="mt-4 border-t border-gray-100 pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                {t("case.close.dataTitle", "Close data")}
              </div>
              <div className="pointer-events-none opacity-90">
                <CloseFormFields viewModel={viewModel} />
              </div>
            </div>
          )}
        {viewModel.data.closeOutcome === "false_positive" &&
          viewModel.data.closePayload?.reason && (
            <p className="mt-3 text-sm text-gray-700">
              <span className="font-medium">
                {t("case.finish.reason", "Reason")}:{" "}
              </span>
              {String(viewModel.data.closePayload.reason)}
            </p>
          )}
      </section>
    );
  }

  const onFinish = async () => {
    setError(undefined);
    if (!confirming) {
      setConfirming(true);
      return;
    }
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
      setConfirming(false);
    }
  };

  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {t("case.finish.title", "Finish case")}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {t(
          "case.finish.help",
          "Choose how this case ends. Workflow steps track work only — finishing the case happens here."
        )}
      </p>

      <fieldset className="mt-4 space-y-2">
        <legend className="text-sm font-semibold text-gray-800">
          {t("case.finish.chooseOutcome", "How did this case end?")}
        </legend>
        <label className="flex items-start gap-2 text-sm text-gray-800">
          <input
            type="radio"
            name="finish-outcome"
            className="mt-1"
            checked={outcome === "close_case"}
            onChange={() => {
              setOutcome("close_case");
              setConfirming(false);
            }}
          />
          <span>
            <span className="font-medium">
              {t("case.finish.closeCase", "Close case")}
            </span>
            <span className="block text-xs text-gray-500">
              {t(
                "case.finish.closeCaseHelp",
                "Investigation complete — enter test result and stamped out if required."
              )}
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-gray-800">
          <input
            type="radio"
            name="finish-outcome"
            className="mt-1"
            checked={outcome === "false_positive"}
            onChange={() => {
              setOutcome("false_positive");
              setConfirming(false);
            }}
          />
          <span>
            <span className="font-medium">
              {t("case.finish.falsePositive", "False positive")}
            </span>
            <span className="block text-xs text-gray-500">
              {t(
                "case.finish.falsePositiveHelp",
                "Not a real case / discard path — no stamp-out or lab fields required."
              )}
            </span>
          </span>
        </label>
      </fieldset>

      {outcome === "close_case" && (
        <>
          {viewModel.closeFormError && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {t(
                "case.close.formError",
                "Error reading close form definition for this report type."
              )}
            </p>
          )}
          {!viewModel.closeFormError && viewModel.hasCloseForm && (
            <div className="mt-3 rounded border border-gray-200">
              <CloseFormFields viewModel={viewModel} />
            </div>
          )}
          {!viewModel.closeFormError && !viewModel.hasCloseForm && (
            <p className="mt-3 text-sm text-gray-500">
              {t(
                "case.close.noFields",
                "No close fields for this report type. You can still finish the case."
              )}
            </p>
          )}
        </>
      )}

      {outcome === "false_positive" && (
        <div className="mt-3">
          <label
            className="text-sm font-medium text-gray-800"
            htmlFor="fp-reason"
          >
            {t("case.finish.reason", "Reason")}{" "}
            <span className="font-normal text-gray-500">
              ({t("form.label.optional", "optional")})
            </span>
          </label>
          <textarea
            id="fp-reason"
            className="mt-1 w-full min-h-[72px] rounded border border-gray-300 px-3 py-2 text-sm"
            value={fpReason}
            onChange={e => setFpReason(e.target.value)}
            disabled={viewModel.caseClosing}
          />
        </div>
      )}

      {confirming && (
        <p className="mt-3 text-sm font-medium text-amber-700">
          {t(
            "case.finish.confirmPrompt",
            "Confirm finish? This cannot be undone from this screen."
          )}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
          disabled={
            viewModel.caseClosing ||
            (outcome === "close_case" && viewModel.closeFormError)
          }
          onClick={onFinish}
        >
          {viewModel.caseClosing && (
            <span className="mr-2">
              <Spinner />
            </span>
          )}
          {confirming
            ? t("case.finish.confirm", "Confirm finish")
            : t("case.finish.button", "Finish case")}
        </button>
        {confirming && (
          <button
            type="button"
            className="text-sm text-gray-600 underline"
            disabled={viewModel.caseClosing}
            onClick={() => setConfirming(false)}
          >
            {t("form.button.cancel", "Cancel")}
          </button>
        )}
        {error && (
          <span className="text-sm text-red-600" role="alert">
            {error}
          </span>
        )}
      </div>
    </section>
  );
};

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
              <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                {section.label}
              </div>
            )}
            {section.description && (
              <p className="px-4 pt-3 text-xs text-gray-500">
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

export default observer(CaseClosePanel);
