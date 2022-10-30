import { Alert, Box, IconButton, Typography } from '@mui/material';

import { useAsyncFetch } from '../../hooks';
import { GROUP } from '../../constants';
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

  const [group, isLoading, hasError] = useAsyncFetch(`${GROUP}/${groupName}`);

  if (isLoading) return <GroupSkeleton />;

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const copyLink = () => {
    navigator.clipboard.writeText(
      `localhost:3000/${groupName}/availability/${getTodaysDate()}`
    );
    alert('Link Copied!');
  };

  return (
    <Container header={group?.name}>
      {/* TODO: icon dynamically */}
      <GroupBanner icon='rugby' />
      <br />
      <GroupCalendar
        events={[]}
        createEvent={() => console.log('')}
      />
      <br />
      <Typography
        variant='h5'
        className={[utilities.heading, utilities.marginBottom1]}
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
            colab-calendar.com/{groupName}/availability/{getTodaysDate()}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
