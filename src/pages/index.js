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
import { TimeSlots } from 'components/Home';

export default function Home() {
  const router = useRouter();

  // Icons related
  const [activeIcon, setActiveIcon] = useState(getAllIcons()[0]); // default first icon
  // Information related
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [recentGroups, setRecentGroups] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calendarMinTime, setCalendarMinTime] = useState('09:00:00');
  const [calendarMaxTime, setCalendarMaxTime] = useState('17:00:00');

  useEffect(() => {
    fetch(
      `${GROUP}/${JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED))
        ?.map((e) => e._id)
        .join(',')}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setRecentGroups(result.groups);
        }
      });
  }, []);

  const createGroup = async () => {
    /* NAME ERROR */
    if (name === '') {
      setHasError('Missing required inputs (name)');
      return;
    }
    if (name?.length > 20) {
      setHasError('Name must be under 20 characters');
      return;
    }

    /* TIME ERROR */
    const minTime = parseInt(calendarMinTime.replace(':', ''));
    const maxTime = parseInt(calendarMaxTime.replace(':', ''));
    if (minTime > maxTime) {
      setHasError('Minimum Time cannot be greater than Maximum Time');
      return;
    }

    setIsSaving(() => true);
    try {
      const response = await fetch(GROUP, {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          icon: activeIcon,
          calendarMinTime,
          calendarMaxTime,
        }),
      });

      const result = await response.json();
      if (result.ok) {
        router.push(`/${result.groupID}`);
      } else {
        setIsSaving(() => false);
        setHasError(result.message);
      }
    } catch (e) {
      console.log(e); // TODO: custom logging
      setHasError(result.message);
      setIsSaving(() => false);
    }
  };

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container header='create a group'>
        <Spinner isLoading={isSaving} />
        <div className={style.groupInfo}>
          {recentGroups && <RecentlyVisited groups={recentGroups} />}
          {/* ICON */}
          <Icons
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />
          {/* MIN AND MAX */}
          <TimeSlots
            calendarMinTime={calendarMinTime}
            setCalendarMinTime={setCalendarMinTime}
            calendarMaxTime={calendarMaxTime}
            setCalendarMaxTime={setCalendarMaxTime}
          />
          {/* GROUP INFO */}
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
            disabled={!name || isSaving ? true : false}
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
