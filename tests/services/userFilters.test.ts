import { UserService } from "lib/services/user";
import type { LegacyApolloClient } from "lib/services/apolloClient";
import { print } from "graphql";

function makeService() {
  const query = jest.fn().mockResolvedValue({
    data: { adminAuthorityUserQuery: { results: [], totalCount: 0 } },
  });
  return {
    query,
    service: new UserService({ query } as unknown as LegacyApolloClient),
  };
}

const authorities = [
  { id: "11", code: "A", name: "Selected authority" },
  { id: "12", code: "B", name: "Another authority" },
];

describe("user-list filter request", () => {
  it("sends multiple selected IDs to the list-valued API argument", async () => {
    const { query, service } = makeService();
    await service.fetchUsers(20, 0, "alice", authorities, "REP");
    const request = query.mock.calls[0][0];
    expect(request.variables.authorities).toEqual(["11", "12"]);
    expect(print(request.query)).toContain("authorityIds: $authorities");
    expect(print(request.query)).toContain("$authorities: [ID]");
  });

  it("removes previous filters when reset, including an empty authority selection", async () => {
    const { query, service } = makeService();
    await service.fetchUsers(
      20,
      20,
      "alice",
      authorities,
      "REP",
      new Date(),
      new Date()
    );
    await service.fetchUsers(20, 0, "", [], "");
    expect(query.mock.calls[1][0].variables).toMatchObject({
      offset: 0,
      q: "",
      authorities: undefined,
      role: "",
      fromDate: undefined,
      throughDate: undefined,
    });
  });

  it("includes the final day without mutating the selected date", async () => {
    const { query, service } = makeService();
    const through = new Date(2026, 10, 5);
    const original = through.getTime();
    await service.fetchUsers(20, 0, "", [], "", undefined, through);
    expect(through.getTime()).toBe(original);
    const sent = query.mock.calls[0][0].variables.throughDate as Date;
    expect(sent.getHours()).toBe(23);
    expect(sent.getMinutes()).toBe(59);
    expect(sent.getSeconds()).toBe(59);
    expect(sent.getMilliseconds()).toBe(999);
  });
});
