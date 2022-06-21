export interface IService {}

export type QueryResult<T> = {
  items: T | undefined;
  totalCount?: number | null | undefined;
  error?: string;
};

export type GetResult<T> = {
  data: T | undefined;
  error?: string;
};

export type SaveResult<T> =
  | {
      success: true;
    }
  | {
      success: false;
      fields?: { [key in keyof T]: string };
      message?: string | null;
    };
