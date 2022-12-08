import { Alert } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Components
import { Container } from 'components/Container';
import { Spinner } from 'components/Loading';
import { GroupInfo, Icons, TimeSlots } from 'components/Home';

// MUI
import Button from '@mui/material/Button';

import { GROUP } from '../../constants';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';
import { useAsyncFetch } from 'hooks';
import { SettingsSkeleton } from 'components/Settings/SettingsSkeleton';

export default function GroupSettings() {
  const router = useRouter();

  const { groupID } = router.query;

  const [data, isLoading, apiError] = useAsyncFetch(
    `${GROUP}/${groupID}`
  );

  // Icons related
  const [activeIcon, setActiveIcon] = useState(null);
  // Information related
  const [hasError, setHasError] = useState(apiError);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [calendarMinTime, setCalendarMinTime] = useState(null);
  const [calendarMaxTime, setCalendarMaxTime] = useState(null);

  useEffect(()=> {
    const { group } = data
    if (group) {
        setActiveIcon(group.icon)
        setName(group.name)
        setDescription(group.description)
        setCalendarMinTime(group.calendarMinTime)
        setCalendarMaxTime(group.calendarMaxTime)
    }
  }, [data])

  const editGroup = () => {
    if (name === '') {
      setHasError('Missing required input (name)');
    } else if (
      parseInt(calendarMinTime.replace(':', '')) >
      parseInt(calendarMaxTime.replace(':', ''))
    ) {
      setHasError('Minimum Time cannot be greater than Maximum Time');
    } else if (name?.length > 20) {
      setHasError('Name must be under 20 characters');
    } else {
      setIsSaving(true);
      fetch(`${GROUP}/${groupID}`, {
        method: 'PATCH',
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
            setIsSaving(false);
            setHasError(result.message);
          }
        });
    }
  };

  if (isLoading) return <SettingsSkeleton/>

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container
        header='settings'
        leftIcon={'ArrowBack'}
        leftIconClick={() => router.replace(`/${groupID}`)}
      >
        <Spinner isLoading={isSaving} />
        <div className={style.groupInfo}>
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
            onClick={editGroup}
            className={utilities.button}
          >
            Save Changes
          </Button>
        </div>
      </Container>
    </>
  );
}
