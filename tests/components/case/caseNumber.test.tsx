/** @jest-environment jsdom */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { buildClientSchema, print, validate } from "graphql";
import type { ParsedUrlQuery } from "querystring";
import type { ReactNode } from "react";
import CaseList from "components/case/list";
import CaseNumberLink from "components/case/caseNumberLink";
import Case from "components/case/case";
import ReportList from "components/report/list";
import { CaseService } from "lib/services/case";
import { ReportService } from "lib/services/report";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import {
  CasesDocument,
  GetCaseDocument,
  ReportsDocument,
} from "lib/generated/graphql";

let mockQuery: ParsedUrlQuery = {};
const mockApiQuery = jest.fn();
const mockSetUrl = jest.fn();
const mockResetUrl = jest.fn();
const mockPush = jest.fn();
let mockCaseService: CaseService;
let mockReportService: ReportService;

jest.mock("next/router", () => ({
  useRouter: () => ({ isReady: true, locale: "en", query: {}, push: mockPush }),
}));
jest.mock("lib/hooks/urlParams/useUrlParams", () => ({
  __esModule: true,
  default: () => ({
    query: mockQuery,
    setUrl: mockSetUrl,
    resetUrl: mockResetUrl,
  }),
}));
jest.mock("lib/services/provider", () => ({
  __esModule: true,
  default: () => ({
    caseService: mockCaseService,
    reportService: mockReportService,
  }),
}));
jest.mock("lib/store", () => ({
  __esModule: true,
  default: () => ({
    isFeatureEnable: () => false,
    me: { id: "officer", isSuperUser: false },
  }),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (_key: string, fallback: string) => fallback }),
  Trans: ({ children }: { children: ReactNode }) => children,
}));
jest.mock("react-select/async", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/dateRangeField", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/report/reportTypeSelect", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/report/filter", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/calendar", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/dayEvents", () => ({ CaseDayEvents: () => null }));
jest.mock("components/report/dayEvents", () => ({
  ReportDayEvents: () => null,
}));
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => () => null,
}));
jest.mock("components/case/caseBreadcrumb", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/caseState/view", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/caseAssessmentSection", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/caseClosePanel", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/caseHeaderAside", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/comments", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/askAiSummary", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/dialogs/galleryDialog", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/case/reportMapDialog", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/viewActionButtons", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/report/followup/list", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/table/paginate", () => ({
  __esModule: true,
  default: ({
    offset,
    limit,
    onChange,
  }: {
    offset: number;
    limit: number;
    onChange: (offset: number) => void;
  }) => <button onClick={() => onChange(offset + limit)}>Next page</button>,
}));

const caseUuid = "11111111-1111-4111-8111-111111111111";
const reportUuid = "22222222-2222-4222-8222-222222222222";
const caseNumber = "2026-1000001";
const schema = buildClientSchema(require("../../../graphql.schema.json"));
const reportFields = {
  createdAt: "2026-11-12T03:00:00Z",
  incidentDate: "2026-11-12",
  rendererData: "Sick cattle",
  reportType: { name: "Animal illness" },
  authorities: [{ name: "District office" }],
  images: [],
  testFlag: false,
  currentRiskAssessment: { id: "risk1", level: "HIGH" },
};
const numberedCase = {
  id: caseUuid,
  caseNumber,
  isFinished: false,
  statusLabel: "Open",
  description: "Case description",
  report: { ...reportFields, id: reportUuid },
};

beforeEach(() => {
  jest.clearAllMocks();
  mockQuery = {};
  const client = { query: mockApiQuery } as unknown as LegacyApolloClient;
  mockCaseService = new CaseService(client);
  mockReportService = new ReportService(client);
});

test("Cases list maps readable IDs, links by UUID and retains Risk styling", async () => {
  mockApiQuery.mockResolvedValue({
    data: {
      casesQuery: {
        totalCount: 2,
        results: [
          numberedCase,
          { ...numberedCase, id: "legacy-case", caseNumber: null },
        ],
      },
    },
  });
  render(<CaseList />);
  const link = await screen.findByRole("link", { name: caseNumber });
  expect(link).toHaveAttribute("href", `/cases/${caseUuid}`);
  expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Case ID");
  const rows = screen.getAllByRole("row").slice(1);
  expect(within(rows[1]).getAllByRole("cell")[0]).toHaveTextContent(/^—$/);
  expect(rows[0]).toHaveStyle({ boxShadow: "inset 4px 0 0 #ea580c" });
  expect(validate(schema, mockApiQuery.mock.calls[0][0].query)).toEqual([]);
  fireEvent.click(within(rows[0]).getByText("Sick cattle"));
  expect(mockPush).toHaveBeenCalledWith(`/cases/${caseUuid}`);
});

