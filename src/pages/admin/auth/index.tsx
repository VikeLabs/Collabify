import { Box, TextField, Button } from '@mui/material';
import s from 'styles/pages/blog/admin.module.css';
import { useEmployee } from 'blog/hooks/useEmployee';
import { useRouter } from 'next/router';
import { CardLayout, PasswordInput } from 'blog/components/commons';

export default function AdminAuth() {
  const { error, isLoading, credential, onEmail, onPassword, onLogin } =
    useEmployee();

  const { email, password } = credential;
  const formInvalid: boolean = email === '' || password === '';

  const nav = useRouter();
  const onNavigate = () => nav.push('/admin/auth/register');

  return (
    <CardLayout heading='Login'>
      <Box className={s.textFieldContainer}>
        <TextField
          label='email'
          variant='outlined'
          type='email'
          value={email}
          onChange={onEmail}
        />

        <PasswordInput
          password={password}
          onInput={onPassword}
        />
      </Box>

      <Box className={s.actions}>
        <Button onClick={onNavigate}>Register</Button>
        <Button
          onClick={onLogin}
          variant='contained'
          disabled={formInvalid}
        >
          Sign In
        </Button>
      </Box>
    </CardLayout>
  );
}
