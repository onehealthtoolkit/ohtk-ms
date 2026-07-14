const COORDINATE_DECIMAL_PLACES = 6;

export const roundCoordinate = (value: number) =>
  Number(value.toFixed(COORDINATE_DECIMAL_PLACES));

export const optionalCoordinate = (value: string) => {
  if (value === "") {
    return null;
  }

  return roundCoordinate(Number(value));
};
