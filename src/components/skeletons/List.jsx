import { Box, Skeleton } from '@mui/material';

export function ListSkeleton() {
  return (
    <>
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
    </>
  );
}
