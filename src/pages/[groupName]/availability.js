import { Alert, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Calendar from '../../components/Calendar';

import { AVAILABILITY } from '../../constants';

export default function GroupAvailability() {
  const router = useRouter();
  const { groupName } = router.query;

  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const createGroup = () => {
    fetch(AVAILABILITY, {
      method: 'POST',
      body: JSON.stringify({
        groupName,
        availability: {
          week: 1,
          times: [1, 2, 3, 4],
          name,
          number,
        },
      }),
    })
      .then(() => router.push(`/${name}`))
      .catch((e) => setHasError(e));
  };

  return (
    <div>
      <h2>Fill out your availability for {groupName}</h2>

      <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <input placeholder='Number' onChange={(e) => setNumber(e.target.value)} />

      <Calendar />

      <button onClick={() => createGroup()}>Add availability</button>
    </div>
  );
}
