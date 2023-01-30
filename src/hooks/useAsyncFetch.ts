import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GROUP } from 'constants/index';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

export const useAsyncFetch = <T>(groupID: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(() => true);
      setHasError(() => null);

      try {
        const token = PrivateGroupTokens.getGroupToken(groupID);
        const headers = new Headers();
        headers.append('method', 'GET');
        headers.append('Content-Type', 'application/json');
        if (token && token !== '') {
          headers.append('Authorization', `Bearer ${token}`);
        }

        const res = await fetch(`${GROUP}/${groupID}`, { headers });

        const { status } = res;

        switch (status) {
          case 200:
            const data = await res.json();
            setData(() => data);
            setIsLoading(() => false);
            break;

          case 401:
            router.push(`${GROUP}/auth/${groupID}`);
            break;

          default:
            throw new Error(`Unhandled status code: ${status}`);
        }
      } catch (e) {
        setHasError(() => 'Something went wrong, try again later');
        console.error(e);
      }
    })();
  }, []);

  return [data, isLoading, hasError];
};
