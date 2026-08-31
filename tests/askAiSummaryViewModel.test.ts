import {
  ASK_AI_LOCK_MS,
  AskAiSummaryViewModel,
} from "components/case/askAiSummaryViewModel";
import { IIntegrationService } from "lib/services/integration";

const mockService = {
  requestAiSummary: jest.fn(),
} as unknown as IIntegrationService;

describe("AskAiSummaryViewModel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-31T10:00:00Z"));
    (mockService.requestAiSummary as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("opens the extra-instruction dialog", () => {
    const viewModel = new AskAiSummaryViewModel(mockService);
    expect(viewModel.promptDialog.isOpen).toBe(false);
    viewModel.openDialog();
    expect(viewModel.promptDialog.isOpen).toBe(true);
  });

  it("sends optional prompt, closes dialog, and locks after success", async () => {
    (mockService.requestAiSummary as jest.Mock).mockResolvedValue({
      success: true,
      data: { eventId: "e1", reportId: "r1", status: "queued" },
    });
    const viewModel = new AskAiSummaryViewModel(mockService);
    viewModel.openDialog();
    viewModel.setUserPrompt("  Focus on deaths  ");

    const ok = await viewModel.request("r1");

    expect(ok).toBe(true);
    expect(mockService.requestAiSummary).toHaveBeenCalledWith(
      "r1",
      "  Focus on deaths  "
    );
    expect(viewModel.promptDialog.isOpen).toBe(false);
    expect(viewModel.isLocked).toBe(true);
    expect(viewModel.successMessage).toContain("Comments");
    jest.advanceTimersByTime(ASK_AI_LOCK_MS);
    expect(viewModel.isLocked).toBe(false);
  });

  it("keeps the dialog open on field errors", async () => {
    (mockService.requestAiSummary as jest.Mock).mockResolvedValue({
      success: false,
      fields: { userPrompt: "User prompt must be 2000 characters or fewer." },
      message: "User prompt must be 2000 characters or fewer.",
    });
    const viewModel = new AskAiSummaryViewModel(mockService);
    viewModel.openDialog();

    const ok = await viewModel.request("r1");

    expect(ok).toBe(false);
    expect(viewModel.promptDialog.isOpen).toBe(true);
    expect(viewModel.fieldErrors.userPrompt).toContain("2000");
    expect(viewModel.submitError).toContain("2000");
    expect(viewModel.isLocked).toBe(false);
  });
});
