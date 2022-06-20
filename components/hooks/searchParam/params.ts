import * as Serialize from "./serialize";

/**
 * Configuration for a query param specifying how to encode it
 * (convert it to a string) and decode it (convert it from a string
 * back to its native type)
 *
 * D = type to be encoded
 * D2 = type from decode (typically = D)
 */
export interface QueryParamConfig<D, D2 = D> {
  /** Convert the query param value to a string */
  encode: (value: D) => string | (string | null)[] | null | undefined;
  /** Convert the query param string value to its native type */
  decode: (value: string | (string | null)[] | null | undefined) => D2;
  /** Checks if two values are equal (otherwise typically shallowEqual will be used) */
  equals?: (valueA: D | D2, valueB: D | D2) => boolean;
}

/**
 * String values
 */
export const StringParam: QueryParamConfig<
  string | null | undefined,
  string | null | undefined
> = {
  encode: Serialize.encodeString,
  decode: Serialize.decodeString,
};

/**
 * String enum
 */
export const createEnumParam = <T extends string>(
  enumValues: T[]
): QueryParamConfig<T | null | undefined, T | null | undefined> => ({
  encode: Serialize.encodeString,
  decode: input => Serialize.decodeEnum(input, enumValues),
});

/**
 * Numbers (integers or floats)
 */
export const NumberParam: QueryParamConfig<
  number | null | undefined,
  number | null | undefined
> = {
  encode: Serialize.encodeNumber,
  decode: Serialize.decodeNumber,
};

/**
 * For flat objects where values are strings
 */
export const ObjectParam: QueryParamConfig<
  { [key: string]: string | undefined } | null | undefined,
  { [key: string]: string | undefined } | null | undefined
> = {
  encode: Serialize.encodeObject,
  decode: Serialize.decodeObject,
};

/**
 * For flat arrays of strings, filters out undefined values during decode
 */
export const ArrayParam: QueryParamConfig<
  (string | null)[] | null | undefined,
  (string | null)[] | null | undefined
> = {
  encode: Serialize.encodeDelimitedArray,
  decode: Serialize.decodeDelimitedArray,
};

/**
 * For flat arrays of strings, filters out undefined values during decode
 */
export const NumericArrayParam: QueryParamConfig<
  (number | null)[] | null | undefined,
  (number | null)[] | null | undefined
> = {
  encode: Serialize.encodeDelimitedNumericArray,
  decode: Serialize.decodeDelimitedNumericArray,
};

/**
 * For any type of data, encoded via JSON.stringify
 */
export const JsonParam: QueryParamConfig<any, any> = {
  encode: Serialize.encodeJson,
  decode: Serialize.decodeJson,
};

/**
 * For simple dates (YYYY-MM-DD)
 */
export const DateParam: QueryParamConfig<
  Date | null | undefined,
  Date | null | undefined
> = {
  encode: Serialize.encodeDate,
  decode: Serialize.decodeDate,
  equals: (
    valueA: Date | null | undefined,
    valueB: Date | null | undefined
  ) => {
    if (valueA === valueB) return true;
    if (valueA == null || valueB == null) return valueA === valueB;

    // ignore time of day
    return (
      valueA.getFullYear() === valueB.getFullYear() &&
      valueA.getMonth() === valueB.getMonth() &&
      valueA.getDate() === valueB.getDate()
    );
  },
};

/**
 * For dates in simplified extended ISO format (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ)
 */
export const DateTimeParam: QueryParamConfig<
  Date | null | undefined,
  Date | null | undefined
> = {
  encode: Serialize.encodeDateTime,
  decode: Serialize.decodeDateTime,
  equals: (
    valueA: Date | null | undefined,
    valueB: Date | null | undefined
  ) => {
    if (valueA === valueB) return true;
    if (valueA == null || valueB == null) return valueA === valueB;

    return valueA.valueOf() === valueB.valueOf();
  },
};

/**
 * For boolean values: 1 = true, 0 = false
 */
export const BooleanParam: QueryParamConfig<
  boolean | null | undefined,
  boolean | null | undefined
> = {
  encode: Serialize.encodeBoolean,
  decode: Serialize.decodeBoolean,
};

/**
 * For flat objects where the values are numbers
 */
export const NumericObjectParam: QueryParamConfig<
  { [key: string]: number | null | undefined } | null | undefined,
  { [key: string]: number | null | undefined } | null | undefined
> = {
  encode: Serialize.encodeNumericObject,
  decode: Serialize.decodeNumericObject,
};
