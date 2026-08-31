import { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  ErrorText,
  FormMessage,
  Label,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { AskAiSummaryViewModel } from "./askAiSummaryViewModel";

type AskAiSummaryProps = {
  reportId?: string | null;
};

const AskAiSummary = ({ reportId }: AskAiSummaryProps) => {
  const { t } = useTranslation();
  const store = useStore();
  const { integrationService } = useServices();
  const [viewModel] = useState(
    () => new AskAiSummaryViewModel(integrationService)
  );

  // Visible only when me.aiSummaryEnabled, which is integrations.ai_enabled=enable.
  if (!reportId || !store.me?.aiSummaryEnabled) {
    return null;
  }

  const disabled = viewModel.isSubmitting || viewModel.isLocked;

  return (
    <div className="mt-4 px-4" data-testid="ask-ai-summary">
      <button
        type="button"
        data-testid="ask-ai-open"
        className="px-4 py-2 rounded text-white bg-[#4C81F1] border border-blue-300 hover:border-blue-500 disabled:opacity-50"
        disabled={disabled}
        onClick={() => viewModel.openDialog()}
      >
        {t("form.button.askAi", "Ask AI")}
      </button>
      {viewModel.successMessage ? (
        <p className="text-sm text-green-700 mt-2">
          {viewModel.successMessage}
        </p>
      ) : null}

      <BaseModalDialog
        store={viewModel.promptDialog}
        title={t("form.button.askAi", "Ask AI")}
        heightClassName="min-h-[40vh]"
        widthClassName="sm:w-[480px] sm:min-w-[30vw] min-w-[80vw]"
        onClose={() => viewModel.closeDialog()}
        renderContent={() => (
          <div className="pt-2 pb-2">
            <Label htmlFor="aiUserPrompt">
              {t("form.label.aiUserPrompt", "Extra instruction (optional)")}
            </Label>
            <TextArea
              id="aiUserPrompt"
              rows={4}
              disabled={viewModel.isSubmitting}
              placeholder={t(
                "form.placeholder.aiUserPrompt",
                "Add extra instruction for this summary (optional)"
              )}
              value={viewModel.userPrompt}
              onChange={event => viewModel.setUserPrompt(event.target.value)}
            />
            <ErrorText>{viewModel.fieldErrors.userPrompt}</ErrorText>
            {viewModel.submitError ? (
              <FormMessage>{viewModel.submitError}</FormMessage>
            ) : null}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                data-testid="ask-ai-send"
                className="p-3 bg-blue-500 rounded-md w-full text-white disabled:opacity-50"
                disabled={viewModel.isSubmitting}
                onClick={() => viewModel.request(reportId)}
              >
                {viewModel.isSubmitting ? (
                  <Spinner />
                ) : (
                  t("form.button.send", "Send")
                )}
              </button>
              <button
                type="button"
                className="p-3 bg-gray-300 rounded-md w-full text-black disabled:opacity-50"
                disabled={viewModel.isSubmitting}
                onClick={() => viewModel.closeDialog()}
              >
                {t("form.button.cancel", "Cancel")}
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default observer(AskAiSummary);
