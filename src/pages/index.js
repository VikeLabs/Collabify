import { Alert, Skeleton } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useState } from 'react';
// Components
import { Container } from 'components/Container';
import { GroupInfo, Icons } from 'components/Home';
// MUI
import Button from '@mui/material/Button';

import { GROUP } from '../constants';

import style from 'styles/pages/home.module.css';

export default function Home() {
  const router = useRouter();

  // Icons related
  const [activeIcon, setActiveIcon] = useState('');
  // Information related
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const createGroup = () => {
    if (name === '' || description === '') return null; // no request without `name` and `description`

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
        <div className={style.groupInfo}>
          {/* ICON */}
          <Icons
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />
          <GroupInfo
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        </div>
        {/* Submit button */}
        <div className={style.submit}>
          <Button
            variant='contained'
            disabled={name == '' || description == '' ? true : false}
            onClick={createGroup}
            className={style.submitButton}
          >
            Create Group
          </Button>
        </div>
      </section>
    </Container>
  );
}

/* Icon placeholder */
