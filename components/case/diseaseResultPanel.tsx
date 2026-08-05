import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "components/widgets/spinner";
import { CaseViewModel } from "./caseViewModel";

const DiseaseResultPanel = ({ viewModel }: { viewModel: CaseViewModel }) => {
  const { t } = useTranslation();
  const [saveError, setSaveError] = useState<string | undefined>();
  const aiSuspected = (viewModel.data.aiSuspected || "").trim();

  const saveTestResult = async () => {
    setSaveError(undefined);
    const saved = await viewModel.saveTestResult();
    if (!saved) {
      setSaveError(
        viewModel.errorMessage ||
          t("case.diseaseResult.saveError", "Unable to save test result")
      );
    }
  };

  return (
    <section className="relative my-4 bg-white px-4 py-3 md:px-8">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {t("case.diseaseResult.title", "Disease result")}
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold text-gray-700">
          {t("case.diseaseResult.aiSuspected", "AI suspected")}
        </div>
        <div className="mt-1 max-h-40 overflow-y-auto rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 whitespace-pre-wrap">
          {aiSuspected
            ? aiSuspected
            : t("case.diseaseResult.emptyAi", "No AI assessment yet")}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700">
          {t("case.diseaseResult.testResult", "Test result")}
        </div>
        <textarea
          className={`mt-1 w-full min-h-[96px] rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
            viewModel.isCaseClosed
              ? "cursor-default border-gray-200 bg-gray-50 text-gray-800"
              : "border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }`}
          value={viewModel.testResultDraft}
          disabled={viewModel.testResultSaving || viewModel.isCaseClosed}
          readOnly={viewModel.isCaseClosed}
          onChange={e => viewModel.setTestResultDraft(e.target.value)}
          aria-label={t("case.diseaseResult.testResult", "Test result")}
        />
        <p className="mt-1 text-xs text-gray-500">
          {viewModel.isCaseClosed
            ? t(
                "case.diseaseResult.closedHelper",
                "Test result is read-only after the case is closed."
              )
            : t(
                "case.diseaseResult.helper",
                "Include lab notes or reference IDs here if needed. Attach lab files via Comments."
              )}
        </p>
      </div>

      {!viewModel.isCaseClosed && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={viewModel.testResultSaving || !viewModel.testResultDirty}
            onClick={saveTestResult}
          >
            {viewModel.testResultSaving && (
              <span className="mr-2">
                <Spinner />
              </span>
            )}
            {t("case.diseaseResult.save", "Save test result")}
          </button>
          {saveError && (
            <span className="text-sm text-red-600" role="alert">
              {saveError}
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default observer(DiseaseResultPanel);
