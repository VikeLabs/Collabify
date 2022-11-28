import { Alert } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useState } from 'react';
// Components
import { Container } from 'components/Container';
import { Spinner } from 'components/Loading';
import { GroupInfo, Icons } from 'components/Home';
import { getAllIcons } from 'components/MuiIcon';

// MUI
import Button from '@mui/material/Button';

import { GROUP } from '../constants';

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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calendarMinTime, setCalendarMinTime] = useState('09:00:00');
  const [calendarMaxTime, setCalendarMaxTime] = useState('17:00:00');

  const createGroup = async () => {
    if (name === '') {
      setHasError('Missing required inputs (name)');
      return;
    }
    if (name?.length > 20) {
      setHasError('Name must be under 20 characters');
      return;
    }

    const minTime = parseInt(calendarMinTime.replace(':', ''));
    const maxTime = parseInt(calendarMaxTime.replace(':', ''));
    if (minTime > maxTime) {
      setHasError('Minimum Time cannot be greater than Maximum Time');
      return;
    }

    try {
      setIsSaving(() => true);

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
        setIsSaving(false);
        setHasError(result.message);
      }
    } catch (e) {
      setHasError(e);
      setIsSaving(() => false);
    }
  };

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container
        header='create a group'
        menu={[
          {
            icon: 'Groups',
            text: 'Recent Groups',
            onClick: () => router.push('/tools/recentGroups'),
          },
          {
            icon: 'Search',
            text: 'Find Group',
            onClick: () => router.push('/tools/findGroup'),
          },
        ]}
      >
        <Spinner isLoading={isSaving} />
        <div className={style.groupInfo}>
          {/* Landing Banner */}
          <LandingBanner />
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
