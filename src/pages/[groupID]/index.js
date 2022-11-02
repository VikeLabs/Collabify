import { useEffect } from 'react';
import { Alert, Box, IconButton, Typography } from '@mui/material';

import { useAsyncFetch } from '../../hooks';
import { BASE_URL, GROUP_CALENDAR, RECENT_GROUPS_STORED } from '../../constants';
import { useRouter } from 'next/router';
import { Container } from 'components/Container';
import { GroupBanner } from 'components/GroupBanner';
import { GroupCalendar } from 'components/GroupCalendar';
import { CopyAllOutlined } from '@mui/icons-material';
import { getTodaysDate } from 'helper/getTodaysDate';
import { GroupSkeleton } from 'components/GroupHome';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/groupHome.module.css';

export default function GroupHome() {
  const router = useRouter();
  const { groupID } = router.query;

  const [data, isLoading, hasError] = useAsyncFetch(`${GROUP_CALENDAR}/${groupID}`);

  useEffect(() => {
    if (data?.group) {
      let storedGroups = JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED)) ?? [];
      if (!storedGroups.some(group => group._id === data.group._id)) {
        storedGroups.unshift(data.group)
        localStorage.setItem(RECENT_GROUPS_STORED, JSON.stringify(storedGroups));
      } else {
        const index = storedGroups.indexOf({_id: data.group._id})
        storedGroups.unshift(storedGroups.splice(index, 1)[0]);
        localStorage.setItem(RECENT_GROUPS_STORED, JSON.stringify(storedGroups));
      }
    }
  }, [data?.group])

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/${groupID}/availability/${getTodaysDate()}`
    );
    alert('Link Copied!');
  };

  if (isLoading) return <GroupSkeleton />;


  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container header={data?.group?.name}>
        <GroupBanner icon={data?.group?.icon} />
        {/* This line above is causing the error, even though it should not be rendered while `isLoading` is true*/}
        <br />
        <GroupCalendar
          events={[]}
          createEvent={() => console.log('')}
        />
        <br />
        <Typography
          variant='h5'
          className={[
            utilities.heading,
            utilities.marginBottom1,
            utilities.marginLeft1,
          ]}
        >
          AVAILABILITY LINK:
          <span className={utilities.subHeading}>
            {' '}
            Send to your group members to get results
          </span>
        </Typography>
        <Box className={style.container}>
          <IconButton onClick={copyLink}>
            <CopyAllOutlined />
          </IconButton>
          <Box
            className={style.linkContainer}
            onClick={copyLink}
          >
            <Typography>
              {BASE_URL}/{groupID}/availability/{getTodaysDate()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
