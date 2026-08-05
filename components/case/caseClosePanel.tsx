import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "components/widgets/spinner";
import { CaseViewModel } from "./caseViewModel";
import { formatDateTime } from "lib/datetime";
import { useRouter } from "next/router";

const CaseClosePanel = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [confirming, setConfirming] = useState(false);

  if (viewModel.isCaseClosed) {
    const source =
      viewModel.data.closeSource === "system"
        ? t("case.close.sourceSystem", "System")
        : t("case.close.sourceOfficer", "Officer");
    const stampOut = viewModel.data.closePayload?.stamp_out;
    const stampOutDisplay =
      typeof stampOut === "number"
        ? String(stampOut)
        : typeof stampOut === "string" && stampOut.trim() !== ""
          ? stampOut
          : null;
    return (
      <section className="relative my-4 bg-white px-4 py-3 md:px-8">
        <div className="text-xs font-bold uppercase tracking-wider text-green-700">
          {t("case.close.closedTitle", "Closed")}
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
          {viewModel.data.closedByName ? (
            <div>
              <span className="font-medium">
                {t("case.close.closedBy", "Closed by")}:{" "}
              </span>
              {viewModel.data.closedByName}
            </div>
          ) : null}
          {stampOutDisplay !== null ? (
            <div>
              <span className="font-medium">
                {viewModel.stampOutFieldLabel}:{" "}
              </span>
              {stampOutDisplay}
            </div>
          ) : null}
        </dl>
      </section>
    );
  }

  const onClose = async () => {
    setError(undefined);
    if (!confirming) {
      setConfirming(true);
      return;
    }
    const ok = await viewModel.closeCase();
    if (!ok) {
      setError(
        viewModel.errorMessage || t("case.close.error", "Unable to close case")
      );
      setConfirming(false);
    }
  };

  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {t("case.close.title", "Close case")}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {t(
          "case.close.help",
          "Closing sets the stopped date to now and marks this case finished. Current test result draft will be saved on close."
        )}
      </p>

      {viewModel.hasStampOutField && (
        <div className="mt-4">
          <label
            className="text-sm font-semibold text-gray-700"
            htmlFor="case-stamp-out"
          >
            {viewModel.stampOutFieldLabel}
            {viewModel.requiresStampOut ? (
              <span className="ml-1 text-red-600">*</span>
            ) : null}
          </label>
          <p className="mt-1 text-xs text-gray-500">
            {t(
              "case.close.stampOutHelp",
              "Number of animals terminated for this report species (integer ≥ 0)."
            )}
          </p>
          <input
            id="case-stamp-out"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            className="mt-2 w-32 rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={viewModel.stampOutDraft}
            disabled={viewModel.caseClosing}
            onChange={e => viewModel.setStampOutDraft(e.target.value)}
            aria-label={viewModel.stampOutFieldLabel}
          />
        </div>
      )}

      {confirming && (
        <p className="mt-2 text-sm font-medium text-amber-700">
          {t(
            "case.close.confirmPrompt",
            "Confirm close? This cannot be undone from this screen."
          )}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
          disabled={viewModel.caseClosing}
          onClick={onClose}
        >
          {viewModel.caseClosing && (
            <span className="mr-2">
              <Spinner />
            </span>
          )}
          {confirming
            ? t("case.close.confirm", "Confirm close")
            : t("case.close.button", "Close case")}
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

export default observer(CaseClosePanel);
