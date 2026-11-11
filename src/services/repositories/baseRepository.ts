export const wait = <T>(value: T, ms = 250): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

export type RepositoryResult<T> = Promise<T>;
