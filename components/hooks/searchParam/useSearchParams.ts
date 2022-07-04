import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import {
  NumberParam,
  StringParam,
  ObjectParam,
  ArrayParam,
  BooleanParam,
  DateParam,
  DateTimeParam,
  JsonParam,
  NumericArrayParam,
  NumericObjectParam,
} from "./params";

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

type ConfigType = Record<
  string,
  | typeof StringParam
  | typeof NumberParam
  | typeof ObjectParam
  | typeof ArrayParam
  | typeof BooleanParam
  | typeof DateParam
  | typeof DateTimeParam
  | typeof JsonParam
  | typeof NumericArrayParam
  | typeof NumericObjectParam
>;

function parseQueryString(config: ConfigType, q: ParsedUrlQuery) {
  const values: DecodedValues = {};
  Object.entries(q).forEach(([k, v]) => {
    if (config[k]) {
      values[k] = config[k].decode(v) as any;
    }
  });
  return values;
}

function isEqual(
  config: ConfigType,
  oldValues: DecodedValues,
  newValue: DecodedValues
) {
  let match = true;
  Object.keys(config).forEach(key => {
    match = match && oldValues[key] == newValue[key];
  });
  return match;
}

export function useSearchParams(config: ConfigType): UseSearchParams {
  const router = useRouter();
  const [values, setValues] = useState<DecodedValues>(
    parseQueryString(config, router.query)
  );

  useEffect(() => {
    const newValues = parseQueryString(config, router.query);
    if (!isEqual(config, values, newValues)) {
      setValues(newValues);
    }

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
