import { useEffect } from 'react';
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

  // TODO: Delete once done debug
  useEffect(() => {
    console.log(isLoading); // functions properly
  }, [isLoading]);
  // TODO: Delete once done debug ^^^

  if (isLoading) return <GroupSkeleton />;

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  const copyLink = () => {
    navigator.clipboard.writeText(
      `localhost:3000/${groupName}/availability/${getTodaysDate()}`
    );
    alert('Link Copied!');
  };

  /*
   * BUG:
   * Flow: GroupBanner takes in an icon prop, pass that prop to MuiIcon component.
   * if the icon is not one of the icon selected from the meeting, it throws and error.
   * Everytime this renders, I can see that the icon prop is taking in an `undefined` value.
   * This component should have been caught by the `isLoading` value from `useAsyncFetch`
   * */
  return (
    <Container header={group?.name}>
      <GroupBanner icon={group?.icon} />
      {/* This line above is causing the error, even though it should not be rendered while `isLoading` is true*/}
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
