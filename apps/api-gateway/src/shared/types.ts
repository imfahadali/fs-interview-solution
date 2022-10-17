export type Falsy<T = void> = false | 0 | "" | null | undefined | T;

export type PickPartial<T, K extends keyof T> = Partial<Pick<T, K>>;

export type UpdateFields<T, Required extends keyof T> = Pick<T, Required> &
  Partial<T>;
