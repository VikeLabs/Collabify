import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface PropType {
  toPage: string; // destination of where to redirect
}

export const BackButton = ({ toPage }: PropType) => {
  const router = useRouter();

  return (
    <ArrowBack
      style={{ cursor: 'pointer' }}
      onClick={() => router.replace(toPage)}
    />
  );
};
