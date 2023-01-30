import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GROUP } from 'constants/index';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

export const useAsyncFetch = <T>(
  pathSuffix?: string
): [T, boolean, string | null] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);
  const router = useRouter();
  const { groupID } = router.query;

  useEffect(() => {
    groupID &&
      (async () => {
        setIsLoading(() => true);
        setHasError(() => null);

        try {
          const token = groupID
            ? PrivateGroupTokens.getGroupToken(groupID as string)
            : undefined;
          const headers = new Headers();
          headers.append('method', 'GET');
          headers.append('Content-Type', 'application/json');
          if (token && token !== '') {
            headers.append('Authorization', `Bearer ${token}`);
          }

          let url = GROUP;
          url += `/${groupID}`;
          if (pathSuffix) url += `/${pathSuffix}`;
          const res = await fetch(url, { headers });

          const { status } = res;

          switch (status) {
            case 200:
              const data = await res.json();
              setData(() => data);
              setIsLoading(() => false);
              break;

            case 401:
              router.push(`/auth/${groupID}`);
              break;

            default:
              throw new Error(`Unhandled status code: ${status}`);
          }
        } catch (e) {
          setHasError(() => 'Something went wrong, try again later');
          console.error(e);
        }
      })();
  }, [groupID]);

  return [data, isLoading, hasError];
};
