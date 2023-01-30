import { useEffect, useState } from 'react';
import { useAddRecentGroup, useAsyncFetch } from 'hooks';
import { BASE_URL, GROUP } from 'constants/index';
import { useRouter } from 'next/router';
import { Container } from 'components/common/Container';
import { GroupBanner } from 'components/GroupBanner';
import { GroupCalendar } from 'components/GroupCalendar';
import { Alert, Box, IconButton } from '@mui/material';
import { Check, CopyAllOutlined } from '@mui/icons-material';
import { getTodaysDate } from 'helper/getTodaysDate';
import { GroupSkeleton } from 'components/skeletons';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/groupHome.module.css';

export default function GroupHome() {
  const router = useRouter();
  const { groupID, availabilityFilled } = router.query;

  // TODO: add typed for this `useAsyncFetch`
  const [data, isLoading, err] = useAsyncFetch();
  const [apiErr, setApiErr] = useState<string | null>(err);

  const [date, setDate] = useState(getTodaysDate());
  const [linkCopied, setLinkCopied] = useState(false);

  // If availability has been filled out show alert for 5 seconds
  // TODO: custom hook for this, applies for api error msg
  const [successAlert, setSuccessAlert] = useState(false);
  useEffect(() => {
    setSuccessAlert(() => availabilityFilled === 'true');

    const alertTimeoutID = setTimeout(() => setSuccessAlert(() => false), 5000);

    return () => clearTimeout(alertTimeoutID);
  }, [availabilityFilled]);

  // Adds group to recent groups storage
  useAddRecentGroup(data?.group);

  // TODO: types for this function
  // unused props: names, numbers <- the server will query the db for this information
  const createEvent = ({ title, description, time, names, numbers }) => {
    // Send request to API
    fetch(`${GROUP}/${groupID}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupID: groupID as string,
        title,
        description,
        time,
      }),
    })
      .then((res) => {
        if (res.status === 201) return window.location.reload();
        throw new Error(`Server responded with ${res.status}`);
      })
      .catch((e) => {
        setApiErr(() => 'Something went wrong, try again later.');
        console.log(e);
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
        <Alert
          severity='success'
          style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
        >
          Availability has been saved! Check out everyone elses availability
          down below
        </Alert>
      )}
      {apiErr && <Alert severity='error'>{apiErr}</Alert>}
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
