import { Alert, Skeleton } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container } from 'components/container/Container';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { GROUP } from '../constants';
import { create } from '@mui/material/styles/createTransitions'; // `create` not used

import style from 'styles/home/style.module.css';

export default function Home() {
  const router = useRouter();

  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const createGroup = () => {
    if (name === '' || description == '') return null; // no request without `name` and `description`

    // Make request when enough information provided
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
    <Container header='create a group'>
      <section className={style.createGroup}>
        <div className={style.inputFields}>
          {/* Name input */}
          <TextField
            label='Group name'
            id='outlined-basic'
            required
            onChange={(e) => setName(() => e.target.value)}
            value={name}
          />
          {/* Description input */}
          <TextField
            label='Description'
            // id='outlined-multiline-flexible' // <- this is to make the text area expand its height when needed
            id='outlined-basic'
            // multiline // <- uncomment if you want multiline, looks weird though
            required
            onChange={(e) => setDescription(() => e.target.value)}
            value={description}
          />
        </div>
        {/* Submit button */}
        <Button
          variant='contained'
          disabled={name == '' || description == '' ? true : false}
          onClick={createGroup}
          className={style.submitButton}
        >
          Create Group
        </Button>
      </section>
    </Container>
  );
}
