import { Alert, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GROUP } from '../constants';

export default function Home() {
  const router = useRouter();

  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const createGroup = () => {
    // Error handling
    if (name.length < 2) {
      // setHasError(() => 'name error message'); // TODO: set name error messages
      return;
    }

    if (description == '') {
      // setHasError(() => 'description error message'); // TODO: set description error messages
      return;
    }

    fetch(GROUP, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        icon: 'book',
        background: 'orange',
      }),
    })
      .then(() => router.push(`/${name}`))
      .catch((e) => setHasError(e));
  };

  return (
    <div>
      <h1>Create group</h1>

      <input
        style={hasError ? { color: 'red' } : {}}
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button onClick={() => createGroup()}>Create Group</button>
    </div>
  );
}
