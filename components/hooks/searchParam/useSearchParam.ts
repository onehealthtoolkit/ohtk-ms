import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryParamConfig, StringParam } from "./params";

type NewValueType<D> = D | ((latestValue: D) => D);
type UseSearchParam<D, D2 = D> = [
  D2,
  (newValue: NewValueType<D>) => void,
  EncodedValue
];
type EncodedValue = string | null | undefined;

function isString(value: EncodedValue) {
  return typeof value === "string" || (value as any) instanceof String;
}

export default function useSearchParam<D, D2 = D>(
  name: string,
  config: QueryParamConfig<D, D2> = StringParam as QueryParamConfig<any>
): UseSearchParam<D, D2> {
  const router = useRouter();
  const [value, setValue] = useState<EncodedValue>();

  useEffect(() => {
    setValue(router.query[name] as string);
  }, [name, router.query]);

  const setNewValue = (valueOrFn: NewValueType<D>): void => {
    let newValue;
    if (typeof valueOrFn === "function") {
      newValue = (valueOrFn as Function)(config.decode(value));
    } else {
      newValue = valueOrFn;
    }
    const encodedValue = config.encode(newValue) as EncodedValue;

    if (isString(encodedValue)) {
      setValue(encodedValue);
    } else {
      setValue(undefined);
    }
  };

  const decodedValue = config.decode(value);
  return [decodedValue, setNewValue, value];
}
