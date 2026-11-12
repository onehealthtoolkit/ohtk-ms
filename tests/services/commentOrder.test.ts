import { CommentService } from "lib/services/comment/commentService";
import type { LegacyApolloClient } from "lib/services/apolloClient";

const comment = (id: string, createdAt: string) =>
  Object.freeze({
    id,
    body: `Comment ${id}`,
    threadId: 4,
    createdAt,
    createdBy: Object.freeze({ id: "1", username: "local" }),
    attachments: Object.freeze([]),
  });

describe("Dashboard comment order", () => {
  const older = comment("90", "2026-11-11T23:00:00Z");
  const sameTimeLowId = comment("9", "2026-11-12T09:00:00+07:00");
  const sameTimeHighId = comment("10", "2026-11-12T02:00:00Z");

  it.each([
    [older, sameTimeLowId, sameTimeHighId],
    [sameTimeHighId, sameTimeLowId, older],
  ])(
    "sorts by time and numeric ID without mutating cached results",
    async (...rows) => {
      const comments = Object.freeze([...rows]);
      const query = jest.fn().mockResolvedValue({ data: { comments } });
      const service = new CommentService({
        query,
      } as unknown as LegacyApolloClient);

      const result = await service.fetchComments(4, true);

      expect(result.items?.map(item => item.id)).toEqual(["10", "9", "90"]);
      expect(comments).toEqual(rows);
      expect(result.items?.[0]).not.toBe(sameTimeHighId);
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { threadId: "4" },
          fetchPolicy: "network-only",
        })
      );
    }
  );

  it("handles an empty thread", async () => {
    const query = jest.fn().mockResolvedValue({ data: { comments: [null] } });
    const service = new CommentService({
      query,
    } as unknown as LegacyApolloClient);
    expect((await service.fetchComments(4)).items).toEqual([]);
  });
});
