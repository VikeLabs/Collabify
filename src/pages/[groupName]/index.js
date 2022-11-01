import { useEffect } from 'react';
import { Alert, Box, IconButton, Typography } from '@mui/material';

import { useAsyncFetch } from '../../hooks';
import { BASE_URL, GROUP } from '../../constants';
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
  const { groupName } = router.query;

  const [data, isLoading, hasError] = useAsyncFetch(`${GROUP}/${groupName}`);

  useEffect(() => {
    if (data?.group) {
      let storedGroups = JSON.parse(localStorage.getItem("CollabifyRecentGroups")) ?? [];
      if (!storedGroups.some(group => group._id === data.group._id)) {
        storedGroups.unshift(data.group)
        localStorage.setItem("CollabifyRecentGroups", JSON.stringify(storedGroups));
      } else {
        const index = storedGroups.indexOf({_id: data.group._id})
        storedGroups.unshift(storedGroups.splice(index, 1)[0]);
        localStorage.setItem("CollabifyRecentGroups", JSON.stringify(storedGroups));
      }
    }
  }, [data?.group])

  if (isLoading) return <GroupSkeleton />;

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/${groupName}/availability/${getTodaysDate()}`
    );
    alert('Link Copied!');
  };

  return (
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
            {BASE_URL}/{groupName}/availability/{getTodaysDate()}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
