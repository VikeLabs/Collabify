import { Alert, Skeleton } from '@mui/material';

import { useAsyncFetch } from '../../hooks';
import { GROUP } from '../../constants';
import { useRouter } from 'next/router';

export default function GroupHome() {
  const router = useRouter();
  const { groupName } = router.query;

  const [data, isLoading, hasError] = useAsyncFetch(`${GROUP}/${groupName}`);

  if (isLoading) return <Skeleton animation='wave' />;

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  return (
    <div>
      {data?.map((e) => (
        <div key={e._id}>
          <h3>Group</h3>
          <p>Name: {e.name}</p>
          <p>Description: {e.description}</p>
        </div>
      ))}
      <button
        onClick={() =>
          navigator.clipboard.writeText(
            `localhost:3000/${groupName}/availability`
          )
        }
      >
        Copy availability link
      </button>
    </div>
  );
}
