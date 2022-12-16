import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useBool } from 'hooks';

// Components
import { Container } from 'components/Container';
import { Spinner } from 'components/Loading';
import { GroupInfo, Icons, LandingBanner, TimeSlots } from 'components/Home';
import { getAllIcons } from 'components/MuiIcon';

// MUI
import Button from '@mui/material/Button';
import { Alert } from '@mui/material'; // `Skeleton` not used

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';
import { TimeSlots, PrivateGroupInfo } from 'components/Home';
import { LandingBanner } from 'components/Home/LandingBanner';
import Head from 'next/head';

import { GROUP } from '../constants';

export default function Home() {
  const router = useRouter();

  /* GROUP ICON */
  const [activeIcon, setActiveIcon] = useState(getAllIcons()[0]); // default first icon

  /* GROUP INFORMAION */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calendarMinTime, setCalendarMinTime] = useState('09:00:00');
  const [calendarMaxTime, setCalendarMaxTime] = useState('17:00:00');

  /* PRIVATE GROUP */
  const groupPrivate = useBool(true);
  const [password, setPassword] = useState('');

  /* FORM VALIDATION */
  const [hasError, setHasError] = useState(false);
  const isDisabled = useBool(true);
  const [isSaving, setIsSaving] = useState(false);

  // check for calendar time
  // check for private group and sufficient information
  useEffect(() => {
    if (name === '' || isSaving) {
      isDisabled.setBool(() => true);
      return;
    }

    if (groupPrivate.bool && (password.length < 8 || password.length > 16)) {
      isDisabled.setBool(() => true);
    } else {
      isDisabled.setBool(() => false);
    }
  }, [groupPrivate.bool, name, password]);

  const createGroup = async () => {
    if (name === '') {
      return setHasError('Missing required input (name)');
    }

    if (name.length > 20) {
      return setHasError('Name must be under 20 characters');
    }

    setIsSaving(true);

    try {
      const response = await fetch(GROUP, {
        method: 'POST',
        body: JSON.stringify({
          name,
          isPrivate,
          password,
          description,
          icon: activeIcon,
          calendarMinTime,
          calendarMaxTime,
        }),
      });

      const result = await response.json();

      if (!result.ok) {
        setIsSaving(false);
        setHasError(result.message);
        return;
      }

      router.push(`/${result.groupID}`);
    } catch (e) {
      setIsSaving(() => false);
      setHasError(() => 'Something went wrong, try again later.');
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
          {/* LANDING BANNER */}
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
          {/* PRIVATE GROUP*/}
          <PrivateGroupInfo
            isPrivate={groupPrivate.bool}
            password={password}
            setPassword={setPassword}
            handleToggleSwitch={groupPrivate.toggleBool}
          />
        </div>
        {/* SUBMIT BUTTON */}
        <div className={utilities.buttonContainer}>
          <Button
            variant='contained'
            disabled={isDisabled.bool}
            onClick={createGroup}
            className={utilities.button}
          >
            Create Group
          </Button>
        </div>
      </Container>
      <Head>
        <title>Collabify</title>
        <meta
          name='description'
          content='Collabify makes coordinating times easier'
        />
      </Head>
    </>
  );
}
