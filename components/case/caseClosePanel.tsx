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
  const [newSpecies, setNewSpecies] = useState("");

  if (viewModel.isCaseClosed) {
    const source =
      viewModel.data.closeSource === "system"
        ? t("case.close.sourceSystem", "System")
        : t("case.close.sourceOfficer", "Officer");
    const stampOut = viewModel.data.closePayload?.stamp_out;
    const stampOutEntries =
      stampOut && typeof stampOut === "object" && !Array.isArray(stampOut)
        ? Object.entries(stampOut as Record<string, number>)
        : [];
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
          {stampOutEntries.length > 0 ? (
            <div>
              <span className="font-medium">
                {viewModel.stampOutFieldLabel}:{" "}
              </span>
              {stampOutEntries
                .map(([species, count]) => `${species}: ${count}`)
                .join(", ")}
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

  const stampOutEntries = Object.entries(viewModel.stampOutDraft);

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
          <div className="text-sm font-semibold text-gray-700">
            {viewModel.stampOutFieldLabel}
            {viewModel.requiresStampOut ? (
              <span className="ml-1 text-red-600">*</span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {t(
              "case.close.stampOutHelp",
              "Enter animals stamped out by species (count ≥ 0)."
            )}
          </p>
          <ul className="mt-2 space-y-2">
            {stampOutEntries.map(([species, count]) => (
              <li
                key={species}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="min-w-[6rem] font-medium text-gray-800">
                  {species}
                </span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  className="w-24 rounded border border-gray-300 px-2 py-1"
                  value={count}
                  disabled={viewModel.caseClosing}
                  onChange={e =>
                    viewModel.setStampOutCount(species, Number(e.target.value))
                  }
                  aria-label={`${species} count`}
                />
                <button
                  type="button"
                  className="text-xs text-gray-600 underline"
                  disabled={viewModel.caseClosing}
                  onClick={() => viewModel.removeStampOutSpecies(species)}
                >
                  {t("form.button.remove", "Remove")}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <input
              type="text"
              className="min-w-[8rem] flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
              placeholder={t("case.close.speciesPlaceholder", "Species name")}
              value={newSpecies}
              disabled={viewModel.caseClosing}
              onChange={e => setNewSpecies(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const name = newSpecies.trim();
                  if (!name) return;
                  viewModel.setStampOutCount(name, 0);
                  setNewSpecies("");
                }
              }}
            />
            <button
              type="button"
              className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={viewModel.caseClosing || !newSpecies.trim()}
              onClick={() => {
                const name = newSpecies.trim();
                if (!name) return;
                viewModel.setStampOutCount(name, 0);
                setNewSpecies("");
              }}
            >
              {t("case.close.addSpecies", "Add species")}
            </button>
          </div>
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
