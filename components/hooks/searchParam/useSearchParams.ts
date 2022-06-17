import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UseSearchParams = [DecodedValues];
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

  return [values];
}
