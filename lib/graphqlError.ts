type GraphQLMessage = { message: string };

type GraphQLResultLike = {
  errors?: ReadonlyArray<GraphQLMessage> | null;
  error?: {
    message?: string;
    errors?: ReadonlyArray<GraphQLMessage>;
  } | null;
};

function joinMessages(
  list?: ReadonlyArray<GraphQLMessage> | null
): string | undefined {
  if (!list?.length) {
    return undefined;
  }
  const text = list
    .map(item => item.message)
    .filter(Boolean)
    .join(", ");
  return text || undefined;
}

/**
 * Read a GraphQL failure from an Apollo Client 4 result or a thrown value.
 * Returns undefined when there is no error text.
 */
export function graphqlErrorMessage(
  result?: GraphQLResultLike | null,
  thrown?: unknown,
  fallback = "Request failed"
): string | undefined {
  const fromResult =
    joinMessages(result?.errors) ||
    joinMessages(result?.error?.errors) ||
    result?.error?.message;
  if (fromResult) {
    return fromResult;
  }

  if (thrown && typeof thrown === "object" && "errors" in thrown) {
    const fromThrown = joinMessages(
      (thrown as { errors?: ReadonlyArray<GraphQLMessage> }).errors
    );
    if (fromThrown) {
      return fromThrown;
    }
  }

  if (thrown instanceof Error && thrown.message) {
    return thrown.message;
  }
  if (thrown) {
    return fallback;
  }
  return undefined;
}
