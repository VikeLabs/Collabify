import { Box, Skeleton } from '@mui/material';
import { Container } from 'components/common/Container';

export function SettingsSkeleton() {
  return (
    <Container header='loading...'>
      <Skeleton
        height={60}
        width={200}
      />
      <Box sx={{ display: 'flex' }}>
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
        <Skeleton
          height={90}
          width={75}
          sx={{ borderRadius: '50%', marginLeft: '10px' }}
        />
      </Box>
      <Skeleton
        height={60}
        width={200}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          height={100}
          sx={{ borderRadius: '10px', width: '45%' }}
        />
        <Skeleton
          height={100}
          sx={{ borderRadius: '10px', width: '45%' }}
        />
      </Box>
      <Skeleton
        height={60}
        width={200}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          height={100}
          sx={{ borderRadius: '10px', width: '48%' }}
        />
        <Skeleton
          height={100}
          sx={{ borderRadius: '10px', width: '48%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton
          height={80}
          width={200}
          sx={{ borderRadius: '10px' }}
        />
      </Box>
    </Container>
  );
}
