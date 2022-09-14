export const styledReactSelect = {
  menu: (provided: any) => ({
    ...provided,
    color: "rgb(37 99 235)",
  }),
  indicatorSeparator: () => ({}),
  control: (base: any) => ({
    ...base,
    boxShadow: "none",
  }),
};
