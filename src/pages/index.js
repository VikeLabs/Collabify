import { Alert } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Components
import { Container } from 'components/Container';
import { Spinner } from 'components/Loading';
import { GroupInfo, Icons } from 'components/Home';
import { getAllIcons } from 'components/MuiIcon';

// MUI
import Button from '@mui/material/Button';

import { GROUP, RECENT_GROUPS_STORED } from '../constants';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';
import { TimeSlots } from 'components/Home';
import { LandingBanner } from 'components/Home/LandingBanner';

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
    fetch(`${GROUP}/${JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED))?.map(e => e._id).join(',')}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setRecentGroups(result.groups)
        }
      });
  }, [])

  const createGroup = () => {
    if (name === '' || description === '') {
      setHasError('Missing required inputs (name/description)');
    } else if (
      parseInt(calendarMinTime.replace(':', '')) >
      parseInt(calendarMaxTime.replace(':', ''))
    ) {
      setHasError('Minimum Time cannot be greater than Maximum Time');
    } else if (name?.length > 20) {
      setHasError('Name must be under 20 characters');
    } else {
      setIsSaving(true);
      fetch(GROUP, {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          icon: activeIcon,
          calendarMinTime,
          calendarMaxTime,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.ok) router.push(`/${result.groupID}`);
          else { 
            setIsSaving(false)
            setHasError(result.message);
          }
        });
    }
  };

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container header='create a group'>
        <Spinner isLoading={isSaving} />
        <div className={style.groupInfo}>
          { /* Landing Banner */}
          <LandingBanner/>
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
            disabled={!name || !description || isSaving ? true : false}
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
