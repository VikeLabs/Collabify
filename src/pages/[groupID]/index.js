import { useEffect, useState } from 'react';
import { Alert, Box, IconButton } from '@mui/material';

import { useAddRecentGroup } from 'hooks';
import { BASE_URL, EVENT, GROUP_CALENDAR } from 'constants';
import { useRouter } from 'next/router';
import { Container } from 'components/Container';
import { GroupBanner } from 'components/GroupBanner';
import { GroupCalendar } from 'components/GroupCalendar';
import { Check, CopyAllOutlined } from '@mui/icons-material';
import { getTodaysDate } from 'helper/getTodaysDate';
import { GroupSkeleton } from 'components/GroupHome';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/groupHome.module.css';
import { UnauthorizedError } from 'api-lib/util/exceptions/apiExceptions';

export default function GroupHome() {
  const router = useRouter();
  const { groupID, availabilityFilled } = router.query;

  /* FETCH GROUP INFORMATION ON MOUNT */
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // reset state
  useEffect(() => {
    return () => {
      setData(() => null);
      setIsLoading(() => false);
      setApiError(() => null);
    };
  });

  useEffect(() => {
    setIsLoading(() => true);
    setApiError(() => null);

    groupID &&
      fetch(`${GROUP_CALENDAR}/${groupID}`, {
        headers: {
          method: 'GET',
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw new UnauthorizedError();
          }

          return res.json();
        })
        .then((result) => {
          setData(() => result);
          setIsLoading(() => false);
          setApiError(() => null);
        })
        .catch((err) => {
          if (err instanceof UnauthorizedError) {
            router.push(`/auth/${groupID}`);
            return;
          }
          setApiError(() => err.message);
          setIsLoading(() => false);
        });
  }, [groupID]);

  const [hasError, setHasError] = useState(apiError);
  const [date, setDate] = useState(getTodaysDate());
  const [linkCopied, setLinkCopied] = useState(false);

  // If availability has been filled out show alert for 5 seconds
  const [successAlert, setSuccessAlert] = useState(false);
  useEffect(() => {
    setSuccessAlert(() => availabilityFilled === 'true');

    const alertTimeoutID = setTimeout(() => setSuccessAlert(() => false), 5000);

    return () => clearTimeout(alertTimeoutID);
  }, [availabilityFilled]);

  // Adds group to recent groups storage
  useAddRecentGroup(data?.group);

  const createEvent = ({ title, description, time, names, numbers }) => {
    // Send request to API
    fetch(EVENT, {
      method: 'POST',
      body: JSON.stringify({
        groupID,
        event: {
          title,
          description,
          time,
        },
        names,
        numbers,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          // Temp solution, should have refetch of group data instead
          window.location.reload();
        } else setHasError(result.message);
      });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://${BASE_URL}/${groupID}/availability/${date}`
    );
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  if (isLoading) return <GroupSkeleton />;

  return (
    <>
      {successAlert && (
        <Alert severity='success'>
          Availability has been saved! Check out everyone elses availability
          down below
        </Alert>
      )}
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container
        header={data?.group?.name}
        menu={[
          {
            icon: 'Settings',
            text: 'Group Settings',
            onClick: () => router.replace(`/${groupID}/settings`),
          },
          {
            icon: 'ArrowBack',
            text: 'Back',
            onClick: () => router.replace('/'),
          },
        ]}
        rightIcon={'EventAvailable'}
        rightIconClick={() =>
          router.replace(`/${groupID}/availability/${date}`)
        }
      >
        <GroupBanner icon={data?.group?.icon} />
        <br />
        <h2 className={utilities.heading}>
          AVAILABILITY LINK:&nbsp;
          <span className={utilities.subHeading}>
            Send to your group members to get results
          </span>
        </h2>
        <Box className={style.container}>
          <IconButton
            aria-label='copy link'
            color={linkCopied ? 'success' : 'primary'}
            onClick={copyLink}
          >
            {linkCopied ? <Check /> : <CopyAllOutlined />}
          </IconButton>

          <Box
            className={style.linkContainer}
            onClick={copyLink}
          >
            <p className={style.linkText}>
              {BASE_URL}/{groupID}/availability/{date}
            </p>
          </Box>
        </Box>
        <br />
        <GroupCalendar
          calendarEvents={data?.calendarEvents}
          createEvent={createEvent}
          slotMinTime={data?.group?.calendarMinTime}
          slotMaxTime={data?.group?.calendarMaxTime}
          setDate={setDate}
        />
      </Container>
    </>
  );
}
