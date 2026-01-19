import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useSearchParamsHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  const set = useCallback(
    (key: string, value: string) => {
      setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
      }, { replace: true });
    },
    [setSearchParams]
  );

  const remove = useCallback(
    (key: string) => {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      }, { replace: true });
    },
    [setSearchParams]
  );

  return { get, set, remove };
}