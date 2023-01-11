import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

/**
 * @typedef {{data: (object|null), isLoading: boolean, error: (string|null)}} StateType
 * - `{ data: any | null, isLoading: boolean, error: string | null }`
 * @typedef {{data: Dispatch<SetStateAction<(object|null)>>, isLoading: Dispatch<SetStateAction<boolean>>, error: Dispatch<SetStateAction<(string|null)>>}} SetStateType
 * - `{ data: setData, isLoading: setIsLoading, error: setError }`
 * @returns {{state: StateType, setState: SetStateType}} `{ state, setState }`
 */
const useFetchState = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const state = { data, isLoading, error };
  const setState = {
    data: setData,
    isLoading: setIsLoading,
    error: setError,
  };

  return { state, setState };
};

export default useFetchState;
