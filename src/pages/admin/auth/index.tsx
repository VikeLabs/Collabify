import {
  Box,
  TextField,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import s from 'styles/pages/blog/admin.module.css';
import { useEmployee } from 'blog/hooks/useEmployee';

export default function AdminAuth() {
  const {
    error,
    isLoading,
    credential,
    onEmail,
    onPassword,
    onLogin,
    onRegister,
  } = useEmployee();

  return (
    <Container className={s.container}>
      <Card className={s.card}>
        <CardContent>
          <Typography
            component='h1'
            variant='h5'
          >
            Sign In
          </Typography>

          <Box className={s.textFieldContainer}>
            <TextField
              label='email'
              variant='outlined'
              type='email'
              value={credential.email}
              onChange={onEmail}
            />

            <TextField
              label='password'
              variant='outlined'
              type='password'
              value={credential.password}
              onChange={onPassword}
            />
          </Box>
        </CardContent>

        <Box className={s.actions}>
          <Button onClick={onRegister}>Register</Button>
          <Button
            onClick={onLogin}
            variant='contained'
          >
            Sign In
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
