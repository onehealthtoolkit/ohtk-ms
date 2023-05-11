export type Definition = {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | Definition
    | Array<Definition | string>;
};
