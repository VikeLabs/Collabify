import { Alert } from '@mui/material'; // `Skeleton` not used
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Components
import { Container, Spinner } from 'components/common';
import {
  GroupInfo,
  Icons,
  TimeSlots,
  PrivateGroupInfo,
} from 'components/page_index';

// MUI
import Button from '@mui/material/Button';

import { GROUP } from 'constants/index';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';
import { useAsyncFetch, useBool } from 'hooks';
import { SettingsSkeleton } from 'components/skeletons';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

export default function GroupSettings() {
  const router = useRouter();

  const { groupID } = router.query;

  const [data, isLoading, apiError] = useAsyncFetch<any>();

  // Icons related
  const [activeIcon, setActiveIcon] = useState(null);
  // Information related
  const [hasError, setHasError] = useState(apiError);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [calendarMinTime, setCalendarMinTime] = useState(null);
  const [calendarMaxTime, setCalendarMaxTime] = useState(null);
  /* PRIVATE GROUP */
  const groupPrivate = useBool(false);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (data) {
      setActiveIcon(data.group.icon);
      setName(data.group.name);
      setDescription(data.group.description);
      setCalendarMinTime(data.group.calendarMinTime);
      setCalendarMaxTime(data.group.calendarMaxTime);
      groupPrivate.setBool(() => data.group.isPrivate);
      if (data.group.isPrivate) setPassword('........');
    }
  }, [data]);

  const editGroup = () => {
    if (name === '') {
      setHasError('Missing required input (name)');
    } else if (groupPrivate && password === '') {
      setHasError('Missing required input (password')
    } else if (
      parseInt(calendarMinTime.replace(':', '')) >
      parseInt(calendarMaxTime.replace(':', ''))
    ) {
      setHasError('Minimum Time cannot be greater than Maximum Time');
    } else if (name?.length > 20) {
      setHasError('Name must be under 20 characters');
    } else {
      setIsSaving(true);
      const token = PrivateGroupTokens.getGroupToken(groupID as string);
      const headers = new Headers({ 'content-type': 'application/json' });
      token && headers.append('Authorization', `Bearer ${token}`);
      fetch(`${GROUP}/${groupID}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          name,
          description,
          isPrivate: groupPrivate.bool,
          password,
          icon: activeIcon,
          calendarMinTime,
          calendarMaxTime,
        }),
      })
        .then((res) => {
          switch (res.status) {
            case 200:
              router.replace(`/${groupID}`);
              break;

            case 401:
              router.push(`/auth/${groupID}`);
              break;

            default:
              throw new Error(`Unhandled status code: ${res.status}`);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  if (isLoading) return <SettingsSkeleton />;

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
          {/* PRIVATE GROUP*/}
          <PrivateGroupInfo
            isPrivate={groupPrivate.bool}
            password={password}
            setPassword={setPassword}
            handleToggleSwitch={groupPrivate.toggleBool}
          />
        </div>
        {/* Submit button */}
        <div className={utilities.buttonContainer}>
          <Button
            variant='contained'
            disabled={
              !name || 
              isSaving || 
              groupPrivate.bool && (password.length < 8 || password.length > 16) ? true : false}
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
