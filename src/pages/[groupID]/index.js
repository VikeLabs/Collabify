import { useState } from 'react';
import { Alert, Box, IconButton } from '@mui/material';

import { useAddRecentGroup, useAsyncFetch } from 'hooks';
import {
  BASE_URL,
  EVENT,
  GROUP_CALENDAR,
} from 'constants';
import { useRouter } from 'next/router';
import { Container } from 'components/Container';
import { GroupBanner } from 'components/GroupBanner';
import { GroupCalendar } from 'components/GroupCalendar';
import { Check, CopyAllOutlined } from '@mui/icons-material';
import { getTodaysDate } from 'helper/getTodaysDate';
import { GroupSkeleton } from 'components/GroupHome';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/groupHome.module.css';

export default function GroupHome() {
  const router = useRouter();
  const { groupID } = router.query;

  const [data, isLoading, hasError] = useAsyncFetch(
    `${GROUP_CALENDAR}/${groupID}`
  );
  const [linkCopied, setLinkCopied] = useState(false);

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
        numbers
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
      `${BASE_URL}/${groupID}/availability/${getTodaysDate()}`
    );
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  if (isLoading) return <GroupSkeleton />;

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container 
      header={data?.group?.name} 
      leftIcon={'ArrowBack'} 
      leftIconClick={()=> router.replace(`/`)}
      rightIcon={"EventAvailable"}
      rightIconClick={()=> router.replace(`/${groupID}/availability/${getTodaysDate()}`)}
      >
        <GroupBanner icon={data?.group?.icon} />
        <br />
        <h2 className={utilities.heading}>
          AVAILABILITY LINK:
          <span className={utilities.subHeading}>
            {' '}
            Send to your group members to get results
          </span>
        </h2>
        <Box className={style.container}>
          <IconButton
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
              {BASE_URL}/{groupID}/availability/{getTodaysDate()}
            </p>
          </Box>
        </Box>
        <br />
        <GroupCalendar
          calendarEvents={data?.calendarEvents}
          createEvent={createEvent}
          slotMinTime={data?.group?.calendarMinTime}
          slotMaxTime={data?.group?.calendarMaxTime}
        />
      </Container>
    </>
  );
}
