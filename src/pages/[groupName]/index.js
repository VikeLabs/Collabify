import { Alert, Skeleton } from '@mui/material';

import { useAsyncFetch } from '../../hooks';
import { GROUP } from '../../constants';
import { useRouter } from 'next/router';
import { getTodaysDate } from '../../helper/getTodaysDate'
import { Container } from 'components/Container';
import { GroupBanner } from 'components/GroupBanner';

export default function GroupHome() {
  const router = useRouter();
  const { groupName } = router.query;

  const [group, isLoading, hasError] = useAsyncFetch(`${GROUP}/${groupName}`);

  if (isLoading) return <Skeleton animation='wave' />;

  if (hasError) return <Alert severity='error'>{hasError.message}</Alert>;

  return (
    <Container header={group?.name}>
      <GroupBanner backgroundColor='#FFB703' iconBackgroundColor='#FB8500' icon='Today'/>
    </Container>
  );
}
