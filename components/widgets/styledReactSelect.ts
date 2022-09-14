import { CSSObjectWithLabel } from "react-select";

export const styledReactSelect = {
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "rgb(37 99 235)",
  }),
  indicatorSeparator: () => ({}),
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    boxShadow: "none",
  }),
};
