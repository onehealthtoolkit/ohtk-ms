import { ReportViewModel } from "components/report/reportViewModel";
import { IReportService } from "lib/services/report";
import { ICaseService } from "lib/services/case";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";

function makeViewModel(
  caseService: ICaseService,
  reportService?: IReportService
) {
  const reports = (reportService ||
    ({
      getReport: jest.fn().mockResolvedValue({
        data: { id: "r1", caseId: null, testFlag: false },
      }),
      convertToTestReport: jest.fn(),
    } as unknown)) as IReportService;
  const outbreak = {
    fecthOutbreakPlaces: jest.fn(),
  } as unknown as IOutbreakService;
  return new ReportViewModel("r1", reports, caseService, outbreak);
}

describe("ReportViewModel promoteToCase", () => {
  it("sets errorMessage and clears loading when GraphQL fails", async () => {
    const caseService = {
      promoteToCase: jest.fn().mockResolvedValue({
        data: undefined,
        error: "'User' object has no attribute 'authority'",
      }),
    } as unknown as ICaseService;
    const viewModel = makeViewModel(caseService);

    const caseId = await viewModel.promoteToCase();

    expect(caseId).toBeUndefined();
    expect(viewModel.errorMessage).toBe(
      "'User' object has no attribute 'authority'"
    );
    expect(viewModel.isLoading).toBe(false);
  });

  it("returns the case id on success", async () => {
    const caseService = {
      promoteToCase: jest.fn().mockResolvedValue({
        data: { id: "c1" },
      }),
    } as unknown as ICaseService;
    const viewModel = makeViewModel(caseService);

    const caseId = await viewModel.promoteToCase();

    expect(caseId).toBe("c1");
    expect(viewModel.errorMessage).toBeUndefined();
    expect(viewModel.isLoading).toBe(false);
  });
});
