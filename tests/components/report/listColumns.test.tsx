/** @jest-environment jsdom */
import { render, screen, within } from "@testing-library/react";
import ReportList from "components/report/list";
import { buildClientSchema, print, validate } from "graphql";
import { ReportService } from "lib/services/report";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import type { ReactNode } from "react";

const mockQuery = {};
const mockApiQuery = jest.fn();
let mockVillageEnabled = true;
let mockReportService: ReportService;

jest.mock("next/router", () => ({
  useRouter: () => ({ isReady: true, locale: "en", push: jest.fn() }),
}));
jest.mock("lib/hooks/urlParams/useUrlParams", () => ({
  __esModule: true,
  default: () => ({ query: mockQuery, setUrl: jest.fn(), resetUrl: jest.fn() }),
}));
jest.mock("lib/services/provider", () => ({
  __esModule: true,
  default: () => ({ reportService: mockReportService }),
}));
jest.mock("lib/store", () => ({
  __esModule: true,
  default: () => ({
    isFeatureEnable: (key: string) => key === "village" && mockVillageEnabled,
  }),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (_key: string, fallback: string) => fallback }),
  Trans: ({ children }: { children: ReactNode }) => children,
}));
jest.mock("components/report/filter", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/calendar", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/report/dayEvents", () => ({
  ReportDayEvents: () => null,
}));
jest.mock("components/widgets/table/paginate", () => ({
  __esModule: true,
  default: () => null,
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockVillageEnabled = true;
  mockReportService = new ReportService({
    query: mockApiQuery,
  } as unknown as LegacyApolloClient);
  const report = {
    createdAt: "2026-11-10T03:00:00Z",
    incidentDate: "2026-11-10",
    rendererData: "Sick cattle",
    reportType: { name: "Animal illness" },
    authorities: [{ name: "District office" }],
    reportedBy: { firstName: "Reporter", lastName: "Name" },
    testFlag: false,
    caseId: null,
    images: [],
  };
  mockApiQuery.mockResolvedValue({
    data: {
      incidentReports: {
        totalCount: 2,
        results: [
          {
            ...report,
            id: "r1",
            village: { name: "ບ້ານທົດສອບ", code: "V01" },
            currentRiskAssessment: { id: "risk1", level: "HIGH" },
          },
          { ...report, id: "r2", village: null, currentRiskAssessment: null },
        ],
      },
    },
  });
});

test("shows the report's village after Authority and Risk after Data, including missing villages", async () => {
  render(<ReportList />);
  await screen.findByText("ບ້ານທົດສອບ");

  expect(
    screen.getAllByRole("columnheader").map(cell => cell.textContent)
  ).toEqual([
    "Case ID",
    "Created At",
    "Incident Date",
    "Report Type",
    "Authority Name",
    "Village",
    "Data",
    "Risk",
    "",
  ]);
  const rows = screen.getAllByRole("row").slice(1);
  const firstCells = within(rows[0]).getAllByRole("cell");
  expect(firstCells[4]).toHaveTextContent("District office");
  expect(firstCells[5]).toHaveTextContent(/^ບ້ານທົດສອບ$/);
  expect(firstCells[6]).toHaveTextContent("Sick cattle");
  expect(firstCells[7]).toHaveTextContent("High");
  expect(rows[0]).toHaveStyle({ boxShadow: "inset 4px 0 0 #ea580c" });
  const legacyCells = within(rows[1]).getAllByRole("cell");
  expect(legacyCells[5]).toBeEmptyDOMElement();
  expect(legacyCells[7]).toHaveTextContent("No assessment");

  const query = mockApiQuery.mock.calls[0][0].query;
  expect(print(query)).toMatch(/village\s*\{\s*name\s*\}/);
  expect(
    validate(buildClientSchema(require("../../../graphql.schema.json")), query)
  ).toEqual([]);
});

test("keeps Risk after Data when the village feature is disabled", async () => {
  mockVillageEnabled = false;
  render(<ReportList />);
  await screen.findByText("High");
  expect(screen.queryByRole("columnheader", { name: "Village" })).toBeNull();
  expect(screen.queryByText("ບ້ານທົດສອບ")).toBeNull();
  expect(
    screen.getAllByRole("columnheader").map(cell => cell.textContent)
  ).toEqual([
    "Case ID",
    "Created At",
    "Incident Date",
    "Report Type",
    "Authority Name",
    "Data",
    "Risk",
    "",
  ]);
});
