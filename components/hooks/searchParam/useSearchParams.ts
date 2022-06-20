import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UseSearchParams = [
  DecodedValues,
  (name: string, value: string | number) => void
];
type DecodedValues = { [k: string]: ReturnValue };
type ReturnValue =
  | string
  | (string | null)[]
  | number
  | (number | null)[]
  | boolean
  | Date
  | { [key: string]: string | number | undefined }
  | null
  | undefined;

export function useSearchParams(config: any): UseSearchParams {
  const router = useRouter();
  const [values, setValues] = useState<DecodedValues>({});

  useEffect(() => {
    const values: DecodedValues = {};
    Object.entries(router.query).forEach(([k, v]) => {
      if (config[k]) {
        values[k] = config[k].decode(v) as any;
      }
    });
    setValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const onSearchChange = (name: string, value: string | number) => {
    const query = {
      ...router.query,
      [name]: value,
    };
    if (name === "q") {
      query.offset = 0;
    }
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return [values, onSearchChange];
}
