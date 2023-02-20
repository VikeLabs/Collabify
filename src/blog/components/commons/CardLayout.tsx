import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import s from 'styles/pages/blog/admin.module.css';

interface PropTypes {
  heading: string;
  children: React.ReactNode;
}

export function CardLayout({ heading, children }: PropTypes) {
  return (
    <Container className={s.container}>
      <Card className={s.card}>
        <CardContent>
          <Typography
            component='h1'
            variant='h5'
          >
            {heading}
          </Typography>
          <Divider />
          {children}
        </CardContent>
      </Card>
    </Container>
  );
}
