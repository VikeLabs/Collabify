import { useState, useEffect } from 'react';

/**
 * @deprecated use `useFetchState` instead, see `./src/hooks/useFetchState.js`
 * @param {string} endpoint
 * @return {[any, boolean, null | string]}
 */
const useAsyncFetch = (endpoint) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(endpoint);
      const json = await res.json();
      if (res.status === 200) {
        setData(json);
        setIsLoading(false);
      } else {
        setHasError(json.message);
        setIsLoading(false);
      }
    };

    if (!endpoint.includes('undefined')) {
      fetchData(endpoint);
    }
  }, [endpoint]);

  return [data, isLoading, hasError];
};

export default useAsyncFetch;
