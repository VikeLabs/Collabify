import { useEffect, useState } from 'react';
import { useAddRecentGroup, useAsyncFetch } from 'hooks';
import { BASE_URL, EVENT, GROUP_CALENDAR, GROUP } from 'constants/index';
import { useRouter } from 'next/router';
import { Container } from 'components/common/Container';
import { GroupBanner } from 'components/GroupBanner';
import { GroupCalendar } from 'components/GroupCalendar';
import { Alert, Box, IconButton } from '@mui/material';
import { Check, CopyAllOutlined } from '@mui/icons-material';
import { getTodaysDate } from 'helper/getTodaysDate';
import { GroupSkeleton } from 'components/GroupHome';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/groupHome.module.css';
import { Menu } from 'components/page_groupID';

export default function GroupHome() {
  const router = useRouter();
  const { groupID, availabilityFilled } = router.query;

  // TODO: add typed for this `useAsyncFetch`
  const [data, isLoading, hasError] = useAsyncFetch(groupID as string);

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
        leftButton={<Menu />}
        rightIconClick={() =>
          router.replace(`/${groupID}/availability/${date}`)
        }
        rightIcon='EventAvailable'
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