test("Reports list uses the linked Case number and Case UUID, with unlinked/null fallbacks", async () => {
  mockApiQuery.mockResolvedValue({
    data: {
      incidentReports: {
        totalCount: 3,
        results: [
          { ...reportFields, id: reportUuid, caseId: caseUuid, caseNumber },
          { ...reportFields, id: "no-case", caseId: null, caseNumber: null },
          {
            ...reportFields,
            id: "not-backfilled",
            caseId: "legacy-case",
            caseNumber: null,
          },
        ],
      },
    },
  });
  render(<ReportList />);
  const link = await screen.findByRole("link", { name: caseNumber });
  expect(link).toHaveAttribute("href", `/cases/${caseUuid}`);
  expect(link).not.toHaveAttribute("href", `/cases/${reportUuid}`);
  const rows = screen.getAllByRole("row").slice(1);
  for (const row of rows.slice(1)) {
    expect(within(row).getAllByRole("cell")[0]).toHaveTextContent(/^—$/);
    expect(within(row).queryByRole("link")).toBeNull();
  }
  fireEvent.click(within(rows[0]).getByText("Sick cattle"));
  expect(mockPush).toHaveBeenCalledWith(`/reports/${reportUuid}`);
  const query = mockApiQuery.mock.calls[0][0].query;
  expect(print(query)).toContain("caseNumber");
  expect(validate(schema, query)).toEqual([]);
});

test("Case ID search survives URL load, Apply and pagination with existing filters", async () => {
  mockQuery = { q: caseNumber, statuses: "OPEN", offset: "20" };
  mockApiQuery.mockResolvedValue({
    data: { casesQuery: { totalCount: 100, results: [numberedCase] } },
  });
  render(<CaseList />);
  await screen.findByRole("link", { name: caseNumber });
  expect(mockApiQuery).toHaveBeenCalledWith(
    expect.objectContaining({
      variables: expect.objectContaining({
        q: caseNumber,
        offset: 20,
        caseStatuses: "OPEN",
      }),
    })
  );
  fireEvent.click(screen.getByRole("button", { name: "Filter" }));
  const input = await screen.findByLabelText("Search");
  expect(input).toHaveValue(caseNumber);
  expect(input).toHaveAttribute(
    "placeholder",
    "Case ID, species, disease, AI text"
  );
  fireEvent.change(input, { target: { value: "2026-000002" } });
  fireEvent.submit(input.closest("form")!);
  expect(mockSetUrl).toHaveBeenLastCalledWith(
    expect.objectContaining({ q: "2026-000002", statuses: "OPEN" })
  );
  fireEvent.click(screen.getByRole("button", { name: "Next page" }));
  expect(mockSetUrl).toHaveBeenLastCalledWith(
    expect.objectContaining({ q: "2026-000002", offset: 40, statuses: "OPEN" })
  );
  fireEvent.click(screen.getByRole("button", { name: "Filter" }));
  fireEvent.click(await screen.findByRole("button", { name: "Reset" }));
  expect(mockResetUrl).toHaveBeenCalledTimes(1);
});

test.each([caseNumber, null])(
  "Case detail header displays the number or a dash (%s)",
  async number => {
    mockApiQuery.mockResolvedValue({
      data: { caseGet: { ...numberedCase, caseNumber: number } },
    });
    render(<Case id={caseUuid} />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        `Case ID: ${number || "—"}`
      )
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent(
      caseUuid
    );
    expect(mockApiQuery).toHaveBeenCalledWith(
      expect.objectContaining({ variables: { id: caseUuid } })
    );
  }
);

test("Case detail service maps the number while retaining UUID query input", async () => {
  mockApiQuery.mockResolvedValue({ data: { caseGet: numberedCase } });
  const result = await mockCaseService.getCase(caseUuid);
  expect(result.data).toEqual(
    expect.objectContaining({ id: caseUuid, caseNumber })
  );
  expect(mockApiQuery).toHaveBeenCalledWith(
    expect.objectContaining({ variables: { id: caseUuid } })
  );
  expect(validate(schema, mockApiQuery.mock.calls[0][0].query)).toEqual([]);
});

test.each([CasesDocument, GetCaseDocument, ReportsDocument])(
  "generated Case number operations validate against API snapshot",
  document => {
    expect(print(document)).toContain("caseNumber");
    expect(validate(schema, document)).toEqual([]);
  }
);

test("Case number link does not trigger parent row navigation", () => {
  const onRow = jest.fn();
  render(
    <div onClick={onRow}>
      <CaseNumberLink caseId={caseUuid} caseNumber={caseNumber} />
    </div>
  );
  fireEvent.click(screen.getByRole("link"));
  expect(onRow).not.toHaveBeenCalled();
});

test("Case number without a linked UUID stays unlinked", () => {
  render(<CaseNumberLink caseNumber={caseNumber} />);
  expect(screen.getByText("—")).toBeInTheDocument();
  expect(screen.queryByRole("link")).toBeNull();
});
