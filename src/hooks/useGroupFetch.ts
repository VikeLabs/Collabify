import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';
import { Group } from '@prisma/client';

export const useGroupFetch = () => {
  const [data, setData] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRouter();
  const groupID = route.query['groupID'] as string;
  if (!groupID) {
    throw new Error(
      '[ERROR] useGroupFetch can only be used with a path query of `groupID`'
    );
  }

  useEffect(() => {
    groupID &&
      (async () => {
        // get token
        const headers = new Headers();
        headers.append('method', 'GET');
        headers.append('Content-Type', 'application/json');
        const token = PrivateGroupTokens.getGroupToken(groupID);
        if (token) headers.append('Authorization', `Bearer ${token}`);

        // make request
        setIsLoading(() => true);
        try {
          const res = await fetch(`/api/groupCalendar/${groupID}`, { headers });

          switch (res.status) {
            case 401:
              route.push(`/auth/${groupID}`);
              break;

            case 400:
              route.push(`/`);
              break;

            case 200:
              const data = await res.json();
              setData(() => data);
              break;

            default:
              throw new Error(`Server responded with ${res.status}`);
          }
        } catch (e) {
          console.log(e);
          setError(() => 'Something went wrong, try again later.');
        }

        setIsLoading(() => false);
      })();
  }, [groupID]);

  return { data, isLoading, error };
};
