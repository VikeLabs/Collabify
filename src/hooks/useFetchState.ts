import { useState } from 'react';

export const useFetchState = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const state = { data, isLoading, error };
  const setState = {
    data: setData,
    isLoading: setIsLoading,
    error: setError,
  };

  return { state, setState };
};
