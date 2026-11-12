/** @jest-environment jsdom */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReportList from "components/report/list";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { ReportService } from "lib/services/report";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import type { ReactNode } from "react";
import type { ParsedUrlQuery } from "querystring";
import la from "../../../i18n/translations.la.json";
import en from "../../../i18n/translations.en.json";

const JSURL = require("jsurl");
const label = "ລວມລາຍງານຂອງໜ່ວຍງານໃນສັງກັດ";
const authority = { id: "1", name: "Province A" };
const mockApiQuery = jest.fn();
const mockPush = jest.fn();
const mockRouter = {
  isReady: true,
  locale: "la",
  pathname: "/reports",
  query: {} as ParsedUrlQuery,
  push: mockPush,
};
let mockReportService: ReportService;
const i18n = createInstance();

jest.mock("next/router", () => ({ useRouter: () => mockRouter }));
jest.mock("lib/services/provider", () => ({
  __esModule: true,
  default: () => ({ reportService: mockReportService }),
}));
jest.mock("lib/store", () => ({
  __esModule: true,
  default: () => ({ isFeatureEnable: () => false }),
}));
jest.mock("react-select/async", () => ({
  __esModule: true,
  default: ({ onChange }: { onChange: (value: unknown[]) => void }) => (
    <button type="button" onClick={() => onChange([authority])}>
      Select province
    </button>
  ),
}));
jest.mock("components/widgets/filter", () => ({
  __esModule: true,
  default: ({
    children,
    onSearch,
    onReset,
  }: {
    children: ReactNode;
    onSearch: () => void;
    onReset: () => void;
  }) => (
    <div>
      {children}
      <button onClick={onSearch}>Apply filters</button>
      <button onClick={onReset}>Reset filters</button>
    </div>
  ),
}));
jest.mock("components/widgets/dateRangeField", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/report/reportTypeSelect", () => ({
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

beforeEach(async () => {
  jest.clearAllMocks();
  await i18n.use(initReactI18next).init({
    lng: "la",
    fallbackLng: "en",
    initAsync: false,
    resources: { la: { translation: la }, en: { translation: en } },
  });
  mockRouter.query = { authorities: JSURL.stringify([authority]) };
  mockPush.mockImplementation(({ query }: { query?: ParsedUrlQuery }) => {
    mockRouter.query = Object.fromEntries(
      Object.entries(query || {})
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );
    return Promise.resolve(true);
  });
  mockApiQuery.mockResolvedValue({
    data: { incidentReports: { totalCount: 0, results: [] } },
  });
  mockReportService = new ReportService({
    query: mockApiQuery,
  } as unknown as LegacyApolloClient);
});

const page = () => (
  <I18nextProvider i18n={i18n}>
    <ReportList />
  </I18nextProvider>
);
const lastVariables = () => mockApiQuery.mock.calls.at(-1)![0].variables;

test("uses the accepted Lao wording and includes subordinate authorities by default", async () => {
  render(page());
  expect(await screen.findByRole("checkbox", { name: label })).toBeChecked();
  await waitFor(() =>
    expect(lastVariables()).toMatchObject({
      authorities: ["1"],
      includeChildAuthorities: true,
    })
  );
});

test("keeps an unchecked choice through Apply and its URL round trip", async () => {
  const view = render(page());
  const checkbox = await screen.findByRole("checkbox", { name: label });
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(mockRouter.query.includeChildAuthorities).toBe("false");
  view.rerender(page());
  await waitFor(() =>
    expect(lastVariables().includeChildAuthorities).toBe(false)
  );
  expect(screen.getByRole("checkbox", { name: label })).not.toBeChecked();
});

test("honors an explicitly unchecked shared URL and allows checking it again", async () => {
  mockRouter.query.includeChildAuthorities = "false";
  const view = render(page());
  const checkbox = await screen.findByRole("checkbox", { name: label });
  expect(checkbox).not.toBeChecked();
  await waitFor(() =>
    expect(lastVariables().includeChildAuthorities).toBe(false)
  );
  fireEvent.click(checkbox);
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  view.rerender(page());
  await waitFor(() =>
    expect(lastVariables().includeChildAuthorities).toBe(true)
  );
  expect(mockRouter.query.includeChildAuthorities).toBe("true");
});

test("reset restores the checked default before the next authority is selected", async () => {
  mockRouter.query.includeChildAuthorities = "false";
  const view = render(page());
  await screen.findByRole("checkbox", { name: label });
  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  view.rerender(page());
  expect(screen.queryByRole("checkbox", { name: label })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Select province" }));
  expect(await screen.findByRole("checkbox", { name: label })).toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  view.rerender(page());
  await waitFor(() =>
    expect(lastVariables()).toMatchObject({
      authorities: ["1"],
      includeChildAuthorities: true,
    })
  );
});
