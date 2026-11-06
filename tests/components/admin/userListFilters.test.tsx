/** @jest-environment jsdom */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import UserList from "components/admin/user/list";

const JSURL = require("jsurl");
const mockFetchUsers = jest.fn();
const mockSetUrl = jest.fn();
const mockResetUrl = jest.fn();
let mockQuery: Record<string, string> = {};

jest.mock("next/router", () => ({
  useRouter: () => ({ isReady: true, push: jest.fn() }),
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: any) => children,
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
    userService: { fetchUsers: mockFetchUsers },
    authorityService: {
      lookupAuthorities: jest.fn().mockResolvedValue({ items: [] }),
    },
  }),
}));
jest.mock("lib/store", () => ({
  __esModule: true,
  default: () => ({ isRoleAdmin: true, isSuperUser: false }),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (_: string, text: string) => text }),
}));
jest.mock("components/widgets/table", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div>
      {data.map((u: any) => (
        <span key={u.id}>{u.username}</span>
      ))}
    </div>
  ),
}));
jest.mock("components/widgets/table/paginate", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <button onClick={() => onChange(20)}>Next page</button>
  ),
}));
jest.mock("components/widgets/table/totalItem", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/admin/user/qrcodeDialog", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/dialogs/confirmDialog", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("components/widgets/datepicker", () => ({
  __esModule: true,
  default: ({ id, selected, onChange }: any) => (
    <input
      aria-label={id}
      value={selected?.toISOString() || ""}
      onChange={event =>
        onChange(event.target.value ? new Date(event.target.value) : null)
      }
    />
  ),
}));

function openFilter() {
  fireEvent.click(screen.getByRole("button", { name: "Filter" }));
}

beforeEach(() => {
  jest.clearAllMocks();
  mockQuery = {};
  mockFetchUsers.mockResolvedValue({
    items: [{ id: "1", username: "alice" }],
    totalCount: 41,
  });
});

test("All roles allows submitting the filter form", async () => {
  render(<UserList />);
  await screen.findByText("alice");
  openFilter();
  const role = screen.getByLabelText("Role") as HTMLSelectElement;
  expect(role.value).toBe("");
  expect(role.closest("form")!.checkValidity()).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(mockSetUrl).toHaveBeenCalledWith(
    expect.objectContaining({ role: "", offset: 0 })
  );
});

test("changing page retains search, authorities, role and dates", async () => {
  const authorities = [{ id: "11", code: "A", name: "Selected authority" }];
  mockQuery = {
    q: "alice",
    authorities: JSURL.stringify(authorities),
    role: "REP",
    fromDate: "2026-11-01T00:00:00.000Z",
    throughDate: "2026-11-05T00:00:00.000Z",
  };
  render(<UserList />);
  await screen.findByText("alice");
  expect(mockFetchUsers).toHaveBeenCalledWith(
    20,
    0,
    "alice",
    authorities,
    "REP",
    new Date(mockQuery.fromDate),
    new Date(mockQuery.throughDate),
    undefined
  );
  fireEvent.click(screen.getByRole("button", { name: "Next page" }));
  expect(mockSetUrl).toHaveBeenCalledWith({ ...mockQuery, offset: 20 });
});

test("clearing a date removes that condition when Apply is pressed", async () => {
  mockQuery = {
    role: "REP",
    fromDate: "2026-11-01T00:00:00.000Z",
    throughDate: "2026-11-05T00:00:00.000Z",
  };
  render(<UserList />);
  await screen.findByText("alice");
  openFilter();
  fireEvent.change(screen.getByLabelText("fromDate"), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByLabelText("throughDate"), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(mockSetUrl).toHaveBeenCalledWith(
    expect.objectContaining({ fromDate: undefined, throughDate: undefined })
  );
});

test("resetting the URL reloads without previous conditions or page offset", async () => {
  mockQuery = {
    q: "alice",
    role: "REP",
    offset: "20",
    authorities: JSURL.stringify([{ id: "11" }]),
  };
  const { rerender } = render(<UserList />);
  await screen.findByText("alice");
  openFilter();
  fireEvent.click(
    within(screen.getByLabelText("Role").closest("form")!).getByRole("button", {
      name: "Reset",
    })
  );
  expect(mockResetUrl).toHaveBeenCalledTimes(1);
  mockQuery = {};
  rerender(<UserList />);
  await waitFor(() =>
    expect(mockFetchUsers).toHaveBeenLastCalledWith(
      20,
      0,
      "",
      [],
      "",
      undefined,
      undefined,
      undefined
    )
  );
});
