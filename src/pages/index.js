import { Alert, Skeleton } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container } from 'components/Container';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { GROUP } from '../constants';

import style from 'styles/pages/home.module.css';

export default function Home() {
  const router = useRouter();

  // Icons related
  const [activeIcon, setActiveIcon] = useState(null);
  // Information related
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
          {/* ICON */}
          <h2 className={style.header}>icon:</h2>
          <GetIcons
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />

          {/* Name input */}
          <h2 className={style.header}>information:</h2>
          <TextField
            label='Group name'
            id='outlined-basic'
            className={style.input}
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
            className={style.input}
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

/* Icon placeholder */
function GetIcons({ setActiveIcon, activeIcon }) {
  const icons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const allIcons = () => {
    return icons.map((icon) => {
      return (
        <li
          key={icon}
          className={activeIcon === icon ? style.iconSelected : style.icon}
          onClick={() => setActiveIcon(() => icon)}
        >
          {icon}
        </li>
      );
    });
  };

  return <ul className={style.allIcons}>{allIcons()}</ul>;
}
