import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { useCallback } from "react";

export default function useUrlParams() {
  const router = useRouter();

  const setUrl = useCallback(
    (query: ParsedUrlQueryInput) => {
      return router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  const resetUrl = useCallback(
    (query?: ParsedUrlQueryInput) => {
      return router.push(
        { pathname: router.pathname, query: query },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  return { setUrl, resetUrl, query: router.query };
}
