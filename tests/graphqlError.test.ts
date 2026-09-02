import { graphqlErrorMessage } from "lib/graphqlError";

describe("graphqlErrorMessage", () => {
  it("joins result.errors", () => {
    expect(
      graphqlErrorMessage({
        errors: [{ message: "A" }, { message: "B" }],
      })
    ).toBe("A, B");
  });

  it("reads result.error.errors", () => {
    expect(
      graphqlErrorMessage({
        error: { message: "wrapped", errors: [{ message: "inner" }] },
      })
    ).toBe("inner");
  });

  it("reads a thrown CombinedGraphQLErrors-shaped object", () => {
    const thrown = Object.assign(new Error("Combined"), {
      errors: [{ message: "User's authority is not in charge of this report" }],
    });
    expect(graphqlErrorMessage(undefined, thrown)).toBe(
      "User's authority is not in charge of this report"
    );
  });

  it("reads a thrown Error message", () => {
    expect(graphqlErrorMessage(undefined, new Error("network down"))).toBe(
      "network down"
    );
  });

  it("returns undefined when there is no error", () => {
    expect(graphqlErrorMessage({ errors: [] })).toBeUndefined();
    expect(graphqlErrorMessage({})).toBeUndefined();
    expect(graphqlErrorMessage(undefined, undefined)).toBeUndefined();
  });
});
