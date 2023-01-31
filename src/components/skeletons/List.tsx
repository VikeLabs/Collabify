import { Box, Skeleton } from '@mui/material';
import { Container } from 'components/common/Container';

export function ListSkeleton() {
  return (
    <Container header='loading...'>
      <Box sx={{ width: '80%', marginLeft: '10%' }}>
        <Skeleton height={100} />
        <Skeleton
          height={100}
          animation='wave'
        />
        <Skeleton height={100} />
        <Skeleton
          height={100}
          animation='wave'
        />
        <Skeleton height={100} />
        <Skeleton
          height={100}
          animation='wave'
        />
      </Box>
    </Container>
  );
}
