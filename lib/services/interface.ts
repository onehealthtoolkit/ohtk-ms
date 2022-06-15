export interface IService {}

export type QueryResult<T> = {
  items: T | undefined;
  error?: string;
};
