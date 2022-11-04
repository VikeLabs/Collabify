import { Alert } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Components
import { Container } from 'components/Container';
import { Spinner } from 'components/Loading';
import { GroupInfo, Icons, RecentlyVisited } from 'components/Home';
import { getAllIcons } from 'components/MuiIcon';
// MUI
import Button from '@mui/material/Button';

import { GROUP, RECENT_GROUPS_STORED } from '../constants';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

export default function Home() {
  const router = useRouter();

  // Icons related
  const [activeIcon, setActiveIcon] = useState(getAllIcons()[0]); // default first icon
  // Information related
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentGroups, setRecentGroups] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(
    () =>
      setRecentGroups(JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED))),
    []
  );

  const createGroup = () => {
    if (name === '' || description === '') return null; // no request without `name` and `description`

    // Make request when enough information provided
    setIsLoading(() => true);
    fetch(GROUP, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        icon: activeIcon,
        background: 'orange',
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) router.push(`/${result.groupID}`);
        else setHasError(result.message);
      });
  };

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container header='create a group'>
        <Spinner isLoading={isLoading} />
        <div className={style.groupInfo}>
          {recentGroups && <RecentlyVisited groups={recentGroups} />}
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
        <div className={utilities.buttonContainer}>
          <Button
            variant='contained'
            disabled={!name || !description || isLoading ? true : false}
            onClick={createGroup}
            className={utilities.button}
          >
            Create Group
          </Button>
        </div>
      </Container>
    </>
  );
}
