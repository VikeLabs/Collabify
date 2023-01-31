import { Group } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useBool } from 'hooks';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

// Components
import { Container, Spinner } from 'components/common';
import {
  GroupInfo,
  Icons,
  LandingBanner,
  TimeSlots,
  PrivateGroupInfo,
} from 'components/page_index';
import { AllowedIcons, getAllIcons } from 'components/common/MuiIcon';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material'; // `Skeleton` not used
import { GROUP } from 'constants/index';
import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

export default function Home() {
  const router = useRouter();

  /* GROUP ICON */
  const [activeIcon, setActiveIcon] = useState<AllowedIcons>(getAllIcons()[0]); // default first icon

  /* GROUP INFORMAION */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calendarMinTime, setCalendarMinTime] = useState('09:00:00');
  const [calendarMaxTime, setCalendarMaxTime] = useState('17:00:00');

  /* PRIVATE GROUP */
  const groupPrivate = useBool(true);
  const [password, setPassword] = useState('');

  /* FORM VALIDATION */
  const [hasError, setHasError] = useState<string | null>(null);
  const isDisabled = useBool(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  const createGroup = () => {
    setIsSaving(() => true);

    const newGroup = {
      name,
      isPrivate: groupPrivate.bool,
      password,
      description,
      icon: activeIcon,
      calendarMinTime,
      calendarMaxTime,
    };

    setIsSaving(() => true);
    handleSubmit(newGroup as unknown as Group)
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((data) => {
        if (data) {
          const { access_token, groupID } = data;
          if (access_token) {
            PrivateGroupTokens.setGroupToken(String(groupID), access_token);
          }
          router.replace(`/${groupID}`);
        }
      })
      .then(() => setIsSaving(() => false))
      .catch((e) => {
        setHasError(() => 'Something went wrong, try again later.');
        console.log(e);
      });
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
    </>
  );
}

function handleSubmit(body: Group) {
  return fetch(`${GROUP}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
